import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus, HelpCircle } from "lucide-react";
import { KPICardData } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { Tooltip } from "@/components/feedback/Tooltip";
import { cn } from "@/lib/utils";

export interface KPICardProps extends KPICardData {
  className?: string;
}

export function KPICard({
  title,
  value,
  unit,
  change,
  changeLabel,
  trend = "neutral",
  status,
  subtitle,
  tooltipText,
  className,
}: KPICardProps) {
  const getTrendColor = () => {
    if (trend === "up") return "text-[#D1262C] bg-[#FDF0F1]"; // Increase in fare is an alert/warning
    if (trend === "down") return "text-[#2FA9B8] bg-[#E6F6F8]"; // Decrease in fare is healthy
    return "text-[#68818C] bg-[#EBF3F5]";
  };

  const getTrendIcon = () => {
    if (trend === "up") return <ArrowUpRight className="w-3.5 h-3.5" />;
    if (trend === "down") return <ArrowDownRight className="w-3.5 h-3.5" />;
    return <Minus className="w-3.5 h-3.5" />;
  };

  const isLongValue = typeof value === "string" && value.length > 12;

  return (
    <div
      className={cn(
        "bg-white border border-[#D8E8EC] rounded-sih-md p-4 sm:p-5 shadow-sih-card flex flex-col justify-between transition-all hover:border-[#167D8D]/40 max-w-full overflow-hidden",
        className
      )}
    >
      <div>
        {/* Header: Title, Tooltip & Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 max-w-full">
          <div className="flex items-center gap-1 min-w-0 shrink">
            <h3 className="text-[11px] sm:text-xs font-semibold text-[#68818C] uppercase tracking-wider truncate">
              {title}
            </h3>
            {tooltipText && (
              <Tooltip content={tooltipText}>
                <HelpCircle className="w-3.5 h-3.5 text-[#95A7B0] shrink-0 cursor-help hover:text-[#167D8D]" />
              </Tooltip>
            )}
          </div>
          {status && <StatusBadge status={status} size="sm" />}
        </div>

        {/* Value and Unit Display */}
        <div className="flex items-baseline flex-wrap gap-1.5 mt-1 max-w-full overflow-hidden">
          <span
            className={cn(
              "font-bold text-[#17324D] tracking-tight font-sans break-words max-w-full",
              isLongValue ? "text-base sm:text-lg leading-snug" : "text-xl sm:text-2xl"
            )}
          >
            {value}
          </span>
          {unit && (
            <span className="text-[11px] sm:text-xs font-semibold text-[#68818C] font-mono uppercase shrink-0">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Trend Indicator & Change Label / Subtitle */}
      <div className="mt-3 pt-2.5 border-t border-[#EBF3F5] flex items-center justify-between text-xs max-w-full overflow-hidden">
        {change !== undefined && (
          <div className="flex items-center gap-1.5 min-w-0 max-w-full">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-medium font-mono shrink-0",
                getTrendColor()
              )}
            >
              {getTrendIcon()}
              <span>
                {change > 0 ? `+${change}%` : `${change}%`}
              </span>
            </span>
            {changeLabel && (
              <span className="text-[#68818C] text-[11px] truncate" title={changeLabel}>
                {changeLabel}
              </span>
            )}
          </div>
        )}
        {subtitle && !changeLabel && (
          <p className="text-[#95A7B0] text-[11px] truncate max-w-full">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
