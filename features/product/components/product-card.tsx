import Image from "next/image";
import Link from "next/link";

import { routes } from "@/config/routes";
import { WishlistButton } from "@/features/wishlist/components/wishlist-button";
import type { Product } from "@/types/catalog";

import { DiscountBadge, SavingsPill } from "./badges";
import { PriceTag } from "./price-tag";
import { RatingStars } from "./rating-stars";

type ProductCardProps = {
  product: Product;
  /** Set for above-the-fold cards so the image loads eagerly. */
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const image = product.images[0];

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[315/298] overflow-hidden rounded-2xl bg-surface xl:rounded-[20px]">
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, 48vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
        <DiscountBadge
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          className="absolute top-2.5 left-2.5 xl:top-3.5 xl:left-3"
        />
        <WishlistButton
          productId={product.id}
          productName={product.name}
          className="absolute top-2 right-2 z-10 xl:top-2"
        />
      </div>

      <div className="mt-3 flex flex-col gap-2 xl:mt-3.5 xl:gap-2.5">
        <h3 className="line-clamp-1 text-sm text-ink-muted xl:text-base 2xl:text-xl">
          <Link href={routes.product(product.slug)} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>

        <div className="flex items-center justify-between gap-2 text-xs text-ink-muted 2xl:text-[17px]">
          <span className="flex items-center gap-1.5 xl:gap-2">
            <RatingStars value={product.rating.average} className="text-sm 2xl:text-[23px]" />
            <span className="font-bold text-ink">{product.rating.average}</span>
            <span className="hidden 2xl:inline">({product.rating.count})</span>
          </span>
          <span className="shrink-0">🔥 {product.soldCount} sold</span>
        </div>

        <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} />
        <SavingsPill price={product.price} compareAtPrice={product.compareAtPrice} className="self-start" />
      </div>
    </article>
  );
}
