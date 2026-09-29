"use client";

import { useState } from "react";
import { FilterState } from "@/types";

const INITIAL_FILTER_STATE: FilterState = {
  origin: "MAA",
  destination: "DEL",
  departurePeriod: "Next 30 Days",
  airline: "all",
  sourceType: "all",
  cabin: "economy",
  fareFamily: "Standard Flex",
  bookingWindow: "T+30",
  timeRange: "30d",
  searchQuery: "",
};

export function useFilterState(initialOverriddenState?: Partial<FilterState>) {
  const [filters, setFilters] = useState<FilterState>({
    ...INITIAL_FILTER_STATE,
    ...initialOverriddenState,
  });

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTER_STATE);
  };

  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
  };
}
