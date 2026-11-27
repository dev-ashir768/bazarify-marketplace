import type { Banner } from "@/types/catalog";

import { BannerCarousel } from "./banner-carousel";

type HeroBannersProps = {
  hero: Banner[];
  /** Two stacked carousels on the right: [top slides, bottom slides]. */
  side: [Banner[], Banner[]];
  /** Rendered under the main banner, beside the side banners (trust badges). */
  children?: React.ReactNode;
};

export function HeroBanners({ hero, side, children }: HeroBannersProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1283fr_414fr] xl:gap-6">
      <div className="flex flex-col gap-4 xl:gap-6">
        <BannerCarousel
          slides={hero}
          label="Featured collections"
          sizes="(min-width: 1024px) 72vw, 100vw"
          priority
        />
        {children}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:grid-rows-2 xl:gap-6">
        {side.map((slides, index) => (
          <BannerCarousel
            key={index}
            slides={slides}
            label={index === 0 ? "Top offers" : "More offers"}
            sizes="(min-width: 1024px) 24vw, 50vw"
            slideClassName="aspect-[414/300] lg:aspect-auto lg:h-full"
            className="lg:h-full"
            delay={index === 0 ? 4000 : 4600}
          />
        ))}
      </div>
    </div>
  );
}
