import React from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  label?: string;
  value?: string;
  onChange?: (date: string) => void;
  className?: string;
}

export function DatePicker({
  label = "Departure Date",
  value = "2026-10-15",
  onChange,
  className,
}: DatePickerProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-sans">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={cn(
            "w-full bg-white border border-[#E2E8F0] rounded-sih-md px-3 py-1.5 pl-9 text-xs font-medium text-[#14213D] font-mono shadow-sih-subtle hover:border-[#B2D4F0] focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30 focus:border-[#0A5B9E] cursor-pointer",
            className
          )}
        />
        <Calendar className="w-4 h-4 text-[#5B6B82] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}
