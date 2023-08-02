import React from 'react'
import Constants from 'expo-constants'
import { useAuth } from '@clerk/clerk-expo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'

import type { AppRouter } from '@acme/api'

import type { EasExtra } from './types'

/**
 * A set of typesafe hooks for consuming your API.
 */
export const api = createTRPCReact<AppRouter>()
export { type RouterInputs, type RouterOutputs } from '@acme/api'

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
const getMobileBaseUrl = () => {
  // TODO: use the NEXT_PUBLIC or EXPO_PUBLIC env variable here and make it optional
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * **NOTE**: This is only for development. In production, you'll want to set the
   * mobileBaseUrl to your production API URL.
   */

  const debuggerHost = Constants.expoConfig?.hostUri
  const localhost = debuggerHost?.split(':')[0]

  if (!localhost) {
    return (Constants.expoConfig?.extra as EasExtra).apiUrl
  }
  return `http://${localhost}:3000`
}

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */

export function TRPCProvider(props: { children: React.ReactNode }) {
  const { getToken } = useAuth()
  const [queryClient] = React.useState(() => new QueryClient())
  const [trpcClient] = React.useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getMobileBaseUrl()}/api/trpc`,
          async headers() {
            const headers = new Map<string, string>()
            headers.set('x-trpc-source', 'expo-react')
            const authToken = await getToken()
            if (authToken) headers.set('Authorization', authToken)
            return Object.fromEntries(headers)
          },
        }),
      ],
    }),
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  )
}
