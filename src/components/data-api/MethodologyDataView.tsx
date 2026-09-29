"use client";

import React from "react";
import { BookOpen, Layers, Clock, Calculator, ShieldCheck, Cpu, ArrowRight, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";

export function MethodologyDataView() {
  return (
    <div className="space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0A5B9E]" />
            <h2 className="text-lg font-bold text-[#14213D]">Statistical Methodology Documentation</h2>
          </div>
          <p className="text-sm text-[#5C728A] mt-1">
            Standardization protocols, booking horizon controls, quality filters, and index construction rules.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#F0F4F8] px-3 py-1.5 rounded text-xs text-[#5C728A] font-medium border border-[#D9E2EC]">
          <Sparkles className="w-3.5 h-3.5 text-[#0A5B9E]" />
          <span>Statistical Methodology Specification</span>
        </div>
      </div>

      {/* 1. ML Separation Architectural Panel (Section 21 - Core Architectural Requirement) */}
      <div className="p-6 rounded-lg bg-[#14213D] text-white border border-[#0A5B9E] shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#7DC9DE]">
            <Cpu className="w-5 h-5" />
            <h3 className="text-base font-bold uppercase tracking-wider">
              Core Architectural Separation Principle
            </h3>
          </div>
          <span className="px-3 py-1 bg-[#6F498E] text-white text-xs font-bold rounded">
            Statistical Index ≠ ML Prediction
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs pt-2">
          {/* Statistical Path */}
          <div className="p-4 rounded-lg bg-white/10 border border-white/15 space-y-2">
            <div className="font-bold text-[#7DC9DE] flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#4EB050]" /> Statistical Airfare Index Layer
            </div>
            <p className="text-[#9FB3C8] leading-relaxed">
              Derived directly from standardized, verified observed fare observations using Laspeyres-chained fixed-basket weighting. Answers strictly: <span className="text-white font-semibold">&quot;What is measured right now?&quot;</span>
            </p>
          </div>

          {/* ML Intelligence Path */}
          <div className="p-4 rounded-lg bg-white/10 border border-white/15 space-y-2">
            <div className="font-bold text-[#7DC9DE] flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-[#6F498E]" /> Machine Learning Intelligence Layer
            </div>
            <p className="text-[#9FB3C8] leading-relaxed">
              Exploratory predictive XGBoost models, surge detection algorithms, and Isolation Forest anomaly detectors. Presented separately to answer: <span className="text-white font-semibold">&quot;What patterns or forecasts are visible?&quot;</span>
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Observation Definition & Route Basket */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Observation Definition (Section 16) */}
        <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A5B9E] flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> 1. Observation Definition
          </h3>
          <p className="text-xs text-[#5C728A] leading-relaxed">
            An observation is a single standardized fare record captured from a multi-source feed. It contains:
          </p>
          <ul className="text-xs text-[#14213D] space-y-1 list-disc list-inside font-medium bg-[#F0F4F8] p-3 rounded border border-[#D9E2EC]">
            <li>Route Corridor & Departure Schedule</li>
            <li>Airline, Flight Number, Cabin & Fare Family</li>
            <li>Collection Timestamp & Data Source Feed</li>
            <li>Booking Window Horizon (T+1 to T+45)</li>
            <li>Itemized Fare Components & Availability Status</li>
            <li>Auditable Provenance ID & Parser Version</li>
          </ul>
        </div>

        {/* 2. Route Basket & Product Definition */}
        <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A5B9E] flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> 2. Route Basket & Product Definition
          </h3>
          <p className="text-xs text-[#5C728A] leading-relaxed">
            The national index monitors top metro trunk corridors representing over 65% of domestic passenger traffic.
          </p>
          <div className="p-3 bg-[#F0F4F8] rounded border border-[#D9E2EC] space-y-1.5 text-xs text-[#14213D]">
            <div className="flex justify-between font-bold">
              <span>Trunk Corridor Basket:</span>
              <span className="text-[#0A5B9E]">6 Key Routes</span>
            </div>
            <div className="text-[11px] text-[#5C728A] leading-relaxed">
              DEL-BOM (28.5%), BLR-DEL (22.0%), MAA-DEL (18.5%), BOM-CCU (12.5%), HYD-DEL (10.0%), BLR-HYD (8.5%).
            </div>
          </div>
        </div>
      </div>

      {/* 3. Five Controlled Booking Windows (Section 17 - Visual Timeline Ladder) */}
      <div className="bg-white p-6 rounded-lg border border-[#D9E2EC] shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A5B9E] flex items-center gap-1.5">
          <Clock className="w-4 h-4" /> 3. Controlled Booking Window Horizons (T+1 to T+45)
        </h3>
        <p className="text-xs text-[#5C728A] leading-relaxed">
          To prevent mixing advance purchase discounts with last-minute surge pricing, fares are evaluated across 5 controlled booking lead-time horizons:
        </p>

        {/* Horizon Timeline Ladder Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {[
            { window: "T+45", days: "45 Days Lead Time", desc: "Early Advance Purchase" },
            { window: "T+30", days: "30 Days Lead Time", desc: "Standard Advance" },
            { window: "T+15", days: "15 Days Lead Time", desc: "Mid-Term Window" },
            { window: "T+7", days: "7 Days Lead Time", desc: "Close-in Window" },
            { window: "T+1", days: "1 Day Lead Time", desc: "Immediate Departure" },
          ].map((w, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#F0F4F8] border border-[#D9E2EC] rounded-lg text-center space-y-1 hover:border-[#0A5B9E] transition-all"
            >
              <span className="block font-mono font-bold text-sm text-[#0A5B9E]">{w.window}</span>
              <span className="block text-[11px] font-bold text-[#14213D]">{w.days}</span>
              <span className="block text-[10px] text-[#5C728A]">{w.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Fare Standardization Visual Diagram (Section 18) */}
      <div className="bg-white p-6 rounded-lg border border-[#D9E2EC] shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A5B9E] flex items-center gap-1.5">
          <Calculator className="w-4 h-4" /> 4. Fare Standardization Protocol Diagram
        </h3>
        <p className="text-xs text-[#5C728A] leading-relaxed">
          Raw fare quotes are decomposed into standardized components to ensure true like-for-like comparability across carriers and OTAs:
        </p>

        {/* Formula Diagram */}
        <div className="p-4 bg-[#F0F4F8] border border-[#D9E2EC] rounded-lg flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-[#14213D]">
          <span className="px-3 py-1.5 bg-white border border-[#D9E2EC] rounded shadow-xs">Base Fare</span>
          <span className="text-[#0A5B9E] text-base">+</span>
          <span className="px-3 py-1.5 bg-white border border-[#D9E2EC] rounded shadow-xs">Taxes (GST)</span>
          <span className="text-[#0A5B9E] text-base">+</span>
          <span className="px-3 py-1.5 bg-white border border-[#D9E2EC] rounded shadow-xs">UDF</span>
          <span className="text-[#0A5B9E] text-base">+</span>
          <span className="px-3 py-1.5 bg-white border border-[#D9E2EC] rounded shadow-xs">Convenience Fee</span>
          <span className="text-[#D1262C] text-base">-</span>
          <span className="px-3 py-1.5 bg-white border border-[#D9E2EC] rounded shadow-xs text-[#4EB050]">Eligible Discount</span>
          <span className="text-[#0A5B9E] text-base">=</span>
          <span className="px-4 py-2 bg-[#0A5B9E] text-white rounded shadow-sm text-sm">
            Reconciled Displayed Fare
          </span>
        </div>
      </div>

      {/* 5. Data Quality Pipeline & Index Construction (Sections 19 & 20) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quality Checks */}
        <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A5B9E] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> 5. Data Quality & Pipeline Checks
          </h3>
          <div className="space-y-2 text-xs">
            {[
              "Schema Validation & Type Check",
              "Duplicate Observation Removal",
              "Tax & Fee Standardization",
              "Outlier Review (Isolation Forest)",
              "Auditable Provenance Logging",
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[#14213D] font-medium">
                <span className="w-4 h-4 rounded-full bg-[#0A5B9E] text-white flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Index Construction Flow */}
        <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A5B9E] flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> 6. Index Construction Flow
          </h3>
          <div className="p-3 bg-[#F0F4F8] rounded border border-[#D9E2EC] text-xs font-medium text-[#14213D] space-y-1.5 text-center">
            <div>Clean Observations</div>
            <div className="text-[#0A5B9E]">↓</div>
            <div>Comparable Products (Fixed Horizon)</div>
            <div className="text-[#0A5B9E]">↓</div>
            <div>Route Price Relatives</div>
            <div className="text-[#0A5B9E]">↓</div>
            <div className="font-bold text-[#0A5B9E]">Aggregate National Index (Laspeyres-Chained)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
