"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterBar } from "@/components/forms/FilterBar";
import { Tabs } from "@/components/navigation/Tabs";
import { BookingWindowCards } from "./BookingWindowCards";
import { LeadTimeCurve } from "./LeadTimeCurve";
import { RouteHistoryChart } from "./RouteHistoryChart";
import { ObservationTable } from "./ObservationTable";
import { ProductDefinitionPanel } from "./ProductDefinitionPanel";
import { FareComponentsView } from "./FareComponentsView";
import { AirlineComparisonView } from "./AirlineComparisonView";
import { OTAComparisonView } from "./OTAComparisonView";
import { AvailabilityView } from "./AvailabilityView";
import { FareCalendarView } from "./FareCalendarView";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { DataStatus } from "@/components/status/DataStatus";
import { Button } from "@/components/forms/Button";
import { Plane, Layers, Sparkles, Calendar, ShieldCheck, ArrowRight, Calculator, GitBranch } from "lucide-react";
import { useFilterContext } from "@/context/FilterContext";
import {
  MOCK_BOOKING_WINDOW_SUMMARIES,
  getLeadTimeCurveData,
  getRouteHistoryData,
  MOCK_FLIGHT_OBSERVATIONS,
} from "@/data/marketData";
import { MarketViewTab } from "@/types/marketData";
import { TimePeriod } from "@/types/overview";

export function MarketDataPage() {
  const searchParams = useSearchParams();
  const initialView = (searchParams.get("view") as MarketViewTab) || "explorer";

  const [activeTab, setActiveTab] = useState<MarketViewTab>(initialView);
  const [historyPeriod, setHistoryPeriod] = useState<TimePeriod>("30D");

  const { filters } = useFilterContext();

  const routeDisplay = `${filters.origin === "ALL" ? "MAA" : filters.origin} → ${filters.destination === "ALL" ? "DEL" : filters.destination}`;
  const routeKey = `${filters.origin === "ALL" ? "MAA" : filters.origin}-${filters.destination === "ALL" ? "DEL" : filters.destination}`;

  const bookingSummaries = MOCK_BOOKING_WINDOW_SUMMARIES[routeKey] || MOCK_BOOKING_WINDOW_SUMMARIES["MAA-DEL"];
  const leadTimeData = getLeadTimeCurveData(filters.origin, filters.destination);
  const historyData = getRouteHistoryData(historyPeriod);

  const tabs = [
    { id: "explorer", label: "ROUTE EXPLORER", icon: <Plane className="w-3.5 h-3.5" /> },
    { id: "airlines", label: "AIRLINE COMPARISON", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "otas", label: "OTA COMPARISON", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "fare-components", label: "FARE COMPONENTS", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "availability", label: "AVAILABILITY", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: "fare-calendar", label: "FARE CALENDAR", icon: <Calendar className="w-3.5 h-3.5" /> },
  ];

  const queryParams = new URLSearchParams({
    origin: filters.origin === "ALL" ? "MAA" : filters.origin,
    destination: filters.destination === "ALL" ? "DEL" : filters.destination,
    window: filters.bookingWindow,
  }).toString();

  return (
    <div className="flex-1 p-4 lg:p-8 max-w-[1440px] mx-auto w-full space-y-6 select-none">
      {/* 1. Page Header */}
      <PageHeader
        title="Market Data & Route Explorer"
        description="Investigate airfare behavior across booking horizons, sources and fare structures."
        breadcrumbItems={[
          { label: "Market Data", href: "/market-data" },
          { label: routeDisplay },
        ]}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <DataStatus label="Observed Fares" variant="prototype" />
            <Link href={`/index-engine?${queryParams}`} className="no-underline">
              <Button
                variant="outline"
                size="sm"
                icon={<Calculator className="w-3.5 h-3.5 text-[#0A5B9E]" />}
              >
                Index Contribution
              </Button>
            </Link>
            <Link href={`/intelligence?${queryParams}`} className="no-underline">
              <Button
                variant="outline"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5 text-[#6F498E]" />}
                iconPosition="right"
              >
                Forecast & Surge
              </Button>
            </Link>
          </div>
        }
      />

      {/* 2. Compact Market Data Summary Strip (Section 21) */}
      <div className="bg-[#14213D] text-white p-4 rounded-sih-md shadow-sih-card border border-[#568AB2]/30 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[#0A5B9E] text-white font-bold">
            {routeDisplay}
          </div>
          <div>
            <span className="text-[#8A99AD] text-[10px] uppercase">Representative Fare</span>
            <p className="text-lg font-bold text-[#4EB050]">₹5,130</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="text-[#8A99AD] text-[10px] uppercase">Horizon</span>
            <p className="font-bold text-white">{filters.bookingWindow}</p>
          </div>
          <div>
            <span className="text-[#8A99AD] text-[10px] uppercase">Channels Monitored</span>
            <p className="font-bold text-[#7DC9DE]">4 Sources</p>
          </div>
          <div>
            <span className="text-[#8A99AD] text-[10px] uppercase">Observations</span>
            <p className="font-bold text-white">28 Sampled</p>
          </div>
          <div>
            <span className="text-[#8A99AD] text-[10px] uppercase">Availability</span>
            <MetricBadge label="AVAILABLE" variant="validated" size="sm" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/data-api?view=provenance&id=PROV-${routeKey}-001`} className="no-underline">
            <span className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-[#7DC9DE] rounded text-[11px] font-bold transition-colors flex items-center gap-1 border border-[#568AB2]/40">
              <GitBranch className="w-3 h-3" /> Trace Provenance
            </span>
          </Link>
        </div>
      </div>

      {/* 3. Global Filter Control Bar */}
      <FilterBar />

      {/* 4. Sub-View Navigation Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as MarketViewTab)}
      />

      {/* 5. View Switcher Content */}
      {activeTab === "explorer" && (
        <div className="space-y-6">
          {/* Five Booking Window Cards */}
          <BookingWindowCards summaries={bookingSummaries} />

          {/* Lead Time Price Curve + Product Definition Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8 flex flex-col justify-between">
              <LeadTimeCurve data={leadTimeData} routeDisplay={routeDisplay} />
            </div>
            <div className="lg:col-span-4 flex flex-col justify-between">
              <ProductDefinitionPanel />
            </div>
          </div>

          {/* Route History Chart */}
          <RouteHistoryChart
            data={historyData}
            period={historyPeriod}
            onPeriodChange={setHistoryPeriod}
            routeDisplay={routeDisplay}
          />

          {/* Detailed Flight Observations Table & Drawer */}
          <ObservationTable observations={MOCK_FLIGHT_OBSERVATIONS} />
        </div>
      )}

      {activeTab === "airlines" && <AirlineComparisonView />}
      {activeTab === "otas" && <OTAComparisonView />}
      {activeTab === "fare-components" && <FareComponentsView />}
      {activeTab === "availability" && <AvailabilityView />}
      {activeTab === "fare-calendar" && <FareCalendarView />}
    </div>
  );
}
