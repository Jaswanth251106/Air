"use client";

import React from "react";
import { CollectionJob } from "@/types/dataApi";
import { X, CheckCircle2, ShieldAlert, Clock, Layers, Cpu, Server, Activity } from "lucide-react";

interface JobDetailDrawerProps {
  job: CollectionJob | null;
  onClose: () => void;
}

export function JobDetailDrawer({ job, onClose }: JobDetailDrawerProps) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#D9E2EC] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E4E7EB] bg-[#14213D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-white/10 text-white">
              <Activity className="w-5 h-5 text-[#7DC9DE]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#9FB3C8] font-bold">
                Collection Job Inspector
              </span>
              <h3 className="text-lg font-bold text-white font-mono">{job.id}</h3>
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

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs select-none">
          {/* Status Badge & Summary */}
          <div className="p-4 rounded-lg bg-[#F0F4F8] border border-[#D9E2EC] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#14213D] text-sm">{job.source}</span>
              <span
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  job.status === "COMPLETED"
                    ? "bg-[#4EB050]/10 text-[#4EB050] border border-[#4EB050]/30"
                    : "bg-[#F3AC27]/10 text-[#B87A00] border border-[#F3AC27]/30"
                }`}
              >
                {job.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-[#D9E2EC]">
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#5C728A]">Quality Score</span>
                <span className="font-bold text-base text-[#0A5B9E]">{job.qualityScore}%</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#5C728A]">Routes Ingested</span>
                <span className="font-bold text-sm text-[#14213D]">{job.routesProcessed} Corridors</span>
              </div>
            </div>
          </div>

          {/* Execution Timing */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#5C728A] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#0A5B9E]" /> Execution Timeline
            </h4>
            <div className="p-4 rounded-lg border border-[#D9E2EC] bg-white space-y-2">
              <div className="flex justify-between items-center text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A]">Job Start Time:</span>
                <span className="font-medium text-[#14213D]">{job.startedAt}</span>
              </div>
              <div className="flex justify-between items-center text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A]">Job Completion Time:</span>
                <span className="font-medium text-[#14213D]">{job.completedAt}</span>
              </div>
              <div className="flex justify-between items-center text-xs py-1">
                <span className="text-[#5C728A]">Parser & Schema Version:</span>
                <span className="font-mono text-[#0A5B9E] font-bold">{job.parserVersion}</span>
              </div>
            </div>
          </div>

          {/* Observations Processing Counter */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#5C728A] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0A5B9E]" /> Ingestion Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded border border-[#D9E2EC]">
                <span className="block text-[10px] uppercase font-bold text-[#5C728A]">Successful Obs</span>
                <span className="font-bold text-base text-[#4EB050]">{job.successfulObs}</span>
              </div>
              <div className="p-3 bg-white rounded border border-[#D9E2EC]">
                <span className="block text-[10px] uppercase font-bold text-[#5C728A]">Failed / Dropped</span>
                <span className="font-bold text-base text-[#D1262C]">{job.failedObs}</span>
              </div>
            </div>
          </div>

          {/* Prototype Label Note */}
          <div className="p-3 rounded-lg bg-[#F0F4F8] border border-[#D9E2EC] text-[11px] text-[#5C728A] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0A5B9E] shrink-0" />
            <span>System Job Audit Record — Ingestion cycle verified by system monitor.</span>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#E4E7EB] bg-[#F0F4F8] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#14213D] hover:bg-[#0A5B9E] text-white font-medium rounded text-xs transition-colors"
          >
            Close Job Detail
          </button>
        </div>
      </div>
    </div>
  );
}
