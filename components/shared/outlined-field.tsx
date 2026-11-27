import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  className?: string;
};

const wrapperClass =
  "relative rounded-xl border border-input transition-colors focus-within:border-brand has-[[aria-invalid=true]]:border-sale";
const legendClass = "absolute -top-2 left-3 bg-white px-1.5 text-[11px] text-ink-muted xl:text-xs";
const controlClass = "h-12 w-full rounded-xl bg-transparent px-4 text-sm text-ink outline-none xl:h-[58px]";

function FieldShell({ label, name, error, className, children }: BaseProps & { children: React.ReactNode }) {
  return (
    <div className={className}>
      <div className={wrapperClass}>
        <label htmlFor={name} className={legendClass}>
          {label}
        </label>
        {children}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-sale">
          {error}
        </p>
      )}
    </div>
  );
}

/** Text input with the label sitting on the border (Figma checkout form). */
export function OutlinedInput({
  label,
  name,
  error,
  className,
  ...props
}: BaseProps & Omit<React.ComponentProps<"input">, "name">) {
  return (
    <FieldShell label={label} name={name} error={error} className={className}>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={controlClass}
        {...props}
      />
    </FieldShell>
  );
}

export function OutlinedSelect({
  label,
  name,
  error,
  className,
  options,
  placeholder = "Select",
  ...props
}: BaseProps & Omit<React.ComponentProps<"select">, "name"> & { options: string[]; placeholder?: string }) {
  return (
    <FieldShell label={label} name={name} error={error} className={className}>
      <select
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(controlClass, "appearance-none pr-10")}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2" />
    </FieldShell>
  );
}
