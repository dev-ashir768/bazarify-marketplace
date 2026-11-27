import { discountPercent, formatPrice, savings } from "@/lib/format";
import { cn } from "@/lib/utils";

type PriceProps = { price: number; compareAtPrice?: number; className?: string };

/** Pink "-12%" pill. Renders nothing when there is no discount. */
export function DiscountBadge({ price, compareAtPrice, className }: PriceProps) {
  const percent = discountPercent(price, compareAtPrice);
  if (!percent) return null;
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full bg-sale-soft px-3 text-xs font-semibold text-sale 2xl:h-8 2xl:text-base",
        className,
      )}
    >
      -{percent}%
    </span>
  );
}

/** Green "You save Rs. 440" pill, calculated from the prices. */
export function SavingsPill({ price, compareAtPrice, className }: PriceProps) {
  const amount = savings(price, compareAtPrice);
  if (!amount) return null;
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full bg-success-soft px-3.5 text-xs font-semibold text-success 2xl:h-8 2xl:text-base",
        className,
      )}
    >
      You save {formatPrice(amount)}
    </span>
  );
}
