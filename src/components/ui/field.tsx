import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
  type?: "text" | "email" | "tel";
};

export function Field({
  label,
  name,
  error,
  required,
  autoComplete,
  multiline = false,
  type = "text",
}: FieldProps) {
  const errorId = error ? `${name}-error` : undefined;
  const className = cn(
    "w-full border bg-transparent p-5 text-lead text-white placeholder:text-muted",
    error ? "border-brand" : "border-muted",
  );

  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          required={required}
          autoComplete={autoComplete}
          placeholder={label}
          rows={4}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(className, "min-h-36 resize-y")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={className}
        />
      )}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-brand">
          {error}
        </p>
      ) : null}
    </div>
  );
}
