"use client";

import React from "react";
import { ProvenanceStep } from "@/types/dataApi";
import { ArrowRight, CheckCircle2, ShieldCheck, Database, Layers } from "lucide-react";

interface ProvenanceChainProps {
  steps: ProvenanceStep[];
  activeStepIndex?: number;
  onSelectStep?: (index: number) => void;
}

export function ProvenanceChain({ steps, activeStepIndex = 0, onSelectStep }: ProvenanceChainProps) {
  return (
    <div className="w-full space-y-4 select-none">
      <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C728A] px-1">
        Auditable Provenance Chain Execution Trace
      </h4>

      {/* Connected Nodes Flow Diagram (Section 24) */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <div
              key={idx}
              onClick={() => onSelectStep?.(idx)}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer bg-white relative flex flex-col justify-between ${
                isActive
                  ? "border-[#0A5B9E] ring-2 ring-[#0A5B9E]/10 shadow-md"
                  : "border-[#D9E2EC] hover:border-[#9FB3C8] shadow-xs"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#0A5B9E] font-mono">
                    Step {idx + 1}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#4EB050]/10 text-[#4EB050]">
                    {step.status}
                  </span>
                </div>
                <h5 className="font-bold text-[#14213D] text-xs mt-1">{step.stage}</h5>
                <p className="text-[11px] text-[#5C728A] line-clamp-2">{step.label}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-[10px] text-[#0A5B9E] font-bold">
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
