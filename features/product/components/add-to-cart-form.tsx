"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { useCartStore } from "@/features/cart/cart-store";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { cn } from "@/lib/utils";
import type { ProductWithStore } from "@/types/catalog";

type AddToCartFormProps = {
  product: ProductWithStore;
};

export function AddToCartForm({ product }: AddToCartFormProps) {
  const router = useRouter();
  const [size, setSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.add);

  const addToCart = () => {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0]?.url ?? "",
        price: product.price,
        size,
        storeName: product.store.name,
      },
      quantity,
    );
    router.push(routes.cart);
  };

  return (
    <div className="space-y-5 2xl:space-y-[30px]">
      {product.sizes && product.sizes.length > 0 && (
        <fieldset>
          <legend className="mb-3 text-xs text-ink-muted uppercase 2xl:mb-[13px] 2xl:text-sm">Size:</legend>
          <div className="flex flex-wrap gap-2.5">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                onClick={() => setSize(option)}
                className={cn(
                  "h-10 rounded-full border border-transparent bg-surface px-4 text-xs text-ink uppercase transition-colors hover:border-brand/40 2xl:h-[53px] 2xl:min-w-[154px] 2xl:px-5 2xl:text-base",
                  size === option && "border-brand text-brand",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex items-center gap-3 2xl:gap-[15px]">
        <QuantityStepper value={quantity} onChange={setQuantity} size="lg" />
        <Button
          type="button"
          onClick={addToCart}
          disabled={!product.inStock}
          className="h-12 flex-1 gap-2.5 rounded-xl text-sm sm:max-w-[457px] 2xl:h-[66px] 2xl:rounded-[14px] 2xl:text-lg"
        >
          <ShoppingCartIcon className="size-5" />
          Add to Cart
        </Button>
      </div>

      <p className="text-sm text-ink-muted 2xl:text-lg">
        Availability:{" "}
        <span className={cn("font-semibold", product.inStock ? "text-ink" : "text-sale")}>
          {product.inStock ? "In stock" : "Out of stock"}
        </span>
      </p>
    </div>
  );
}
