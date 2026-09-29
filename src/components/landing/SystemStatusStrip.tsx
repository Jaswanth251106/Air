import React from "react";
import { Activity, Clock, Database, Route, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemStatusStripProps {
  className?: string;
}

export function SystemStatusStrip({ className }: SystemStatusStripProps) {
  const metrics = [
    {
      label: "Data Freshness",
      value: "Current observation cycle",
      icon: <Clock className="w-3.5 h-3.5 text-[#0A5B9E]" />,
    },
    {
      label: "Sources Monitored",
      value: "Active Multi-Source",
      icon: <Database className="w-3.5 h-3.5 text-[#568AB2]" />,
    },
    {
      label: "Routes Covered",
      value: "Representative basket",
      icon: <Route className="w-3.5 h-3.5 text-[#7DC9DE]" />,
    },
    {
      label: "Last Index Update",
      value: "28 Sep 2026 • 09:00 IST",
      icon: <Activity className="w-3.5 h-3.5 text-[#4EB050]" />,
    },
  ];

  return (
    <section className={cn("py-4 max-w-[1440px] mx-auto px-4 lg:px-8", className)}>
      <div className="bg-[#14213D] text-white rounded-sih-lg p-4 shadow-sih-card border border-[#568AB2]/30 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        {/* Environment Indicator */}
        <div className="flex items-center gap-2 pr-4 border-r border-[#568AB2]/30">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4EB050] animate-pulse" />
          <span className="font-bold tracking-wide text-slate-100">
            Operational Environment
          </span>
          <span className="text-[10px] text-[#7DC9DE] bg-[#0A5B9E]/40 px-1.5 py-0.5 rounded border border-[#7DC9DE]/30">
            National Index
          </span>
        </div>

        {/* System Metrics Strip */}
        <div className="flex flex-wrap items-center gap-6 flex-1 justify-around">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {m.icon}
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-[#8A99AD] font-medium">
                  {m.label}
                </span>
                <span className="font-semibold text-slate-200">{m.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="text-[11px] text-[#8A99AD] hidden xl:flex items-center gap-1 pl-4 border-l border-[#568AB2]/30 font-sans">
          <ShieldAlert className="w-3.5 h-3.5 text-[#4EB050]" />
          <span>Verified Methodology • Statistical Engine</span>
        </div>
      </div>
    </section>
  );
}
