import type { Metadata } from "next";

import { WishlistView } from "@/features/wishlist/components/wishlist-view";
import { getProducts } from "@/services/catalog.service";

export const metadata: Metadata = { title: "My Wishlist" };

export default async function WishlistPage() {
  const products = await getProducts();
  return (
    <div className="container-page py-8 xl:py-12">
      <WishlistView products={products} />
    </div>
  );
}
