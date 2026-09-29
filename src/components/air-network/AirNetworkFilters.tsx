"use client";

import React from "react";
import { Airport } from "@/data/airports";
import { Filter, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AirNetworkFiltersProps {
  airports: Airport[];
  origin: string | null;
  destination: string | null;
  selectedAirline: string;
  selectedSource: string;
  selectedCabin: string;
  selectedWindow: string;
  selectedAirportType: "all" | "major" | "medium" | "small";
  selectedRouteType: "all" | "domestic" | "international";
  departureDate: string;
  viewMode: "network" | "route";
  onOriginChange: (code: string | null) => void;
  onDestinationChange: (code: string | null) => void;
  onAirlineChange: (airline: string) => void;
  onSourceChange: (source: string) => void;
  onCabinChange: (cabin: string) => void;
  onWindowChange: (window: string) => void;
  onAirportTypeChange: (type: "all" | "major" | "medium" | "small") => void;
  onRouteTypeChange: (type: "all" | "domestic" | "international") => void;
  onDateChange: (date: string) => void;
  onViewModeChange: (mode: "network" | "route") => void;
  onResetFilters: () => void;
  className?: string;
}

export function AirNetworkFilters({
  airports,
  origin,
  destination,
  selectedAirline,
  selectedSource,
  selectedCabin,
  selectedWindow,
  selectedAirportType,
  selectedRouteType,
  departureDate,
  viewMode,
  onOriginChange,
  onDestinationChange,
  onAirlineChange,
  onSourceChange,
  onCabinChange,
  onWindowChange,
  onAirportTypeChange,
  onRouteTypeChange,
  onDateChange,
  onViewModeChange,
  onResetFilters,
  className,
}: AirNetworkFiltersProps) {
  const windowOptions = ["T+1", "T+7", "T+15", "T+30", "T+45"];
  const airlines = ["All Airlines", "Air India", "IndiGo", "Vistara", "Akasa Air", "Singapore Airlines", "Emirates", "China Southern"];
  const sources = ["All Sources", "Airline Direct", "GDS", "OTA"];
  const cabins = ["All Cabins", "Economy", "Premium Economy", "Business"];

  return (
    <div className={cn("bg-white p-4 rounded-sih-xl border border-[#E2E8F0] shadow-sih-card space-y-4 select-none", className)}>
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[#EDF2F7] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-sih-md bg-[#0A5B9E] text-white">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
              Spatial Filter & Corridor Controls
            </h3>
            <p className="text-[11px] text-[#5B6B82] font-sans">
              Filter geographic network connections by origin, carrier, airport category, booking window, and fare source.
            </p>
          </div>
        </div>

        {/* View Mode Switcher (Network vs Route) */}
        <div className="flex items-center gap-2">
          <div className="bg-[#F6F8FB] p-1 rounded-sih-md border border-[#E2E8F0] flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => onViewModeChange("network")}
              className={cn(
                "px-3 py-1 rounded font-bold transition-all cursor-pointer",
                viewMode === "network" ? "bg-[#0A5B9E] text-white shadow-sm" : "text-[#5B6B82] hover:text-[#0A5B9E]"
              )}
            >
              Network View
            </button>
            <button
              onClick={() => onViewModeChange("route")}
              className={cn(
                "px-3 py-1 rounded font-bold transition-all cursor-pointer",
                viewMode === "route" ? "bg-[#0A5B9E] text-white shadow-sm" : "text-[#5B6B82] hover:text-[#0A5B9E]"
              )}
            >
              Route View
            </button>
          </div>

          <button
            onClick={onResetFilters}
            className="p-1.5 text-[#5B6B82] hover:text-[#0A5B9E] hover:bg-[#EAF3FB] rounded-sih-md border border-[#E2E8F0] transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Origin Airport Dropdown */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#8A99AD]">
            Origin Airport (FROM)
          </label>
          <select
            value={origin || ""}
            onChange={(e) => onOriginChange(e.target.value || null)}
            className="w-full bg-[#F6F8FB] border border-[#E2E8F0] rounded-sih-md px-3 py-1.5 text-xs font-mono font-bold text-[#0A5B9E] focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30 cursor-pointer"
          >
            <option value="">Select Origin...</option>
            {airports.map((ap) => (
              <option key={ap.id || ap.iata} value={ap.iata || ap.code}>
                {ap.iata || ap.code} — {ap.city} ({ap.name})
              </option>
            ))}
          </select>
        </div>

        {/* 2. Destination Airport Dropdown */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#8A99AD]">
            Destination (TO)
          </label>
          <select
            value={destination || ""}
            onChange={(e) => onDestinationChange(e.target.value || null)}
            className="w-full bg-[#F6F8FB] border border-[#E2E8F0] rounded-sih-md px-3 py-1.5 text-xs font-mono font-bold text-[#0A5B9E] focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30 cursor-pointer"
          >
            <option value="">All Destinations</option>
            {airports.map((ap) => (
              <option key={ap.id || ap.iata} value={ap.iata || ap.code} disabled={ap.iata === origin}>
                {ap.iata || ap.code} — {ap.city} ({ap.name})
              </option>
            ))}
          </select>
        </div>

        {/* 3. Airline Filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#8A99AD]">
            Carrier / Airline
          </label>
          <select
            value={selectedAirline}
            onChange={(e) => onAirlineChange(e.target.value)}
            className="w-full bg-[#F6F8FB] border border-[#E2E8F0] rounded-sih-md px-3 py-1.5 text-xs font-mono text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30 cursor-pointer"
          >
            {airlines.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Secondary Airport Category Filter */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#8A99AD]">
            Airport Category Filter
          </label>
          <select
            value={selectedAirportType}
            onChange={(e) => onAirportTypeChange(e.target.value as any)}
            className="w-full bg-[#F6F8FB] border border-[#E2E8F0] rounded-sih-md px-3 py-1.5 text-xs font-mono text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30 cursor-pointer"
          >
            <option value="all">All Airport Types</option>
            <option value="major">Major Hubs</option>
            <option value="medium">Medium Civil Airports</option>
            <option value="small">Regional Airports</option>
          </select>
        </div>
      </div>

      {/* Secondary Controls Bar */}
      <div className="pt-2 border-t border-[#EDF2F7] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        {/* Booking Horizon Pills */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A99AD]">
            Booking Window:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {windowOptions.map((win) => (
              <button
                key={win}
                onClick={() => onWindowChange(win)}
                className={cn(
                  "px-2.5 py-0.5 rounded font-bold text-xs transition-all cursor-pointer border",
                  selectedWindow === win
                    ? "bg-[#0A5B9E] text-white border-[#0A5B9E] shadow-sm"
                    : "bg-[#F6F8FB] text-[#5B6B82] border-[#E2E8F0] hover:border-[#0A5B9E] hover:text-[#0A5B9E]"
                )}
              >
                {win}
              </button>
            ))}
          </div>
        </div>

        {/* Route Type Filter (Domestic vs International) */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A99AD]">
            Route Scope:
          </span>
          <div className="bg-[#F6F8FB] p-0.5 rounded border border-[#E2E8F0] flex items-center gap-1">
            <button
              onClick={() => onRouteTypeChange("all")}
              className={cn(
                "px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer",
                selectedRouteType === "all" ? "bg-[#0A5B9E] text-white" : "text-[#5B6B82]"
              )}
            >
              All
            </button>
            <button
              onClick={() => onRouteTypeChange("domestic")}
              className={cn(
                "px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer",
                selectedRouteType === "domestic" ? "bg-[#0A5B9E] text-white" : "text-[#5B6B82]"
              )}
            >
              Domestic
            </button>
            <button
              onClick={() => onRouteTypeChange("international")}
              className={cn(
                "px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer",
                selectedRouteType === "international" ? "bg-[#0A5B9E] text-white" : "text-[#5B6B82]"
              )}
            >
              International
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
