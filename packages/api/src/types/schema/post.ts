import type { z } from 'zod'

import { PostModel } from '../zod'

export const CreatePostModel = PostModel.partial({ id: true })
export type CreatePostModel = z.infer<typeof CreatePostModel>

export const ListPostsModel = PostModel.array()
export type ListPostsModel = z.infer<typeof ListPostsModel>
