"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/catalog";

type ProductGalleryProps = {
  images: ProductImage[];
};

export function ProductGallery({ images: allImages }: ProductGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [broken, setBroken] = useState<ReadonlySet<string>>(() => new Set());
  const markBroken = (url: string) => setBroken((prev) => new Set(prev).add(url));

  const images = allImages.filter((image) => !broken.has(image.url));
  const count = images.length;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActive(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (count === 0) return null;

  const arrow =
    "absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:scale-105 2xl:size-[46px]";

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-5 2xl:gap-8.5">
      {count > 1 && (
        <ul className="grid grid-cols-4 gap-3 sm:flex sm:w-[19.5%] sm:flex-col sm:gap-4 2xl:w-30.25 2xl:gap-8">
          {images.slice(0, 4).map((image, index) => (
            <li key={image.url + index}>
              <button
                type="button"
                aria-label={`Show image ${index + 1}`}
                aria-current={index === active}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "relative block aspect-121/119 w-full overflow-hidden rounded-xl bg-surface opacity-70 outline-2 -outline-offset-2 outline-transparent transition",
                  index === active && "opacity-100 outline-brand",
                )}
              >
                <Image src={image.url} alt="" fill sizes="121px" className="object-cover" onError={() => markBroken(image.url)} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Carousel
        setApi={setApi}
        opts={{ loop: count > 1 }}
        aria-label="Product images"
        className="flex-1 overflow-hidden rounded-2xl bg-surface 2xl:rounded-[22px]"
      >
        <CarouselContent className="ml-0">
          {images.map((image, index) => (
            <CarouselItem key={image.url + index} className="pl-0">
              <div className="relative aspect-622/572">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                  onError={() => markBroken(image.url)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {count > 1 && (
          <>
            <button type="button" aria-label="Previous image" onClick={() => api?.scrollPrev()} className={cn(arrow, "left-4 2xl:left-16.5")}>
              <ChevronLeftIcon className="size-5" strokeWidth={2.5} />
            </button>
            <button type="button" aria-label="Next image" onClick={() => api?.scrollNext()} className={cn(arrow, "right-4 2xl:right-5")}>
              <ChevronRightIcon className="size-5" strokeWidth={2.5} />
            </button>
          </>
        )}
      </Carousel>
    </div>
  );
}
