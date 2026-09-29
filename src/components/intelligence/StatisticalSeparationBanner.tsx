import React from "react";
import { Alert } from "@/components/feedback/Alert";
import { BrainCircuit, Info } from "lucide-react";

interface StatisticalSeparationBannerProps {
  className?: string;
}

export function StatisticalSeparationBanner({ className }: StatisticalSeparationBannerProps) {
  return (
    <div className={className}>
      <Alert variant="forecast" title="STATISTICAL INDEX & ML INTELLIGENCE LAYER SEPARATION">
        <div className="space-y-1 font-sans text-xs">
          <p>
            <strong>Core Architecture Principle:</strong> The statistical index is calculated through the standardized Paasche statistical workflow. ML intelligence outputs are presented separately for forecasting, anomaly classification, and model-attributed signal exploration.
          </p>
          <p className="text-[11px] opacity-90 font-mono">
            Model predictions do not modify or replace empirical statistical index values.
          </p>
        </div>
      </Alert>
    </div>
  );
}
