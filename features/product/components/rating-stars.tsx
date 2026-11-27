import { cn } from "@/lib/utils";

type RatingStarsProps = {
  value: number;
  className?: string;
};

/** Five text stars, filled up to the rounded-down rating (Figma uses ★ glyphs). */
export function RatingStars({ value, className }: RatingStarsProps) {
  const filled = Math.floor(value);
  return (
    <span
      role="img"
      aria-label={`Rated ${value} out of 5`}
      className={cn("font-price leading-none tracking-tight", className)}
    >
      <span className="text-rating">{"★".repeat(filled)}</span>
      <span className="text-rating-empty">{"★".repeat(5 - filled)}</span>
    </span>
  );
}
