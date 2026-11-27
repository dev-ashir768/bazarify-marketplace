"use client";

import { useEffect } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";

import { getQueryClient } from "@/lib/query-client";

/**
 * Mounts TanStack Query Devtools in their own React root after hydration (development only).
 * Keeping them out of the app tree stops them from blocking Next 16
 * instant-navigation validation of the root layout.
 */
function useQueryDevtools(client: QueryClient) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([import("react-dom/client"), import("@tanstack/react-query-devtools")])
      .then(([{ createRoot }, { ReactQueryDevtools }]) => {
        if (cancelled) return;

        const host = document.createElement("div");
        host.dataset.queryDevtools = "";
        document.body.appendChild(host);
        const root = createRoot(host);
        root.render(<ReactQueryDevtools client={client} initialIsOpen={false} buttonPosition="bottom-right" />);

        const dispose = () => {
          root.unmount();
          host.remove();
        };

        // Unmount may have raced between the cancelled check and mount — tear down immediately.
        if (cancelled) {
          dispose();
          return;
        }

        cleanup = dispose;
      })
      .catch(() => {
        // Dynamic import failed or was abandoned; nothing mounted.
      });

    return () => {
      cancelled = true;
      cleanup?.();
      cleanup = undefined;
    };
  }, [client]);
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  useQueryDevtools(queryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
