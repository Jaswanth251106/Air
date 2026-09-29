"use client";

import React from "react";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { StatCard } from "@/components/data-display/StatCard";
import { DataApiTab } from "@/types/dataApi";
import { Database, Download, Terminal, BookOpen, GitBranch, Activity, ArrowRight, Layers, ShieldCheck } from "lucide-react";

interface DataOverviewViewProps {
  onSelectTab?: (tab: DataApiTab) => void;
}

export function DataOverviewView({ onSelectTab }: DataOverviewViewProps) {
  return (
    <div className="space-y-6 select-none">
      {/* Summary Cards (Section 4 requirement) */}
      <ContentGrid columns={5}>
        <StatCard
          label="Datasets"
          value="5 Datasets"
          subtext="CSV, JSON & Excel"
          icon={<Database className="w-4 h-4 text-[#0A5B9E]" />}
          accentColor="#0A5B9E"
        />
        <StatCard
          label="Observations"
          value="1,420 Records"
          subtext="Standardized quotes"
          icon={<Layers className="w-4 h-4 text-[#568AB2]" />}
          accentColor="#568AB2"
        />
        <StatCard
          label="API Endpoints"
          value="8 Endpoints"
          subtext="RESTful API schema"
          icon={<Terminal className="w-4 h-4 text-[#6F498E]" />}
          accentColor="#6F498E"
        />
        <StatCard
          label="Last Update"
          value="09:00 IST"
          subtext="28 Sep 2026 cycle"
          icon={<Activity className="w-4 h-4 text-[#4EB050]" />}
          accentColor="#4EB050"
        />
        <StatCard
          label="Data Status"
          value="Operational"
          subtext="Auditable data platform"
          icon={<ShieldCheck className="w-4 h-4 text-[#4EB050]" />}
          accentColor="#4EB050"
        />
      </ContentGrid>

      {/* Workspace Sub-Module Quick Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5C728A] px-1">
          Data Portal Workspace Modules
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Catalogue */}
          <div
            onClick={() => onSelectTab?.("catalogue")}
            className="p-5 rounded-lg border border-[#D9E2EC] bg-white hover:border-[#0A5B9E] hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="p-2.5 rounded-md bg-[#0A5B9E]/10 w-fit text-[#0A5B9E]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-base">Data Catalogue</h4>
              <p className="text-xs text-[#5C728A] mt-1 leading-relaxed">
                Explore standardized airfare observations, route filters, cabin classes, and itemized fare breakdowns.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-xs font-bold text-[#0A5B9E]">
              <span>Explore Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Downloads */}
          <div
            onClick={() => onSelectTab?.("downloads")}
            className="p-5 rounded-lg border border-[#D9E2EC] bg-white hover:border-[#0A5B9E] hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="p-2.5 rounded-md bg-[#4EB050]/10 w-fit text-[#4EB050]">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-base">Datasets & Downloads</h4>
              <p className="text-xs text-[#5C728A] mt-1 leading-relaxed">
                Download representative CSV, JSON, and Excel datasets for offline statistical verification.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-xs font-bold text-[#4EB050]">
              <span>Browse Downloads</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* API Explorer */}
          <div
            onClick={() => onSelectTab?.("api-explorer")}
            className="p-5 rounded-lg border border-[#D9E2EC] bg-white hover:border-[#6F498E] hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="p-2.5 rounded-md bg-[#6F498E]/10 w-fit text-[#6F498E]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-base">API Explorer</h4>
              <p className="text-xs text-[#5C728A] mt-1 leading-relaxed">
                Inspect 8 RESTful endpoint schemas, parameter specs, copy requests, and code-style payload responses.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-xs font-bold text-[#6F498E]">
              <span>Open API Explorer</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Methodology */}
          <div
            onClick={() => onSelectTab?.("methodology")}
            className="p-5 rounded-lg border border-[#D9E2EC] bg-white hover:border-[#0A5B9E] hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="p-2.5 rounded-md bg-[#0A5B9E]/10 w-fit text-[#0A5B9E]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-base">Methodology</h4>
              <p className="text-xs text-[#5C728A] mt-1 leading-relaxed">
                Review observation definitions, controlled booking horizons (T+1..T+45), fare standardization, and ML separation.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-xs font-bold text-[#0A5B9E]">
              <span>Read Documentation</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Provenance */}
          <div
            onClick={() => onSelectTab?.("provenance")}
            className="p-5 rounded-lg border border-[#D9E2EC] bg-white hover:border-[#F3AC27] hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="p-2.5 rounded-md bg-[#F3AC27]/10 w-fit text-[#B87A00]">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-base">Data Provenance</h4>
              <p className="text-xs text-[#5C728A] mt-1 leading-relaxed">
                Trace any published index value or observation back to its raw multi-source ingestion record.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-xs font-bold text-[#B87A00]">
              <span>Trace Provenance</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* System Health */}
          <div
            onClick={() => onSelectTab?.("system-health")}
            className="p-5 rounded-lg border border-[#D9E2EC] bg-white hover:border-[#568AB2] hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="p-2.5 rounded-md bg-[#568AB2]/10 w-fit text-[#568AB2]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#14213D] text-base">System Health</h4>
              <p className="text-xs text-[#5C728A] mt-1 leading-relaxed">
                Monitor multi-source feed status, parser versions, pipeline quality scores, and collection job history.
              </p>
            </div>
            <div className="pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-xs font-bold text-[#568AB2]">
              <span>Check System Health</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
