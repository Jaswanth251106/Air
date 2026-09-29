"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-display/DataTable";
import { MetricTrend } from "@/components/visualization/MetricTrend";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { SourceBadge } from "@/components/data-display/SourceBadge";
import { RouteMovement, SurgeClass } from "@/types/overview";
import { DataTableColumn } from "@/types";
import { cn } from "@/lib/utils";

interface RecentMovementsTableProps {
  movements: RouteMovement[];
  className?: string;
}

export function RecentMovementsTable({ movements, className }: RecentMovementsTableProps) {
  const router = useRouter();

  const renderSurgeBadge = (surgeClass: SurgeClass) => {
    switch (surgeClass) {
      case "HIGH SURGE":
        return <MetricBadge label="HIGH SURGE" variant="alert" size="sm" />;
      case "ELEVATED":
        return <MetricBadge label="ELEVATED" variant="attention" size="sm" />;
      case "NORMAL":
        return <MetricBadge label="NORMAL" variant="neutral" size="sm" />;
    }
  };

  const handleRowClick = (row: RouteMovement) => {
    // Navigate to /market-data preserving selected route parameters in URL query string
    const query = new URLSearchParams({
      origin: row.origin,
      destination: row.destination,
      window: row.bookingWindow,
    }).toString();
    router.push(`/market-data?${query}`);
  };

  const columns: DataTableColumn<RouteMovement>[] = [
    {
      key: "route",
      header: "Trunk Corridor",
      width: "160px",
      render: (r) => (
        <span className="font-bold text-[#0A5B9E] group-hover:underline">
          {r.route}
        </span>
      ),
    },
    { key: "airline", header: "Airline" },
    { key: "cabin", header: "Cabin Class" },
    { key: "bookingWindow", header: "Booking Window", align: "center", render: (r) => <span className="font-mono">{r.bookingWindow}</span> },
    {
      key: "priceChange",
      header: "Price Change",
      align: "center",
      render: (r) => <MetricTrend value={r.priceChange} />,
    },
    {
      key: "surgeClass",
      header: "Surge Class",
      align: "center",
      render: (r) => renderSurgeBadge(r.surgeClass),
    },
    {
      key: "sourceSpread",
      header: "Source Spread",
      align: "right",
      render: (r) => <span className="font-mono text-[#568AB2]">{r.sourceSpread}%</span>,
    },
    {
      key: "primarySource",
      header: "Primary Feed",
      render: (r) => <SourceBadge source={r.primarySource} />,
    },
    {
      key: "observationTime",
      header: "Observation Time",
      align: "right",
      render: (r) => <span className="font-mono text-[#8A99AD] text-[11px]">{r.observationTime}</span>,
    },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#14213D] font-sans tracking-tight">
            Recent Market Movements
          </h3>
          <p className="text-xs text-[#5B6B82] font-sans">
            Click any corridor row to inspect multi-channel market data feeds.
          </p>
        </div>
        <span className="text-xs font-mono text-[#5B6B82] bg-[#F6F8FB] px-2 py-1 rounded border border-[#E2E8F0]">
          Showing {movements.length} representative route entries
        </span>
      </div>

      <DataTable
        data={movements}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
