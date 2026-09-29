"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer } from "@/components/visualization/ChartContainer";
import { DataTable } from "@/components/data-display/DataTable";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { MetricTrend } from "@/components/visualization/MetricTrend";
import { MOCK_AIRLINE_COMPARISONS } from "@/data/marketData";

export function AirlineComparisonView() {
  const columns = [
    { key: "airline", header: "Carrier Name", render: (r: any) => <span className="font-bold">{r.airline} ({r.code})</span> },
    { key: "fare", header: "Observed Fare (₹)", align: "right" as const, render: (r: any) => <span className="font-bold font-mono text-[#0A5B9E]">₹{r.fare.toLocaleString("en-IN")}</span> },
    { key: "change", header: "24h Movement", align: "center" as const, render: (r: any) => <MetricTrend value={r.change} /> },
    { key: "availability", header: "Availability", align: "center" as const, render: (r: any) => <MetricBadge label={r.availability} variant={r.availability === "AVAILABLE" ? "validated" : "attention"} size="sm" /> },
    { key: "observationCount", header: "Observations", align: "right" as const, render: (r: any) => <span className="font-mono">{r.observationCount} feeds</span> },
  ];

  return (
    <div className="space-y-6">
      <ChartContainer
        title="Carrier Fare Comparison (MAA → DEL @ T+30)"
        subtitle="Compare like-for-like observed fares across carriers for identical itinerary conditions"
        status="observed"
        height={280}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MOCK_AIRLINE_COMPARISONS} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
            <XAxis dataKey="airline" stroke="#8A99AD" fontSize={11} tickLine={false} />
            <YAxis domain={["dataMin - 1000", "dataMax + 1000"]} stroke="#8A99AD" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
            <RechartsTooltip formatter={(v: any) => [`₹${v.toLocaleString("en-IN")}`, "Observed Fare"]} />
            <Bar dataKey="fare" radius={[4, 4, 0, 0]}>
              {MOCK_AIRLINE_COMPARISONS.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#0A5B9E" : "#568AB2"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <DataTable data={MOCK_AIRLINE_COMPARISONS} columns={columns} />
    </div>
  );
}
