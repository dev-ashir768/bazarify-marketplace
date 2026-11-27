import { Suspense } from "react";
import Form from "next/form";
import { SearchIcon } from "lucide-react";

import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

import { SearchFieldInput, SearchQueryInput } from "./search-query-input";

const inputClass =
  "h-12 w-full rounded-full bg-surface pr-14 pl-6 text-sm text-ink placeholder:text-ink-muted outline-none focus-visible:ring-2 focus-visible:ring-brand/40 lg:h-14.5 lg:pl-8 lg:text-lg";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
};

export function SearchBar({
  placeholder = "What are you shopping for today?",
  className,
}: SearchBarProps) {
  // next/form submits as a client-side navigation (no full page reload) and prefetches the target.
  return (
    <Form role="search" action={routes.search()} className={cn("relative w-full", className)}>
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      {/* Reading the URL query is request-specific, so it sits behind Suspense. */}
      <Suspense fallback={<SearchFieldInput id="site-search" placeholder={placeholder} className={inputClass} />}>
        <SearchQueryInput id="site-search" placeholder={placeholder} className={inputClass} />
      </Suspense>
      <button
        type="submit"
        aria-label="Search"
        className="absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand/90 lg:right-2 lg:size-11"
      >
        <SearchIcon className="size-4 lg:size-6" strokeWidth={2.5} />
      </button>
    </Form>
  );
}
