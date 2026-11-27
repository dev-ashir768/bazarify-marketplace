"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { siteConfig } from "@/config/site";
import type { CartItem, OrderTotals } from "@/types/order";

export const cartKey = (productId: string, size?: string) =>
  size ? `${productId}:${size}` : productId;

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "key" | "quantity">, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

/**
 * Cart lives in localStorage until users can log in; then swap `persist`
 * for server sync. `skipHydration` keeps SSR and the first client render
 * identical — `StoreHydration` rehydrates after mount.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item, quantity = 1) =>
        set((state) => {
          const key = cartKey(item.productId, item.size);
          const existing = state.items.find((i) => i.key === key);
          return {
            items: existing
              ? state.items.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i))
              : [...state.items, { ...item, key, quantity }],
          };
        }),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.key === key ? { ...i, quantity: Math.max(1, quantity) } : i)),
        })),
      remove: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "bazarify:cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    },
  ),
);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export function calculateTotals(items: CartItem[]): OrderTotals {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = 0;
  const tax = Math.round(subtotal * siteConfig.taxRate);
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}
