"use client";

import Image from "next/image";
import Link from "next/link";
import { PackageIcon, Trash2Icon, TruckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/format";
import type { CartItem, OrderTotals } from "@/types/order";

import { useCartStore } from "../cart-store";

type OrderPanelProps = {
  items: CartItem[];
  totals: OrderTotals;
  submitting: boolean;
};

/** Groups cart lines by store, since each seller ships separately. */
function groupByStore(items: CartItem[]) {
  const groups = new Map<string, CartItem[]>();
  for (const item of items) groups.set(item.storeName, [...(groups.get(item.storeName) ?? []), item]);
  return [...groups.entries()];
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm xl:text-base">
      <dt className={strong ? "font-semibold text-ink" : "text-ink-muted"}>{label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  );
}

export function OrderPanel({ items, totals, submitting }: OrderPanelProps) {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const remove = useCartStore((state) => state.remove);

  return (
    <aside aria-labelledby="order-heading" className="space-y-5 rounded-3xl bg-surface p-4 xl:rounded-[28px] xl:p-6">
      <h2 id="order-heading" className="text-lg font-semibold text-ink xl:text-xl">
        Your Order
      </h2>

      {groupByStore(items).map(([storeName, lines]) => (
        <div key={storeName} className="space-y-4 rounded-2xl bg-white p-4 xl:p-5">
          <ul className="space-y-4">
            {lines.map((item) => (
              <li key={item.key} className="flex gap-3">
                <Link href={routes.product(item.slug)} className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-surface">
                  <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                </Link>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-ink xl:text-base">{item.name}</p>
                      {item.size && <p className="text-xs text-ink-muted xl:text-sm">Size: {item.size}</p>}
                    </div>
                    <p className="shrink-0 text-sm font-bold text-ink xl:text-lg">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <QuantityStepper
                      size="sm"
                      value={item.quantity}
                      onChange={(quantity) => setQuantity(item.key, quantity)}
                    />
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => remove(item.key)}
                      className="grid size-8 place-items-center rounded-lg text-sale hover:bg-sale-soft"
                    >
                      <Trash2Icon className="size-[18px]" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-2 border-t pt-4 text-xs text-ink-muted xl:text-sm">
            <p className="font-semibold text-brand">Sold by {storeName}</p>
            <p className="flex items-center gap-2">
              <PackageIcon className="size-4" /> Delivered by: <strong className="text-ink">PostEx</strong>
            </p>
            <p className="flex items-center gap-2">
              <TruckIcon className="size-4" /> Expected Delivery: <strong className="text-ink">2–4 working days</strong>
            </p>
          </div>
        </div>
      ))}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-ink xl:text-xl">Order Summary</h3>
        <dl className="space-y-3.5">
          <SummaryRow label="Sub Total:" value={formatPrice(totals.subtotal)} />
          <SummaryRow label="Shipping:" value={totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)} />
          <SummaryRow label={`Tax (Estimated ${siteConfig.taxRate * 100}%)`} value={formatPrice(totals.tax)} />
          <div className="border-t pt-3.5">
            <SummaryRow label="Total" value={formatPrice(totals.total)} strong />
          </div>
        </dl>
      </div>

      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm font-semibold text-ink">Payment Method</legend>
        <label className="flex items-center gap-2 text-xs text-ink-muted xl:text-sm">
          <input type="radio" name="paymentMethod" value="cod" defaultChecked className="size-4 accent-brand" />
          Cash on Delivery
        </label>
      </fieldset>

      <Button type="submit" disabled={submitting} className="h-12 w-full rounded-xl text-base xl:h-[52px]">
        {submitting ? "Placing order…" : "Proceed to Checkout"}
      </Button>
    </aside>
  );
}
