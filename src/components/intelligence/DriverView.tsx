"use client";

import React from "react";
import { MOCK_DRIVER_CONTRIBUTIONS } from "@/data/intelligenceData";
import { Cpu, Info, BarChart2, CheckCircle2 } from "lucide-react";

export function DriverView() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#0A5B9E]" />
            <h2 className="text-lg font-bold text-[#14213D]">Feature Attribution & Model Drivers</h2>
          </div>
          <p className="text-sm text-[#5C728A] mt-1">
            Quantified model feature importance scores and model-attributed contributions to fare predictions.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#F0F4F8] px-3 py-1.5 rounded text-xs text-[#5C728A] font-medium border border-[#D9E2EC]">
          <BarChart2 className="w-3.5 h-3.5 text-[#0A5B9E]" />
          <span>Attribution Method: SHAP / Feature Importance</span>
        </div>
      </div>

      {/* Non-causal terminology warning banner */}
      <div className="bg-[#6F498E]/5 border border-[#6F498E]/20 p-4 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 text-[#6F498E] shrink-0 mt-0.5" />
        <div className="text-xs text-[#14213D] space-y-1">
          <span className="font-bold text-[#6F498E]">Non-Causal Interpretation Guideline</span>
          <p className="text-[#5C728A] leading-relaxed">
            Feature contributions reflect mathematical feature associations within the XGBoost regression model architecture.
            They do not prove real-world causality (e.g. &quot;Festival proximity caused the fare spike&quot;). All labels describe{" "}
            <span className="font-semibold text-[#14213D]">&quot;model-attributed contribution&quot;</span>.
          </p>
        </div>
      </div>

      {/* Feature Importance & Contribution Progress Bars */}
      <div className="bg-white rounded-lg border border-[#D9E2EC] p-6 shadow-sm space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5C728A]">
          Model Feature Importance Ranking
        </h3>

        <div className="space-y-5">
          {MOCK_DRIVER_CONTRIBUTIONS.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-[#14213D]">{item.featureName}</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-[#5C728A]">
                    Importance Score: <span className="font-bold text-[#14213D]">{item.importanceScore}/100</span>
                  </span>
                  <span className="px-2 py-0.5 bg-[#6F498E]/10 text-[#6F498E] font-bold rounded text-[11px]">
                    +{item.modelContribution} SHAP
                  </span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-[#F0F4F8] rounded-full h-3 overflow-hidden border border-[#E4E7EB]">
                <div
                  className="bg-gradient-to-r from-[#0A5B9E] to-[#6F498E] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${item.importanceScore}%` }}
                />
              </div>

              <p className="text-[11px] text-[#5C728A] italic pl-7">
                Interpretation: &quot;{item.interpretation}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Rationale Card */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm space-y-2 text-xs">
        <div className="font-bold text-[#14213D] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#0A5B9E]" />
          Methodological Summary
        </div>
        <p className="text-[#5C728A] leading-relaxed">
          The leading model drivers identified by tree-based feature splitting are Advance Booking Lead Time (88/100) and Carrier Seat Availability Class (74/100). These features represent the primary predictors in the model&apos;s internal forecast decision trees.
        </p>
      </div>
    </div>
  );
}
