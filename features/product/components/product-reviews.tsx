import { formatDate } from "@/lib/format";
import type { RatingBreakdown, Review } from "@/types/catalog";

import { RatingStars } from "./rating-stars";

type ProductReviewsProps = {
  reviews: Review[];
  breakdown: RatingBreakdown;
};

const stars = [5, 4, 3, 2, 1] as const;

export function ProductReviews({ reviews, breakdown }: ProductReviewsProps) {
  const remaining = Math.max(0, breakdown.total - reviews.length);

  return (
    <section aria-labelledby="reviews-heading" className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="reviews-heading" className="text-xl font-semibold text-ink xl:text-2xl">
            Customer Reviews
          </h2>
          <p className="text-xs text-ink-muted xl:text-sm">What verified buyers say about this product.</p>
        </div>
        <button
          type="button"
          className="h-10 shrink-0 rounded-xl bg-surface px-4 text-xs text-ink transition-colors hover:bg-surface/70 xl:px-6 xl:text-sm"
        >
          Write a Review
        </button>
      </div>

      <div className="flex items-center gap-6 rounded-3xl bg-surface p-5 xl:gap-10 xl:p-7">
        <div className="text-center">
          <p className="text-4xl font-bold text-ink xl:text-5xl">{breakdown.average}</p>
          <RatingStars value={breakdown.average} className="text-sm" />
          <p className="mt-1 text-xs text-ink-muted">{breakdown.total} reviews</p>
        </div>
        <ul className="flex-1 space-y-1.5">
          {stars.map((star) => (
            <li key={star} className="flex items-center gap-2 text-xs text-ink-muted">
              <span className="w-6">
                {star} <span className="text-rating">★</span>
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                <span
                  className="block h-full rounded-full bg-rating"
                  style={{ width: `${breakdown.distribution[star]}%` }}
                />
              </span>
              <span className="w-9 text-right">{breakdown.distribution[star]}%</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="rounded-3xl bg-surface p-5 xl:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
                  {review.author.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{review.author}</p>
                  <p className="text-xs text-ink-muted">{formatDate(review.createdAt)}</p>
                </div>
              </div>
              <RatingStars value={review.rating} className="text-sm" />
            </div>
            <p className="mt-4 text-sm text-ink-muted">{review.body}</p>
          </li>
        ))}
      </ul>

      {remaining > 0 && (
        <button
          type="button"
          className="h-11 w-full rounded-xl bg-surface text-sm text-ink transition-colors hover:bg-surface/70"
        >
          Show more reviews ({Math.min(remaining, 10)} more)
        </button>
      )}
    </section>
  );
}
