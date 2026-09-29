"use client";

import React, { useState } from "react";
import { MOCK_ANOMALY_OBSERVATIONS } from "@/data/intelligenceData";
import { AnomalyObservation } from "@/types/intelligence";
import { AnomalyDrawer } from "./AnomalyDrawer";
import { AlertCircle, Eye, ArrowUpDown, Filter, ShieldAlert } from "lucide-react";

export function AnomalyView() {
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyObservation | null>(null);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-[#D1262C]/10 text-[#D1262C] border-[#D1262C]/30";
      case "Medium":
        return "bg-[#F3AC27]/10 text-[#B87A00] border-[#F3AC27]/30";
      default:
        return "bg-[#4EB050]/10 text-[#4EB050] border-[#4EB050]/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#6F498E]" />
            <h2 className="text-lg font-bold text-[#14213D]">Statistical Anomaly Flagged Records</h2>
          </div>
          <p className="text-sm text-[#5C728A] mt-1">
            Observations deviating significantly from expected statistical distributions across route corridors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#6F498E]/10 text-[#6F498E] font-bold text-xs rounded border border-[#6F498E]/30">
            {MOCK_ANOMALY_OBSERVATIONS.length} Flagged Anomalies
          </span>
        </div>
      </div>

      {/* Anomaly Table */}
      <div className="bg-white rounded-lg border border-[#D9E2EC] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E4E7EB] bg-[#F0F4F8] flex items-center justify-between">
          <span className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
            Flagged Observations Register
          </span>
          <span className="text-xs text-[#5C728A]">Click row or &apos;Inspect&apos; to view full provenance</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#14213D]">
            <thead className="bg-[#E4E7EB]/50 text-[#5C728A] font-semibold uppercase tracking-wider text-[11px] border-b border-[#D9E2EC]">
              <tr>
                <th className="p-3">Anomaly ID</th>
                <th className="p-3">Route</th>
                <th className="p-3">Date / Window</th>
                <th className="p-3 text-right">Observed Fare</th>
                <th className="p-3 text-right">Expected Range</th>
                <th className="p-3 text-right">Deviation %</th>
                <th className="p-3 text-center">Score</th>
                <th className="p-3 text-center">Severity</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EB]">
              {MOCK_ANOMALY_OBSERVATIONS.map((obs) => {
                const isPositive = obs.deviationPercent > 0;
                return (
                  <tr
                    key={obs.id}
                    onClick={() => setSelectedAnomaly(obs)}
                    className="hover:bg-[#F0F4F8] transition-colors cursor-pointer"
                  >
                    <td className="p-3 font-mono font-bold text-[#0A5B9E]">{obs.id}</td>
                    <td className="p-3 font-bold text-[#14213D]">{obs.route}</td>
                    <td className="p-3 text-[#5C728A]">
                      {obs.date} <span className="text-[#9FB3C8]">({obs.bookingWindow})</span>
                    </td>
                    <td className="p-3 text-right font-bold">₹{obs.fare.toLocaleString()}</td>
                    <td className="p-3 text-right text-[#5C728A]">
                      ₹{obs.expectedMin.toLocaleString()} – ₹{obs.expectedMax.toLocaleString()}
                    </td>
                    <td
                      className={`p-3 text-right font-bold ${
                        isPositive ? "text-[#D1262C]" : "text-[#0A5B9E]"
                      }`}
                    >
                      {isPositive ? `+${obs.deviationPercent}%` : `${obs.deviationPercent}%`}
                    </td>
                    <td className="p-3 text-center font-mono text-[#6F498E] font-bold">
                      {obs.anomalyScore.toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSeverityBadge(
                          obs.severity
                        )}`}
                      >
                        {obs.severity}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAnomaly(obs);
                        }}
                        className="px-2.5 py-1 bg-[#F0F4F8] hover:bg-[#0A5B9E] text-[#0A5B9E] hover:text-white font-medium rounded text-xs transition-colors inline-flex items-center gap-1 border border-[#D9E2EC]"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      <AnomalyDrawer anomaly={selectedAnomaly} onClose={() => setSelectedAnomaly(null)} />
    </div>
  );
}
