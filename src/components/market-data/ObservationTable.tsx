"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/data-display/DataTable";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { SourceBadge } from "@/components/data-display/SourceBadge";
import { ObservationDrawer } from "./ObservationDrawer";
import { FlightObservation } from "@/types/marketData";
import { DataTableColumn } from "@/types";

interface ObservationTableProps {
  observations: FlightObservation[];
  className?: string;
}

export function ObservationTable({ observations, className }: ObservationTableProps) {
  const [selectedObs, setSelectedObs] = useState<FlightObservation | null>(null);

  const columns: DataTableColumn<FlightObservation>[] = [
    { key: "airline", header: "Airline", render: (r) => <span className="font-bold text-[#14213D]">{r.airline}</span> },
    { key: "flightNo", header: "Flight No", align: "center", render: (r) => <span className="font-mono text-[#0A5B9E] font-bold">{r.flightNo}</span> },
    { key: "departureTime", header: "Departure", align: "center" },
    { key: "cabin", header: "Cabin Class", render: (r) => <span className="capitalize">{r.cabin}</span> },
    { key: "fareFamily", header: "Fare Family" },
    { key: "bookingClass", header: "Class", align: "center", render: (r) => <span className="font-mono bg-[#F6F8FB] px-1.5 py-0.5 rounded border border-[#E2E8F0]">{r.bookingClass}</span> },
    { key: "baseFare", header: "Base (₹)", align: "right", render: (r) => `₹${r.baseFare.toLocaleString("en-IN")}` },
    { key: "taxes", header: "Taxes (₹)", align: "right", render: (r) => `₹${r.taxes}` },
    { key: "udf", header: "UDF (₹)", align: "right", render: (r) => `₹${r.udf}` },
    { key: "totalFare", header: "Total Fare", align: "right", render: (r) => <span className="font-bold text-[#0A5B9E] font-mono">₹{r.totalFare.toLocaleString("en-IN")}</span> },
    {
      key: "availability",
      header: "Availability",
      align: "center",
      render: (r) => (
        <MetricBadge
          label={r.availability}
          variant={r.availability === "AVAILABLE" ? "validated" : "attention"}
          size="sm"
        />
      ),
    },
    { key: "source", header: "Source Feed", render: (r) => <SourceBadge source={r.source} /> },
  ];

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-[#14213D] font-sans">
            Flight / Fare Observations
          </h3>
          <p className="text-xs text-[#5B6B82] font-sans">
            Click any row to open full fare component reconciliation and provenance details.
          </p>
        </div>
        <span className="text-xs font-mono text-[#5B6B82] bg-[#F6F8FB] px-2 py-1 rounded border border-[#E2E8F0]">
          Showing {observations.length} observations
        </span>
      </div>

      <DataTable
        data={observations}
        columns={columns}
        onRowClick={(row) => setSelectedObs(row)}
      />

      <ObservationDrawer
        observation={selectedObs}
        onClose={() => setSelectedObs(null)}
      />
    </div>
  );
}
