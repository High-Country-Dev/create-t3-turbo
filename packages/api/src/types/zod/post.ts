import * as z from "zod"
import * as imports from "../helpers"

export const PostModel = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: imports.dateOrIso.nullish().nullish(),
  updatedAt: imports.dateOrIso.nullish().nullish(),
})
