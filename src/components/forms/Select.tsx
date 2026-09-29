import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  helperText,
  className,
  disabled,
  id,
  ...props
}: SelectProps) {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-sans"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none bg-white border border-[#E2E8F0] rounded-sih-md px-3 py-1.5 pr-8 text-xs font-medium text-[#14213D] font-sans shadow-sih-subtle hover:border-[#B2D4F0] focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30 focus:border-[#0A5B9E] disabled:opacity-50 disabled:bg-[#F6F8FB] cursor-pointer",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-[#5B6B82] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {helperText && <p className="text-[11px] text-[#8A99AD] font-sans">{helperText}</p>}
    </div>
  );
}
