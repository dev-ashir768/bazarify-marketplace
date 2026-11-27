"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type WishlistState = {
  /** Product ids only; product data comes from the catalog. */
  ids: string[];
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (productId) =>
        set((state) => ({
          ids: state.ids.includes(productId)
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        })),
      remove: (productId) => set((state) => ({ ids: state.ids.filter((id) => id !== productId) })),
    }),
    {
      name: "bazarify:wishlist",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ ids: state.ids }),
      skipHydration: true,
    },
  ),
);
