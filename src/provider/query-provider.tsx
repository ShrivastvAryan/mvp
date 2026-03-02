"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function QueryProvider({ children }: any) {
  const { logout } = useAuth();
  const [queryClient] = useState(() => {
    const handle401 = async (error: any) => {
      if (error?.status === 401 || error?.message === "Unauthorized") {
        try {
          await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
          });
          logout();
        } catch {
          // ignore logout failure
        }

        client.clear();

        // Prevent multiple redirects
        if (typeof window !== "undefined" && window.location.pathname !== "/login") {
          window.location.replace("/login?user=seller");
        }
      }
    };

    const client = new QueryClient({
      queryCache: new QueryCache({
        onError: handle401,
      }),
      mutationCache: new MutationCache({
        onError: handle401,
      }),
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}