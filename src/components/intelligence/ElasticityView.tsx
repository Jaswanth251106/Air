"use client";

import React from "react";
import { MOCK_ELASTICITY_POINTS } from "@/data/intelligenceData";
import { TrendingUp, Clock, Info, ShieldCheck } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export function ElasticityView() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#0A5B9E]" />
            <h2 className="text-lg font-bold text-[#14213D]">Lead-Time Fare Elasticity Curve</h2>
          </div>
          <p className="text-sm text-[#5C728A] mt-1">
            Observed relationship between advance booking horizon (T+45 to T+1) and fare escalation dynamics.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#F0F4F8] px-3 py-1.5 rounded text-xs text-[#5C728A] font-medium border border-[#D9E2EC]">
          <Clock className="w-3.5 h-3.5 text-[#0A5B9E]" />
          <span>Booking Horizon Curve (T+45 → T+1)</span>
        </div>
      </div>

      {/* Recharts Line Chart */}
      <div className="bg-white p-6 rounded-lg border border-[#D9E2EC] shadow-sm">
        <div className="flex justify-between items-center pb-4 border-b border-[#E4E7EB]">
          <span className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
            Lead-Time Price Progression (National Composite)
          </span>
          <span className="text-xs text-[#5C728A]">Fares escalate as departure date approaches</span>
        </div>

        <div className="h-72 w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_ELASTICITY_POINTS} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EB" />
              <XAxis dataKey="window" stroke="#5C728A" fontSize={12} tickLine={false} />
              <YAxis
                stroke="#5C728A"
                fontSize={12}
                tickFormatter={(v) => `₹${v}`}
                domain={["dataMin - 300", "dataMax + 300"]}
              />
              <Tooltip
                formatter={(val: number, name: string) => [
                  name === "representativeFare" ? `₹${val.toLocaleString()}` : `${val}%`,
                  name === "representativeFare" ? "Representative Fare" : "Fare Escalation %",
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
                dataKey="representativeFare"
                name="Representative Fare (₹)"
                stroke="#0A5B9E"
                strokeWidth={3}
                dot={{ r: 5, fill: "#0A5B9E" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-[#D9E2EC] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E4E7EB] bg-[#F0F4F8]">
          <span className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
            Booking Horizon Breakdown Table
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#14213D]">
            <thead className="bg-[#E4E7EB]/50 text-[#5C728A] font-semibold uppercase tracking-wider text-[11px] border-b border-[#D9E2EC]">
              <tr>
                <th className="p-3">Booking Horizon Window</th>
                <th className="p-3 text-center">Days To Departure</th>
                <th className="p-3 text-right">Representative Fare</th>
                <th className="p-3 text-right">Escalation vs T+45</th>
                <th className="p-3 text-center">Data Coverage %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EB]">
              {MOCK_ELASTICITY_POINTS.map((pt, idx) => (
                <tr key={idx} className="hover:bg-[#F0F4F8] transition-colors">
                  <td className="p-3 font-bold text-[#0A5B9E]">{pt.window}</td>
                  <td className="p-3 text-center font-semibold text-[#5C728A]">{pt.daysToDeparture} Days</td>
                  <td className="p-3 text-right font-bold">₹{pt.representativeFare.toLocaleString()}</td>
                  <td className="p-3 text-right font-bold text-[#D1262C]">
                    {pt.fareChange === 0 ? "Base (0%)" : `+${pt.fareChange}%`}
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#4EB050]/10 text-[#4EB050] border border-[#4EB050]/30">
                      {pt.coveragePercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guidance Card */}
      <div className="p-4 rounded-lg bg-[#F0F4F8] border border-[#D9E2EC] text-xs text-[#5C728A] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#0A5B9E] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-[#14213D]">Lead-Time Elasticity Note</span>
          <p className="leading-relaxed">
            Fares display non-linear acceleration as lead time drops below T+7 days, rising by an average of +21.5% at T+1 relative to the T+45 baseline.
          </p>
        </div>
      </div>
    </div>
  );
}
