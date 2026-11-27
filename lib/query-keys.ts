/**
 * Query key factory — every TanStack Query key comes from here so
 * invalidation stays consistent once the API is connected.
 */
export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (filters: Record<string, unknown> = {}) => ["products", "list", filters] as const,
    detail: (slug: string) => ["products", "detail", slug] as const,
  },
  orders: {
    all: ["orders"] as const,
    detail: (id: string) => ["orders", "detail", id] as const,
  },
} as const;
