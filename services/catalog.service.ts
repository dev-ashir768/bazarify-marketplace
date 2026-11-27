/**
 * Catalog data access. Pages and components call these functions only —
 * when the backend is ready, replace the mock reads with `apiClient` calls
 * and keep the signatures the same.
 */
import { cacheLife } from "next/cache";

import { banners, categories, products, reviews, stores } from "@/mocks/catalog";
import type {
  Category,
  Product,
  ProductWithStore,
  RatingBreakdown,
  Review,
  Store,
} from "@/types/catalog";

function withStore(product: Product): ProductWithStore {
  const store = stores.find((s) => s.id === product.storeId);
  if (!store) throw new Error(`Store ${product.storeId} not found for ${product.slug}`);
  return { ...product, store };
}

export async function getProducts(): Promise<ProductWithStore[]> {
  "use cache";
  cacheLife("minutes");
  return products.map(withStore);
}

export async function getProductBySlug(slug: string): Promise<ProductWithStore | null> {
  "use cache";
  cacheLife("minutes");
  const product = products.find((p) => p.slug === slug);
  return product ? withStore(product) : null;
}

export async function getRelatedProducts(productId: string): Promise<ProductWithStore[]> {
  "use cache";
  cacheLife("minutes");
  return products.filter((p) => p.id !== productId).map(withStore);
}

export async function searchProducts(query: string): Promise<ProductWithStore[]> {
  "use cache";
  cacheLife("minutes");
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return products.map(withStore).filter((product) => {
    const category = categories.find((c) => c.id === product.categoryId);
    const haystack = [product.name, product.store.name, category?.name ?? ""].join(" ").toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

export async function getStores(): Promise<Store[]> {
  "use cache";
  cacheLife("hours");
  return stores;
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  return categories;
}

export async function getHomeBanners() {
  "use cache";
  cacheLife("hours");
  return banners;
}

export async function getProductReviews(
  productId: string,
): Promise<{ reviews: Review[]; breakdown: RatingBreakdown }> {
  "use cache";
  cacheLife("minutes");
  return {
    reviews: reviews.filter((r) => r.productId === productId),
    breakdown: {
      average: 4.6,
      total: 214,
      distribution: { 5: 78, 4: 15, 3: 3, 2: 2, 1: 1 },
    },
  };
}
