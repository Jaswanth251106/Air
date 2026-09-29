"use client";

import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/visualization/ChartContainer";
import { SegmentedControl } from "@/components/forms/SegmentedControl";
import { DataTable } from "@/components/data-display/DataTable";
import { StatusBadge } from "@/components/data-display/StatusBadge";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { StatisticalSeparationBanner } from "./StatisticalSeparationBanner";
import { getForecastSeries, getForecastSummary } from "@/data/intelligenceData";
import { ForecastHorizon } from "@/types/intelligence";
import { useFilterContext } from "@/context/FilterContext";
import { Brain, Sparkles, Calendar } from "lucide-react";

export function ForecastView() {
  const [horizon, setHorizon] = useState<ForecastHorizon>("7D");
  const { filters } = useFilterContext();

  const seriesData = getForecastSeries(horizon);
  const summary = getForecastSummary(horizon);

  const horizonOptions = [
    { value: "1D", label: "1D" },
    { value: "3D", label: "3D" },
    { value: "7D", label: "7D" },
    { value: "14D", label: "14D" },
    { value: "30D", label: "30D" },
  ];

  const columns = [
    { key: "date", header: "Timeline Date", width: "140px", render: (r: any) => <span className="font-bold font-mono">{r.date}</span> },
    {
      key: "isForecast",
      header: "Data Stream Type",
      align: "center" as const,
      render: (r: any) => (r.isForecast ? <StatusBadge status="forecast" /> : <StatusBadge status="observed" />),
    },
    {
      key: "fare",
      header: "Observed / Predicted Fare (₹)",
      align: "right" as const,
      render: (r: any) => (
        <span className={r.isForecast ? "font-bold font-mono text-[#6F498E]" : "font-bold font-mono text-[#0A5B9E]"}>
          ₹{(r.isForecast ? r.predictedFare : r.observedFare).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      key: "interval",
      header: "95% Prediction Interval Range",
      align: "right" as const,
      render: (r: any) => (
        <span className="font-mono text-[#8A99AD]">
          {r.isForecast ? `₹${r.lowerBound.toLocaleString("en-IN")} – ₹${r.upperBound.toLocaleString("en-IN")}` : "—"}
        </span>
      ),
    },
    { key: "model", header: "Model Engine", render: () => <span className="font-mono text-xs">{summary.modelVersion}</span> },
  ];

  return (
    <div className="space-y-6 select-none">
      <StatisticalSeparationBanner />

      {/* Forecast Summary Cards (Section 12) */}
      <ContentGrid columns={4}>
        <div className="p-4 rounded-sih-md bg-white border border-[#E2E8F0] shadow-sih-card space-y-1">
          <span className="text-[10px] font-mono text-[#8A99AD] uppercase">Current Observed Fare</span>
          <p className="text-xl font-bold text-[#0A5B9E] font-mono">₹{summary.currentObserved.toLocaleString("en-IN")}</p>
          <span className="text-[11px] text-[#5B6B82] font-sans">Empirical observation base</span>
        </div>

        <div className="p-4 rounded-sih-md bg-[#F4EFF8] border border-[#D2C1E3] shadow-sih-card space-y-1">
          <span className="text-[10px] font-mono text-[#6F498E] uppercase font-bold">Predicted Next Fare</span>
          <p className="text-xl font-bold text-[#6F498E] font-mono">₹{summary.predictedNext.toLocaleString("en-IN")}</p>
          <span className="text-[11px] text-[#6F498E] font-sans">Estimated at {horizon} horizon</span>
        </div>

        <div className="p-4 rounded-sih-md bg-white border border-[#E2E8F0] shadow-sih-card space-y-1">
          <span className="text-[10px] font-mono text-[#8A99AD] uppercase">95% Prediction Interval</span>
          <p className="text-sm font-bold text-[#14213D] font-mono">
            ₹{summary.lowerBound.toLocaleString("en-IN")} – ₹{summary.upperBound.toLocaleString("en-IN")}
          </p>
          <span className="text-[11px] text-[#5B6B82] font-sans">Model uncertainty bounds</span>
        </div>

        <div className="p-4 rounded-sih-md bg-white border border-[#E2E8F0] shadow-sih-card space-y-1">
          <span className="text-[10px] font-mono text-[#8A99AD] uppercase">Model Version</span>
          <p className="text-sm font-bold text-[#6F498E] font-mono">{summary.modelVersion}</p>
          <MetricBadge label="Model Forecast" variant="forecast" size="sm" />
        </div>
      </ContentGrid>

      {/* Large Historical + Forecast Chart (Section 10) */}
      <ChartContainer
        title={`Airfare Trajectory & Predictive Curve (${filters.origin === "ALL" ? "MAA" : filters.origin} → ${filters.destination === "ALL" ? "DEL" : filters.destination})`}
        subtitle="Solid Blue = Historical Observed | Dashed Plum = Predictive Forecast | Shaded = 95% Confidence Band"
        status="forecast"
        height={320}
        legendItems={[
          { label: "Historical Observed (Solid)", color: "#0A5B9E", lineStyle: "solid" },
          { label: "Predictive Forecast (Dashed)", color: "#6F498E", lineStyle: "dashed" },
        ]}
        action={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#14213D]">Horizon:</span>
            <SegmentedControl
              options={horizonOptions}
              value={horizon}
              onChange={(v) => setHorizon(v as ForecastHorizon)}
              size="sm"
            />
          </div>
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={seriesData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
            <XAxis dataKey="date" stroke="#8A99AD" fontSize={11} tickLine={false} />
            <YAxis domain={["dataMin - 300", "dataMax + 300"]} stroke="#8A99AD" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
            <RechartsTooltip />
            
            {/* Prediction Interval Shaded Band */}
            <Area type="monotone" dataKey="upperBound" stroke="none" fill="#6F498E" fillOpacity={0.12} />
            <Area type="monotone" dataKey="lowerBound" stroke="none" fill="#FFFFFF" fillOpacity={1.0} />

            {/* Historical Observed Line */}
            <Line type="monotone" dataKey="observedFare" name="Observed Fare" stroke="#0A5B9E" strokeWidth={2.5} dot={{ r: 3, fill: "#0A5B9E" }} />
            
            {/* Forecast Line */}
            <Line type="monotone" dataKey="predictedFare" name="Model Forecast" stroke="#6F498E" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4, fill: "#6F498E" }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Forecast Timeline Table (Section 13) */}
      <DataTable data={seriesData} columns={columns} />
    </div>
  );
}
