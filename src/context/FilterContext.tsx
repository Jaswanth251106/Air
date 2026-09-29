"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FilterState, BookingWindow, CabinClass, SourceType } from "@/types";

export interface FilterContextType {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  setRoute: (origin: string, destination: string) => void;
  setMarketContext: (partialFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

const DEFAULT_FILTERS: FilterState = {
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

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sync state from URL query params on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const origin = params.get("origin");
      const destination = params.get("destination");
      const windowParam = params.get("window") as BookingWindow | null;
      const airline = params.get("airline");
      const cabin = params.get("cabin") as CabinClass | null;

      const updates: Partial<FilterState> = {};
      if (origin) updates.origin = origin;
      if (destination) updates.destination = destination;
      if (windowParam) updates.bookingWindow = windowParam;
      if (airline) updates.airline = airline;
      if (cabin) updates.cabin = cabin;

      if (Object.keys(updates).length > 0) {
        setFilters((prev) => ({ ...prev, ...updates }));
      }
    }
  }, []);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const setRoute = (origin: string, destination: string) => {
    setFilters((prev) => ({ ...prev, origin, destination }));
  };

  const setMarketContext = (partialFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partialFilters }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        updateFilter,
        setRoute,
        setMarketContext,
        resetFilters,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
