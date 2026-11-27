import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
};

/** Pill search field with the round brand submit button (Figma header). */
export function SearchBar({
  placeholder = "What are you shopping for today?",
  className,
}: SearchBarProps) {
  return (
    <form role="search" action="/" className={cn("relative w-full", className)}>
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        placeholder={placeholder}
        className="h-12 w-full rounded-full bg-surface pr-14 pl-6 text-sm text-ink placeholder:text-ink-muted outline-none focus-visible:ring-2 focus-visible:ring-brand/40 lg:h-[66px] lg:pl-8 lg:text-lg"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand/90 lg:right-2 lg:size-12"
      >
        <SearchIcon className="size-4 lg:size-6" strokeWidth={2.5} />
      </button>
    </form>
  );
}
