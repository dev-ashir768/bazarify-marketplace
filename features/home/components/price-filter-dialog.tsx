"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type PriceSort = "relevance" | "price-asc" | "price-desc";
export type PriceFilter = { min?: number; max?: number; sort: PriceSort };

export const defaultPriceFilter: PriceFilter = { sort: "relevance" };

const sortOptions: { value: PriceSort; label: string }[] = [
  { value: "relevance", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

type PriceFilterDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: PriceFilter;
  onApply: (value: PriceFilter) => void;
};

const toNumber = (v: string) => (v.trim() === "" ? undefined : Math.max(0, Number(v)));

export function PriceFilterDialog({ open, onOpenChange, value, onApply }: PriceFilterDialogProps) {
  const [draft, setDraft] = useState(value);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setDraft(value);
        onOpenChange(next);
      }}
    >
      <DialogContent className="gap-5 rounded-[28px] p-5 sm:max-w-[460px] xl:p-6">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-xl font-bold xl:text-2xl">Price</DialogTitle>
          <DialogDescription className="text-ink-muted">Sort and set a price range.</DialogDescription>
        </DialogHeader>

        <fieldset className="space-y-2">
          <legend className="mb-2 text-sm font-semibold">Sort by</legend>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={draft.sort === option.value}
              onClick={() => setDraft((d) => ({ ...d, sort: option.value }))}
              className={cn(
                "w-full rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-surface",
                draft.sort === option.value && "bg-surface font-semibold text-brand",
              )}
            >
              {option.label}
            </button>
          ))}
        </fieldset>

        <fieldset className="grid grid-cols-2 gap-3">
          <legend className="mb-2 text-sm font-semibold">Range (Rs.)</legend>
          {(["min", "max"] as const).map((field) => (
            <label key={field} className="text-xs text-ink-muted">
              {field === "min" ? "Min" : "Max"}
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={draft[field] ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, [field]: toNumber(e.target.value) }))}
                className="mt-1 h-11 w-full rounded-xl border border-input px-3 text-sm text-ink outline-none focus-visible:border-brand"
              />
            </label>
          ))}
        </fieldset>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="h-11 flex-1 rounded-full"
            onClick={() => setDraft(defaultPriceFilter)}
          >
            Reset
          </Button>
          <Button
            className="h-11 flex-1 rounded-full"
            onClick={() => {
              onApply(draft);
              onOpenChange(false);
            }}
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
