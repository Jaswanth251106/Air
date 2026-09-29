import React from "react";
import { TrendingUp, Minus, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeatmapLegendProps {
  className?: string;
}

export function HeatmapLegend({ className }: HeatmapLegendProps) {
  const items = [
    {
      label: "Increasing Fare (> +5%)",
      color: "#D1262C",
      bg: "bg-[#FDF0F1]",
      border: "border-[#F7C1C3]",
      icon: <TrendingUp className="w-3.5 h-3.5 text-[#D1262C]" />,
    },
    {
      label: "Stable Movement (± 5%)",
      color: "#568AB2",
      bg: "bg-[#EEF4F8]",
      border: "border-[#BDD3E4]",
      icon: <Minus className="w-3.5 h-3.5 text-[#568AB2]" />,
    },
    {
      label: "Decreasing Fare (< -2%)",
      color: "#4EB050",
      bg: "bg-[#EFF8EF]",
      border: "border-[#B9E4BA]",
      icon: <TrendingDown className="w-3.5 h-3.5 text-[#4EB050]" />,
    },
  ];

  return (
    <div className={cn("flex flex-wrap items-center gap-3 text-xs font-mono select-none", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded border font-semibold",
            item.bg,
            item.border
          )}
        >
          {item.icon}
          <span className="text-[#14213D]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
