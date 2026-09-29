"use client";

import React from "react";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { StatCard } from "@/components/data-display/StatCard";
import { IntelligenceTab } from "@/types/intelligence";
import { Brain, AlertTriangle, ShieldAlert, Cpu, Sparkles, TrendingUp, ArrowRight, FileText, Clock } from "lucide-react";

interface IntelligenceOverviewViewProps {
  onSelectTab?: (tab: IntelligenceTab) => void;
}

export function IntelligenceOverviewView({ onSelectTab }: IntelligenceOverviewViewProps) {
  return (
    <div className="space-y-6 select-none">
      {/* Summary Cards (Section 5) */}
      <ContentGrid columns={5}>
        <StatCard
          label="Forecast Horizon"
          value="7 Days"
          subtext="Default predictive window"
          icon={<Brain className="w-4 h-4 text-[#6F498E]" />}
          accentColor="#6F498E"
        />
        <StatCard
          label="Active Surge Signals"
          value="3 Signals"
          subtext="Elevated & High surge"
          icon={<AlertTriangle className="w-4 h-4 text-[#D1262C]" />}
          accentColor="#D1262C"
        />
        <StatCard
          label="Detected Anomalies"
          value="3 Flagged"
          subtext="Isolation Forest v1.0"
          icon={<ShieldAlert className="w-4 h-4 text-[#F3AC27]" />}
          accentColor="#F3AC27"
        />
        <StatCard
          label="Routes Analyzed"
          value="6 Corridors"
          subtext="Trunk corridor basket"
          icon={<Cpu className="w-4 h-4 text-[#0A5B9E]" />}
          accentColor="#0A5B9E"
        />
        <StatCard
          label="Model Version"
          value="v1.0-demo"
          subtext="XGBoost Ensemble"
          icon={<Sparkles className="w-4 h-4 text-[#568AB2]" />}
          accentColor="#568AB2"
        />
      </ContentGrid>

      {/* Quick Navigation Cards to Intelligence Sub-Modules */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5C728A] px-1">
          Predictive Analytics Workspace Modules
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Forecast */}
          <div
            onClick={() => onSelectTab?.("forecast")}
            className="p-5 rounded-lg border border-[#D9E2EC] bg-white hover:border-[#0A5B9E] hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="p-2.5 rounded-md bg-[#6F498E]/10 w-fit text-[#6F498E]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-base">Route Fare Forecast</h4>
              <p className="text-xs text-[#5C728A] mt-1 leading-relaxed">
                7D to 30D horizon trajectory with 95% shaded confidence interval bands.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-xs font-bold text-[#0A5B9E]">
              <span>Explore Forecasts</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Surge Detection */}
          <div
            onClick={() => onSelectTab?.("surge")}
            className="p-5 rounded-lg border border-[#D9E2EC] bg-white hover:border-[#D1262C] hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="p-2.5 rounded-md bg-[#D1262C]/10 w-fit text-[#D1262C]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-base">Surge Detection</h4>
              <p className="text-xs text-[#5C728A] mt-1 leading-relaxed">
                Real-time rate-of-change detectors flagging sudden route fare escalation.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-xs font-bold text-[#D1262C]">
              <span>Inspect Signals</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Anomaly Detection */}
          <div
            onClick={() => onSelectTab?.("anomalies")}
            className="p-5 rounded-lg border border-[#D9E2EC] bg-white hover:border-[#F3AC27] hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="p-2.5 rounded-md bg-[#F3AC27]/10 w-fit text-[#B87A00]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-base">Flagged Anomalies</h4>
              <p className="text-xs text-[#5C728A] mt-1 leading-relaxed">
                Isolation Forest outlier observations with provenance drawer inspection.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-xs font-bold text-[#B87A00]">
              <span>View Anomalies</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Model Card */}
          <div
            onClick={() => onSelectTab?.("model-card")}
            className="p-5 rounded-lg border border-[#D9E2EC] bg-white hover:border-[#6F498E] hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="p-2.5 rounded-md bg-[#0A5B9E]/10 w-fit text-[#0A5B9E]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-base">Model Documentation</h4>
              <p className="text-xs text-[#5C728A] mt-1 leading-relaxed">
                XGBoost parameters, evaluation metrics, feature inputs, and version log.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-xs font-bold text-[#0A5B9E]">
              <span>View Model Card</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
