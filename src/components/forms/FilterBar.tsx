"use client";

import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { Select } from "./Select";
import { SegmentedControl } from "./SegmentedControl";
import { SearchInput } from "./SearchInput";
import { Button } from "./Button";
import { MOCK_AIRLINES, MOCK_BOOKING_WINDOWS } from "@/data/mockData";
import { useFilterContext } from "@/context/FilterContext";
import { BookingWindow, FilterState } from "@/types";

export interface FilterBarProps {
  filters?: FilterState;
  onUpdateFilter?: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters?: () => void;
  className?: string;
}

export function FilterBar({
  filters: propsFilters,
  onUpdateFilter: propsUpdateFilter,
  onResetFilters: propsResetFilters,
  className,
}: FilterBarProps) {
  // Use context if available; fallback to props
  let contextFilters: FilterState;
  let contextUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  let contextResetFilters: () => void;

  try {
    const ctx = useFilterContext();
    contextFilters = ctx.filters;
    contextUpdateFilter = ctx.updateFilter;
    contextResetFilters = ctx.resetFilters;
  } catch {
    contextFilters = propsFilters || {
      origin: "ALL",
      destination: "ALL",
      departurePeriod: "Next 30 Days",
      airline: "all",
      sourceType: "all",
      cabin: "economy",
      fareFamily: "Standard Flex",
      bookingWindow: "T+30",
      timeRange: "30d",
      searchQuery: "",
    };
    contextUpdateFilter = propsUpdateFilter || (() => {});
    contextResetFilters = propsResetFilters || (() => {});
  }

  const activeFilters = propsFilters || contextFilters;
  const handleUpdate = propsUpdateFilter || contextUpdateFilter;
  const handleReset = propsResetFilters || contextResetFilters;

  const originOptions = [
    { value: "ALL", label: "All Origins (India)" },
    { value: "MAA", label: "MAA (Chennai)" },
    { value: "DEL", label: "DEL (New Delhi)" },
    { value: "BOM", label: "BOM (Mumbai)" },
    { value: "BLR", label: "BLR (Bengaluru)" },
    { value: "CCU", label: "CCU (Kolkata)" },
    { value: "HYD", label: "HYD (Hyderabad)" },
  ];

  const destinationOptions = [
    { value: "ALL", label: "All Destinations (India)" },
    { value: "DEL", label: "DEL (New Delhi)" },
    { value: "BOM", label: "BOM (Mumbai)" },
    { value: "BLR", label: "BLR (Bengaluru)" },
    { value: "MAA", label: "MAA (Chennai)" },
    { value: "CCU", label: "CCU (Kolkata)" },
    { value: "HYD", label: "HYD (Hyderabad)" },
  ];

  const airlineOptions = [
    { value: "all", label: "All Airlines" },
    ...MOCK_AIRLINES.map((a) => ({ value: a.code, label: `${a.name} (${a.code})` })),
  ];

  const sourceTypeOptions = [
    { value: "all", label: "All Sources" },
    { value: "Direct Airline API", label: "Direct Carrier API" },
    { value: "GDS", label: "GDS Sabre/Amadeus" },
    { value: "OTA", label: "OTA Feed" },
    { value: "Metasearch", label: "Metasearch" },
  ];

  const cabinOptions = [
    { value: "all", label: "All Cabins" },
    { value: "economy", label: "Economy" },
    { value: "premium_economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
  ];

  const bookingWindowSegments = MOCK_BOOKING_WINDOWS.map((bw) => ({
    value: bw,
    label: bw,
  }));

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-sih-md p-4 shadow-sih-card mb-6 flex flex-col gap-4 select-none">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#EDF2F7] pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#0A5B9E]" />
          <h4 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
            Global Filter Controls
          </h4>
          <span className="text-[11px] font-mono text-[#5B6B82] bg-[#F6F8FB] px-2 py-0.5 rounded border border-[#E2E8F0]">
            Shared UI State
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Reset Filters
        </Button>
      </div>

      {/* Primary Filter Selects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Select
          label="Origin"
          value={activeFilters.origin}
          onChange={(val) => handleUpdate("origin", val)}
          options={originOptions}
        />
        <Select
          label="Destination"
          value={activeFilters.destination}
          onChange={(val) => handleUpdate("destination", val)}
          options={destinationOptions}
        />
        <Select
          label="Airline"
          value={activeFilters.airline}
          onChange={(val) => handleUpdate("airline", val)}
          options={airlineOptions}
        />
        <Select
          label="Source Data"
          value={activeFilters.sourceType}
          onChange={(val) => handleUpdate("sourceType", val as any)}
          options={sourceTypeOptions}
        />
        <Select
          label="Cabin Class"
          value={activeFilters.cabin}
          onChange={(val) => handleUpdate("cabin", val as any)}
          options={cabinOptions}
        />
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-sans">
            Search
          </label>
          <SearchInput
            value={activeFilters.searchQuery}
            onChange={(val) => handleUpdate("searchQuery", val)}
            placeholder="Filter corridor..."
          />
        </div>
      </div>

      {/* Booking Window & Context Feedback */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#EDF2F7]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
            Booking Window:
          </span>
          <SegmentedControl
            options={bookingWindowSegments}
            value={activeFilters.bookingWindow}
            onChange={(val) => handleUpdate("bookingWindow", val as BookingWindow)}
            size="sm"
          />
        </div>
        <div className="text-xs text-[#5B6B82] font-mono">
          Context Preview:{" "}
          <span className="font-bold text-[#0A5B9E]">
            {activeFilters.origin === "ALL" && activeFilters.destination === "ALL"
              ? "India / All Routes"
              : `${activeFilters.origin} → ${activeFilters.destination}`}
          </span>{" "}
          | Horizon {activeFilters.bookingWindow}
        </div>
      </div>
    </div>
  );
}
