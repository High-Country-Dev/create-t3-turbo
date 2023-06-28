import * as z from "zod"
import * as imports from "../helpers"

export const AccountModel = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
  createdAt: imports.dateOrIso.nullish().nullish(),
  updatedAt: imports.dateOrIso.nullish().nullish(),
})
