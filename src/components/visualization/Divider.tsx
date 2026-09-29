import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps {
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Divider({ label, orientation = "horizontal", className }: DividerProps) {
  if (orientation === "vertical") {
    return <div className={cn("w-px h-full bg-[#E2E8F0] mx-2 self-stretch", className)} />;
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-3 my-4 w-full", className)}>
        <div className="flex-1 h-px bg-[#E2E8F0]" />
        <span className="text-xs font-mono font-semibold text-[#5B6B82] uppercase tracking-wider">
          {label}
        </span>
        <div className="flex-1 h-px bg-[#E2E8F0]" />
      </div>
    );
  }

  return <hr className={cn("border-t border-[#E2E8F0] my-4 w-full", className)} />;
}
