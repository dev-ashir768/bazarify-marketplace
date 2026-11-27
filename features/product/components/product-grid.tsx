import type { Product } from "@/types/catalog";

import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
  /** Number of leading cards to load eagerly. */
  priorityCount?: number;
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  priorityCount = 0,
  emptyMessage = "No products found.",
}: ProductGridProps) {
  if (products.length === 0) {
    return <p className="rounded-2xl bg-surface p-10 text-center text-ink-muted">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-9 xl:gap-y-11">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < priorityCount} />
      ))}
    </div>
  );
}
