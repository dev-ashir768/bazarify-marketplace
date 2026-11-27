import { QueryProvider } from "./query-provider";
import { StoreHydration } from "./store-hydration";

/** Root providers. Add auth session, toasts, etc. here so `app/layout.tsx` stays unchanged. */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <StoreHydration />
      {children}
    </QueryProvider>
  );
}
