"use client";

import Select, { components, type InputProps, type SingleValue } from "react-select";

import { cn } from "@/lib/utils";

import { FieldShell } from "./outlined-field";

type Option = { value: string; label: string };

function SearchInput(props: InputProps<Option, false>) {
  return <components.Input {...props} autoComplete="bazarify-no-autofill" />;
}

type OutlinedSelectProps = {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  inputRef?: (instance: { focus: () => void } | null) => void;
  error?: string;
  placeholder?: string;
  noOptionsText?: string;
  className?: string;
};

export function OutlinedSelect({
  label,
  name,
  options,
  value,
  onChange,
  onBlur,
  inputRef,
  error,
  placeholder = "Select…",
  noOptionsText = "No options",
  className,
}: OutlinedSelectProps) {
  const items: Option[] = options.map((option) => ({ value: option, label: option }));
  const selected = items.find((item) => item.value === value) ?? null;
  const inputId = `${name}-search`;

  return (
    <FieldShell label={label} name={inputId} error={error} className={className}>
      <Select<Option, false>
        unstyled
        isClearable
        isSearchable
        instanceId={name}
        inputId={inputId}
        components={{ Input: SearchInput }}
        ref={inputRef}
        options={items}
        value={selected}
        onChange={(option: SingleValue<Option>) => onChange(option?.value ?? "")}
        onBlur={onBlur}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsText}
        aria-invalid={error ? true : undefined}
        aria-errormessage={error ? `${inputId}-error` : undefined}
        classNames={{
          control: () => "min-h-12! cursor-pointer bg-transparent pr-3 pl-4 text-sm text-ink xl:min-h-[58px]! xl:text-base",
          valueContainer: () => "gap-1",
          placeholder: () => "text-ink-muted/60",
          singleValue: () => "text-ink",
          input: () => "text-ink",
          indicatorsContainer: () => "gap-1",
          clearIndicator: () => "rounded-md p-1 text-ink-muted transition-colors hover:bg-surface hover:text-sale",
          indicatorSeparator: () => "hidden",
          dropdownIndicator: ({ isFocused, selectProps }) =>
            cn("rounded-md p-1 text-ink transition-transform", isFocused && "text-brand", selectProps.menuIsOpen && "rotate-180"),
          menu: () => "z-30 mt-2 overflow-hidden rounded-xl border border-input bg-white p-1 shadow-lg",
          menuList: () => "max-h-64",
          option: ({ isFocused, isSelected }) =>
            cn(
              "cursor-pointer rounded-lg px-3 py-2.5 text-sm text-ink",
              isFocused && !isSelected && "bg-brand/5",
              isSelected && "bg-brand font-medium text-white",
            ),
          noOptionsMessage: () => "px-3 py-2.5 text-sm text-ink-muted",
        }}
      />
    </FieldShell>
  );
}
