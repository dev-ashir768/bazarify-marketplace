import { formatPrice, savings } from "@/lib/format";
import type { ProductWithStore } from "@/types/catalog";

import { AddToCartForm } from "./add-to-cart-form";
import { DiscountBadge } from "./badges";
import { PriceTag } from "./price-tag";
import { RatingStars } from "./rating-stars";

type ProductInfoProps = {
  product: ProductWithStore;
};

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-ink xl:text-base">{title}</h2>
      <div className="text-xs leading-relaxed text-ink-muted xl:text-sm">{children}</div>
    </section>
  );
}

export function ProductInfo({ product }: ProductInfoProps) {
  const saved = savings(product.price, product.compareAtPrice);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-ink xl:text-[34px] xl:leading-tight">{product.name}</h1>
        <p className="flex items-center gap-2 text-sm text-ink-muted">
          <RatingStars value={product.rating.average} className="text-lg" />
          <span className="font-bold text-ink">{product.rating.average}</span>
          <span>({product.rating.count})</span>
        </p>
        <p className="text-xs text-ink-muted xl:text-sm">
          Sold by: <span className="font-semibold text-ink">{product.store.name}</span>
        </p>
      </header>

      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
          <DiscountBadge price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold xl:text-sm">
          {saved > 0 && (
            <span className="rounded-full bg-success-soft px-3 py-1 text-success">You save {formatPrice(saved)}</span>
          )}
          <span className="rounded-full bg-surface px-3 py-1 text-ink">🔥 Total Sold {product.soldCount}</span>
        </div>
      </div>

      <AddToCartForm product={product} />

      <InfoBlock title="Description:">
        <p>{product.description}</p>
      </InfoBlock>

      {product.features.length > 0 && (
        <InfoBlock title="Product Features:">
          <ul className="list-disc space-y-1.5 pl-5">
            {product.features.map((feature) => (
              <li key={feature.text}>
                {feature.title && <strong className="text-ink">{feature.title}: </strong>}
                {feature.text}
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
