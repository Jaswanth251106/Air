"use client";

import React from "react";
import { getFareCalendarData } from "@/data/marketData";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { useFilterContext } from "@/context/FilterContext";
import { Calendar as CalendarIcon, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function FareCalendarView() {
  const { filters, updateFilter } = useFilterContext();
  const calendarDays = getFareCalendarData();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className="bg-white p-5 rounded-sih-md border border-[#E2E8F0] shadow-sih-card space-y-4 select-none">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDF2F7] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#0A5B9E]" />
            <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
              Departure Date Fare Calendar (Oct 2026)
            </h3>
          </div>
          <p className="text-xs text-[#5B6B82] font-sans mt-0.5">
            Click any departure date to select itinerary departure context.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#FEF8EC] border border-[#FBE6B6]" /> Peak Fare Day</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#EFF8EF] border border-[#B9E4BA]" /> Standard Day</span>
        </div>
      </div>

      {/* Calendar Grid Header */}
      <div className="grid grid-cols-7 gap-2 text-center font-mono text-xs font-bold text-[#8A99AD] py-1 border-b border-[#E2E8F0]">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid Days */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((d) => {
          const isSelected = filters.departurePeriod.includes(`${d.dayNumber} Oct`) || filters.departurePeriod === d.date;
          return (
            <div
              key={d.date}
              onClick={() => updateFilter("departurePeriod", `${d.dayNumber} Oct 2026`)}
              className={cn(
                "p-2.5 rounded-sih-md border transition-all cursor-pointer flex flex-col justify-between h-20 relative overflow-hidden",
                isSelected
                  ? "border-[#0A5B9E] ring-2 ring-[#0A5B9E]/30 bg-[#EAF3FB]"
                  : d.isPeak
                  ? "bg-[#FEF8EC]/50 border-[#FBE6B6] hover:border-[#F3AC27]"
                  : "bg-white border-[#E2E8F0] hover:border-[#B2D4F0]"
              )}
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className={cn("font-bold", isSelected ? "text-[#0A5B9E]" : "text-[#14213D]")}>
                  {d.dayNumber}
                </span>
                {d.availability === "LIMITED" && (
                  <MetricBadge label="Ltd" variant="attention" size="sm" />
                )}
              </div>

              <div className="text-right">
                <span className="text-xs font-bold font-mono text-[#0A5B9E]">
                  ₹{(d.fare / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-[#EDF2F7] text-[11px] font-mono text-[#8A99AD] flex items-center justify-between">
        <span>Selected Departure Date: <strong className="text-[#0A5B9E]">{filters.departurePeriod}</strong></span>
        <span className="flex items-center gap-1"><Info className="w-3.5 h-3.5 text-[#0A5B9E]" /> Observed departure grid</span>
      </div>
    </div>
  );
}
