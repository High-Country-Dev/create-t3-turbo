import { type z } from "zod";

import { UserModel } from "../zod";

export const CreateUserModel = UserModel.partial({ id: true });
export type CreateUserModel = z.infer<typeof CreateUserModel>;
