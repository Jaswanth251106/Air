"use client";

import React, { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (val: string) => {
    if (selectedValues.includes(val)) {
      onChange(selectedValues.filter((v) => v !== val));
    } else {
      onChange([...selectedValues, val]);
    }
  };

  const removeOption = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter((v) => v !== val));
  };

  return (
    <div className="flex flex-col gap-1 w-full relative">
      {label && (
        <label className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-sans">
          {label}
        </label>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "min-h-[34px] w-full bg-white border border-[#E2E8F0] rounded-sih-md px-2.5 py-1 text-xs font-medium text-[#14213D] flex items-center justify-between gap-2 shadow-sih-subtle hover:border-[#B2D4F0] cursor-pointer focus-within:ring-2 focus-within:ring-[#0A5B9E]/30",
          className
        )}
      >
        <div className="flex flex-wrap items-center gap-1 overflow-hidden">
          {selectedValues.length === 0 ? (
            <span className="text-[#8A99AD] font-sans">{placeholder}</span>
          ) : (
            selectedValues.map((val) => {
              const opt = options.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#EAF3FB] text-[#0A5B9E] text-[11px] font-semibold border border-[#B2D4F0]"
                >
                  {opt?.label || val}
                  <X
                    className="w-3 h-3 hover:text-[#D1262C] cursor-pointer"
                    onClick={(e) => removeOption(val, e)}
                  />
                </span>
              );
            })
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-[#5B6B82] shrink-0" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-[#E2E8F0] rounded-sih-md shadow-sih-dropdown max-h-48 overflow-y-auto p-1 animate-in fade-in duration-100">
          {options.map((opt) => {
            const isSelected = selectedValues.includes(opt.value);
            return (
              <div
                key={opt.value}
                onClick={() => toggleOption(opt.value)}
                className={cn(
                  "flex items-center justify-between px-3 py-1.5 text-xs rounded hover:bg-[#F6F8FB] cursor-pointer transition-colors font-sans",
                  isSelected && "bg-[#EAF3FB] text-[#0A5B9E] font-semibold"
                )}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#0A5B9E]" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
