import type { Metadata } from "next";

import { CheckoutView } from "@/features/cart/components/checkout-view";

export const metadata: Metadata = { title: "My Cart" };

export default function CartPage() {
  return (
    <div className="container py-8 xl:py-12">
      <CheckoutView />
    </div>
  );
}
