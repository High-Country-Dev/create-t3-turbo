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

  const whereFilter: Prisma.UserWhereInput = {
    ...(id.length === 36 && { id }),
  }

  return {
    where: merge(whereFilter) as Prisma.UserWhereInput,
  }
}

// MUST USE MERGE
// In prisma findMany and findUnique
// Otherwise the new where statements will overwrite id where statements

const findMany =
  (context: RaContext) =>
  (args: Pick<Prisma.UserFindManyArgs, 'where' | 'orderBy'>) =>
    prisma.user.findMany(merge(args, getInclude(context), getWhere(context)))

const findUnique =
  (context: RaContext) => (args: Pick<Prisma.UserFindUniqueArgs, 'where'>) =>
    prisma.user.findUnique(merge(args, getInclude(context))).then((rawUser) => {
      if (!rawUser) return null
      return rawUser
    })

const count = (context: RaContext) => (args: Prisma.UserCountArgs) =>
  prisma.user.count(merge(args, getWhere(context)))

export type RaUser = NonNullable<
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
      return getManyHandler<Prisma.UserFindManyArgs>(req, res, {
        findMany: findMany(context),
      })
    case 'getList':
      return getListHandler<Prisma.UserFindManyArgs>(req, res, {
        count: count(context),
        findMany: findMany(context),
      })
    case 'create':
      return await createHandler<Prisma.UserCreateArgs>(req, res, prisma.user)
    case 'getOne':
      return await getOneHandler<Prisma.UserFindUniqueArgs>(req, res, {
        findUnique: findUnique(context),
      })
    case 'deleteMany':
      return await deleteManyHandler(req, res, prisma.user)
    case 'delete':
      return await deleteHandler(req, res, prisma.user)
    case 'getManyReference':
      return await getManyReferenceHandler(req, res, {
        findMany: findMany(context),
      })
    case 'update':
      return await updateHandler(req, res, {
        update: (
          rawArgs: Omit<Prisma.UserUpdateArgs, 'data'> & {
            data: RaUser
          },
        ) => {
          const data: Prisma.UserUpdateInput = omit(
            rawArgs.data,
            'apiaries',
            'accessLevel',
            'quests',
            'apiaryRelations',
            'groupRelations',
            'inviteAccepted',
          )
          return prisma.user.update({ ...rawArgs, data })
        },
      })
    default:
      return await defaultHandler(req, res, prisma)
  }
}

export default apiHandler
