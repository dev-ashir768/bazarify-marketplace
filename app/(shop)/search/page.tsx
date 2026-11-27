import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SearchXIcon } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { routes } from "@/config/routes";
import { ProductGrid } from "@/features/product/components/product-grid";
import { searchProducts } from "@/services/catalog.service";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <div className="container py-6 xl:py-10">
      <Breadcrumbs items={[{ label: "Marketplace", href: routes.home }, { label: "Search" }]} />
      <Suspense fallback={<ResultsSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function SearchResults({ searchParams }: Pick<PageProps<"/search">, "searchParams">) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";

  if (!query) {
    return (
      <EmptyState
        title="What are you looking for?"
        text="Type a product, store or category in the search bar above."
      />
    );
  }

  const results = await searchProducts(query);

  return (
    <section aria-labelledby="search-heading" className="mt-6 space-y-6 xl:mt-8 xl:space-y-8">
      <header>
        <h1 id="search-heading" className="text-2xl font-semibold text-ink xl:text-[34px]">
          Results for “{query}”
        </h1>
        <p className="mt-1 text-sm text-ink-muted xl:text-base">
          {results.length} {results.length === 1 ? "product" : "products"} found
        </p>
      </header>

      {results.length > 0 ? (
        <ProductGrid products={results} priorityCount={5} />
      ) : (
        <EmptyState
          as="h2"
          title="No products found"
          text="Check the spelling or try a broader word, like a store or category name."
        />
      )}
    </section>
  );
}

function EmptyState({ title, text, as: Heading = "h1" }: { title: string; text: string; as?: "h1" | "h2" }) {
  return (
    <div className="mt-6 grid place-items-center gap-3 rounded-3xl bg-surface px-6 py-16 text-center xl:mt-8 xl:py-20">
      <SearchXIcon className="size-12 text-brand" strokeWidth={1.5} />
      <Heading className="text-xl font-semibold text-ink xl:text-2xl">{title}</Heading>
      <p className="max-w-md text-sm text-ink-muted xl:text-base">{text}</p>
      <Link
        href={routes.home}
        className="mt-2 inline-flex h-11 items-center rounded-xl bg-brand px-6 text-sm font-medium text-white transition-colors hover:bg-brand/90"
      >
        Browse Marketplace
      </Link>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div aria-busy="true" className="mt-6 animate-pulse space-y-6 xl:mt-8">
      <div className="h-9 w-72 rounded bg-surface" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} className="aspect-[3/4] rounded-2xl bg-surface" />
        ))}
      </div>
    </div>
  );
}
