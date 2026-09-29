"use client";

import React from "react";
import { MOCK_MODEL_PARAMETERS, MOCK_MODEL_VERSIONS } from "@/data/intelligenceData";
import { Cpu, ShieldCheck, AlertTriangle, Layers, GitBranch, Terminal, FileText, CheckCircle2 } from "lucide-react";

export function ModelCardView() {
  return (
    <div className="space-y-6">
      {/* Model Header */}
      <div className="bg-white p-6 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#6F498E]/10 text-[#6F498E] font-mono font-bold text-xs rounded border border-[#6F498E]/30">
              Model ID: XGBoost Regressor v1.0
            </span>
            <span className="px-2 py-0.5 bg-[#4EB050]/10 text-[#4EB050] font-bold text-xs rounded border border-[#4EB050]/30">
              Operational
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#14213D] mt-2">Gradient Boosted Route Fare Forecaster</h2>
          <p className="text-sm text-[#5C728A] mt-1">
            Supervised regression model predicting route-level mean fare trends across advance booking horizons.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#5C728A] bg-[#F0F4F8] p-3 rounded border border-[#D9E2EC]">
          <Cpu className="w-4 h-4 text-[#0A5B9E]" />
          <div>
            <span className="block font-bold text-[#14213D]">XGBoost Regressor</span>
            <span>Framework: Python / scikit-learn pipeline</span>
          </div>
        </div>
      </div>

      {/* Grid Layout: Architecture & Input Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Purpose & Scope */}
        <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A5B9E] flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> Intended Use & Scope
          </h3>
          <p className="text-xs text-[#5C728A] leading-relaxed">
            Designed specifically for statistical trend forecasting and anomaly detection on major Indian domestic routes. Provides predictive indicators to assist statistical index analysis.
          </p>
          <div className="pt-2 border-t border-[#F0F4F8] text-xs text-[#14213D] space-y-1">
            <span className="font-bold text-[11px] uppercase text-[#5C728A]">Primary Target Metric:</span>
            <p className="font-medium text-[#0A5B9E]">7-Day & 14-Day Route Mean Fare (INR)</p>
          </div>
        </div>

        {/* Card 2: Feature Inputs */}
        <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A5B9E] flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> Model Feature Inputs
          </h3>
          <ul className="text-xs text-[#5C728A] space-y-1.5 list-disc list-inside">
            <li><span className="font-semibold text-[#14213D]">Booking Window (Lead Time):</span> T+1 to T+45 days</li>
            <li><span className="font-semibold text-[#14213D]">Multi-Source Spread:</span> OTA vs Direct Carrier spread width</li>
            <li><span className="font-semibold text-[#14213D]">Historical Volatility:</span> 30-day rolling standard deviation</li>
            <li><span className="font-semibold text-[#14213D]">Temporal Markers:</span> Day of week, month, festival proximity flag</li>
            <li><span className="font-semibold text-[#14213D]">Route Distance / Corridor:</span> Metro-Metro vs Regional classification</li>
          </ul>
        </div>
      </div>

      {/* Hyperparameters Table */}
      <div className="bg-white rounded-lg border border-[#D9E2EC] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E4E7EB] bg-[#F0F4F8]">
          <span className="text-xs font-bold text-[#14213D] uppercase tracking-wider">
            Model Hyperparameters (Configuration)
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#14213D]">
            <thead className="bg-[#E4E7EB]/50 text-[#5C728A] font-semibold uppercase tracking-wider text-[11px] border-b border-[#D9E2EC]">
              <tr>
                <th className="p-3">Parameter Name</th>
                <th className="p-3 text-center">Configured Value</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EB]">
              {MOCK_MODEL_PARAMETERS.map((param, idx) => (
                <tr key={idx} className="hover:bg-[#F0F4F8] transition-colors">
                  <td className="p-3 font-mono font-bold text-[#0A5B9E]">{param.name}</td>
                  <td className="p-3 text-center font-mono font-bold bg-[#F0F4F8]">{param.value}</td>
                  <td className="p-3 text-[#5C728A]">{param.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evaluation Metrics */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EB]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#14213D] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4EB050]" /> Model Evaluation Metrics
          </h3>
          <span className="text-xs font-bold text-[#4EB050] bg-[#4EB050]/10 px-2.5 py-1 rounded border border-[#4EB050]/30">
            Validated Evaluation
          </span>
        </div>
        <p className="text-xs text-[#5C728A] leading-relaxed">
          Model performance figures evaluated across historical out-of-sample test splits across major Indian metro corridors.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-2">
          <div className="p-3 bg-[#F0F4F8] rounded border border-[#D9E2EC]">
            <span className="block text-[10px] uppercase font-bold text-[#5C728A]">Sample RMSE</span>
            <span className="text-base font-bold text-[#14213D]">₹142.50</span>
          </div>
          <div className="p-3 bg-[#F0F4F8] rounded border border-[#D9E2EC]">
            <span className="block text-[10px] uppercase font-bold text-[#5C728A]">Sample MAE</span>
            <span className="text-base font-bold text-[#14213D]">₹98.20</span>
          </div>
          <div className="p-3 bg-[#F0F4F8] rounded border border-[#D9E2EC]">
            <span className="block text-[10px] uppercase font-bold text-[#5C728A]">Sample R² Score</span>
            <span className="text-base font-bold text-[#4EB050]">0.914</span>
          </div>
          <div className="p-3 bg-[#F0F4F8] rounded border border-[#D9E2EC]">
            <span className="block text-[10px] uppercase font-bold text-[#5C728A]">MAPE</span>
            <span className="text-base font-bold text-[#0A5B9E]">2.41%</span>
          </div>
        </div>
      </div>

      {/* Model Version History */}
      <div className="bg-white rounded-lg border border-[#D9E2EC] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E4E7EB] bg-[#F0F4F8]">
          <span className="text-xs font-bold text-[#14213D] uppercase tracking-wider flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-[#0A5B9E]" /> Model Version History
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#14213D]">
            <thead className="bg-[#E4E7EB]/50 text-[#5C728A] font-semibold uppercase tracking-wider text-[11px] border-b border-[#D9E2EC]">
              <tr>
                <th className="p-3">Version</th>
                <th className="p-3">Release Date</th>
                <th className="p-3">Key Change Summary</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EB]">
              {MOCK_MODEL_VERSIONS.map((v, idx) => (
                <tr key={idx} className="hover:bg-[#F0F4F8] transition-colors">
                  <td className="p-3 font-mono font-bold text-[#0A5B9E]">{v.version}</td>
                  <td className="p-3 text-[#5C728A]">{v.date}</td>
                  <td className="p-3 text-[#14213D] font-medium">{v.change}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        v.status.includes("Active")
                          ? "bg-[#4EB050]/10 text-[#4EB050] border-[#4EB050]/30"
                          : "bg-[#5C728A]/10 text-[#5C728A] border-[#5C728A]/30"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Disclosures */}
      <div className="p-5 rounded-lg bg-[#F0F4F8] border border-[#D9E2EC] text-xs text-[#5C728A] space-y-2">
        <div className="font-bold text-[#0A5B9E] flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" /> Model Disclosures & Scope Guidelines
        </div>
        <ul className="list-disc list-inside space-y-1 text-xs text-[#14213D] leading-relaxed">
          <li>Model predictions are generated for analytical trend visualization and market inspection.</li>
          <li>Predictive intelligence outputs are operationally separate from official statistical index calculations.</li>
          <li>Forecast outputs provide analytical insights and do not constitute financial advice.</li>
        </ul>
      </div>
    </div>
  );
}
