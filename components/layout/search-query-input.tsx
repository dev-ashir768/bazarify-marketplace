"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { routes } from "@/config/routes";

type SearchQueryInputProps = Omit<React.ComponentProps<"input">, "defaultValue" | "name" | "type">;

/** Shows the current `?q=` on the search page so people can refine what they typed. */
export function SearchQueryInput(props: SearchQueryInputProps) {
  const pathname = usePathname();
  const query = useSearchParams().get("q") ?? "";
  const value = pathname === routes.search() ? query : "";

  // `key` resets the uncontrolled input when the query in the URL changes.
  return <SearchFieldInput key={value} defaultValue={value} {...props} />;
}

export function SearchFieldInput(props: Omit<React.ComponentProps<"input">, "name" | "type">) {
  return <input name="q" type="search" enterKeyHint="search" autoComplete="off" {...props} />;
}
