import Image from "next/image";
import Link from "next/link";

import type { Banner } from "@/types/catalog";

type HeroBannersProps = {
  hero: Banner;
  side: Banner[];
  /** Rendered under the main banner, beside the side banners (trust badges). */
  children?: React.ReactNode;
};

export function HeroBanners({ hero, side, children }: HeroBannersProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1283fr_414fr] xl:gap-6">
      <div className="flex flex-col gap-4 xl:gap-6">
      <Link
        href={hero.href}
        className="relative aspect-[1283/447] overflow-hidden rounded-3xl bg-surface xl:rounded-[28px]"
      >
        <Image
          src={hero.image}
          alt={hero.alt}
          fill
          priority
          sizes="(min-width: 1024px) 72vw, 100vw"
          className="object-cover"
        />
        <span aria-hidden className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          <span className="h-1.5 w-5 rounded-full bg-white" />
          <span className="size-1.5 rounded-full bg-white/60" />
          <span className="size-1.5 rounded-full bg-white/60" />
        </span>
      </Link>
      {children}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:grid-rows-2 xl:gap-6">
        {side.map((banner) => (
          <Link
            key={banner.id}
            href={banner.href}
            className="relative aspect-[414/300] overflow-hidden rounded-3xl bg-surface lg:aspect-auto xl:rounded-[28px]"
          >
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              sizes="(min-width: 1024px) 24vw, 50vw"
              className="object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
