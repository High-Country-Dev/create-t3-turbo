import * as z from "zod"
import * as imports from "../helpers"

export const SessionModel = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
  createdAt: imports.dateOrIso.nullish().nullish(),
  updatedAt: imports.dateOrIso.nullish().nullish(),
})
