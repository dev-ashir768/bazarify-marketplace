"use client";

import { useMemo, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { ProductGrid } from "@/features/product/components/product-grid";
import { cn } from "@/lib/utils";
import type { Category, ProductWithStore, Store } from "@/types/catalog";

import { PickerDialog } from "./picker-dialog";
import { defaultPriceFilter, PriceFilterDialog, type PriceFilter } from "./price-filter-dialog";

type BrowseMode = "product" | "store";
type OpenDialog = "picker" | "price" | null;

type MarketplaceSectionProps = {
  products: ProductWithStore[];
  stores: Store[];
  categories: Category[];
  pageSize?: number;
};

const pillClass =
  "flex h-10 items-center gap-2 rounded-full bg-surface px-4 text-xs text-ink transition-colors hover:bg-surface/70 xl:h-12 xl:px-6 xl:text-base";

export function MarketplaceSection({ products, stores, categories, pageSize = 15 }: MarketplaceSectionProps) {
  const [mode, setMode] = useState<BrowseMode>("product");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [price, setPrice] = useState<PriceFilter>(defaultPriceFilter);
  const [dialog, setDialog] = useState<OpenDialog>(null);
  const [visible, setVisible] = useState(pageSize);

  const results = useMemo(() => {
    const list = products.filter(
      (p) =>
        (mode === "product" ? !categoryId || p.categoryId === categoryId : !storeId || p.storeId === storeId) &&
        (price.min === undefined || p.price >= price.min) &&
        (price.max === undefined || p.price <= price.max),
    );
    if (price.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (price.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, mode, categoryId, storeId, price]);

  const selectedName =
    mode === "product"
      ? categories.find((c) => c.id === categoryId)?.name
      : stores.find((s) => s.id === storeId)?.name;

  const browseLabel =
    selectedName ?? (mode === "product" ? `Browse all ${categories.length} Categories` : `Browse all ${stores.length} Stores`);

  const priceActive = price.sort !== "relevance" || price.min !== undefined || price.max !== undefined;

  return (
    <section aria-labelledby="marketplace-heading" className="space-y-6 xl:space-y-9">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 id="marketplace-heading" className="text-2xl font-semibold text-ink xl:text-[34px]">
          Marketplace
        </h2>

        <div className="flex flex-wrap items-center gap-2 xl:gap-3">
          <div role="tablist" aria-label="Browse by" className="flex rounded-full bg-surface p-1">
            {(["product", "store"] as const).map((value) => (
              <button
                key={value}
                role="tab"
                type="button"
                aria-selected={mode === value}
                onClick={() => {
                  setMode(value);
                  setVisible(pageSize);
                }}
                className={cn(
                  "h-8 rounded-full px-3 text-xs text-ink transition-colors xl:h-10 xl:px-5 xl:text-base",
                  mode === value && "bg-white text-brand shadow-sm",
                )}
              >
                {value === "product" ? "Product Wise" : "Store Wise"}
              </button>
            ))}
          </div>

          <button type="button" className={cn(pillClass, "text-brand")} onClick={() => setDialog("picker")}>
            {browseLabel}
            <ChevronDownIcon className="size-4" />
          </button>

          <button
            type="button"
            className={cn(pillClass, priceActive && "text-brand")}
            onClick={() => setDialog("price")}
          >
            Price
            <ChevronDownIcon className="size-4" />
          </button>
        </div>
      </div>

      <ProductGrid
        products={results.slice(0, visible)}
        priorityCount={5}
        emptyMessage="No products match these filters."
      />

      {visible < results.length && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setVisible((v) => v + pageSize)}
            className="h-12 rounded-2xl bg-surface px-16 text-sm text-ink transition-colors hover:bg-surface/70 xl:h-[60px] xl:px-24 xl:text-lg"
          >
            View More
          </button>
        </div>
      )}

      {mode === "product" ? (
        <PickerDialog
          open={dialog === "picker"}
          onOpenChange={(open) => setDialog(open ? "picker" : null)}
          title="Select Category"
          description={`We have almost ${categories.length}+ categories`}
          searchPlaceholder="Search categories..."
          allLabel="All Categories"
          options={categories}
          selectedId={categoryId}
          onSelect={(id) => {
            setCategoryId(id);
            setVisible(pageSize);
          }}
        />
      ) : (
        <PickerDialog
          open={dialog === "picker"}
          onOpenChange={(open) => setDialog(open ? "picker" : null)}
          title="Select store"
          description={`We have almost ${stores.length}+ store`}
          searchPlaceholder="Search stores..."
          allLabel="All Stores"
          options={stores}
          selectedId={storeId}
          onSelect={(id) => {
            setStoreId(id);
            setVisible(pageSize);
          }}
        />
      )}

      <PriceFilterDialog
        open={dialog === "price"}
        onOpenChange={(open) => setDialog(open ? "price" : null)}
        value={price}
        onApply={(value) => {
          setPrice(value);
          setVisible(pageSize);
        }}
      />
    </section>
  );
}
