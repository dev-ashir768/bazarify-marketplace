import type { PlaceOrderInput, PlacedOrder } from "@/types/order";

/**
 * Places an order. Mocked for now — replace with
 * `apiClient.post<PlacedOrder>("/orders", input)` when the API exists.
 */
export async function placeOrder(input: PlaceOrderInput): Promise<PlacedOrder> {
  if (input.items.length === 0) throw new Error("Cart is empty");
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { id: String(Math.floor(1_000_000 + Math.random() * 9_000_000)).padStart(7, "0") };
}
