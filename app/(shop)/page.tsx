import { HeroBanners } from "@/features/home/components/hero-banners";
import { MarketplaceSection } from "@/features/home/components/marketplace-section";
import { TrustBadges } from "@/features/home/components/trust-badges";
import { getCategories, getHomeBanners, getProducts, getStores } from "@/services/catalog.service";

export default async function HomePage() {
  const [banners, products, stores, categories] = await Promise.all([
    getHomeBanners(),
    getProducts(),
    getStores(),
    getCategories(),
  ]);

  return (
    <div className="container-page space-y-6 py-6 xl:space-y-10 xl:py-10">
      <HeroBanners hero={banners.hero} side={banners.side}>
        <TrustBadges />
      </HeroBanners>
      <MarketplaceSection products={products} stores={stores} categories={categories} />
    </div>
  );
}
