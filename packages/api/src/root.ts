import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { webhookRouter } from "./router/webhooks";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  webhook: webhookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
