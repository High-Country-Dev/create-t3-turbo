import * as z from 'zod'

import * as imports from '../helper'

export const PhoneNumberModel = z.object({
  id: z.string(),
  phoneNumber: z.string(),
  userId: z.string(),
  createdAt: imports.dateOrIso.nullish().nullish(),
  updatedAt: imports.dateOrIso.nullish().nullish(),
})
