import * as z from 'zod'

import * as imports from '../helpers'

export const EmailAddressModel = z.object({
  id: z.string(),
  email: z.string(),
  userId: z.string(),
  createdAt: imports.dateOrIso.nullish().nullish(),
  updatedAt: imports.dateOrIso.nullish().nullish(),
})
