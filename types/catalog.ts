export type Store = {
  id: string;
  slug: string;
  name: string;
  itemCount: number;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  itemCount: number;
};

export type ProductImage = {
  url: string;
  alt: string;
};

export type ProductRating = {
  average: number;
  count: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Current selling price in PKR. */
  price: number;
  /** Original price in PKR, before discount. Omitted when not discounted. */
  compareAtPrice?: number;
  images: ProductImage[];
  rating: ProductRating;
  soldCount: number;
  storeId: string;
  categoryId: string;
  sizes?: string[];
  inStock: boolean;
  description: string;
  features: { title?: string; text: string }[];
  careInstructions?: string;
  disclaimer?: string;
};

/** Product joined with its store — what most UI needs. */
export type ProductWithStore = Product & { store: Store };

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  body: string;
  createdAt: string;
};

export type RatingBreakdown = {
  average: number;
  total: number;
  /** Percentage of reviews per star, keyed 1–5. */
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

export type Banner = {
  id: string;
  image: string;
  alt: string;
  href: string;
};
