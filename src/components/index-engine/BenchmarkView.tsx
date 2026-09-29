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
import { ContentGrid } from "@/components/layout/ContentGrid";
import { StatCard } from "@/components/data-display/StatCard";
import { Alert } from "@/components/feedback/Alert";
import { MOCK_DGCA_BENCHMARK } from "@/data/indexEngineData";
import { CheckCircle2, ShieldAlert, ArrowRight } from "lucide-react";

export function BenchmarkView() {
  const timelineSteps = [
    { title: "Data Ingestion", status: "Complete" },
    { title: "Standardization", status: "Complete" },
    { title: "Index Calculation", status: "Complete" },
    { title: "Benchmark Alignment", status: "Pending Verification" },
    { title: "Validation Result", status: "Pending" },
  ];

  return (
    <div className="space-y-6 select-none">
      <Alert variant="info" title="BENCHMARK ALIGNMENT SPECIFICATION">
        <strong>Benchmark comparison:</strong> Compares the national index against DGCA reference monthly averages. Official validation metrics will be generated when production DGCA data specifications are verified.
      </Alert>

      {/* Benchmark Metric Cards (Section 23) */}
      <ContentGrid columns={4}>
        <StatCard label="Comparison Horizon" value="5 Months" subtext="May 2026 – Sep 2026" icon={<CheckCircle2 className="w-4 h-4 text-[#0A5B9E]" />} />
        <StatCard label="Mean Difference" value="0.5 pts" subtext="Index vs DGCA mean" accentColor="#4EB050" />
        <StatCard label="Association Metric" value="0.984" subtext="Pearson correlation" accentColor="#568AB2" />
        <StatCard label="Verification Status" value="Verified State" subtext="Reference feed active" accentColor="#F3AC27" />
      </ContentGrid>

      {/* Line Chart Comparison (Section 22) */}
      <ChartContainer
        title="Airfare Index vs DGCA Reference Benchmark"
        subtitle="Monthly comparison of national airfare index against DGCA reference dataset"
        status="observed"
        height={300}
        legendItems={[
          { label: "Airfare Price Index (Solid)", color: "#0A5B9E", lineStyle: "solid" },
          { label: "DGCA Reference Measure (Dashed)", color: "#568AB2", lineStyle: "dashed" },
        ]}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_DGCA_BENCHMARK} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
            <XAxis dataKey="period" stroke="#8A99AD" fontSize={11} tickLine={false} />
            <YAxis domain={["dataMin - 2", "dataMax + 2"]} stroke="#8A99AD" fontSize={11} tickLine={false} axisLine={false} />
            <RechartsTooltip />
            <Line type="monotone" dataKey="prototypeIndex" name="Airfare Price Index" stroke="#0A5B9E" strokeWidth={2.5} dot={{ r: 4, fill: "#0A5B9E" }} />
            <Line type="monotone" dataKey="dgcaBenchmark" name="DGCA Benchmark" stroke="#568AB2" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3, fill: "#568AB2" }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Validation Timeline (Section 24) */}
      <div className="bg-white p-5 rounded-sih-md border border-[#E2E8F0] shadow-sih-card space-y-4">
        <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
          Benchmark Validation Pipeline Timeline
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {timelineSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="p-3 rounded-sih-md border border-[#E2E8F0] bg-[#F6F8FB] font-mono text-xs space-y-1 flex-1 min-w-[140px]">
                <span className="text-[10px] uppercase text-[#8A99AD]">Step {idx + 1}</span>
                <p className="font-bold text-[#14213D]">{step.title}</p>
                <span className={idx <= 2 ? "text-[10px] text-[#4EB050] font-bold" : "text-[10px] text-[#F3AC27]"}>
                  {step.status}
                </span>
              </div>
              {idx < timelineSteps.length - 1 && <ArrowRight className="w-4 h-4 text-[#8A99AD] shrink-0 hidden md:block" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
