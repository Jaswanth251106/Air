import React from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}: ToggleProps) {
  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            "w-9 h-5 rounded-full transition-colors border",
            checked ? "bg-[#0A5B9E] border-[#0A5B9E]" : "bg-[#EDF2F7] border-[#E2E8F0]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
        <div
          className={cn(
            "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-xs",
            checked && "translate-x-4"
          )}
        />
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-xs font-semibold text-[#14213D] font-sans">{label}</span>
          )}
          {description && (
            <span className="text-[11px] text-[#5B6B82] font-sans">{description}</span>
          )}
        </div>
      )}
    </label>
  );
}
