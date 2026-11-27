"use client";

import { useEffect } from "react";

import { useCartStore } from "@/features/cart/cart-store";
import { useWishlistStore } from "@/features/wishlist/wishlist-store";

/** Loads persisted zustand stores after mount (stores use `skipHydration`). */
export function StoreHydration() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useWishlistStore.persist.rehydrate();
  }, []);
  return null;
}
