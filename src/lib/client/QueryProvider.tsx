'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GraphQLClient } from 'graphql-request'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: async ({ queryKey }) => {
              // Create the GraphQLClient instance inside the queryFn
              // using the reliable public environment variable.
              const client = new GraphQLClient(
                `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`,
              )
              const [query, variables] = queryKey as [string, object]
              return client.request(query, variables)
            },
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
