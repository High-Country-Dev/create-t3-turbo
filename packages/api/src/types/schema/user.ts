import { z } from 'zod'

import { UserModel } from '../zod'

export const CreateUserModel = UserModel.partial({ id: true })
export type CreateUserModel = z.infer<typeof CreateUserModel>

export const ClerkNonUserWebhookType = [
  'email.created',
  'organization.created',
  'organization.deleted',
  'organization.updated',
  'organizationInvitation.accepted',
  'organizationInvitation.created',
  'organizationInvitation.revoked',
  'organizationMembership.created',
  'organizationMembership.deleted',
  'organizationMembership.updated',
  'session.created',
  'session.ended',
  'session.removed',
  'session.revoked',
  'sms.created',
] as const
export const ClerkUserWebhookType = [
  'user.created',
  'user.deleted',
  'user.updated',
] as const

export const ClerkResource = z.object({
  id: z.string().optional(),
  pathRoot: z.string(),
})

export const ClerkVerification = z.object({
  status: z.string(),
  strategy: z.string(),
  externalVerificationRedirectURL: z.string().url().nullable(),
  attempts: z.number().nullable(),
  expireAt: z.number().nullable(),
  nonce: z.string().nullable(),
})

export const ClerkIdentificationLink = z.object({
  id: z.string(),
  type: z.string(),
})

export const ClerkEmailAddress = ClerkResource.extend({
  id: z.string(),
  emailAddress: z.string(),
  verification: ClerkVerification.nullable(),
  linkedTo: ClerkIdentificationLink.array(),
})

export const ClerkPhoneNumber = z.object({
  id: z.string(),
  phoneNumber: z.string(),
  reservedForSecondFactor: z.boolean(),
  defaultSecondFactor: z.boolean(),
  verification: ClerkVerification.nullable(),
  linkedTo: ClerkIdentificationLink.array(),
})

export const ClerkExternalAccount = z.object({
  id: z.string(),
  provider: z.string(),
  identificationId: z.string(),
  externalId: z.string(),
  approvedScopes: z.string(),
  emailAddress: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  picture: z.string(),
  imageUrl: z.string(),
  username: z.string().nullable(),
  publicMetadata: z.record(z.unknown()).nullable(),
  label: z.string().nullish(),
  verification: ClerkVerification.nullable(),
})

export const ClerkUser = z
  .object({
    id: z.string(),
    passwordEnabled: z.boolean(),
    totpEnabled: z.boolean(),
    backupCodeEnabled: z.boolean(),
    twoFactorEnabled: z.boolean(),
    banned: z.boolean(),
    createdAt: z.number(),
    updatedAt: z.number(),
    profileImageUrl: z.string(),
    imageUrl: z.string(),
    gender: z.string(),
    birthday: z.string(),
    primaryEmailAddressId: z.string().nullable(),
    primaryPhoneNumberId: z.string().nullable(),
    primaryWeb3WalletId: z.string().nullable(),
    lastSignInAt: z.number().nullable(),
    externalId: z.string().nullable(),
    username: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    publicMetadata: z.record(z.unknown()),
    privateMetadata: z.record(z.unknown()),
    unsafeMetadata: z.record(z.unknown()),
    emailAddresses: ClerkEmailAddress,
    phoneNumbers: ClerkPhoneNumber,
    web3Wallets: z.unknown(),
    externalAccounts: ClerkExternalAccount,
  })
  .passthrough()

export const ClerkWebhookEvent = z.discriminatedUnion('type', [
  z.object({
    object: z.literal('event'),
    type: z.enum(ClerkUserWebhookType),
    data: ClerkUser,
  }),
  z.object({
    object: z.literal('event'),
    type: z.enum(ClerkNonUserWebhookType),
    data: z.unknown(),
  }),
])
