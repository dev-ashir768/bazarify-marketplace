/**
 * Temporary mock data taken from the Figma design (Bazarify V3).
 * Only `services/*` may import from here — swap those for real API calls later.
 */
import type { Banner, Category, Product, Review, Store } from "@/types/catalog";

export const stores: Store[] = [
  { id: "st_1", slug: "cotton-dimples", name: "Cotton Dimples", itemCount: 55 },
  { id: "st_2", slug: "jazb-store", name: "Jazb Store", itemCount: 85 },
  { id: "st_3", slug: "noorynazar", name: "Noorynazar", itemCount: 105 },
  { id: "st_4", slug: "the-artisan-gallery", name: "The Artisan Gallery", itemCount: 70 },
  { id: "st_5", slug: "medshop-pakistan", name: "Medshop Pakistan", itemCount: 50 },
  { id: "st_6", slug: "baby-heaven", name: "Baby Heaven", itemCount: 60 },
  { id: "st_7", slug: "shenora-herbal", name: "Shenora Herbal", itemCount: 130 },
  { id: "st_8", slug: "orvana-organics", name: "Orvana Organics", itemCount: 150 },
];

export const categories: Category[] = [
  { id: "ct_1", slug: "fashion", name: "Fashion", itemCount: 150 },
  { id: "ct_2", slug: "beauty", name: "Beauty", itemCount: 130 },
  { id: "ct_3", slug: "electronics", name: "Electronics", itemCount: 105 },
  { id: "ct_4", slug: "jewelry", name: "Jewelry", itemCount: 85 },
  { id: "ct_5", slug: "footwear", name: "Footwear", itemCount: 70 },
  { id: "ct_6", slug: "bags-and-gear", name: "Bags and Gear", itemCount: 60 },
  { id: "ct_7", slug: "kids-and-toys", name: "Kids & Toys", itemCount: 55 },
  { id: "ct_8", slug: "health", name: "Health", itemCount: 50 },
];

export const banners: { hero: Banner[]; side: [Banner[], Banner[]] } = {
  // Only one hero image exists in Figma; the others repeat it until real banners come from the API.
  hero: [
    { id: "bn_hero_1", image: "/images/banners/ayesha-collection.jpg", alt: "Ayesha Collection — Everyday elegance, for every you", href: "#" },
    { id: "bn_hero_2", image: "/images/banners/ayesha-collection.jpg", alt: "Ayesha Collection — New arrivals", href: "#" },
    { id: "bn_hero_3", image: "/images/banners/ayesha-collection.jpg", alt: "Ayesha Collection — Festive edit", href: "#" },
  ],
  side: [
    // Top and bottom carousels. Figma has one image each, so they swap until real banners come from the API.
    [
      { id: "bn_jersey", image: "/images/banners/jersey.jpg", alt: "The Jersey collection", href: "#" },
      { id: "bn_beat_2", image: "/images/banners/feel-every-beat.jpg", alt: "Feel every beat — new drop", href: "#" },
    ],
    [
      { id: "bn_beat", image: "/images/banners/feel-every-beat.jpg", alt: "Feel every beat — powerful dynamic drivers", href: "#" },
      { id: "bn_jersey_2", image: "/images/banners/jersey.jpg", alt: "The Jersey collection — match day", href: "#" },
    ],
  ],
};

const defaultDescription =
  "Carefully sourced from a verified Bazarify seller. Every order is checked before dispatch and delivered to your doorstep.";

type Seed = Omit<Product, "id" | "images" | "inStock" | "description" | "features"> &
  Partial<Pick<Product, "description" | "features">>;

