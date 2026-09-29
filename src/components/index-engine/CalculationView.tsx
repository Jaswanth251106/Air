"use client";

import React, { useState } from "react";
import { calculateDeterministicIndex } from "@/data/indexEngineData";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { Calculator, ArrowRight, CheckCircle2, Shield, Info } from "lucide-react";

export function CalculationView() {
  const [currentFare, setCurrentFare] = useState<number>(5130);
  const [referenceFare, setReferenceFare] = useState<number>(4820);
  const [weightPercent, setWeightPercent] = useState<number>(18);

  const calc = calculateDeterministicIndex(currentFare, referenceFare, weightPercent);

  // National Index aggregated result
  const aggregateIndex = (100.0 + (calc.priceRelative - 1.0) * 100).toFixed(1);
  const percentShift = (((currentFare - referenceFare) / referenceFare) * 100).toFixed(1);

  return (
    <div className="space-y-6 select-none">
      {/* 1. National Index Result Card (Section 17) */}
      <div className="bg-[#0A5B9E] text-white p-6 rounded-sih-xl shadow-sih-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MetricBadge label="INDEX CALCULATED RESULT" variant="validated" size="sm" />
            <span className="text-xs font-mono text-blue-100">Paasche Quantity Weighted</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white">
            {aggregateIndex} <span className="text-lg font-bold text-blue-200">pts</span>
          </h2>
          <p className="text-xs text-blue-100 mt-1 font-sans">
            Illustrative current-period index ({percentShift}% shift vs Jan 2026 reference period base 100.0)
          </p>
        </div>

        <div className="bg-white/10 p-4 rounded-sih-md border border-white/20 font-mono text-xs text-right space-y-1">
          <span className="text-blue-200">Deterministic Formula Output</span>
          <p className="text-white font-bold">R_i = {calc.priceRelative} | W_i = {weightPercent}%</p>
        </div>
      </div>

      {/* 2. Interactive Calculator Controls (Section 15) */}
      <div className="bg-white p-6 rounded-sih-md border border-[#E2E8F0] shadow-sih-card space-y-6">
        <div className="flex items-center justify-between border-b border-[#EDF2F7] pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#0A5B9E]" />
            <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
              Interactive Deterministic Index Calculator
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#5B6B82] bg-[#F6F8FB] px-2 py-0.5 rounded border border-[#E2E8F0]">
            Index Calculation Model
          </span>
        </div>

        {/* Input Sliders & Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#14213D] uppercase font-mono">
              Current Observed Fare (₹)
            </label>
            <input
              type="number"
              value={currentFare}
              onChange={(e) => setCurrentFare(Number(e.target.value))}
              className="w-full bg-[#F6F8FB] border border-[#E2E8F0] rounded-sih-md px-3 py-2 text-sm font-mono font-bold text-[#0A5B9E] focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30"
            />
            <p className="text-[11px] text-[#8A99AD] font-sans">Adjust current mean fare input</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#14213D] uppercase font-mono">
              Reference Base Fare (₹)
            </label>
            <input
              type="number"
              value={referenceFare}
              onChange={(e) => setReferenceFare(Number(e.target.value))}
              className="w-full bg-[#F6F8FB] border border-[#E2E8F0] rounded-sih-md px-3 py-2 text-sm font-mono font-bold text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30"
            />
            <p className="text-[11px] text-[#8A99AD] font-sans">Jan 2026 baseline reference fare</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#14213D] uppercase font-mono">
              Basket Weight (%)
            </label>
            <input
              type="number"
              value={weightPercent}
              onChange={(e) => setWeightPercent(Number(e.target.value))}
              className="w-full bg-[#F6F8FB] border border-[#E2E8F0] rounded-sih-md px-3 py-2 text-sm font-mono font-bold text-[#14213D] focus:outline-none focus:ring-2 focus:ring-[#0A5B9E]/30"
            />
            <p className="text-[11px] text-[#8A99AD] font-sans">Corridor capacity basket weight</p>
          </div>
        </div>

        {/* 3. Derived Breakdown Steps (Section 16) */}
        <ContentGrid columns={4} className="pt-4 border-t border-[#EDF2F7]">
          <div className="p-3 bg-[#F6F8FB] rounded border border-[#E2E8F0] space-y-1 font-mono">
            <span className="text-[10px] uppercase text-[#8A99AD]">Step 1: Price Relative</span>
            <p className="text-base font-bold text-[#0A5B9E]">{calc.priceRelative}</p>
            <p className="text-[10px] text-[#5B6B82]">₹{currentFare} / ₹{referenceFare}</p>
          </div>

          <div className="p-3 bg-[#F6F8FB] rounded border border-[#E2E8F0] space-y-1 font-mono">
            <span className="text-[10px] uppercase text-[#8A99AD]">Step 2: Corridor Weight</span>
            <p className="text-base font-bold text-[#14213D]">{weightPercent}%</p>
            <p className="text-[10px] text-[#5B6B82]">Corridor basket weight</p>
          </div>

          <div className="p-3 bg-[#F6F8FB] rounded border border-[#E2E8F0] space-y-1 font-mono">
            <span className="text-[10px] uppercase text-[#8A99AD]">Step 3: Weighted Share</span>
            <p className="text-base font-bold text-[#0A5B9E]">{calc.weightedContribution}</p>
            <p className="text-[10px] text-[#5B6B82]">{calc.priceRelative} × {weightPercent}%</p>
          </div>

          <div className="p-3 bg-[#EFF8EF] rounded border border-[#B9E4BA] space-y-1 font-mono">
            <span className="text-[10px] uppercase text-[#4EB050]">Step 4: Corridor Points</span>
            <p className="text-base font-bold text-[#4EB050]">+{calc.routeIndexContribution} pts</p>
            <p className="text-[10px] text-[#5B6B82]">Index contribution points</p>
          </div>
        </ContentGrid>
      </div>
    </div>
  );
}
