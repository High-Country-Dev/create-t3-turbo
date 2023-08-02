"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import PlausibleProvider from "next-plausible";
import superjson from "superjson";

import { removeProtocol } from "@acme/shared";

import { api } from "~/utils/api";
import { env } from "~/env.mjs";

export const getNextBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (env.NEXT_PUBLIC_URL) return env.NEXT_PUBLIC_URL; // SSR should use vercel url

  return `http://localhost:3000`; // dev SSR should use localhost
};

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  headers?: Headers;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        // unstable_httpBatchStreamLink({
        unstable_httpBatchStreamLink({
          url: `${getNextBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Map(props.headers);
            headers.set("x-trpc-source", "nextjs-react");
            return Object.fromEntries(headers);
          },
        }),
      ],
    }),
  );

  return (
    <PlausibleProvider
      domain={removeProtocol(env.NEXT_PUBLIC_URL)}
      enabled
      taggedEvents
      trackLocalhost={env.NEXT_PUBLIC_URL.includes("localhost")}
    >
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryStreamedHydration transformer={superjson}>
            {props.children}
          </ReactQueryStreamedHydration>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </api.Provider>
    </PlausibleProvider>
  );
}
