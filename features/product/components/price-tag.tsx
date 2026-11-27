import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

type PriceTagProps = {
  price: number;
  compareAtPrice?: number;
  size?: "md" | "lg";
  className?: string;
};

export function PriceTag({ price, compareAtPrice, size = "md", className }: PriceTagProps) {
  const showCompare = compareAtPrice !== undefined && compareAtPrice > price;
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2.5 font-price", className)}>
      <span
        className={cn(
          "font-extrabold text-ink",
          size === "md" ? "text-lg 2xl:text-2xl" : "text-2xl xl:text-[34px]",
        )}
      >
        {formatPrice(price)}
      </span>
      {showCompare && (
        <span
          className={cn("text-ink-muted line-through", size === "md" ? "text-xs 2xl:text-base" : "text-base xl:text-xl")}
        >
          <span className="sr-only">Original price </span>
          {formatPrice(compareAtPrice)}
        </span>
      )}
    </p>
  );
}
