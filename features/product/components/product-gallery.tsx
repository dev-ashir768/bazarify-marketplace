"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/catalog";

type ProductGalleryProps = {
  images: ProductImage[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const count = images.length;
  const current = images[active];
  const go = (delta: number) => setActive((i) => (i + delta + count) % count);

  if (!current) return null;

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row xl:gap-5">
      {count > 1 && (
        <ul className="flex gap-3 sm:w-[18%] sm:flex-col xl:gap-4">
          {images.map((image, index) => (
            <li key={image.url + index} className="w-1/4 sm:w-full">
              <button
                type="button"
                aria-label={`Show image ${index + 1}`}
                aria-current={index === active}
                onClick={() => setActive(index)}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-2xl bg-surface ring-2 ring-transparent transition",
                  index === active && "ring-brand",
                )}
              >
                <Image src={image.url} alt="" fill sizes="10vw" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative aspect-[4/3.6] flex-1 overflow-hidden rounded-3xl bg-surface xl:rounded-[28px]">
        <Image
          src={current.url}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
