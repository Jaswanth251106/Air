"use client";

import React from "react";
import { Plane, Calendar, Layers, ShieldCheck, Clock, RefreshCw } from "lucide-react";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { useFilterContext } from "@/context/FilterContext";
import { cn } from "@/lib/utils";

interface ContextBarProps {
  className?: string;
  onRefresh?: () => void;
}

export function ContextBar({ className, onRefresh }: ContextBarProps) {
  const { filters } = useFilterContext();

  const isAllRoutes = (filters.origin === "ALL" || !filters.origin) && (filters.destination === "ALL" || !filters.destination);
  
  const routeDisplay = isAllRoutes
    ? "India / All Routes"
    : `${filters.origin} → ${filters.destination}`;

  const airlineDisplay = filters.airline === "all" || !filters.airline ? "All Airlines" : `Carrier: ${filters.airline}`;
  const cabinDisplay = filters.cabin === "all" || !filters.cabin ? "All Cabins" : `Cabin: ${filters.cabin.toUpperCase()}`;

  return (
    <div
      className={cn(
        "bg-[#14213D] text-white px-4 py-2 flex flex-wrap items-center justify-between text-xs font-mono shadow-sih-subtle border-b border-[#568AB2]/30 select-none",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        {/* Route context */}
        <div className="flex items-center gap-1.5 text-[#7DC9DE] font-bold">
          <Plane className="w-3.5 h-3.5 shrink-0" />
          <span>{routeDisplay}</span>
        </div>

        <span className="text-[#568AB2]">|</span>

        {/* Departure */}
        <div className="flex items-center gap-1.5 text-slate-200">
          <Calendar className="w-3.5 h-3.5 text-[#7DC9DE] shrink-0" />
          <span>Departure: {filters.departurePeriod}</span>
        </div>

        <span className="text-[#568AB2]">|</span>

        {/* Airline */}
        <div className="flex items-center gap-1.5 text-slate-200">
          <Layers className="w-3.5 h-3.5 text-[#7DC9DE] shrink-0" />
          <span>{airlineDisplay}</span>
        </div>

        <span className="text-[#568AB2]">|</span>

        {/* Cabin */}
        <div className="flex items-center gap-1.5 text-slate-200">
          <span>{cabinDisplay}</span>
        </div>

        <span className="text-[#568AB2]">|</span>

        {/* Booking Window Badge */}
        <div className="flex items-center gap-1.5">
          <MetricBadge label={filters.bookingWindow} variant="primary" size="sm" />
        </div>
      </div>

      <div className="flex items-center gap-4 text-[#8A99AD] text-[11px]">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4EB050]" />
          <span>Shared Shell Context</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Synced</span>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            title="Refresh filter state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
