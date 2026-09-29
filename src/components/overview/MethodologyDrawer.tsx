"use client";

import React from "react";
import { Drawer } from "@/components/feedback/Drawer";
import { BookOpen, ShieldCheck, Scale, Cpu, Activity } from "lucide-react";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { Button } from "@/components/forms/Button";

interface MethodologyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MethodologyDrawer({ isOpen, onClose }: MethodologyDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Index Statistical Methodology"
      subtitle="Technical & Statistical Methodology Specification"
    >
      <div className="space-y-6 text-xs text-[#14213D] font-sans">
        {/* Specification Banner */}
        <div className="p-3 bg-[#EAF3FB] rounded-sih-md border border-[#B2D4F0] text-[#14213D] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#0A5B9E]">
            <ShieldCheck className="w-4 h-4 text-[#0A5B9E]" />
            <span>Statistical Methodology & Data Lineage</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#5B6B82]">
            Index values are derived from standardized observations captured across trunk aviation corridors. Weighted Laspeyres-chained formulas ensure objective price measurement.
          </p>
        </div>

        {/* 1. Observation Criteria */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-[#0A5B9E]">
            <Activity className="w-4 h-4" />
            <span>1. Eligible Observation Criteria</span>
          </div>
          <p className="text-[#5B6B82] leading-relaxed">
            Observations are captured across 5 advance booking windows (T+1, T+7, T+15, T+30, T+45) across top domestic trunk corridors connecting major Indian metros. Duplicate fare listings are deduplicated using airline NDC timestamps.
          </p>
        </div>

        {/* 2. Statistical Aggregation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-[#0A5B9E]">
            <Scale className="w-4 h-4" />
            <span>2. Aggregation Formula</span>
          </div>
          <p className="text-[#5B6B82] leading-relaxed">
            The National Airfare Index follows a quantity-weighted price index structure relative to the Jan 2026 reference period baseline (Index = 100.0).
          </p>
          <div className="p-3 bg-[#F6F8FB] rounded border border-[#E2E8F0] font-mono text-[11px] text-[#0A5B9E] space-y-1">
            <p>I_t = [ ∑ (P_it * Q_it) / ∑ (P_i0 * Q_it) ] * 100</p>
            <p className="text-[#8A99AD] text-[10px]">P_it = current price | P_i0 = base price | Q_it = capacity weight</p>
          </div>
        </div>

        {/* 3. Multi-Channel Sources */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-[#0A5B9E]">
            <Cpu className="w-4 h-4" />
            <span>3. Multi-Channel Data Consensus</span>
          </div>
          <p className="text-[#5B6B82] leading-relaxed">
            Data feeds are ingested from Carrier Direct APIs, GDS (Sabre/Amadeus), OTA aggregates, and Metasearch providers. Variance exceeding 2.5 standard deviations triggers elevated or high surge anomaly flags.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <MetricBadge label="Direct Carrier API" variant="primary" size="sm" />
            <MetricBadge label="GDS Feed" variant="steel" size="sm" />
            <MetricBadge label="OTA Aggregate" variant="secondary" size="sm" />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E2E8F0]">
          <Button variant="outline" size="sm" onClick={onClose} className="w-full">
            Close Methodology Inspection
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
