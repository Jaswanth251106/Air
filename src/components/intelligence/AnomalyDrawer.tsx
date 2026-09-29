"use client";

import React from "react";
import { AnomalyObservation } from "@/types/intelligence";
import { X, AlertCircle, ShieldAlert, CheckCircle2, Layers, Cpu, Server, Calendar, Building2 } from "lucide-react";

interface AnomalyDrawerProps {
  anomaly: AnomalyObservation | null;
  onClose: () => void;
}

export function AnomalyDrawer({ anomaly, onClose }: AnomalyDrawerProps) {
  if (!anomaly) return null;

  const isPositiveDev = anomaly.deviationPercent > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#D9E2EC] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E4E7EB] bg-[#14213D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-white/10 text-white">
              <ShieldAlert className="w-5 h-5 text-[#F3AC27]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#9FB3C8] font-bold">
                Anomaly Detail Inspection
              </span>
              <h3 className="text-lg font-bold text-white">{anomaly.id}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Status Overview Card */}
          <div className="p-4 rounded-lg bg-[#F0F4F8] border border-[#D9E2EC] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#14213D] text-sm">{anomaly.route}</span>
              <span
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  anomaly.severity === "High"
                    ? "bg-[#D1262C]/10 text-[#D1262C] border border-[#D1262C]/30"
                    : "bg-[#F3AC27]/10 text-[#B87A00] border border-[#F3AC27]/30"
                }`}
              >
                {anomaly.severity} Anomaly
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-[#D9E2EC]">
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#5C728A]">Observed Fare</span>
                <span className="font-bold text-sm text-[#14213D]">₹{anomaly.fare.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#5C728A]">Deviation %</span>
                <span
                  className={`font-bold text-sm ${isPositiveDev ? "text-[#D1262C]" : "text-[#0A5B9E]"}`}
                >
                  {isPositiveDev ? `+${anomaly.deviationPercent}%` : `${anomaly.deviationPercent}%`}
                </span>
              </div>
            </div>
          </div>

          {/* Expected vs Observed Range */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#5C728A]">
              Statistical Expected Range
            </h4>
            <div className="p-4 rounded-lg border border-[#D9E2EC] bg-white space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#5C728A]">Min Expected:</span>
                <span className="font-semibold text-[#14213D]">₹{anomaly.expectedMin.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#5C728A]">Max Expected:</span>
                <span className="font-semibold text-[#14213D]">₹{anomaly.expectedMax.toLocaleString()}</span>
              </div>
              <div className="w-full bg-[#E4E7EB] rounded-full h-2 mt-2 relative overflow-hidden">
                <div
                  className="bg-[#0A5B9E] h-2 rounded-full"
                  style={{ left: "20%", width: "60%", position: "absolute" }}
                />
              </div>
              <p className="text-[10px] text-[#5C728A] text-center mt-1">
                Observed fare ₹{anomaly.fare.toLocaleString()} fell outside boundary range.
              </p>
            </div>
          </div>

          {/* Observation Metadata */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#5C728A]">
              Observation Provenance
            </h4>
            <div className="space-y-2 border border-[#D9E2EC] rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0A5B9E]" /> Observation Date
                </span>
                <span className="font-medium text-[#14213D]">{anomaly.date} • {anomaly.timestamp}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#0A5B9E]" /> Airline Carrier
                </span>
                <span className="font-medium text-[#14213D]">{anomaly.airline}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A] flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-[#0A5B9E]" /> Data Provider Source
                </span>
                <span className="font-medium text-[#14213D]">{anomaly.source}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#0A5B9E]" /> Booking Horizon
                </span>
                <span className="font-medium text-[#14213D]">{anomaly.bookingWindow}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-[#5C728A] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#0A5B9E]" /> Anomaly Score / Model
                </span>
                <span className="font-bold text-[#6F498E]">
                  {anomaly.anomalyScore.toFixed(2)} ({anomaly.modelVersion})
                </span>
              </div>
            </div>
          </div>

          {/* Rationale Note */}
          <div className="p-3 rounded-lg bg-[#F0F4F8] border border-[#D9E2EC] text-[11px] text-[#5C728A] space-y-1">
            <div className="font-bold text-[#14213D] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0A5B9E]" /> Anomaly Explanation Rationale
            </div>
            <p>
              Anomaly score ({anomaly.anomalyScore}) exceeded configured statistical tolerance. Record flagged for analyst review.
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#E4E7EB] bg-[#F0F4F8] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#14213D] hover:bg-[#0A5B9E] text-white font-medium rounded text-xs transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
