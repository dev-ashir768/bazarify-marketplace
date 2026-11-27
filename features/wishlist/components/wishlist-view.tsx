"use client";

import Link from "next/link";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { useCartStore } from "@/features/cart/cart-store";
import { useStoreHydrated } from "@/hooks/use-store-hydrated";
import { ProductGrid } from "@/features/product/components/product-grid";
import type { ProductWithStore } from "@/types/catalog";

import { useWishlistStore } from "../wishlist-store";

export function WishlistView({ products }: { products: ProductWithStore[] }) {
  const ids = useWishlistStore((state) => state.ids);
  const hydrated = useStoreHydrated(useWishlistStore);
  const addItem = useCartStore((state) => state.add);
  const saved = products.filter((p) => ids.includes(p.id));
  const available = saved.filter((p) => p.inStock);

  const addAllToCart = () => {
    for (const p of available) {
      addItem({
        productId: p.id,
        slug: p.slug,
        name: p.name,
        image: p.images[0]?.url ?? "",
        price: p.price,
        size: p.sizes?.[0],
        storeName: p.store.name,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink xl:text-[34px]">My Wishlist</h1>
          <p className="mt-1 text-sm text-ink-muted xl:text-base">
            {saved.length} Saved {saved.length === 1 ? "Item" : "Items"}
          </p>
        </div>
        {available.length > 0 && (
          <Button onClick={addAllToCart} className="h-11 gap-2 rounded-xl px-5 text-sm xl:h-[52px] xl:px-6 xl:text-base">
            <ShoppingCartIcon className="size-5" />
            Add all available to cart
          </Button>
        )}
      </div>

      {!hydrated ? (
        <div aria-busy="true" className="h-96 animate-pulse rounded-3xl bg-surface" />
      ) : saved.length > 0 ? (
        <ProductGrid products={saved} />
      ) : (
        <div className="grid place-items-center gap-4 rounded-3xl bg-surface px-6 py-20 text-center">
          <HeartIcon className="size-12 text-brand" strokeWidth={1.5} />
          <p className="text-lg font-semibold">No saved items yet</p>
          <p className="text-ink-muted">Tap the heart on any product to save it here.</p>
          <Link href={routes.home} className="inline-flex h-11 items-center rounded-xl bg-brand px-6 text-sm font-medium text-white">
            Browse Marketplace
          </Link>
        </div>
      )}
    </div>
  );
}
