import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  label?: string;
  sublabel?: string;
  className?: string;
}

export function LoadingState({
  label = "Processing Statistical Data...",
  sublabel = "Aggregating airfare observations across trunk corridors",
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center rounded-sih-md border border-[#E2E8F0] bg-white shadow-sih-subtle",
        className
      )}
    >
      <Loader2 className="w-8 h-8 text-[#0A5B9E] animate-spin mb-3" />
      <h4 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
        {label}
      </h4>
      <p className="text-xs text-[#5B6B82] mt-1 font-sans">{sublabel}</p>
    </div>
  );
}
