"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCartIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

import { routes } from "@/config/routes";
import { useStoreHydrated } from "@/hooks/use-store-hydrated";
import {
  shippingSchema,
  type ShippingDetails,
  type ShippingFormInput,
} from "@/schemas/checkout.schema";

import { calculateTotals, useCartStore } from "../cart-store";
import { usePlaceOrder } from "../hooks/use-place-order";
import { OrderPanel } from "./order-panel";
import { ShippingForm } from "./shipping-form";

const emptyShipping: ShippingFormInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "" as ShippingFormInput["city"],
  address: "",
};

export function CheckoutView() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const hydrated = useStoreHydrated(useCartStore);
  const placeOrder = usePlaceOrder();

  const form = useForm<ShippingFormInput, unknown, ShippingDetails>({
    resolver: zodResolver(shippingSchema),
    defaultValues: emptyShipping,
    mode: "onTouched",
  });

  if (!hydrated) {
    return <div aria-busy="true" className="h-[600px] animate-pulse rounded-3xl bg-surface" />;
  }

  // Keep the empty state off while the success redirect is in flight.
  if (items.length === 0 && !placeOrder.isSuccess) {
    return (
      <div className="grid place-items-center gap-4 rounded-3xl bg-surface px-6 py-20 text-center">
        <ShoppingCartIcon className="size-12 text-brand" strokeWidth={1.5} />
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="text-ink-muted">Browse the marketplace and add something you love.</p>
        <Link href={routes.home} className="inline-flex h-11 items-center rounded-xl bg-brand px-6 text-sm font-medium text-white">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const onSubmit = form.handleSubmit((shipping) => {
    placeOrder.mutate(
      { items, shipping, paymentMethod: "cod" },
      { onSuccess: (order) => router.push(routes.checkoutSuccess(order.id)) },
    );
  });

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={onSubmit}
        className="grid items-start gap-8 lg:grid-cols-[minmax(0,780px)_minmax(0,850px)] lg:justify-between"
      >
        <ShippingForm />
        <div className="space-y-3">
          <OrderPanel
            items={items}
            totals={calculateTotals(items)}
            submitting={placeOrder.isPending || placeOrder.isSuccess}
          />
          {placeOrder.isError && (
            <p role="alert" className="text-sm text-sale">
              We couldn&apos;t place your order. Please try again.
            </p>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
