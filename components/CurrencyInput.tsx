import React from "react";

export interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
  error?: string | null;
}

export default function CurrencyInput({
  label,
  value,
  onChange,
  hint,
  required,
  error,
}: CurrencyInputProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-text">
        {label}
        {required ? " *" : ""}
      </span>
      <div className="flex items-center rounded-lg border border-border bg-surface-strong px-3">
        <span className="text-muted">$</span>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-2 py-2 outline-none"
          aria-invalid={!!error}
        />
      </div>
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}