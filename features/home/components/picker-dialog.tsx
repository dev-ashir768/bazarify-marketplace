"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type PickerOption = { id: string; name: string; itemCount: number };

type PickerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  searchPlaceholder: string;
  allLabel: string;
  options: PickerOption[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

/** "Select store" / "Select Category" modal from the Figma popups. */
export function PickerDialog({
  open,
  onOpenChange,
  title,
  description,
  searchPlaceholder,
  allLabel,
  options,
  selectedId,
  onSelect,
}: PickerDialogProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.name.toLowerCase().includes(q)) : options;
  }, [options, query]);

  const choose = (id: string | null) => {
    onSelect(id);
    onOpenChange(false);
    setQuery("");
  };

  const rowClass = (active: boolean) =>
    cn(
      "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-surface xl:text-base",
      active && "bg-surface font-semibold text-brand",
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-4 rounded-[28px] p-5 sm:max-w-[530px] xl:p-6">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-xl font-bold xl:text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-ink-muted">{description}</DialogDescription>
        </DialogHeader>

        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="h-12 w-full rounded-full bg-surface pr-14 pl-6 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          />
          <span className="pointer-events-none absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-brand text-white">
            <SearchIcon className="size-4" strokeWidth={2.5} />
          </span>
        </div>

        <ul className="-mr-2 max-h-[300px] space-y-1 overflow-y-auto pr-2">
          {!query && (
            <li>
              <button type="button" className={rowClass(selectedId === null)} onClick={() => choose(null)}>
                {allLabel}
              </button>
            </li>
          )}
          {filtered.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                className={rowClass(selectedId === option.id)}
                onClick={() => choose(option.id)}
              >
                <span>{option.name}</span>
                <span className="text-xs font-normal text-ink-muted xl:text-sm">{option.itemCount} Items</span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className="px-4 py-6 text-center text-ink-muted">No matches.</li>}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
