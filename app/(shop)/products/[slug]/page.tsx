import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { routes } from "@/config/routes";
import { ProductGallery } from "@/features/product/components/product-gallery";
import { ProductGrid } from "@/features/product/components/product-grid";
import { ProductInfo } from "@/features/product/components/product-info";
import { ProductReviews } from "@/features/product/components/product-reviews";
import {
  getProductBySlug,
  getProductReviews,
  getProducts,
  getRelatedProducts,
} from "@/services/catalog.service";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: Pick<PageProps<"/products/[slug]">, "params">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [{ reviews, breakdown }, related] = await Promise.all([
    getProductReviews(product.id),
    getRelatedProducts(product.id),
  ]);

  return (
    <div className="container-page py-6 2xl:pt-[69px] 2xl:pb-0">
      <Breadcrumbs items={[{ label: "Marketplace", href: routes.home }, { label: product.name }]} />

      {/* Figma 1920: 806px left column, 68px gap, 826px info column. */}
      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[806fr_826fr] xl:gap-12 2xl:mt-10 2xl:max-w-[1700px] 2xl:gap-[68px]">
        <div className="space-y-10 2xl:space-y-[79px]">
          <ProductGallery images={product.images} />
          <ProductReviews reviews={reviews} breakdown={breakdown} />
        </div>
        <ProductInfo product={product} />
      </div>

      <section aria-labelledby="related-heading" className="mt-12 space-y-6 2xl:mt-[80px] 2xl:space-y-9">
        <h2 id="related-heading" className="text-2xl font-semibold text-ink 2xl:text-[28px]">
          You May Also Like
        </h2>
        <ProductGrid products={related} />
      </section>
    </div>
  );
}

function ProductPageSkeleton() {
  return (
    <div className="container-page animate-pulse py-6 xl:py-10">
      <div className="mb-12 h-4 w-48 rounded bg-surface" />
      <div className="grid gap-10 lg:grid-cols-2 xl:gap-16">
        <div className="aspect-[4/3.6] rounded-[28px] bg-surface" />
        <div className="space-y-4">
          <div className="h-9 w-2/3 rounded bg-surface" />
          <div className="h-5 w-1/3 rounded bg-surface" />
          <div className="h-10 w-1/2 rounded bg-surface" />
          <div className="h-12 w-full rounded-xl bg-surface" />
        </div>
      </div>
    </div>
  );
}
