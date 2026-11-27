"use client";

import { HeartIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { useWishlistStore } from "../wishlist-store";

type WishlistButtonProps = {
  productId: string;
  productName: string;
  className?: string;
};

export function WishlistButton({ productId, productName, className }: WishlistButtonProps) {
  const saved = useWishlistStore((state) => state.ids.includes(productId));
  const toggle = useWishlistStore((state) => state.toggle);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      onClick={(event) => {
        // The button sits inside a card link — don't navigate.
        event.preventDefault();
        event.stopPropagation();
        toggle(productId);
      }}
      className={cn(
        "grid size-9 place-items-center rounded-full bg-white text-ink shadow-sm transition-transform hover:scale-105 xl:size-[46px]",
        className,
      )}
    >
      <HeartIcon
        className={cn("size-[18px] xl:size-6", saved && "fill-sale text-sale")}
        strokeWidth={1.75}
      />
    </button>
  );
}
