import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search corridor, carrier, or index code...",
  onClear,
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search className="w-4 h-4 text-[#8A99AD] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-[#E2E8F0] rounded-sih-md pl-9 pr-8 py-1.5 text-xs text-[#14213D] font-sans placeholder-[#8A99AD] shadow-sih-subtle hover:border-[#B2D4F0] focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30 focus:border-[#0A5B9E] transition-all"
        {...props}
      />
      {value && (
        <button
          onClick={() => {
            onChange("");
            if (onClear) onClear();
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A99AD] hover:text-[#14213D]"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
