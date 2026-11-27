/** Central place for every internal URL, so links never get hard-coded. */
export const routes = {
  home: "/",
  product: (slug: string) => `/products/${slug}`,
  cart: "/cart",
  checkoutSuccess: (orderId: string) => `/checkout/success?order=${encodeURIComponent(orderId)}`,
  wishlist: "/wishlist",
  trackOrder: "#",
  returns: "#",
  shipping: "#",
  terms: "#",
  privacy: "#",
  refund: "#",
  cookies: "#",
} as const;
