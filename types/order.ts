import type { ShippingDetails } from "@/schemas/checkout.schema";

export type { ShippingDetails };

export type CartItem = {
  /** productId + size — one line per variant. */
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  storeName: string;
  quantity: number;
};

export type PaymentMethod = "cod";

export type OrderTotals = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export type PlaceOrderInput = {
  items: CartItem[];
  shipping: ShippingDetails;
  paymentMethod: PaymentMethod;
};

export type PlacedOrder = {
  id: string;
};
