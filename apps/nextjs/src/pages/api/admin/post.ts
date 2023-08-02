import type { NextApiHandler, NextApiRequest } from 'next'
import type { Prisma } from '@prisma/client'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import {
  createHandler,
  defaultHandler,
  deleteHandler,
  deleteManyHandler,
  getListHandler,
  getManyHandler,
  getManyReferenceHandler,
  getOneHandler,
  updateHandler,
} from 'ra-data-simple-prisma'

import { prisma } from '@acme/db'

interface RaContext {
  filter?: { id?: string; q?: string }
}

const getReactAdminContext = (_clonedReq: NextApiRequest) => Promise.resolve({})

const getInclude = (_context: RaContext) => undefined
// ({
//   include: {},
// });

const getWhere = (context: RaContext) => {
  const { q: _q, id = '' } = context?.filter ?? {}

  const whereFilter: Prisma.PostWhereInput = {
    ...(id.length === 36 && { id }),
  }

  return {
    where: merge(whereFilter) as Prisma.PostWhereInput,
  }
}

// MUST USE MERGE
// In prisma findMany and findUnique
// Otherwise the new where statements will overwrite id where statements

const findMany =
  (context: RaContext) =>
  (args: Pick<Prisma.PostFindManyArgs, 'where' | 'orderBy'>) =>
    prisma.post.findMany(merge(args, getInclude(context), getWhere(context)))

const findUnique =
  (context: RaContext) => (args: Pick<Prisma.PostFindUniqueArgs, 'where'>) =>
    prisma.post.findUnique(merge(args, getInclude(context))).then((rawPost) => {
      if (!rawPost) return null
      return rawPost
    })

const count = (context: RaContext) => (args: Prisma.PostCountArgs) =>
  prisma.post.count(merge(args, getWhere(context)))

export type RaPost = NonNullable<
  Awaited<ReturnType<ReturnType<typeof findUnique>>>
>

const apiHandler: NextApiHandler = async (req, res) => {
  const clonedReq = cloneDeep(req)
  const context = await getReactAdminContext(clonedReq)

  // Delete the original filter since we handle
  // it in getReactAdminContext -> getWhere
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  delete req?.body?.params?.filter

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  switch (req.body.method) {
    case 'getMany':
      return getManyHandler<Prisma.PostFindManyArgs>(req, res, {
        findMany: findMany(context),
      })
    case 'getList':
      return getListHandler<Prisma.PostFindManyArgs>(req, res, {
        count: count(context),
        findMany: findMany(context),
      })
    case 'create':
      return await createHandler<Prisma.PostCreateArgs>(req, res, prisma.post)
    case 'getOne':
      return await getOneHandler<Prisma.PostFindUniqueArgs>(req, res, {
        findUnique: findUnique(context),
      })
    case 'deleteMany':
      return await deleteManyHandler(req, res, prisma.post)
    case 'delete':
      return await deleteHandler(req, res, prisma.post)
    case 'getManyReference':
      return await getManyReferenceHandler(req, res, {
        findMany: findMany(context),
      })
    case 'update':
      return await updateHandler(req, res, {
        update: (
          rawArgs: Omit<Prisma.PostUpdateArgs, 'data'> & {
            data: RaPost
          },
        ) => {
          const data: Prisma.PostUpdateInput = omit(
            rawArgs.data,
            'apiaries',
            'accessLevel',
            'quests',
            'apiaryRelations',
            'groupRelations',
            'inviteAccepted',
          )
          return prisma.post.update({ ...rawArgs, data })
        },
      })
    default:
      return await defaultHandler(req, res, prisma)
  }
}

export default apiHandler
