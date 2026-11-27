const pkr = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });

/** 3959 → "Rs. 3,959" */
export function formatPrice(amount: number): string {
  return `Rs. ${pkr.format(amount)}`;
}

/** Whole-number discount percentage, or 0 when there is no discount. */
export function discountPercent(price: number, compareAtPrice?: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function savings(price: number, compareAtPrice?: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return compareAtPrice - price;
}

const dateFormat = new Intl.DateTimeFormat("en-PK", { day: "numeric", month: "short", year: "numeric" });

/** "2026-11-23" → "23 Nov 2026" */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso));
}
