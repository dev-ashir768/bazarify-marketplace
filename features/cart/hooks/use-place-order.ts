"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";
import { placeOrder } from "@/services/order.service";

import { useCartStore } from "../cart-store";

export function usePlaceOrder() {
  const queryClient = useQueryClient();
  const clearCart = useCartStore((state) => state.clear);

  return useMutation({
    mutationKey: ["orders", "place"],
    mutationFn: placeOrder,
    onSuccess: () => {
      clearCart();
      void queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}
