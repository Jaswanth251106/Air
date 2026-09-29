"use client";

import React, { useState } from "react";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { StatCard } from "@/components/data-display/StatCard";
import { METHODOLOGY_STEPS } from "@/data/indexEngineData";
import { MethodologyStep } from "@/types/indexEngine";
import { ArrowDown, CheckCircle2, ChevronRight, Layers, Scale, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function IndexOverviewView() {
  const [selectedStep, setSelectedStep] = useState<MethodologyStep>(METHODOLOGY_STEPS[0]);

  return (
    <div className="space-y-6 select-none">
      {/* 1. Summary Cards (Section 5) */}
      <ContentGrid columns={5}>
        <StatCard label="Route Basket" value="6 Routes" subtext="Trunk metro basket" icon={<Layers className="w-4 h-4" />} />
        <StatCard label="Booking Horizons" value="5 Windows" subtext="T+1 to T+45 advance" accentColor="#7DC9DE" />
        <StatCard label="Index Frequency" value="Daily / Weekly" subtext="Real-time aggregation" accentColor="#568AB2" />
        <StatCard label="Reference Base" value="Jan 2026 = 100" subtext="Normalized baseline" accentColor="#4EB050" />
        <StatCard label="Data State" value="Operational" subtext="Live stream pipeline" accentColor="#4EB050" />
      </ContentGrid>

      {/* 2. Visual Methodology Pipeline Story (Section 6) */}
      <div className="bg-white p-6 rounded-sih-md border border-[#E2E8F0] shadow-sih-card space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0A5B9E]" />
            <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
              Index Methodology Transformation Pipeline
            </h3>
          </div>
          <p className="text-xs text-[#5B6B82] font-sans mt-0.5">
            Click any step in the pipeline below to inspect input/output transformation details.
          </p>
        </div>

        {/* Pipeline Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {METHODOLOGY_STEPS.map((step) => {
            const isSelected = selectedStep.id === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className={cn(
                  "p-3.5 rounded-sih-md border transition-all cursor-pointer flex flex-col justify-between space-y-2 relative overflow-hidden bg-white shadow-sih-subtle hover:border-[#B2D4F0]",
                  isSelected
                    ? "border-[#0A5B9E] ring-2 ring-[#0A5B9E]/20 bg-[#EAF3FB]/40"
                    : "border-[#E2E8F0]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-[#0A5B9E] text-white font-mono text-[10px] font-bold flex items-center justify-center">
                    {step.id}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#0A5B9E]" />}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#14213D] font-mono tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-[#5B6B82] font-sans line-clamp-2 mt-0.5">
                    {step.shortDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Step Explanation Panel */}
        <div className="p-4 bg-[#F6F8FB] rounded-sih-md border border-[#E2E8F0] space-y-3">
          <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2 font-mono">
            <span className="font-bold text-xs text-[#0A5B9E]">Step {selectedStep.id}: {selectedStep.title}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8A99AD]" />
            <span className="text-xs text-[#5B6B82]">{selectedStep.shortDesc}</span>
          </div>

          <p className="text-xs text-[#14213D] leading-relaxed font-sans">
            {selectedStep.detailText}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-2.5 bg-white rounded border border-[#E2E8F0] space-y-1">
              <span className="text-[10px] uppercase text-[#8A99AD] font-bold">Transformation Input</span>
              <p className="text-[#14213D] font-semibold">{selectedStep.sampleInput}</p>
            </div>
            <div className="p-2.5 bg-white rounded border border-[#B9E4BA] bg-[#EFF8EF]/50 space-y-1">
              <span className="text-[10px] uppercase text-[#4EB050] font-bold">Transformation Output</span>
              <p className="text-[#14213D] font-semibold">{selectedStep.sampleOutput}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
