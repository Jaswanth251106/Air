"use client";

import React from "react";
import { BookingWindowSummary } from "@/types/marketData";
import { BookingWindow } from "@/types";
import { MetricTrend } from "@/components/visualization/MetricTrend";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { useFilterContext } from "@/context/FilterContext";
import { cn } from "@/lib/utils";

interface BookingWindowCardsProps {
  summaries: BookingWindowSummary[];
  className?: string;
}

export function BookingWindowCards({ summaries, className }: BookingWindowCardsProps) {
  const { filters, updateFilter } = useFilterContext();

  return (
    <div className={cn("space-y-2 select-none", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
          Booking Horizons (Lead Time Comparison)
        </h3>
        <span className="text-[11px] font-mono text-[#5B6B82]">Click card to inspect horizon</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {summaries.map((s) => {
          const isSelected = filters.bookingWindow === s.window;
          return (
            <div
              key={s.window}
              onClick={() => updateFilter("bookingWindow", s.window as BookingWindow)}
              className={cn(
                "p-4 rounded-sih-md border transition-all cursor-pointer flex flex-col justify-between bg-white shadow-sih-subtle hover:border-[#B2D4F0] relative overflow-hidden",
                isSelected
                  ? "border-[#0A5B9E] ring-2 ring-[#0A5B9E]/20 shadow-sih-card"
                  : "border-[#E2E8F0]"
              )}
            >
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-1",
                  isSelected ? "bg-[#0A5B9E]" : "bg-transparent"
                )}
              />

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-extrabold text-[#14213D] font-mono">
                  {s.window}
                </span>
                <MetricBadge
                  label={s.availability}
                  variant={s.availability === "Limited" ? "attention" : "validated"}
                  size="sm"
                />
              </div>

              <div>
                <span className="text-xl font-bold text-[#14213D] font-sans tracking-tight">
                  ₹{s.fare.toLocaleString("en-IN")}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <MetricTrend value={s.change} />
                  <span className="text-[10px] font-mono text-[#8A99AD] truncate max-w-[90px]" title={s.source}>
                    {s.source}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
