import React from "react";
import { Server, Globe, Database, Search } from "lucide-react";
import { SourceBadgeProps, SourceType } from "@/types";
import { cn } from "@/lib/utils";

export function SourceBadge({ source, reliabilityScore }: SourceBadgeProps) {
  const getSourceConfig = (type: SourceType) => {
    switch (type) {
      case "Direct Airline API":
        return {
          icon: <Server className="w-3.5 h-3.5 text-[#0A5B9E]" />,
          bg: "bg-[#EAF3FB]",
          border: "border-[#B2D4F0]",
          text: "text-[#0A5B9E]",
          shortName: "API Direct",
        };
      case "GDS":
        return {
          icon: <Database className="w-3.5 h-3.5 text-[#568AB2]" />,
          bg: "bg-[#EEF4F8]",
          border: "border-[#BDD3E4]",
          text: "text-[#568AB2]",
          shortName: "GDS Sabre/Amadeus",
        };
      case "OTA":
        return {
          icon: <Globe className="w-3.5 h-3.5 text-[#7DC9DE]" />,
          bg: "bg-[#F0F9FC]",
          border: "border-[#CBE9F3]",
          text: "text-[#14213D]",
          shortName: "OTA Aggregate",
        };
      case "Metasearch":
        return {
          icon: <Search className="w-3.5 h-3.5 text-[#6F498E]" />,
          bg: "bg-[#F4EFF8]",
          border: "border-[#D2C1E3]",
          text: "text-[#6F498E]",
          shortName: "Metasearch",
        };
    }
  };

  const config = getSourceConfig(source);

  return (
    <div className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-md border font-sans",
          config.bg,
          config.border,
          config.text
        )}
      >
        {config.icon}
        <span>{config.shortName}</span>
      </span>
      {reliabilityScore !== undefined && (
        <span
          className="text-[11px] font-mono font-medium text-[#5B6B82]"
          title="Source reliability confidence score"
        >
          {Math.round(reliabilityScore * 100)}% rel
        </span>
      )}
    </div>
  );
}
