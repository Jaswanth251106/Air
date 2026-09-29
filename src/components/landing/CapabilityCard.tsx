import React from "react";
import { cn } from "@/lib/utils";

interface CapabilityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  accentColor?: string;
  className?: string;
}

export function CapabilityCard({
  title,
  description,
  icon,
  badge,
  accentColor = "#0A5B9E",
  className,
}: CapabilityCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E2E8F0] rounded-sih-lg p-6 shadow-sih-card flex flex-col justify-between transition-all duration-200 hover:border-[#B2D4F0] hover:shadow-sih-dropdown relative overflow-hidden group",
        className
      )}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-200 group-hover:h-1.5"
        style={{ backgroundColor: accentColor }}
      />
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className="p-3 rounded-sih-md text-white shadow-sih-subtle"
            style={{ backgroundColor: accentColor }}
          >
            {icon}
          </div>
          {badge && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F6F8FB] text-[#5B6B82] border border-[#E2E8F0]">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-[#14213D] font-sans tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-xs text-[#5B6B82] leading-relaxed font-sans">
          {description}
        </p>
      </div>
    </div>
  );
}
