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
import { SegmentedControl } from "@/components/forms/SegmentedControl";
import { RouteHistoryDataPoint } from "@/types/marketData";
import { TimePeriod } from "@/types/overview";

interface RouteHistoryChartProps {
  data: RouteHistoryDataPoint[];
  period: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  routeDisplay?: string;
}

export function RouteHistoryChart({
  data,
  period,
  onPeriodChange,
  routeDisplay = "MAA → DEL",
}: RouteHistoryChartProps) {
  const periodOptions = [
    { value: "7D", label: "7D" },
    { value: "20D", label: "20D" },
    { value: "30D", label: "30D" },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pData = payload[0].payload as RouteHistoryDataPoint;
      return (
        <div className="bg-[#14213D] text-white p-3 rounded-sih-md shadow-sih-dropdown border border-[#568AB2]/30 font-mono text-xs space-y-1">
          <p className="font-bold text-[#7DC9DE]">{label}</p>
          <div className="flex justify-between gap-4">
            <span className="text-slate-300">Representative Fare:</span>
            <span className="font-bold text-[#4EB050]">₹{pData.avgFare.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300 text-[11px]">
            <span>Observed Range:</span>
            <span>₹{pData.minFare} – ₹{pData.maxFare}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer
      title={`Route Fare History (${routeDisplay})`}
      subtitle={`Daily representative fare trajectory over the prior ${period} period`}
      status="observed"
      height={280}
      action={
        <SegmentedControl
          options={periodOptions}
          value={period}
          onChange={(val) => onPeriodChange(val as TimePeriod)}
          size="sm"
        />
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
          <XAxis dataKey="date" stroke="#8A99AD" fontSize={11} tickLine={false} />
          <YAxis domain={["dataMin - 400", "dataMax + 400"]} stroke="#8A99AD" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
          <RechartsTooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="avgFare"
            stroke="#0A5B9E"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#0A5B9E", stroke: "#FFFFFF", strokeWidth: 1.5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
