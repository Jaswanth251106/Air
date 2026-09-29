import React from "react";
import { Legend, LegendItem } from "./Legend";
import { StatusBadge } from "@/components/data-display/StatusBadge";
import { DataStatus } from "@/types";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  status?: DataStatus;
  legendItems?: LegendItem[];
  children: React.ReactNode;
  action?: React.ReactNode;
  height?: number | string;
  className?: string;
}

export function ChartContainer({
  title,
  subtitle,
  status = "observed",
  legendItems = [
    { label: "Observed Fare (Solid)", color: "#167D8D", lineStyle: "solid" },
    { label: "ML Forecast Curve (Dashed)", color: "#59C7CB", lineStyle: "dashed" },
    { label: "95% Uncertainty Band", color: "#2FA9B8", lineStyle: "dotted" },
  ],
  children,
  action,
  height = 320,
  className,
}: ChartContainerProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#D8E8EC] rounded-sih-md p-5 shadow-sih-card flex flex-col justify-between",
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4 pb-3 border-b border-[#EBF3F5]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#17324D] uppercase tracking-wider font-mono">
              {title}
            </h3>
            {status && <StatusBadge status={status} />}
          </div>
          {subtitle && (
            <p className="text-xs text-[#68818C] mt-1 font-sans">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {legendItems && <Legend items={legendItems} />}
          {action && <div>{action}</div>}
        </div>
      </div>

      <div style={{ height: typeof height === "number" ? `${height}px` : height }} className="w-full relative">
        {children}
      </div>

      <div className="mt-4 pt-2 border-t border-[#EBF3F5] flex items-center justify-between text-[11px] text-[#95A7B0] font-mono">
        <span>Visual Primitive Container: Recharts / SVG Engine</span>
        <span>Analogous Theme: Deep Teal = Observed | Aqua = Forecast | Cyan = Bounds</span>
      </div>
    </div>
  );
}
