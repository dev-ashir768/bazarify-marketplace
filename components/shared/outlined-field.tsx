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

export function FieldShell({ label, name, error, className, children }: BaseProps & { children: React.ReactNode }) {
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
