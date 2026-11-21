import React from "react";

export interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
  error?: string | null;
}

export default function CurrencyInput({ label, value, onChange, hint, required, error }: CurrencyInputProps) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-sm font-medium text-text">
        {label}
        {required && <span className="text-green-600">*</span>}
      </span>
      <div
        className={`flex items-center rounded-xl border bg-white/80 px-3 shadow-sm transition ${
          error ? "border-danger" : "border-border focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-600/20"
        }`}
      >
        <span className="select-none text-muted">$</span>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-2 py-2.5 outline-none placeholder:text-muted/60"
          aria-invalid={!!error}
        />
      </div>
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}