"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { ChartContainer } from "@/components/visualization/ChartContainer";
import { SegmentedControl } from "@/components/forms/SegmentedControl";
import { DataTable } from "@/components/data-display/DataTable";
import { MetricTrend } from "@/components/visualization/MetricTrend";
import { getIndexHistorySeries, MOCK_ROUTE_CONTRIBUTIONS } from "@/data/indexEngineData";
import { TimePeriod } from "@/types/overview";
import { IndexFrequency } from "@/types/indexEngine";

export function HistoryView() {
  const [period, setPeriod] = useState<TimePeriod>("30D");
  const [frequency, setFrequency] = useState<IndexFrequency>("Daily");

  const historyData = getIndexHistorySeries(period, frequency);

  const periodOptions = [
    { value: "7D", label: "7D" },
    { value: "30D", label: "30D" },
    { value: "90D", label: "90D" },
  ];

  const frequencyOptions = [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  const columns = [
    { key: "route", header: "Corridor", width: "160px", render: (r: any) => <span className="font-bold text-[#0A5B9E]">{r.route}</span> },
    { key: "weightPercent", header: "Weight", align: "right" as const, render: (r: any) => <span className="font-mono">{r.weightPercent}%</span> },
    { key: "priceMovement", header: "Fare Movement", align: "center" as const, render: (r: any) => <MetricTrend value={r.priceMovement} /> },
    { key: "indexContributionPoints", header: "Index Point Contribution", align: "right" as const, render: (r: any) => <span className={r.indexContributionPoints > 0 ? "font-mono font-bold text-[#D1262C]" : "font-mono font-bold text-[#4EB050]"}>{r.indexContributionPoints > 0 ? `+${r.indexContributionPoints}` : r.indexContributionPoints} pts</span> },
    { key: "bookingWindow", header: "Horizon", align: "center" as const, render: (r: any) => <span className="font-mono text-[#8A99AD]">{r.bookingWindow}</span> },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Historical Line Chart */}
      <ChartContainer
        title="Historical Index Series Trajectory"
        subtitle={`Historical aggregate airfare index trajectory over ${period} at ${frequency} sampling frequency`}
        status="observed"
        height={300}
        action={
          <div className="flex items-center gap-2">
            <SegmentedControl options={frequencyOptions} value={frequency} onChange={(v) => setFrequency(v as IndexFrequency)} size="sm" />
            <SegmentedControl options={periodOptions} value={period} onChange={(v) => setPeriod(v as TimePeriod)} size="sm" />
          </div>
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
            <XAxis dataKey="date" stroke="#8A99AD" fontSize={11} tickLine={false} />
            <YAxis domain={["dataMin - 2", "dataMax + 2"]} stroke="#8A99AD" fontSize={11} tickLine={false} axisLine={false} />
            <RechartsTooltip formatter={(v: any) => [`${v} pts`, "National Index"]} />
            <Line type="monotone" dataKey="indexValue" stroke="#0A5B9E" strokeWidth={2.5} dot={{ r: 3, fill: "#0A5B9E" }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Route Contribution Breakdown (Section 20 & 21) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 bg-white p-5 rounded-sih-md border border-[#E2E8F0] shadow-sih-card flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#EDF2F7] pb-3 mb-3">
            <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
              Route Index Contribution (Points Shift)
            </h3>
            <span className="text-[11px] font-mono text-[#0A5B9E]">Point Contribution</span>
          </div>

          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ROUTE_CONTRIBUTIONS} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" horizontal={false} />
                <XAxis type="number" stroke="#8A99AD" fontSize={11} />
                <YAxis type="category" dataKey="route" stroke="#8A99AD" fontSize={11} tickLine={false} />
                <RechartsTooltip formatter={(v: any) => [`${v} pts`, "Index Points"]} />
                <Bar dataKey="indexContributionPoints" radius={[0, 4, 4, 0]}>
                  {MOCK_ROUTE_CONTRIBUTIONS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.indexContributionPoints > 0 ? "#D1262C" : "#4EB050"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-6">
          <DataTable data={MOCK_ROUTE_CONTRIBUTIONS} columns={columns} />
        </div>
      </div>
    </div>
  );
}
