"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Banner } from "@/types/catalog";

type BannerCarouselProps = {
  slides: Banner[];
  label: string;
  sizes: string;
  slideClassName?: string;
  className?: string;
  priority?: boolean;
  delay?: number;
};

export function BannerCarousel({
  slides,
  label,
  sizes,
  slideClassName = "aspect-[1283/447]",
  className,
  priority = false,
  delay = 5000,
}: BannerCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [plugins] = useState(() => [Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: true })]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: slides.length > 1 }}
      plugins={slides.length > 1 ? plugins : []}
      aria-label={label}
      className={cn(
        "overflow-hidden rounded-3xl bg-surface xl:rounded-[28px] **:data-[slot=carousel-content]:h-full",
        className,
      )}
    >
      <CarouselContent className="ml-0 h-full">
        {slides.map((slide, index) => (
          <CarouselItem key={slide.id} className="h-full pl-0">
            <Link href={slide.href} className={cn("relative block", slideClassName)}>
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={priority && index === 0}
                sizes={sizes}
                className="object-cover"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => api?.scrollTo(index)}
              className={cn("h-1.5 rounded-full bg-white/60 transition-all", index === selected ? "w-5 bg-white" : "w-1.5")}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
}
