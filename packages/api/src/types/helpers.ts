import { z } from 'zod'

const isoDateRegExp = new RegExp(
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
)

// Could do this with a custom zod preprocess, but this may be simpler
// https://github.com/colinhacks/zod#preprocess
const isISODate = (str: string): boolean => {
  return isoDateRegExp.test(str)
}

export const dateOrIso = z.union([
  z.date(),
  z.string().refine(isISODate, { message: 'Not a valid ISO string date ' }),
])

export const nativeEnum = <T extends Record<string, string>>(e: T) =>
  z.nativeEnum(e)

export const option = z.object({ id: z.string(), name: z.string() })
export const options = z.array(option)

export * from '@acme/shared/src/app/enums'
export * from '@acme/shared/src/common/enums'
