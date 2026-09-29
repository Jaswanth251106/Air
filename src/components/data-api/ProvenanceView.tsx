"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PROVENANCE_RECORDS } from "@/data/dataApiData";
import { ProvenanceRecord } from "@/types/dataApi";
import { ProvenanceChain } from "./ProvenanceChain";
import { GitBranch, ShieldCheck, Database, Calendar, Layers, Server, Tag, Info } from "lucide-react";

export function ProvenanceView() {
  const searchParams = useSearchParams();
  const idQuery = searchParams.get("id");

  const [activeRecord, setActiveRecord] = useState<ProvenanceRecord>(MOCK_PROVENANCE_RECORDS[0]);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  useEffect(() => {
    if (idQuery) {
      const match = MOCK_PROVENANCE_RECORDS.find(
        (r) => r.id === idQuery || r.observationIds.includes(idQuery)
      );
      if (match) {
        setActiveRecord(match);
      }
    }
  }, [idQuery]);

  const activeStep = activeRecord.steps[activeStepIdx] || activeRecord.steps[0];

  return (
    <div className="space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#0A5B9E]" />
            <h2 className="text-lg font-bold text-[#14213D]">Data Provenance Audit Register</h2>
          </div>
          <p className="text-sm text-[#5C728A] mt-1">
            Trace published statistical index values back to their raw multi-source collection records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#0A5B9E]/10 text-[#0A5B9E] font-bold text-xs rounded border border-[#0A5B9E]/30 font-mono">
            ID: {activeRecord.id}
          </span>
        </div>
      </div>

      {/* Record Selector Pills */}
      <div className="bg-white p-3 rounded-lg border border-[#D9E2EC] shadow-sm flex items-center gap-3">
        <span className="text-xs font-bold text-[#5C728A] uppercase tracking-wider">Select Provenance Record:</span>
        <div className="flex gap-2">
          {MOCK_PROVENANCE_RECORDS.map((rec) => (
            <button
              key={rec.id}
              onClick={() => {
                setActiveRecord(rec);
                setActiveStepIdx(0);
              }}
              className={`px-3 py-1 rounded text-xs font-bold font-mono transition-colors ${
                activeRecord.id === rec.id
                  ? "bg-[#0A5B9E] text-white"
                  : "bg-[#F0F4F8] text-[#5C728A] hover:bg-[#E4E7EB]"
              }`}
            >
              {rec.id} ({rec.route})
            </button>
          ))}
        </div>
      </div>

      {/* Provenance Chain Flow */}
      <div className="bg-white p-6 rounded-lg border border-[#D9E2EC] shadow-sm">
        <ProvenanceChain
          steps={activeRecord.steps}
          activeStepIndex={activeStepIdx}
          onSelectStep={(idx) => setActiveStepIdx(idx)}
        />
      </div>

      {/* Selected Step Detail Inspection Card (Section 23) */}
      <div className="bg-white p-6 rounded-lg border border-[#D9E2EC] shadow-sm space-y-4">
        <div className="pb-3 border-b border-[#E4E7EB] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#0A5B9E] font-mono">
              Stage {activeStepIdx + 1} of {activeRecord.steps.length}: {activeStep.stage}
            </span>
            <h3 className="text-lg font-bold text-[#14213D]">{activeStep.label}</h3>
          </div>
          <span className="px-3 py-1 bg-[#4EB050]/10 text-[#4EB050] font-bold text-xs rounded border border-[#4EB050]/30">
            {activeStep.status}
          </span>
        </div>

        <p className="text-xs text-[#5C728A] leading-relaxed bg-[#F0F4F8] p-3 rounded border border-[#D9E2EC]">
          {activeStep.detail}
        </p>

        {/* Audit Metadata Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-2">
          <div className="p-3 bg-white rounded border border-[#D9E2EC]">
            <span className="block text-[10px] uppercase font-bold text-[#5C728A]">Target Corridor</span>
            <span className="font-bold text-sm text-[#14213D]">{activeRecord.route}</span>
          </div>
          <div className="p-3 bg-white rounded border border-[#D9E2EC]">
            <span className="block text-[10px] uppercase font-bold text-[#5C728A]">Data Feed Source</span>
            <span className="font-bold text-xs text-[#0A5B9E] truncate">{activeRecord.source}</span>
          </div>
          <div className="p-3 bg-white rounded border border-[#D9E2EC]">
            <span className="block text-[10px] uppercase font-bold text-[#5C728A]">Parser & Quality</span>
            <span className="font-mono font-bold text-xs text-[#14213D]">{activeRecord.parserVersion}</span>
          </div>
          <div className="p-3 bg-white rounded border border-[#D9E2EC]">
            <span className="block text-[10px] uppercase font-bold text-[#5C728A]">Audit Status</span>
            <span className="font-bold text-xs text-[#4EB050]">{activeRecord.qualityStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
