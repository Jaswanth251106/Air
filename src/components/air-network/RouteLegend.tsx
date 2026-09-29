"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RouteLegendProps {
  className?: string;
}

export function RouteLegend({ className }: RouteLegendProps) {
  return (
    <div className={cn("bg-white/95 backdrop-blur-md p-3 rounded-sih-md border border-[#E2E8F0] shadow-sih-card text-xs font-sans space-y-2 select-none", className)}>
      <h4 className="text-[10px] font-bold text-[#14213D] uppercase tracking-wider font-mono">
        Spatial Legend
      </h4>
      <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-[#F3AC27] rounded-full inline-block" />
          <span>Selected Corridor</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-[#0A5B9E] rounded-full inline-block" />
          <span>Trunk Route</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#4EB050] inline-block" />
          <span>Stable Fare</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F3AC27] inline-block" />
          <span>Elevated</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#E63946] inline-block" />
          <span>Surge Signal</span>
        </div>
      </div>
    </div>
  );
}
