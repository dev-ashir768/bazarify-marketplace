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
    <div className="space-y-5">
      {product.sizes && product.sizes.length > 0 && (
        <fieldset>
          <legend className="mb-2.5 text-xs text-ink-muted uppercase xl:text-sm">Size:</legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                onClick={() => setSize(option)}
                className={cn(
                  "h-9 rounded-full border border-transparent bg-surface px-4 text-xs text-ink transition-colors xl:h-10 xl:text-sm",
                  size === option && "border-brand bg-white text-brand",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <Button
          type="button"
          onClick={addToCart}
          disabled={!product.inStock}
          className="h-11 flex-1 gap-2 rounded-xl text-sm sm:max-w-[290px] xl:h-12 xl:text-base"
        >
          <ShoppingCartIcon className="size-5" />
          Add to Cart
        </Button>
      </div>

      <p className="text-sm">
        Availability:{" "}
        <span className={cn("font-semibold", product.inStock ? "text-ink" : "text-sale")}>
          {product.inStock ? "In stock" : "Out of stock"}
        </span>
      </p>
    </div>
  );
}
