import { generateOpenApiDocument } from "trpc-openapi";

import { getBaseUrl } from "@acme/common";

import { appRouter } from "./root";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "create-t3-turbo",
  version: "1.0.0",
  baseUrl: getBaseUrl(),
});
