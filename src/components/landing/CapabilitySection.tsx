import React from "react";
import { Layers, Calendar, BrainCircuit } from "lucide-react";
import { CapabilityCard } from "./CapabilityCard";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { cn } from "@/lib/utils";

interface CapabilitySectionProps {
  className?: string;
}

export function CapabilitySection({ className }: CapabilitySectionProps) {
  const capabilities = [
    {
      title: "Multi-Source Feed Ingestion",
      description: "Compare airfare observations across airline-direct APIs, GDS, and OTA aggregated feeds.",
      icon: <Layers className="w-5 h-5" />,
      badge: "Multi-Channel",
      accentColor: "#0A5B9E",
    },
    {
      title: "5 Booking Windows",
      description: "Analyze airfare dynamics across T+1, T+7, T+15, T+30, and T+45 advance purchase horizons.",
      icon: <Calendar className="w-5 h-5" />,
      badge: "T+1 to T+45",
      accentColor: "#7DC9DE",
    },
    {
      title: "Statistical + ML Intelligence",
      description: "Combine transparent statistical index measurement with predictive ML forecasting curves.",
      icon: <BrainCircuit className="w-5 h-5" />,
      badge: "Paasche + ML",
      accentColor: "#6F498E",
    },
  ];

  return (
    <section className={cn("py-8 max-w-[1440px] mx-auto px-4 lg:px-8", className)}>
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-[#EDF2F7] pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A5B9E]">
            Platform Capabilities
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#14213D] font-sans tracking-tight mt-1">
            Statistical Measurement & Predictive Intelligence
          </h2>
        </div>
        <p className="text-xs text-[#5B6B82] max-w-xs font-sans">
          Engineered for government analytics, policy research, and aviation market inspection.
        </p>
      </div>

      <ContentGrid columns={3}>
        {capabilities.map((cap, idx) => (
          <CapabilityCard key={idx} {...cap} />
        ))}
      </ContentGrid>
    </section>
  );
}
