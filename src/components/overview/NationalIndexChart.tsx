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
} from "recharts";
import { ChartContainer } from "@/components/visualization/ChartContainer";
import { SegmentedControl } from "@/components/forms/SegmentedControl";
import { Tabs } from "@/components/navigation/Tabs";
import { MetricTrend } from "@/components/visualization/MetricTrend";
import { Button } from "@/components/forms/Button";
import { IndexTrendDataPoint, TimePeriod, OverviewTabMode } from "@/types/overview";
import { BookingWindow } from "@/types";
import { cn } from "@/lib/utils";

interface NationalIndexChartProps {
  data: IndexTrendDataPoint[];
  period: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  bookingWindow?: BookingWindow;
}

export function NationalIndexChart({
  data,
  period,
  onPeriodChange,
  bookingWindow = "T+30",
}: NationalIndexChartProps) {
  const [tabMode, setTabMode] = useState<OverviewTabMode>("PRESENT");
  const [showComparison, setShowComparison] = useState(false);

  const periodOptions = [
    { value: "7D", label: "7D" },
    { value: "20D", label: "20D" },
    { value: "30D", label: "30D" },
    { value: "90D", label: "90D" },
  ];

  const tabs = [
    { id: "PRESENT", label: "PRESENT TREND" },
    { id: "HISTORICAL", label: "HISTORICAL BASELINE" },
  ];

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pData = payload[0].payload as IndexTrendDataPoint;
      return (
        <div className="bg-[#17324D] text-white p-3 rounded-sih-md shadow-sih-dropdown border border-[#59C7CB]/30 font-mono text-xs space-y-1">
          <p className="font-bold text-[#59C7CB]">{label}</p>
          <div className="flex justify-between gap-4">
            <span className="text-slate-300">National Index:</span>
            <span className="font-bold text-white">{pData.indexValue} pts</span>
          </div>
          {showComparison && pData.historicalValue && (
            <div className="flex justify-between gap-4 text-[#95A7B0]">
              <span>Prior Baseline:</span>
              <span>{pData.historicalValue} pts</span>
            </div>
          )}
          <div className="flex justify-between gap-4 text-slate-300 pt-1 border-t border-slate-700/50">
            <span>Observed Mean:</span>
            <span className="text-[#2FA9B8]">₹{pData.observedFare.toLocaleString("en-IN")}</span>
          </div>
          <p className="text-[10px] text-[#95A7B0] pt-0.5">
            {pData.sampleSize} verified observations
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer
      title="National Airfare Index Trend"
      subtitle={`Time series trajectory across major trunk corridors at ${bookingWindow} advance window`}
      status="observed"
      height={320}
      legendItems={[
        { label: "Observed Index (Solid)", color: "#167D8D", lineStyle: "solid" },
        ...(showComparison
          ? [{ label: "Prior Period Baseline (Dashed)", color: "#2FA9B8", lineStyle: "dashed" as const }]
          : []),
      ]}
      action={
        <div className="flex flex-wrap items-center gap-2">
          <Tabs
            tabs={tabs}
            activeTab={tabMode}
            onChange={(id) => setTabMode(id as OverviewTabMode)}
            className="border-b-0"
          />
          <SegmentedControl
            options={periodOptions}
            value={period}
            onChange={(val) => onPeriodChange(val as TimePeriod)}
            size="sm"
          />
          <Button
            variant={showComparison ? "secondary" : "outline"}
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
          >
            {showComparison ? "Hide Comparison" : "Compare Period"}
          </Button>
        </div>
      }
    >
      {showComparison && (
        <div className="mb-2 p-2 rounded bg-[#E8F7FA] border border-[#B4E6E8] flex items-center justify-between text-xs font-mono">
          <span className="text-[#167D8D]">Comparing Current {period} against Previous {period} Baseline</span>
          <div className="flex items-center gap-2">
            <span className="text-[#17324D] font-bold">Delta Shift:</span>
            <MetricTrend value={3.4} />
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EBF3F5" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#95A7B0"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#D8E8EC" }}
          />
          <YAxis
            domain={["dataMin - 2", "dataMax + 2"]}
            stroke="#95A7B0"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `${val}`}
          />
          <RechartsTooltip content={<CustomTooltip />} />
          
          {/* Main Solid Line - Deep Teal */}
          <Line
            type="monotone"
            dataKey={tabMode === "HISTORICAL" ? "historicalValue" : "indexValue"}
            stroke="#167D8D"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#167D8D", stroke: "#FFFFFF", strokeWidth: 1.5 }}
            activeDot={{ r: 6, fill: "#167D8D", stroke: "#DDF8F2", strokeWidth: 3 }}
          />

          {/* Optional Comparison Line */}
          {showComparison && (
            <Line
              type="monotone"
              dataKey="historicalValue"
              stroke="#2FA9B8"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
