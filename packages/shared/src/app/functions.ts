import type { UserJSON } from "@clerk/backend";

import type { Prisma } from "../common/prismaTypes";

// For functions that are shared but specific to the app (e.g. rucksack functions)
export const prismaUserFromClerkUser = (
  clerkUser: UserJSON,
): Prisma.UserCreateInput => {
  return {
    id: clerkUser.id,
    passwordEnabled: clerkUser.password_enabled,
    createdAt: clerkUser.created_at,
    updatedAt: clerkUser.updated_at,
    totpEnabled: clerkUser.totp_enabled,
    backupCodeEnabled: clerkUser.backup_code_enabled,
    twoFactorEnabled: clerkUser.two_factor_enabled,
    profileImageUrl: clerkUser.profile_image_url,
    imageUrl: clerkUser.image_url,
    primaryEmailAddressId: clerkUser.primary_email_address_id,
    primaryPhoneNumberId: clerkUser.primary_phone_number_id,
    primaryWeb3WalletId: clerkUser.primary_web3_wallet_id,
    lastSignInAt: clerkUser.last_sign_in_at,
    externalId: clerkUser.external_id,
    firstName: clerkUser.first_name,
    lastName: clerkUser.last_name,
    publicMetadata: clerkUser.public_metadata as Prisma.InputJsonValue,
    unsafeMetadata: clerkUser.unsafe_metadata as Prisma.InputJsonValue,
    emailAddresses: {
      create: clerkUser.email_addresses?.map((email) => ({
        id: email.id,
        email: email.email_address,
      })),
    },
    phoneNumbers: {
      create: clerkUser.phone_numbers?.map((phone) => ({
        id: phone.id,
        phoneNumber: phone.phone_number,
      })),
    },
  };
};
