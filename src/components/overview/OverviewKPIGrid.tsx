import React from "react";
import { KPICard } from "@/components/data-display/KPICard";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { OverviewKPIMetrics } from "@/types/overview";
import { BookingWindow } from "@/types";

interface OverviewKPIGridProps {
  metrics: OverviewKPIMetrics;
  bookingWindow?: BookingWindow;
}

export function OverviewKPIGrid({ metrics, bookingWindow = "T+30" }: OverviewKPIGridProps) {
  return (
    <ContentGrid columns={6} className="mb-6">
      {/* CARD 1: National Airfare Index */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-2">
        <KPICard
          title="National Airfare Index"
          value={metrics.nationalIndex.toFixed(1)}
          unit="pts"
          change={metrics.nationalIndexChange}
          changeLabel={metrics.referencePeriod}
          trend={metrics.nationalIndexChange > 0 ? "up" : "down"}
          status="observed"
          subtitle={`Weighted composite at ${bookingWindow}`}
          tooltipText="Paasche composite index normalized to base period (Jan 2026 = 100.0)"
        />
      </div>

      {/* CARD 2: Daily Change */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-1">
        <KPICard
          title="Daily Change"
          value={`${metrics.dailyChange > 0 ? "+" : ""}${metrics.dailyChange}%`}
          unit="24h shift"
          change={metrics.dailyChange}
          changeLabel="vs yesterday 09:00"
          trend={metrics.dailyChange > 0 ? "up" : "down"}
          status="observed"
        />
      </div>

      {/* CARD 3: Weekly Change */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-1">
        <KPICard
          title="Weekly Change"
          value={`${metrics.weeklyChange > 0 ? "+" : ""}${metrics.weeklyChange}%`}
          unit="7-day shift"
          change={metrics.weeklyChange}
          changeLabel="vs 7d baseline"
          trend={metrics.weeklyChange > 0 ? "up" : "down"}
          status="validated"
        />
      </div>

      {/* CARD 4: Monthly Change */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-1">
        <KPICard
          title="Monthly Change"
          value={`${metrics.monthlyChange > 0 ? "+" : ""}${metrics.monthlyChange}%`}
          unit="30-day shift"
          change={metrics.monthlyChange}
          changeLabel="vs prior month"
          trend={metrics.monthlyChange > 0 ? "up" : "down"}
          status="observed"
        />
      </div>

      {/* CARD 5: Data Freshness */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-1">
        <KPICard
          title="Data Freshness"
          value={metrics.freshnessLabel}
          subtitle={metrics.lastUpdated}
          status="validated"
          tooltipText={`${metrics.observationCount} observations verified in current cycle`}
        />
      </div>
    </ContentGrid>
  );
}
