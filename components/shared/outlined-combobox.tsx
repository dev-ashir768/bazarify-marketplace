"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { FieldShell } from "./outlined-field";

type OutlinedComboboxProps = {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  emptyText?: string;
  className?: string;
};

/** Searchable select (shadcn Combobox) styled like the other outlined fields. */
export function OutlinedCombobox({
  label,
  name,
  options,
  value,
  onChange,
  onBlur,
  inputRef,
  error,
  placeholder = "Search…",
  emptyText = "No results found.",
  className,
}: OutlinedComboboxProps) {
  return (
    <FieldShell label={label} name={name} error={error} className={className}>
      <Combobox items={options} value={value || null} onValueChange={(next) => onChange(next ?? "")}>
        <ComboboxInput
          id={name}
          name={name}
          ref={inputRef}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className="h-12 w-full rounded-xl border-0 bg-transparent pr-2 pl-2 text-sm shadow-none xl:h-[58px] has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot][aria-invalid=true]]:ring-0"
        />
        <ComboboxContent>
          <ComboboxEmpty>{emptyText}</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </FieldShell>
  );
}
