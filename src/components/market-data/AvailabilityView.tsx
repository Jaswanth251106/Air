import React from "react";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { CheckCircle2, AlertTriangle, XCircle, Ban, HelpCircle } from "lucide-react";
import { AvailabilityState } from "@/types/marketData";

export function AvailabilityView() {
  const states: { state: AvailabilityState; count: number; desc: string; icon: React.ReactNode; variant: any }[] = [
    { state: "AVAILABLE", count: 18, desc: "Open seat inventory (> 4 seats remaining)", icon: <CheckCircle2 className="w-4 h-4 text-[#4EB050]" />, variant: "validated" },
    { state: "LIMITED", count: 6, desc: "Restricted seat inventory (<= 3 seats remaining)", icon: <AlertTriangle className="w-4 h-4 text-[#F3AC27]" />, variant: "attention" },
    { state: "SOLD OUT", count: 2, desc: "Zero seat inventory remaining", icon: <XCircle className="w-4 h-4 text-[#D1262C]" />, variant: "alert" },
    { state: "CANCELLED", count: 1, desc: "Flight schedule cancelled by carrier", icon: <Ban className="w-4 h-4 text-[#D1262C]" />, variant: "coral" },
    { state: "PARSE ERROR", count: 0, desc: "Data feed parsing anomaly", icon: <HelpCircle className="w-4 h-4 text-[#568AB2]" />, variant: "steel" },
    { state: "BLOCKED", count: 0, desc: "Carrier API request rate blocked", icon: <Ban className="w-4 h-4 text-[#5B6B82]" />, variant: "neutral" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-sih-md border border-[#E2E8F0] shadow-sih-card">
        <h3 className="text-sm font-bold text-[#14213D] uppercase tracking-wider font-mono mb-1">
          Categorical Inventory Availability Status
        </h3>
        <p className="text-xs text-[#5B6B82] font-sans mb-4">
          Availability states strictly separated from price metrics (SOLD OUT != ₹0).
        </p>

        <ContentGrid columns={3}>
          {states.map((s, idx) => (
            <div key={idx} className="p-4 rounded-sih-md border border-[#E2E8F0] bg-[#F6F8FB] flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {s.icon}
                  <span className="font-bold text-xs font-mono text-[#14213D]">{s.state}</span>
                </div>
                <MetricBadge label={`${s.count} flights`} variant={s.variant} size="sm" />
              </div>
              <p className="text-[11px] text-[#5B6B82] font-sans">{s.desc}</p>
            </div>
          ))}
        </ContentGrid>
      </div>
    </div>
  );
}
