import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricTrendProps {
  value: number;
  suffix?: string;
  invert?: boolean; // If true, increase is good and decrease is bad
  className?: string;
}

export function MetricTrend({ value, suffix = "%", invert = false, className }: MetricTrendProps) {
  const isPositive = value > 0;
  const isZero = value === 0;

  // By default for airfare: positive price change = warning (red), negative price change = healthy (teal/cyan)
  let textColor = "text-[#68818C]";
  let bgColor = "bg-[#EBF3F5]";
  let Icon = Minus;

  if (!isZero) {
    if (isPositive) {
      Icon = TrendingUp;
      textColor = invert ? "text-[#2FA9B8]" : "text-[#D1262C]";
      bgColor = invert ? "bg-[#E6F6F8]" : "bg-[#FDF0F1]";
    } else {
      Icon = TrendingDown;
      textColor = invert ? "text-[#D1262C]" : "text-[#2FA9B8]";
      bgColor = invert ? "bg-[#FDF0F1]" : "bg-[#E6F6F8]";
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold font-mono",
        textColor,
        bgColor,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>
        {isPositive ? `+${value}` : value}
        {suffix}
      </span>
    </span>
  );
}
