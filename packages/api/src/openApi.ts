import { generateOpenApiDocument } from 'trpc-openapi'

import { env } from '@acme/auth'

import { appRouter } from './root'

export const openApiDocument = generateOpenApiDocument(appRouter, {
  // TODO PUBLISH: Update to your project details
  title: 'create-t3-turbo',
  version: '1.0.0',
  baseUrl: env.NEXT_PUBLIC_URL,
})
