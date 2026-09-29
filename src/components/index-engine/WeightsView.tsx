"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer } from "@/components/visualization/ChartContainer";
import { DataTable } from "@/components/data-display/DataTable";
import { StatusBadge } from "@/components/data-display/StatusBadge";
import { MOCK_ROUTE_BASKET } from "@/data/indexEngineData";
import { Alert } from "@/components/feedback/Alert";

export function WeightsView() {
  const chartData = MOCK_ROUTE_BASKET.map((r) => ({
    route: r.route,
    weight: r.prototypeWeight,
  }));

  const columns = [
    { key: "route", header: "Trunk Corridor", width: "160px", render: (r: any) => <span className="font-bold text-[#0A5B9E]">{r.route}</span> },
    { key: "prototypeWeight", header: "Route Weight", align: "right" as const, render: (r: any) => <span className="font-bold font-mono text-[#14213D]">{r.prototypeWeight}%</span> },
    { key: "trafficShare", header: "Relative Contribution", render: (r: any) => <span className="text-xs">{r.trafficShare}</span> },
    { key: "coveragePercent", header: "Coverage", align: "right" as const, render: (r: any) => <span className="font-mono text-[#4EB050]">{r.coveragePercent}%</span> },
    { key: "status", header: "Status", align: "center" as const, render: (r: any) => <StatusBadge status={r.status} size="sm" /> },
  ];

  return (
    <div className="space-y-6 select-none">
      <Alert variant="info" title="ROUTE WEIGHT DISTRIBUTION & METHODOLOGY">
        Capacity contribution percentages represent relative passenger volume weights derived from trunk corridor movement statistics.
      </Alert>

      <ChartContainer
        title="Route Basket Weight Distribution"
        subtitle="Percentage contribution of each corridor to the national index"
        status="observed"
        height={260}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" horizontal={false} />
            <XAxis type="number" stroke="#8A99AD" fontSize={11} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="route" stroke="#8A99AD" fontSize={11} tickLine={false} />
            <RechartsTooltip formatter={(v: any) => [`${v}%`, "Route Weight"]} />
            <Bar dataKey="weight" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#0A5B9E" : index === 1 ? "#568AB2" : "#7DC9DE"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <DataTable data={MOCK_ROUTE_BASKET} columns={columns} />
    </div>
  );
}