const seeds: Seed[] = [
  {
    slug: "matilda-pinafore-set", name: "Matilda - Pinafore Set", price: 3959, compareAtPrice: 4399,
    rating: { average: 4.6, count: 214 }, soldCount: 67, storeId: "st_1", categoryId: "ct_7",
    sizes: ["0-3 Months", "3-6 Months", "6-9 Months"],
    description:
      "A charming outfit for your little girl, featuring a classic red and blue tartan flannel suspender skirt paired with a soft blue floral-print jersey top. A perfect combination of timeless checks and playful details for a stylish everyday look.",
    features: [
      { title: "2-Piece Set", text: "Flannel suspender skirt and full-sleeve jersey top" },
      { title: "Skirt Fabric", text: "Soft flannel in a classic red, blue and cream tartan check" },
      { title: "Top Fabric", text: "Comfortable all-over printed (AOP) jersey with delicate white daisy motifs" },
      { text: "Adorable ruffled shoulder detailing" },
      { text: "Round neckline with back snap-button opening for easy dressing" },
      { text: "Pleated flannel skirt with crossed suspender straps" },
      { text: "Button detailing on the suspender straps" },
      { text: "Comfortable fit for easy movement" },
      { text: "Ideal for casual outings, playdates and family gatherings" },
    ],
    careInstructions: "Machine wash cold. Wash with similar colors. Do not bleach. Tumble dry low.",
    disclaimer:
      "AI-generated images are for illustrative purposes only. Please refer to the flat lay product image for accurate color, print and design details. Colors may vary slightly due to screen settings and lighting differences.",
  },
  { slug: "ash-gray-baggy-jeans", name: "Ash Gray Baggy Jeans", price: 2999, compareAtPrice: 3999, rating: { average: 4.6, count: 214 }, soldCount: 25, storeId: "st_2", categoryId: "ct_1", sizes: ["28", "30", "32", "34"] },
  { slug: "suit-3pc", name: "Suit 3pc", price: 5549, compareAtPrice: 8000, rating: { average: 4.6, count: 214 }, soldCount: 42, storeId: "st_3", categoryId: "ct_1", sizes: ["S", "M", "L"] },
  { slug: "mocha-elegance", name: "Mocha Elegance", price: 47499, compareAtPrice: 55499, rating: { average: 4.6, count: 214 }, soldCount: 19, storeId: "st_3", categoryId: "ct_1", sizes: ["S", "M", "L"] },
  { slug: "projector-light-12-in-1", name: "12 in 1 Projector Light For Room", price: 1699, compareAtPrice: 1999, rating: { average: 4.6, count: 214 }, soldCount: 30, storeId: "st_4", categoryId: "ct_3" },
  { slug: "three-figure-flame-hoodie", name: "Three Figure Flame Hoodie", price: 3990, compareAtPrice: 4799, rating: { average: 4.6, count: 214 }, soldCount: 67, storeId: "st_2", categoryId: "ct_1", sizes: ["M", "L", "XL"] },
  { slug: "luminus-aura-whitening", name: "Luminus Aura whitening", price: 2150, compareAtPrice: 5000, rating: { average: 4.6, count: 214 }, soldCount: 84, storeId: "st_7", categoryId: "ct_2" },
  { slug: "rangreza-2pc", name: "Rangreza 2PC", price: 4299, compareAtPrice: 6690, rating: { average: 4.6, count: 214 }, soldCount: 53, storeId: "st_3", categoryId: "ct_1", sizes: ["S", "M", "L"] },
  { slug: "height-growth-powder", name: "Height Growth Powder", price: 1450, compareAtPrice: 2190, rating: { average: 4.6, count: 214 }, soldCount: 14, storeId: "st_8", categoryId: "ct_8" },
  { slug: "adventure-racing-car-game", name: "Adventure Racing Car Game", price: 5499, compareAtPrice: 6999, rating: { average: 4.6, count: 214 }, soldCount: 21, storeId: "st_6", categoryId: "ct_7" },
  { slug: "marium-vol-20", name: "Marium Vol 20", price: 11199, compareAtPrice: 22398, rating: { average: 4.6, count: 214 }, soldCount: 13, storeId: "st_3", categoryId: "ct_1" },
  { slug: "enzo-hair-spa-mask", name: "Enzo Hair Spa Treatment Mask", price: 1450, compareAtPrice: 2000, rating: { average: 4.6, count: 214 }, soldCount: 49, storeId: "st_7", categoryId: "ct_2" },
  { slug: "elara", name: "Elara", price: 7500, compareAtPrice: 10500, rating: { average: 4.6, count: 214 }, soldCount: 19, storeId: "st_3", categoryId: "ct_1", sizes: ["S", "M", "L"] },
  { slug: "bts-light-lamp", name: "BTS Light Lamp", price: 2500, compareAtPrice: 3500, rating: { average: 4.6, count: 214 }, soldCount: 79, storeId: "st_4", categoryId: "ct_3" },
  { slug: "waterproof-makeup-pouch", name: "Waterproof Makeup Pouch", price: 1750, compareAtPrice: 2550, rating: { average: 4.6, count: 214 }, soldCount: 92, storeId: "st_4", categoryId: "ct_6" },
];

/**
 * Extra gallery shots per product, as file names in public/images/products.
 * Matilda's Figma exports go here once they are in that folder, e.g.
 * "matilda-pinafore-set": ["matilda-main.jpg", "matilda-thumb-1.jpg", ...].
 * Products without an entry use their single card image.
 */
const galleryFiles: Partial<Record<string, string[]>> = {};

function galleryFor(slug: string, name: string): Product["images"] {
  const files = galleryFiles[slug];
  const urls = files?.length ? files.map((file) => `/images/products/${file}`) : [`/images/products/${slug}.jpg`];
  return urls.map((url, index) => ({ url, alt: index === 0 ? name : `${name} — view ${index + 1}` }));
}

export const products: Product[] = seeds.map((seed, index) => ({
  id: `pr_${index + 1}`,
  inStock: true,
  description: seed.description ?? defaultDescription,
  features: seed.features ?? [],
  images: galleryFor(seed.slug, seed.name),
  ...seed,
}));

const reviewBody = "Great build, looks exactly like the photos. Already recommended it to friends.";

export const reviews: Review[] = [
  { id: "rv_1", productId: "pr_1", author: "Hamza Rehman", rating: 5, body: reviewBody, createdAt: "2026-11-23" },
  { id: "rv_2", productId: "pr_1", author: "Areeba Faisal", rating: 5, body: reviewBody, createdAt: "2026-11-23" },
  { id: "rv_3", productId: "pr_1", author: "Usman Tanveer", rating: 5, body: reviewBody, createdAt: "2026-11-23" },
];
