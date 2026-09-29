"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/visualization/ChartContainer";
import { LeadTimeDataPoint } from "@/types/marketData";

interface LeadTimeCurveProps {
  data: LeadTimeDataPoint[];
  routeDisplay?: string;
}

export function LeadTimeCurve({ data, routeDisplay = "MAA → DEL" }: LeadTimeCurveProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pData = payload[0].payload as LeadTimeDataPoint;
      return (
        <div className="bg-[#14213D] text-white p-3 rounded-sih-md shadow-sih-dropdown border border-[#568AB2]/30 font-mono text-xs space-y-1">
          <p className="font-bold text-[#7DC9DE]">Booking Horizon: {label}</p>
          <div className="flex justify-between gap-4">
            <span className="text-slate-300">Observed Fare:</span>
            <span className="font-bold text-[#4EB050]">₹{pData.fare.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-300">Shift from Prior:</span>
            <span className={pData.changePercent > 0 ? "text-[#D1262C]" : "text-[#4EB050]"}>
              {pData.changePercent > 0 ? `+${pData.changePercent}%` : `${pData.changePercent}%`}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer
      title={`Lead-Time Price Curve (${routeDisplay})`}
      subtitle="Observed fare across booking horizons as departure approaches"
      status="observed"
      height={300}
      legendItems={[{ label: "Observed Fare (Solid)", color: "#0A5B9E", lineStyle: "solid" }]}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
          <XAxis
            dataKey="window"
            stroke="#8A99AD"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#E2E8F0" }}
          />
          <YAxis
            domain={["dataMin - 500", "dataMax + 500"]}
            stroke="#8A99AD"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `₹${val}`}
          />
          <RechartsTooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="fare"
            stroke="#0A5B9E"
            strokeWidth={3}
            dot={{ r: 4, fill: "#0A5B9E", stroke: "#FFFFFF", strokeWidth: 2 }}
            activeDot={{ r: 7, fill: "#0A5B9E", stroke: "#EAF3FB", strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
