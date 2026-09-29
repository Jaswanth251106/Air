import React from "react";
import { Alert } from "@/components/feedback/Alert";
import { DataTable } from "@/components/data-display/DataTable";
import { SourceBadge } from "@/components/data-display/SourceBadge";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { MOCK_OTA_COMPARISONS } from "@/data/marketData";

export function OTAComparisonView() {
  const columns = [
    { key: "sourceName", header: "Feed Channel", render: (r: any) => <span className="font-bold">{r.sourceName}</span> },
    { key: "sourceType", header: "Channel Type", render: (r: any) => <SourceBadge source={r.sourceType} /> },
    { key: "fare", header: "Displayed Fare (₹)", align: "right" as const, render: (r: any) => <span className="font-bold font-mono text-[#0A5B9E]">₹{r.fare.toLocaleString("en-IN")}</span> },
    {
      key: "spreadVsDirect",
      header: "Spread vs Carrier Direct",
      align: "right" as const,
      render: (r: any) => (
        <span className={r.spreadVsDirect < 0 ? "text-[#4EB050] font-mono font-bold" : "text-[#14213D] font-mono"}>
          {r.spreadVsDirect === 0 ? "Baseline (0)" : `${r.spreadVsDirect > 0 ? "+" : ""}₹${r.spreadVsDirect}`}
        </span>
      ),
    },
    { key: "availability", header: "Availability", align: "center" as const, render: (r: any) => <MetricBadge label={r.availability} variant={r.availability === "AVAILABLE" ? "validated" : "attention"} size="sm" /> },
    { key: "timestamp", header: "Observation Timestamp", align: "right" as const, render: (r: any) => <span className="font-mono text-[#8A99AD]">{r.timestamp}</span> },
  ];

  return (
    <div className="space-y-6">
      <Alert variant="info" title="SOURCE COMPARISON & RELATED INVENTORY SPECIFICATION">
        <strong>Related itinerary observations:</strong> Displays multi-channel observations for the identical flight leg. Source comparisons analyze listing spreads between Direct Carrier NDC endpoints and OTA aggregator channels.
      </Alert>

      <div className="p-4 bg-white border border-[#E2E8F0] rounded-sih-md shadow-sih-card flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold uppercase text-[#8A99AD]">Largest Observed Source Spread</span>
          <p className="text-xl font-bold text-[#D1262C] font-mono mt-0.5">₹300 (4.7% variance)</p>
          <p className="text-xs text-[#5B6B82] font-sans">Carrier Direct (₹6,420) vs OTA Partner Alpha (₹6,120)</p>
        </div>
        <MetricBadge label="Spread Alert" variant="alert" size="md" />
      </div>

      <DataTable data={MOCK_OTA_COMPARISONS} columns={columns} />
    </div>
  );
}
