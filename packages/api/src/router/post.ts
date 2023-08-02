import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { ListPostsModel } from "../types/schema/post";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({ orderBy: { id: "desc" } });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findFirst({ where: { id: input.id } });
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({ data: input });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.post.delete({ where: { id: input } });
  }),
  openApiAllPosts: publicProcedure
    .meta({ openapi: { method: "GET", path: "/posts" } })
    .input(z.object({}).passthrough().optional())
    .output(ListPostsModel)
    .query(({ ctx }) => {
      return ctx.prisma.post.findMany({ orderBy: { id: "desc" } });
    }),
});
