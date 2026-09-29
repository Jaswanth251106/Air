import React from "react";
import { cn } from "@/lib/utils";

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
  badge?: string;
}

interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (val: T) => void;
  size?: "sm" | "md";
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = "md",
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex items-center p-1 bg-[#F6F8FB] border border-[#E2E8F0] rounded-sih-md shadow-sih-subtle",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sih-sm transition-all cursor-pointer font-sans",
              isActive
                ? "bg-white text-[#0A5B9E] shadow-sih-card border border-[#E2E8F0]"
                : "text-[#5B6B82] hover:text-[#14213D] border border-transparent",
              size === "sm" && "px-2 py-0.5 text-[11px]"
            )}
          >
            <span>{opt.label}</span>
            {opt.badge && (
              <span
                className={cn(
                  "px-1 py-0.2 text-[10px] font-mono rounded",
                  isActive ? "bg-[#EAF3FB] text-[#0A5B9E]" : "bg-[#EDF2F7] text-[#5B6B82]"
                )}
              >
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
