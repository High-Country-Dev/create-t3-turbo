import { Role } from "./enums";

// For types that are shared but specific to the app (e.g. rucksack types)
export type ClerkPublicMetadata =
  | {
      role: Role;
    }
  | undefined;

export type ReactAdminPermissions = {
  role: Role;
};
