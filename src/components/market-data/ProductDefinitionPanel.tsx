import React from "react";
import { Shield, Info } from "lucide-react";
import { useFilterContext } from "@/context/FilterContext";
import { cn } from "@/lib/utils";

interface ProductDefinitionPanelProps {
  className?: string;
}

export function ProductDefinitionPanel({ className }: ProductDefinitionPanelProps) {
  const { filters } = useFilterContext();

  const criteria = [
    { label: "Trip Type", value: "One-way Direct" },
    { label: "Traveller Specification", value: "1 Adult (Standard)" },
    { label: "Stops / Routing", value: "Nonstop Direct" },
    { label: "Cabin Class", value: filters.cabin.toUpperCase() },
    { label: "Fare Family", value: filters.fareFamily },
    { label: "Booking Horizon", value: filters.bookingWindow },
    { label: "Source Eligibility", value: "Verified Carrier Feed" },
  ];

  return (
    <div
      className={cn(
        "bg-white border border-[#E2E8F0] rounded-sih-md p-4 shadow-sih-card flex flex-col justify-between select-none h-full",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between border-b border-[#EDF2F7] pb-2.5 mb-3">
          <div className="flex items-center gap-1.5 font-bold text-xs text-[#14213D] uppercase tracking-wider font-mono">
            <Shield className="w-4 h-4 text-[#0A5B9E]" />
            <span>Product Definition</span>
          </div>
          <span className="text-[10px] font-mono text-[#4EB050] bg-[#EFF8EF] px-1.5 py-0.5 rounded border border-[#B9E4BA]">
            Standardized
          </span>
        </div>

        <p className="text-[11px] text-[#5B6B82] mb-3 font-sans leading-tight">
          Statistical comparability parameters strictly enforced across carrier observation feeds.
        </p>

        <div className="space-y-2 font-mono text-xs">
          {criteria.map((c, idx) => (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-[#EDF2F7] last:border-b-0">
              <span className="text-[#8A99AD] text-[11px]">{c.label}:</span>
              <span className="font-bold text-[#14213D]">{c.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-[#EDF2F7] text-[10px] text-[#8A99AD] font-mono flex items-center gap-1">
        <Info className="w-3 h-3 text-[#0A5B9E] shrink-0" />
        <span>Standardized comparability parameters</span>
      </div>
    </div>
  );
}
