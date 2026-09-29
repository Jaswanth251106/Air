"use client";

import React, { useState } from "react";
import { MOCK_BOOKING_WINDOW_METRICS } from "@/data/indexEngineData";
import { ChartContainer } from "@/components/visualization/ChartContainer";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingWindowsView() {
  const [selectedRoute, setSelectedRoute] = useState("MAA → DEL");

  const chartData = MOCK_BOOKING_WINDOW_METRICS.map((m) => ({
    window: m.window,
    fare: m.representativeFare,
  }));

  return (
    <div className="space-y-6 select-none">
      {/* Visual Booking Window Ladder (Section 12) */}
      <div className="bg-white p-5 rounded-sih-md border border-[#E2E8F0] shadow-sih-card">
        <div className="flex items-center justify-between border-b border-[#EDF2F7] pb-3 mb-4">
          <div>
            <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
              Five Booking Horizon Dimensions (Ladder Standard)
            </h3>
            <p className="text-xs text-[#5B6B82] font-sans">
              Advance booking horizons monitored to isolate lead-time fare variations.
            </p>
          </div>
          <MetricBadge label="5 Horizons" variant="primary" size="sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {MOCK_BOOKING_WINDOW_METRICS.map((item, idx) => (
            <div
              key={item.window}
              className="p-4 rounded-sih-md border border-[#E2E8F0] bg-[#F6F8FB] flex flex-col justify-between space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-[#0A5B9E] font-mono">{item.window}</span>
                <span className="text-[10px] font-mono text-[#8A99AD]">{item.observationCount} obs</span>
              </div>
              <div>
                <span className="text-lg font-bold text-[#14213D] font-sans">₹{item.representativeFare.toLocaleString("en-IN")}</span>
                <p className="text-[11px] text-[#5B6B82] mt-1 font-sans leading-tight">{item.description}</p>
              </div>
              <div className="pt-2 border-t border-[#E2E8F0] text-[10px] font-mono text-[#568AB2]">
                {item.indexRelevance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Horizon Fare Curve Chart (Section 13) */}
      <ChartContainer
        title={`Observed Fare Across Booking Horizons (${selectedRoute})`}
        subtitle="Neutral representation of observed fare variation as departure date approaches"
        status="observed"
        height={280}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
            <XAxis dataKey="window" stroke="#8A99AD" fontSize={11} tickLine={false} />
            <YAxis domain={["dataMin - 500", "dataMax + 500"]} stroke="#8A99AD" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
            <RechartsTooltip formatter={(v: any) => [`₹${v.toLocaleString("en-IN")}`, "Representative Fare"]} />
            <Line type="monotone" dataKey="fare" stroke="#0A5B9E" strokeWidth={2.5} dot={{ r: 4, fill: "#0A5B9E" }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
