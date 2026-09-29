"use client";

import React, { useState } from "react";
import { MOCK_SURGE_SIGNALS } from "@/data/intelligenceData";
import { SurgeSignal } from "@/types/intelligence";
import { AlertTriangle, TrendingUp, ShieldAlert, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

export function SurgeView() {
  const [selectedSignal, setSelectedSignal] = useState<SurgeSignal>(MOCK_SURGE_SIGNALS[0]);

  // Synthetic timeline data for the selected surge route
  const timelineData = [
    { time: "00:00", fare: selectedSignal.baselineFare - 120, baseline: selectedSignal.baselineFare, threshold: Math.round(selectedSignal.baselineFare * 1.1) },
    { time: "03:00", fare: selectedSignal.baselineFare - 50, baseline: selectedSignal.baselineFare, threshold: Math.round(selectedSignal.baselineFare * 1.1) },
    { time: "06:00", fare: selectedSignal.baselineFare + 100, baseline: selectedSignal.baselineFare, threshold: Math.round(selectedSignal.baselineFare * 1.1) },
    { time: "07:30", fare: Math.round(selectedSignal.baselineFare * 1.08), baseline: selectedSignal.baselineFare, threshold: Math.round(selectedSignal.baselineFare * 1.1) },
    { time: "08:30", fare: selectedSignal.currentFare, baseline: selectedSignal.baselineFare, threshold: Math.round(selectedSignal.baselineFare * 1.1) },
    { time: "09:00", fare: selectedSignal.currentFare + 80, baseline: selectedSignal.baselineFare, threshold: Math.round(selectedSignal.baselineFare * 1.1) },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "HIGH SURGE":
        return "bg-[#D1262C]/10 text-[#D1262C] border-[#D1262C]/30";
      case "ELEVATED":
        return "bg-[#F3AC27]/10 text-[#B87A00] border-[#F3AC27]/30";
      default:
        return "bg-[#4EB050]/10 text-[#4EB050] border-[#4EB050]/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#D1262C]" />
            <h2 className="text-lg font-bold text-[#14213D]">Surge Detection Signals</h2>
          </div>
          <p className="text-sm text-[#5C728A] mt-1">
            Real-time statistical drift detectors monitoring route fares exceeding baseline thresholds.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#F0F4F8] px-3 py-1.5 rounded text-xs text-[#5C728A] font-medium border border-[#D9E2EC]">
          <Clock className="w-3.5 h-3.5 text-[#0A5B9E]" />
          <span>Active Window: Real-Time Detection Engine</span>
        </div>
      </div>

      {/* Grid Layout: Active Signals & Timeline Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Signal Cards List */}
        <div className="space-y-3 lg:col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#5C728A] px-1">
            Active Route Signals ({MOCK_SURGE_SIGNALS.length})
          </h3>
          {MOCK_SURGE_SIGNALS.map((signal) => {
            const isSelected = selectedSignal.id === signal.id;
            return (
              <div
                key={signal.id}
                onClick={() => setSelectedSignal(signal)}
                className={`p-4 rounded-lg border transition-all cursor-pointer bg-white ${
                  isSelected
                    ? "border-[#0A5B9E] ring-2 ring-[#0A5B9E]/10 shadow-md"
                    : "border-[#D9E2EC] hover:border-[#9FB3C8] shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#14213D] text-base">{signal.route}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold border ${getSeverityBadge(
                      signal.severity
                    )}`}
                  >
                    {signal.severity}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#5C728A] mt-3">
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#7B8C9D]">Current Fare</span>
                    <span className="font-bold text-[#14213D] text-sm">₹{signal.currentFare.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#7B8C9D]">Baseline Fare</span>
                    <span className="font-semibold text-[#5C728A]">₹{signal.baselineFare.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#7B8C9D]">Window</span>
                    <span className="font-medium text-[#14213D]">{signal.bookingWindow}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-semibold text-[#7B8C9D]">Movement</span>
                    <span className="font-bold text-[#D1262C] flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" />+{signal.movementPercent}%
                    </span>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-[11px] text-[#7B8C9D]">
                  <span>ID: {signal.id}</span>
                  <span>{signal.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Route Surge Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#D9E2EC] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E4E7EB] gap-2">
              <div>
                <span className="text-xs font-semibold text-[#0A5B9E] uppercase tracking-wider">
                  Surge Timeline Analysis
                </span>
                <h3 className="text-xl font-bold text-[#14213D]">{selectedSignal.route}</h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="px-3 py-1.5 bg-[#F0F4F8] rounded border border-[#D9E2EC]">
                  <span className="text-[#5C728A]">Deviation: </span>
                  <span className="font-bold text-[#D1262C]">+{selectedSignal.movementPercent}%</span>
                </div>
                <div className="px-3 py-1.5 bg-[#F0F4F8] rounded border border-[#D9E2EC]">
                  <span className="text-[#5C728A]">Window: </span>
                  <span className="font-bold text-[#14213D]">{selectedSignal.bookingWindow}</span>
                </div>
              </div>
            </div>

            {/* Recharts Surge Timeline */}
            <div className="h-72 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EB" />
                  <XAxis dataKey="time" stroke="#5C728A" fontSize={12} tickLine={false} />
                  <YAxis
                    stroke="#5C728A"
                    fontSize={12}
                    tickFormatter={(v) => `₹${v}`}
                    domain={["dataMin - 200", "dataMax + 200"]}
                  />
                  <Tooltip
                    formatter={(val: number, name: string) => [
                      `₹${val.toLocaleString()}`,
                      name === "fare"
                        ? "Observed Fare"
                        : name === "baseline"
                        ? "Baseline Fare"
                        : "Surge Threshold (10%)",
                    ]}
                    contentStyle={{
                      backgroundColor: "#14213D",
                      color: "#FFFFFF",
                      borderRadius: "6px",
                      fontSize: "12px",
                      border: "none",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Line
                    type="monotone"
                    dataKey="fare"
                    name="Observed Route Fare"
                    stroke="#D1262C"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#D1262C" }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="baseline"
                    name="Baseline 30D Median"
                    stroke="#0A5B9E"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="threshold"
                    name="Surge Threshold (10%)"
                    stroke="#F3AC27"
                    strokeWidth={1.5}
                    strokeDasharray="2 2"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Detection Rationale Card */}
            <div className="mt-6 p-4 rounded-lg bg-[#F0F4F8] border border-[#D9E2EC] text-xs text-[#14213D] space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-[#0A5B9E]">
                <CheckCircle2 className="w-4 h-4 text-[#0A5B9E]" />
                Detection Rationale
              </div>
              <p className="text-[#5C728A] leading-relaxed">
                The statistical detector flagged {selectedSignal.route} because the current observed fare of{" "}
                <span className="font-semibold text-[#14213D]">₹{selectedSignal.currentFare.toLocaleString()}</span> exceeds
                the baseline median (<span className="font-semibold text-[#14213D]">₹{selectedSignal.baselineFare.toLocaleString()}</span>)
                by <span className="font-semibold text-[#D1262C]">+{selectedSignal.movementPercent}%</span> within the{" "}
                <span className="font-semibold text-[#14213D]">{selectedSignal.bookingWindow}</span> booking window horizon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
