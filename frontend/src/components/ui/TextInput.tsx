"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  error?: string;
  endAdornment?: ReactNode;
}

export default function TextInput({
  label,
  error,
  endAdornment,
  id,
  ...props
}: TextInputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-semibold text-cream">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          className={`w-full rounded-2xl bg-card-alt border px-5 py-4 text-cream placeholder:text-muted outline-none transition ${
            error ? "border-needs" : "border-transparent focus:border-gold"
          } ${endAdornment ? "pr-12" : ""}`}
          {...props}
        />
        {endAdornment && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{endAdornment}</div>
        )}
      </div>
      {error && <p className="text-sm text-needs">{error}</p>}
    </div>
  );
}
