import React from "react";
import { Section } from "@/components/layout/Section";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { StatCard } from "@/components/data-display/StatCard";
import { DataTable } from "@/components/data-display/DataTable";
import { Receipt, Info } from "lucide-react";

export function FareComponentsView() {
  const breakdownRows = [
    { component: "Base Fare (Carrier Net)", amount: "₹4,100", percent: "79.9%", category: "Fare" },
    { component: "GST & Government Airport Taxes", amount: "₹780", percent: "15.2%", category: "Tax" },
    { component: "User Development Fee (UDF)", amount: "₹150", percent: "2.9%", category: "Fee" },
    { component: "Other Airline / Fuel Charges", amount: "₹100", percent: "1.9%", category: "Surcharge" },
    { component: "Discount / Promotional Rebate", amount: "₹0", percent: "0.0%", category: "Rebate" },
  ];

  const columns = [
    { key: "component", header: "Fare Component Name", width: "240px" },
    { key: "category", header: "Category", align: "center" as const },
    { key: "amount", header: "Amount (₹)", align: "right" as const, render: (r: any) => <span className="font-bold font-mono">{r.amount}</span> },
    { key: "percent", header: "Share of Total", align: "right" as const, render: (r: any) => <span className="font-mono text-[#0A5B9E]">{r.percent}</span> },
  ];

  return (
    <div className="space-y-6">
      <Section title="Fare Component Structure Reconciled View" subtitle="Comprehensive breakdown of base fare, statutory taxes, UDF, and carrier fees">
        <ContentGrid columns={4} className="mb-6">
          <StatCard label="Base Fare Net" value="₹4,100" subtext="79.9% of total" icon={<Receipt className="w-4 h-4" />} />
          <StatCard label="Taxes & UDF" value="₹930" subtext="18.1% of total" accentColor="#568AB2" />
          <StatCard label="Surcharges" value="₹100" subtext="1.9% of total" accentColor="#F3AC27" />
          <StatCard label="Reconciled Total" value="₹5,130" subtext="Standard flex itinerary" accentColor="#4EB050" />
        </ContentGrid>

        {/* Stacked Horizontal Component Bar */}
        <div className="bg-white p-5 rounded-sih-md border border-[#E2E8F0] shadow-sih-card mb-6">
          <h4 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono mb-3">
            Component Proportion Bar
          </h4>
          <div className="h-6 w-full rounded-sih-sm overflow-hidden flex font-mono text-[10px] font-bold text-white shadow-2xs">
            <div className="bg-[#0A5B9E] flex items-center justify-center" style={{ width: "79.9%" }} title="Base Fare 79.9%">Base 79.9%</div>
            <div className="bg-[#568AB2] flex items-center justify-center" style={{ width: "15.2%" }} title="Taxes 15.2%">Tax 15.2%</div>
            <div className="bg-[#7DC9DE] flex items-center justify-center text-[#14213D]" style={{ width: "2.9%" }} title="UDF 2.9%">2.9%</div>
            <div className="bg-[#F3AC27] flex items-center justify-center text-[#14213D]" style={{ width: "1.9%" }} title="Other 1.9%">1.9%</div>
          </div>
          <p className="text-[11px] text-[#5B6B82] mt-2 font-mono flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-[#0A5B9E]" /> Reconciled sum equals ₹5,130 total observed fare.
          </p>
        </div>

        <DataTable data={breakdownRows} columns={columns} />
      </Section>
    </div>
  );
}
