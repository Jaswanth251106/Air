"use client";

import React, { useState } from "react";
import { MOCK_SOURCE_HEALTH, MOCK_COLLECTION_JOBS } from "@/data/dataApiData";
import { CollectionJob, SourceHealth } from "@/types/dataApi";
import { JobDetailDrawer } from "./JobDetailDrawer";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { StatCard } from "@/components/data-display/StatCard";
import { Server, Activity, CheckCircle2, Clock, Eye, AlertCircle, ShieldCheck } from "lucide-react";

export function SystemHealthView() {
  const [selectedJob, setSelectedJob] = useState<CollectionJob | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "HEALTHY":
      case "COMPLETED":
        return "bg-[#4EB050]/10 text-[#4EB050] border-[#4EB050]/30";
      case "PARTIAL":
        return "bg-[#F3AC27]/10 text-[#B87A00] border-[#F3AC27]/30";
      case "FAILED":
        return "bg-[#D1262C]/10 text-[#D1262C] border-[#D1262C]/30";
      default:
        return "bg-[#5C728A]/10 text-[#5C728A] border-[#5C728A]/30";
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header Banner & Data Freshness Component (Section 29) */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#0A5B9E]" />
            <h2 className="text-lg font-bold text-[#14213D]">System Health & Data Ingestion Monitor</h2>
          </div>
          <p className="text-sm text-[#5C728A] mt-1">
            Real-time multi-source collection status, feed error rates, and ingestion job history.
          </p>
        </div>

        {/* Reusable Data Freshness Component (Section 29) */}
        <div className="flex items-center gap-2.5 bg-[#4EB050]/10 border border-[#4EB050]/30 px-3.5 py-2 rounded-lg text-xs font-bold text-[#14213D]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4EB050] animate-pulse" />
          <div>
            <span className="block text-[10px] uppercase text-[#5C728A]">Latest Observation Cycle</span>
            <span className="text-[#14213D]">28 Sep 2026 • 09:00 IST (Current)</span>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards (Section 25) */}
      <ContentGrid columns={5}>
        <StatCard
          label="Data Feeds Monitored"
          value="5 Feeds"
          subtext="Direct API, GDS & OTA"
          icon={<Server className="w-4 h-4 text-[#0A5B9E]" />}
          accentColor="#0A5B9E"
        />
        <StatCard
          label="Last Collection"
          value="09:00 IST"
          subtext="28 Sep 2026 cycle"
          icon={<Clock className="w-4 h-4 text-[#568AB2]" />}
          accentColor="#568AB2"
        />
        <StatCard
          label="Successful Jobs"
          value="4 Jobs"
          subtext="Today's execution log"
          icon={<CheckCircle2 className="w-4 h-4 text-[#4EB050]" />}
          accentColor="#4EB050"
        />
        <StatCard
          label="Failed Jobs"
          value="0 Jobs"
          subtext="Zero critical failures"
          icon={<AlertCircle className="w-4 h-4 text-[#D1262C]" />}
          accentColor="#D1262C"
        />
        <StatCard
          label="Pipeline Quality Score"
          value="98.4%"
          subtext="Overall schema pass rate"
          icon={<ShieldCheck className="w-4 h-4 text-[#6F498E]" />}
          accentColor="#6F498E"
        />
      </ContentGrid>

      {/* Source Health Table (Section 26) */}
      <div className="bg-white rounded-lg border border-[#D9E2EC] shadow-sm overflow-hidden space-y-3 p-5">
        <span className="text-xs font-bold text-[#14213D] uppercase tracking-wider block">
          Multi-Source Feed Ingestion Health Status
        </span>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#14213D]">
            <thead className="bg-[#E4E7EB]/50 text-[#5C728A] font-semibold uppercase tracking-wider text-[11px] border-b border-[#D9E2EC]">
              <tr>
                <th className="p-3">Data Source Feed</th>
                <th className="p-3">Type</th>
                <th className="p-3">Last Success</th>
                <th className="p-3">Parser Version</th>
                <th className="p-3 text-right">Error Rate</th>
                <th className="p-3 text-center">Coverage</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EB]">
              {MOCK_SOURCE_HEALTH.map((sh) => (
                <tr key={sh.id} className="hover:bg-[#F0F4F8] transition-colors">
                  <td className="p-3 font-bold text-[#14213D]">{sh.source}</td>
                  <td className="p-3 text-[#5C728A]">{sh.type}</td>
                  <td className="p-3 font-mono text-[#0A5B9E]">{sh.lastSuccess}</td>
                  <td className="p-3 font-mono text-[#5C728A]">{sh.parserVersion}</td>
                  <td className="p-3 text-right font-mono font-bold text-[#14213D]">{sh.errorRate}</td>
                  <td className="p-3 text-center font-medium text-[#5C728A]">{sh.coverage}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(
                        sh.status
                      )}`}
                    >
                      {sh.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collection Job History Table (Section 27) */}
      <div className="bg-white rounded-lg border border-[#D9E2EC] shadow-sm overflow-hidden space-y-3 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
            Ingestion Job Execution History
          </span>
          <span className="text-xs text-[#5C728A]">Click job row to inspect detailed execution log</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#14213D]">
            <thead className="bg-[#E4E7EB]/50 text-[#5C728A] font-semibold uppercase tracking-wider text-[11px] border-b border-[#D9E2EC]">
              <tr>
                <th className="p-3">Job ID</th>
                <th className="p-3">Source Feed</th>
                <th className="p-3">Started</th>
                <th className="p-3">Completed</th>
                <th className="p-3 text-center">Routes</th>
                <th className="p-3 text-right">Success Obs</th>
                <th className="p-3 text-right">Failed Obs</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EB]">
              {MOCK_COLLECTION_JOBS.map((job) => (
                <tr
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="hover:bg-[#F0F4F8] transition-colors cursor-pointer"
                >
                  <td className="p-3 font-mono font-bold text-[#0A5B9E]">{job.id}</td>
                  <td className="p-3 font-medium text-[#14213D]">{job.source}</td>
                  <td className="p-3 text-[#5C728A] font-mono text-[11px]">{job.startedAt}</td>
                  <td className="p-3 text-[#5C728A] font-mono text-[11px]">{job.completedAt}</td>
                  <td className="p-3 text-center font-bold">{job.routesProcessed}</td>
                  <td className="p-3 text-right font-bold text-[#4EB050]">{job.successfulObs}</td>
                  <td className="p-3 text-right font-bold text-[#D1262C]">{job.failedObs}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                      }}
                      className="px-2.5 py-1 bg-[#F0F4F8] hover:bg-[#0A5B9E] text-[#0A5B9E] hover:text-white font-medium rounded text-xs transition-colors inline-flex items-center gap-1 border border-[#D9E2EC]"
                    >
                      <Eye className="w-3.5 h-3.5" /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Detail Drawer */}
      <JobDetailDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
