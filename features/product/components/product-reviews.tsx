import { formatDate } from "@/lib/format";
import type { RatingBreakdown, Review } from "@/types/catalog";

import { RatingStars } from "./rating-stars";

type ProductReviewsProps = {
  reviews: Review[];
  breakdown: RatingBreakdown;
};

const stars = [5, 4, 3, 2, 1] as const;

const card = "rounded-2xl bg-surface 2xl:rounded-[20px]";
const greyButton =
  "h-11 rounded-xl bg-surface text-sm text-ink transition-colors hover:bg-brand/5 2xl:h-[66px] 2xl:rounded-[14px] 2xl:text-lg";

export function ProductReviews({ reviews, breakdown }: ProductReviewsProps) {
  const remaining = Math.max(0, breakdown.total - reviews.length);

  return (
    <section aria-labelledby="reviews-heading" className="space-y-5 2xl:space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 id="reviews-heading" className="text-xl font-semibold text-ink 2xl:text-[28px] 2xl:leading-tight">
            Customer Reviews
          </h2>
          <p className="mt-1 text-xs text-ink-muted 2xl:mt-2.5 2xl:text-base">
            What verified buyers say about this product.
          </p>
        </div>
        <button type="button" className={`${greyButton} shrink-0 px-5 2xl:w-59.5`}>
          Write a Review
        </button>
      </div>

      <div className={`${card} flex items-center gap-5 p-5 2xl:h-54.5 2xl:gap-4.5 2xl:px-7`}>
        <div className="w-24 shrink-0 text-center 2xl:w-26">
          <p className="font-price text-4xl font-bold text-ink 2xl:text-[56px] 2xl:leading-17.25">{breakdown.average}</p>
          <RatingStars value={breakdown.average} className="text-sm 2xl:text-base" />
          <p className="mt-2 text-xs text-ink-muted 2xl:mt-5 2xl:text-base">{breakdown.total} reviews</p>
        </div>
        <ul className="flex-1 space-y-2 2xl:space-y-5.5">
          {stars.map((star) => (
            <li key={star} className="flex items-center gap-2 text-xs text-ink-muted 2xl:text-base">
              <span className="w-7 shrink-0 2xl:w-8">
                {star} <span className="text-rating">★</span>
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-white 2xl:h-3.25">
                <span
                  className="block h-full rounded-full bg-rating"
                  style={{ width: `${breakdown.distribution[star]}%` }}
                />
              </span>
              <span className="w-9 shrink-0 text-right 2xl:w-12.5">{breakdown.distribution[star]}%</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="space-y-4 2xl:space-y-5">
        {reviews.map((review) => (
          <li key={review.id} className={`${card} p-5 2xl:min-h-54.5 2xl:px-7.5 2xl:pt-7 2xl:pb-2`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 2xl:gap-2.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-base font-semibold text-white 2xl:size-18.25 2xl:text-[28px]">
                  {review.author.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink 2xl:text-[22px]">{review.author}</p>
                  <p className="text-xs text-ink-muted 2xl:mt-1 2xl:text-base">{formatDate(review.createdAt)}</p>
                </div>
              </div>
              <RatingStars value={review.rating} className="text-sm 2xl:mt-2 2xl:text-base" />
            </div>
            <p className="mt-4 text-sm text-ink-muted 2xl:mt-6.5 2xl:max-w-162.75 2xl:pl-2 2xl:text-lg 2xl:leading-7.5">
              {review.body}
            </p>
          </li>
        ))}
      </ul>

      {remaining > 0 && (
        <button type="button" className={`${greyButton} w-full`}>
          Show more reviews ({Math.min(remaining, 10)} more)
        </button>
      )}
    </section>
  );
}
