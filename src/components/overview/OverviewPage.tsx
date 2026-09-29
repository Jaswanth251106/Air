"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterBar } from "@/components/forms/FilterBar";
import { DataStatus } from "@/components/status/DataStatus";
import { OverviewKPIGrid } from "./OverviewKPIGrid";
import { NationalIndexChart } from "./NationalIndexChart";
import { MarketPulse } from "./MarketPulse";
import { RouteHeatmap } from "./RouteHeatmap";
import { RecentMovementsTable } from "./RecentMovementsTable";
import { MethodologyDrawer } from "./MethodologyDrawer";
import { Button } from "@/components/forms/Button";
import { BookOpen, ArrowRight, Compass } from "lucide-react";
import { useFilterContext } from "@/context/FilterContext";
import {
  getOverviewKPIs,
  getOverviewTrendSeries,
  MOCK_MARKET_PULSE,
  MOCK_ROUTE_MOVEMENTS,
} from "@/data/overviewData";
import { TimePeriod, RouteMovement } from "@/types/overview";

export function OverviewPage() {
  const router = useRouter();
  const { filters, setRoute, updateFilter } = useFilterContext();
  const [period, setPeriod] = useState<TimePeriod>("30D");
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  // Data-driven calculation based on current filter state (Booking Window & Time Period)
  const kpiMetrics = getOverviewKPIs(filters.bookingWindow);
  const trendData = getOverviewTrendSeries(period, filters.bookingWindow);

  const handleRouteSelect = (r: RouteMovement) => {
    setRoute(r.origin, r.destination);
    updateFilter("bookingWindow", r.bookingWindow);
    const query = new URLSearchParams({
      from: r.origin,
      to: r.destination,
      window: r.bookingWindow,
    }).toString();
    router.push(`/air-network?${query}`);
  };

  return (
    <div className="flex-1 p-4 lg:p-8 max-w-[1440px] mx-auto w-full space-y-6">
      {/* 1. Page Header */}
      <PageHeader
        title="Overview"
        description="Monitor national airfare movement across India."
        breadcrumbItems={[{ label: "Overview" }]}
        action={
          <div className="flex items-center gap-3">
            <DataStatus label="Operational Data" variant="prototype" />
            <Button
              variant="outline"
              size="sm"
              icon={<BookOpen className="w-3.5 h-3.5 text-[#0A5B9E]" />}
              onClick={() => setIsMethodologyOpen(true)}
            >
              Open Methodology
            </Button>
          </div>
        }
      />

      {/* 2. Global Filter Bar (Modifies page & context state dynamically) */}
      <FilterBar />

      {/* 3. 5 KPI Cards Section */}
      <OverviewKPIGrid metrics={kpiMetrics} bookingWindow={filters.bookingWindow} />

      {/* 4. Main Index Trend (8 cols) + Market Pulse (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col justify-between">
          <NationalIndexChart
            data={trendData}
            period={period}
            onPeriodChange={setPeriod}
            bookingWindow={filters.bookingWindow}
          />
        </div>
        <div className="lg:col-span-4 flex flex-col justify-between">
          <MarketPulse pulseData={MOCK_MARKET_PULSE} />
        </div>
      </div>

      {/* 5. Air Network Explorer Entry Point */}
      <div className="bg-[#14213D] text-white p-5 rounded-sih-xl shadow-sih-card flex flex-col md:flex-row items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-sih-md bg-[#0A5B9E] text-white">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
              Air Network Explorer
            </h3>
            <p className="text-xs text-blue-100 mt-0.5">
              Explore geographic route connections, airport nodes, and spatial airfare signals.
            </p>
          </div>
        </div>
        <Link href="/air-network" className="no-underline shrink-0">
          <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
            Explore Network →
          </Button>
        </Link>
      </div>

      {/* 6. India Route Heatmap Visual */}
      <RouteHeatmap routes={MOCK_ROUTE_MOVEMENTS} onSelectRoute={handleRouteSelect} />

      {/* 6. Recent Market Movements Table */}
      <RecentMovementsTable movements={MOCK_ROUTE_MOVEMENTS} />

      {/* 7. Methodology Drawer */}
      <MethodologyDrawer
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
