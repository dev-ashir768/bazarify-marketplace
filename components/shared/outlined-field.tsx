import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  className?: string;
};

/** Shared height and text styles so inputs and selects line up exactly. */
export const outlinedControlClass =
  "h-12 w-full bg-transparent px-4 text-sm text-ink outline-none placeholder:text-ink-muted/60 xl:h-[58px] xl:text-base";

/**
 * Outlined field with the label sitting in a real notch of the border (Figma checkout form).
 * The border is a `<fieldset>`/`<legend>`, so the line stops cleanly around the label
 * instead of being covered by a background patch.
 */
export function FieldShell({ label, name, error, className, children }: BaseProps & { children: React.ReactNode }) {
  return (
    <div className={className}>
      <div className="group relative pt-2">
        {children}
        <fieldset
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 bottom-0 m-0 rounded-xl border border-ink/25 px-3 transition-colors",
            "group-focus-within:border-brand group-has-[[aria-invalid=true]]:border-sale",
          )}
        >
          <legend className="px-1.5 text-xs leading-4 text-ink-muted transition-colors group-focus-within:text-brand group-has-[[aria-invalid=true]]:text-sale">
            <label htmlFor={name} className="pointer-events-auto cursor-pointer">
              {label}
            </label>
          </legend>
        </fieldset>
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-sale">
          {error}
        </p>
      )}
    </div>
  );
}

/** Text input with the label in the border notch. */
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
        className={outlinedControlClass}
        {...props}
      />
    </FieldShell>
  );
}
