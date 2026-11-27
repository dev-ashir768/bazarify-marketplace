import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { routes } from "@/config/routes";

export const metadata: Metadata = { title: "Order placed" };

async function OrderId({ searchParams }: Pick<PageProps<"/checkout/success">, "searchParams">) {
  const { order } = await searchParams;
  const id = typeof order === "string" ? order : null;
  if (!id) return null;
  return <p className="font-semibold text-ink">Your ID is: #{id}</p>;
}

export default function CheckoutSuccessPage({ searchParams }: PageProps<"/checkout/success">) {
  return (
    <div className="container-page py-10 xl:py-20">
      <section className="relative mx-auto max-w-[1470px] overflow-hidden rounded-[28px] bg-surface px-6 py-16 text-center xl:py-24">
        <Fireworks className="absolute -top-2 -right-4 hidden size-40 md:block" />
        <Fireworks className="absolute top-16 -left-10 hidden size-40 md:block" />

        <div className="relative mx-auto max-w-xl space-y-5">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#55b685] text-white xl:size-[98px]">
            <CheckIcon className="size-10 xl:size-12" strokeWidth={3} />
          </span>
          <h1 className="text-2xl font-bold text-ink xl:text-3xl">Thank you for your purchase!</h1>
          <p className="text-ink-muted">
            Your order has been received. You will receive an order confirmation email with details of your order.
          </p>
          <Suspense fallback={<p className="text-ink-muted">Loading order…</p>}>
            <OrderId searchParams={searchParams} />
          </Suspense>
          <Link
            href={routes.home}
            className="inline-flex h-11 items-center rounded-xl bg-brand px-7 text-sm font-medium text-white transition-colors hover:bg-brand/90"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}

function Fireworks({ className }: { className?: string }) {
  const rays = Array.from({ length: 14 }, (_, i) => (i * 360) / 14);
  return (
    <svg viewBox="-60 -60 120 120" aria-hidden className={className}>
      {rays.map((angle, i) => (
        <line
          key={angle}
          x1="0"
          y1={-14}
          x2="0"
          y2={i % 2 ? -44 : -54}
          transform={`rotate(${angle})`}
          stroke={i % 3 ? "#532093" : "#b9a3dc"}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
