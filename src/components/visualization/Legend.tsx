import React from "react";
import { cn } from "@/lib/utils";

export interface LegendItem {
  label: string;
  color: string;
  lineStyle?: "solid" | "dashed" | "dotted";
  type?: "observed" | "forecast" | "alert" | "validated" | "event" | "steel";
}

interface LegendProps {
  items: LegendItem[];
  className?: string;
}

export function Legend({ items, className }: LegendProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4 text-xs font-mono", className)}>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span
            className={cn(
              "w-5 h-0.5 inline-block",
              item.lineStyle === "dashed" && "border-b-2 border-dashed bg-transparent",
              item.lineStyle === "dotted" && "border-b-2 border-dotted bg-transparent",
              (!item.lineStyle || item.lineStyle === "solid") && "h-1 rounded"
            )}
            style={{
              backgroundColor: item.lineStyle === "solid" || !item.lineStyle ? item.color : "transparent",
              borderColor: item.color,
            }}
          />
          <span className="text-[#14213D] font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
