import React from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  subtext,
  icon,
  accentColor = "#0A5B9E",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E2E8F0] rounded-sih-md p-4 shadow-sih-subtle flex items-start justify-between relative overflow-hidden",
        className
      )}
    >
      <div
        className="absolute top-0 left-0 bottom-0 w-1"
        style={{ backgroundColor: accentColor }}
      />
      <div className="pl-1">
        <p className="text-xs font-medium text-[#5B6B82] uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-lg font-bold text-[#14213D] tracking-tight font-sans">
          {value}
        </p>
        {subtext && <p className="text-xs text-[#8A99AD] mt-1 font-sans">{subtext}</p>}
      </div>
      {icon && <div className="p-2 rounded-md bg-[#F6F8FB] text-[#0A5B9E]">{icon}</div>}
    </div>
  );
}
