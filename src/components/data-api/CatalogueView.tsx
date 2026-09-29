"use client";

import React, { useState, useMemo } from "react";
import { MOCK_CATALOGUE_OBSERVATIONS } from "@/data/dataApiData";
import { CatalogueObservation } from "@/types/dataApi";
import { ObservationDrawer } from "./ObservationDrawer";
import { Search, Filter, Eye, RefreshCw, Layers, Database } from "lucide-react";

interface CatalogueViewProps {
  onViewProvenance?: (provenanceId: string) => void;
}

export function CatalogueView({ onViewProvenance }: CatalogueViewProps) {
  const [selectedObs, setSelectedObs] = useState<CatalogueObservation | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [routeFilter, setRouteFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [airlineFilter, setAirlineFilter] = useState("ALL");
  const [cabinFilter, setCabinFilter] = useState("ALL");
  const [windowFilter, setWindowFilter] = useState("ALL");
  const [availFilter, setAvailFilter] = useState("ALL");

  // Filtering Logic (Section 6 requirement: Filters MUST actually change the table)
  const filteredObservations = useMemo(() => {
    return MOCK_CATALOGUE_OBSERVATIONS.filter((obs) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          obs.id.toLowerCase().includes(q) ||
          obs.route.toLowerCase().includes(q) ||
          obs.airline.toLowerCase().includes(q) ||
          obs.flightNumber.toLowerCase().includes(q) ||
          obs.provenanceId.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }
      if (routeFilter !== "ALL" && obs.route !== routeFilter) return false;
      if (sourceFilter !== "ALL" && obs.source !== sourceFilter) return false;
      if (airlineFilter !== "ALL" && obs.airline !== airlineFilter) return false;
      if (cabinFilter !== "ALL" && obs.cabin !== cabinFilter) return false;
      if (windowFilter !== "ALL" && obs.bookingWindow !== windowFilter) return false;
      if (availFilter !== "ALL" && obs.availability !== availFilter) return false;

      return true;
    });
  }, [searchQuery, routeFilter, sourceFilter, airlineFilter, cabinFilter, windowFilter, availFilter]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setRouteFilter("ALL");
    setSourceFilter("ALL");
    setAirlineFilter("ALL");
    setCabinFilter("ALL");
    setWindowFilter("ALL");
    setAvailFilter("ALL");
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#0A5B9E]" />
            <h2 className="text-lg font-bold text-[#14213D]">Data Catalogue</h2>
          </div>
          <p className="text-sm text-[#5C728A] mt-1">
            Explore normalized statistical observations and airfare records used across national index calculations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#0A5B9E]/10 text-[#0A5B9E] font-bold text-xs rounded border border-[#0A5B9E]/30">
            {filteredObservations.length} of {MOCK_CATALOGUE_OBSERVATIONS.length} Records
          </span>
        </div>
      </div>

      {/* Catalogue Interactive Filter Bar (Section 6) */}
      <div className="bg-white p-4 rounded-lg border border-[#D9E2EC] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#14213D] uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#0A5B9E]" /> Catalogue Multi-Parametric Filters
          </span>
          <button
            onClick={handleResetFilters}
            className="text-xs text-[#0A5B9E] hover:underline flex items-center gap-1 font-medium"
          >
            <RefreshCw className="w-3 h-3" /> Reset Filters
          </button>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          {/* Search Input */}
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#5C728A]" />
            <input
              type="text"
              placeholder="Search OBS ID, Flight, Route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-[#D9E2EC] rounded bg-[#F0F4F8] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0A5B9E] text-xs text-[#14213D]"
            />
          </div>

          {/* Route Filter */}
          <select
            value={routeFilter}
            onChange={(e) => setRouteFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-[#D9E2EC] rounded bg-[#F0F4F8] focus:bg-white text-xs text-[#14213D] font-medium"
          >
            <option value="ALL">All Routes</option>
            <option value="MAA → DEL">MAA → DEL</option>
            <option value="DEL → BOM">DEL → BOM</option>
            <option value="BLR → DEL">BLR → DEL</option>
            <option value="BOM → CCU">BOM → CCU</option>
            <option value="HYD → DEL">HYD → DEL</option>
            <option value="BLR → HYD">BLR → HYD</option>
            <option value="CCU → DEL">CCU → DEL</option>
          </select>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-[#D9E2EC] rounded bg-[#F0F4F8] focus:bg-white text-xs text-[#14213D] font-medium"
          >
            <option value="ALL">All Sources</option>
            <option value="Direct Airline API">Direct Airline API</option>
            <option value="GDS">GDS</option>
            <option value="OTA">OTA</option>
          </select>

          {/* Airline Filter */}
          <select
            value={airlineFilter}
            onChange={(e) => setAirlineFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-[#D9E2EC] rounded bg-[#F0F4F8] focus:bg-white text-xs text-[#14213D] font-medium"
          >
            <option value="ALL">All Airlines</option>
            <option value="IndiGo">IndiGo</option>
            <option value="Air India">Air India</option>
            <option value="Vistara">Vistara</option>
            <option value="Akasa Air">Akasa Air</option>
            <option value="SpiceJet">SpiceJet</option>
          </select>

          {/* Cabin Filter */}
          <select
            value={cabinFilter}
            onChange={(e) => setCabinFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-[#D9E2EC] rounded bg-[#F0F4F8] focus:bg-white text-xs text-[#14213D] font-medium"
          >
            <option value="ALL">All Cabins</option>
            <option value="economy">Economy</option>
            <option value="premium_economy">Premium Economy</option>
            <option value="business">Business</option>
          </select>

          {/* Booking Window Filter */}
          <select
            value={windowFilter}
            onChange={(e) => setWindowFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-[#D9E2EC] rounded bg-[#F0F4F8] focus:bg-white text-xs text-[#14213D] font-medium"
          >
            <option value="ALL">All Windows</option>
            <option value="T+1">T+1</option>
            <option value="T+7">T+7</option>
            <option value="T+15">T+15</option>
            <option value="T+30">T+30</option>
            <option value="T+45">T+45</option>
          </select>

          {/* Availability Filter */}
          <select
            value={availFilter}
            onChange={(e) => setAvailFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-[#D9E2EC] rounded bg-[#F0F4F8] focus:bg-white text-xs text-[#14213D] font-medium"
          >
            <option value="ALL">All Availability</option>
            <option value="AVAILABLE">Available</option>
            <option value="LIMITED">Limited</option>
          </select>
        </div>
      </div>

      {/* Data Catalogue Table */}
      <div className="bg-white rounded-lg border border-[#D9E2EC] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#14213D]">
            <thead className="bg-[#E4E7EB]/50 text-[#5C728A] font-semibold uppercase tracking-wider text-[11px] border-b border-[#D9E2EC]">
              <tr>
                <th className="p-3">Observation ID</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Route</th>
                <th className="p-3">Source</th>
                <th className="p-3">Airline / Flight</th>
                <th className="p-3">Cabin / Family</th>
                <th className="p-3 text-center">Window</th>
                <th className="p-3 text-right">Total Fare</th>
                <th className="p-3 text-center">Availability</th>
                <th className="p-3 text-center">Version</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EB]">
              {filteredObservations.length > 0 ? (
                filteredObservations.map((obs) => (
                  <tr
                    key={obs.id}
                    onClick={() => setSelectedObs(obs)}
                    className="hover:bg-[#F0F4F8] transition-colors cursor-pointer"
                  >
                    <td className="p-3 font-mono font-bold text-[#0A5B9E]">{obs.id}</td>
                    <td className="p-3 text-[#5C728A] text-[11px]">{obs.timestamp}</td>
                    <td className="p-3 font-bold text-[#14213D]">{obs.route}</td>
                    <td className="p-3 text-[#5C728A]">{obs.source}</td>
                    <td className="p-3 font-medium">
                      {obs.airline} <span className="text-[#9FB3C8]">({obs.flightNumber})</span>
                    </td>
                    <td className="p-3 text-[#5C728A] capitalize">
                      {obs.cabin.replace("_", " ")} • <span className="text-[#14213D]">{obs.fareFamily}</span>
                    </td>
                    <td className="p-3 text-center font-bold text-[#0A5B9E] bg-[#F0F4F8] rounded">
                      {obs.bookingWindow}
                    </td>
                    <td className="p-3 text-right font-bold text-sm text-[#14213D]">
                      ₹{obs.totalFare.toLocaleString()}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          obs.availability === "AVAILABLE"
                            ? "bg-[#4EB050]/10 text-[#4EB050] border border-[#4EB050]/30"
                            : "bg-[#F3AC27]/10 text-[#B87A00] border border-[#F3AC27]/30"
                        }`}
                      >
                        {obs.availability}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono text-[#9FB3C8]">{obs.version}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedObs(obs);
                        }}
                        className="px-2.5 py-1 bg-[#F0F4F8] hover:bg-[#0A5B9E] text-[#0A5B9E] hover:text-white font-medium rounded text-xs transition-colors inline-flex items-center gap-1 border border-[#D9E2EC]"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="p-8 text-center text-[#5C728A]">
                    No observation records matched the active filter criteria. Try resetting filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Observation Detail Drawer */}
      <ObservationDrawer
        observation={selectedObs}
        onClose={() => setSelectedObs(null)}
        onViewProvenance={onViewProvenance}
      />
    </div>
  );
}
