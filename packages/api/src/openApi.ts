import { generateOpenApiDocument } from "trpc-openapi";

import { env } from "@acme/auth/env.mjs";

import { appRouter } from "./root";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "create-t3-turbo",
  version: "1.0.0",
  baseUrl: env.NEXT_PUBLIC_URL,
});
