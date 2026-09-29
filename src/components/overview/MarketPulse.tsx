import React from "react";
import { TrendingUp, TrendingDown, Layers, AlertTriangle } from "lucide-react";
import { MarketPulseData } from "@/types/overview";
import { MetricTrend } from "@/components/visualization/MetricTrend";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { cn } from "@/lib/utils";

interface MarketPulseProps {
  pulseData: MarketPulseData;
  className?: string;
}

export function MarketPulse({ pulseData, className }: MarketPulseProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E2E8F0] rounded-sih-md p-5 shadow-sih-card flex flex-col justify-between h-full select-none",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between border-b border-[#EDF2F7] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
              Market Pulse
            </h3>
            <span className="text-[10px] font-mono text-[#0A5B9E] bg-[#EAF3FB] px-1.5 py-0.5 rounded border border-[#B2D4F0]">
              Signals
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#8A99AD]">Real-time Shift</span>
        </div>

        <div className="space-y-4">
          {/* TOP RISING */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#D1262C] mb-2 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>TOP RISING CORRIDORS</span>
            </div>
            <div className="space-y-1.5">
              {pulseData.topRising.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-[#FDF0F1]/60 border border-[#F7C1C3]/50 text-xs font-mono"
                >
                  <span className="font-bold text-[#14213D]">{item.route}</span>
                  <MetricTrend value={item.change} />
                </div>
              ))}
            </div>
          </div>

          {/* TOP FALLING */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#4EB050] mb-2 font-mono">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>TOP FALLING CORRIDORS</span>
            </div>
            <div className="space-y-1.5">
              {pulseData.topFalling.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-[#EFF8EF]/60 border border-[#B9E4BA]/50 text-xs font-mono"
                >
                  <span className="font-bold text-[#14213D]">{item.route}</span>
                  <MetricTrend value={item.change} />
                </div>
              ))}
            </div>
          </div>

          {/* LARGEST SOURCE SPREAD */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#568AB2] mb-2 font-mono">
              <Layers className="w-3.5 h-3.5" />
              <span>LARGEST SOURCE SPREAD</span>
            </div>
            <div className="space-y-1.5">
              {pulseData.largestSpread.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-[#EEF4F8]/60 border border-[#BDD3E4]/50 text-xs font-mono space-y-1"
                >
                  <div className="flex justify-between font-bold text-[#14213D]">
                    <span>{item.route}</span>
                    <span className="text-[#0A5B9E]">{item.percent}% spread</span>
                  </div>
                  <p className="text-[11px] text-[#5B6B82] truncate">{item.spread}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SURGE ALERTS */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F3AC27] mb-2 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>CURRENT SURGE ALERTS</span>
            </div>
            <div className="space-y-1.5">
              {pulseData.surgeAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-[#FEF8EC] border border-[#FBE6B6] text-xs font-mono space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#14213D]">{alert.route}</span>
                    <MetricBadge
                      label={alert.level}
                      variant={alert.level === "HIGH SURGE" ? "alert" : "attention"}
                      size="sm"
                    />
                  </div>
                  <p className="text-[11px] text-[#5B6B82]">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#EDF2F7] text-[11px] font-mono text-[#8A99AD] text-center">
        Live Signal Detection • Rate-of-Change Engine
      </div>
    </div>
  );
}
