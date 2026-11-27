import type { ProductWithStore } from "@/types/catalog";

import { AddToCartForm } from "./add-to-cart-form";
import { DiscountBadge, SavingsPill } from "./badges";
import { PriceTag } from "./price-tag";
import { RatingStars } from "./rating-stars";

type ProductInfoProps = {
  product: ProductWithStore;
};

/** Figma: 22px semibold headings, 18px/30px muted body copy. */
function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2 2xl:space-y-[10px]">
      <h2 className="text-base font-semibold text-ink 2xl:text-[22px]">{title}</h2>
      <div className="text-sm leading-relaxed text-ink-muted 2xl:text-lg 2xl:leading-[30px]">{children}</div>
    </section>
  );
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-6 2xl:space-y-[26px]">
      <header>
        <h1 className="text-2xl font-semibold text-ink 2xl:text-[32px] 2xl:leading-10">{product.name}</h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted 2xl:mt-[17px] 2xl:text-base">
          <RatingStars value={product.rating.average} className="text-lg 2xl:text-[22px]" />
          <span className="font-bold text-ink">{product.rating.average}</span>
          <span>({product.rating.count})</span>
        </p>
        <p className="mt-2 text-xs text-ink-muted 2xl:mt-[14px] 2xl:text-base">
          Sold by: <span className="font-semibold text-ink">{product.store.name}</span>
        </p>
      </header>

      <div>
        <div className="flex flex-wrap items-center gap-3 2xl:gap-4">
          <PriceTag
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            size="lg"
            className="2xl:[&>span:first-child]:text-[44px] 2xl:[&>span:last-child]:text-[22px]"
          />
          <DiscountBadge price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2.5 2xl:mt-4">
          <SavingsPill price={product.price} compareAtPrice={product.compareAtPrice} />
          <span className="inline-flex h-7 items-center rounded-full bg-surface px-3.5 text-xs font-semibold text-ink 2xl:h-8 2xl:text-base">
            🔥 Total Sold {product.soldCount}
          </span>
        </div>
      </div>

      <AddToCartForm product={product} />

      <InfoBlock title="Description:">
        <p>{product.description}</p>
      </InfoBlock>

      {product.features.length > 0 && (
        <InfoBlock title="Product Features:">
          <ul className="space-y-1.5 2xl:space-y-[10px]">
            {product.features.map((feature) => (
              <li key={feature.text} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ink 2xl:size-2" />
                <span>
                  {feature.title && <strong className="font-semibold text-ink">{feature.title}: </strong>}
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </InfoBlock>
      )}

      {product.careInstructions && (
        <InfoBlock title="Care Instructions:">
          <p>{product.careInstructions}</p>
        </InfoBlock>
      )}

      {product.disclaimer && (
        <InfoBlock title="Disclaimer:">
          <p>{product.disclaimer}</p>
        </InfoBlock>
      )}
    </div>
  );
}
