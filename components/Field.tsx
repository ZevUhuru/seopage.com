"use client";

/** Shared labeled text input used by the intake forms. */
export function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
  badge,
  autoFocus,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  badge?: string;
  autoFocus?: boolean;
  type?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="field-label">{label}</label>
        {badge && (
          <span className="mono text-[10px] uppercase tracking-wider text-muted">
            {badge}
          </span>
        )}
      </div>
      <input
        type={type}
        className={`field mt-2 ${error ? "border-[#e0584b]" : ""}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
      />
      {error ? (
        <p className="mt-1.5 text-sm text-[#b42318]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-muted">{hint}</p>
      ) : null}
    </div>
  );
}
