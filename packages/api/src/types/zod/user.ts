import * as z from 'zod'

import * as imports from '../helper'

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
)

export const UserModel = z.object({
  id: z.string(),
  createdAt: z.bigint(),
  updatedAt: z.bigint().nullish(),
  passwordEnabled: z.boolean().nullish(),
  totpEnabled: z.boolean().nullish(),
  backupCodeEnabled: z.boolean().nullish(),
  twoFactorEnabled: z.boolean().nullish(),
  profileImageUrl: z.string().nullish(),
  imageUrl: z.string().nullish(),
  primaryEmailAddressId: z.string().nullish(),
  primaryPhoneNumberId: z.string().nullish(),
  primaryWeb3WalletId: z.string().nullish(),
  lastSignInAt: z.bigint().nullish(),
  externalId: z.string().nullish(),
  username: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  publicMetadata: jsonSchema,
  privateMetadata: jsonSchema,
  unsafeMetadata: jsonSchema,
  prismaCreatedAt: imports.dateOrIso.nullish().nullish(),
  prismaUpdatedAt: imports.dateOrIso.nullish().nullish(),
})
