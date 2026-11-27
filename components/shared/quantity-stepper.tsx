"use client";

import { MinusIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantityStepperProps) {
  const btn = cn(
    "grid place-items-center rounded-lg transition-colors hover:bg-white disabled:opacity-40",
    { sm: "size-7", md: "size-9", lg: "size-9 2xl:size-[43px] rounded-full" }[size],
  );
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl bg-surface p-1",
        { sm: "h-9", md: "h-11 xl:h-12", lg: "h-12 gap-2 px-2 2xl:h-[66px] 2xl:px-3" }[size],
        className,
      )}
    >
      <button type="button" aria-label="Decrease quantity" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)}>
        <MinusIcon className="size-4" />
      </button>
      <output aria-live="polite" className={cn("min-w-6 text-center text-sm font-medium", size === "lg" && "2xl:text-lg")}>
        {value}
      </output>
      <button type="button" aria-label="Increase quantity" className={btn} disabled={value >= max} onClick={() => onChange(value + 1)}>
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
