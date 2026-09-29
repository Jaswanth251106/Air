"use client";

import React, { useState } from "react";
import { MOCK_DATASETS } from "@/data/dataApiData";
import { DatasetMetadata } from "@/types/dataApi";
import { Download, FileText, CheckCircle2, ShieldCheck, Database, Calendar } from "lucide-react";

export function DownloadsView() {
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const handleDownload = (dataset: DatasetMetadata) => {
    // Generate representative file download in browser
    const content = dataset.fileContentGenerator();
    const mimeType = dataset.format === "JSON" ? "application/json" : "text/csv";
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = dataset.downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedId(dataset.id);
    setTimeout(() => setDownloadedId(null), 3000);
  };

  const getFormatBadge = (format: string) => {
    switch (format) {
      case "CSV":
        return "bg-[#0A5B9E]/10 text-[#0A5B9E] border-[#0A5B9E]/30";
      case "JSON":
        return "bg-[#6F498E]/10 text-[#6F498E] border-[#6F498E]/30";
      default:
        return "bg-[#4EB050]/10 text-[#4EB050] border-[#4EB050]/30";
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-[#0A5B9E]" />
            <h2 className="text-lg font-bold text-[#14213D]">Datasets & Downloads</h2>
          </div>
          <p className="text-sm text-[#5C728A] mt-1">
            Download representative structured datasets for research, verification, and offline analysis.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#F0F4F8] px-3 py-1.5 rounded text-xs text-[#5C728A] font-medium border border-[#D9E2EC]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4EB050]" />
          <span>Verified Statistical Datasets</span>
        </div>
      </div>

      {/* Dataset Cards Grid (Section 8 & 9) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_DATASETS.map((ds) => {
          const isDownloaded = downloadedId === ds.id;
          return (
            <div
              key={ds.id}
              className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#0A5B9E] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#5C728A]">{ds.id}</span>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getFormatBadge(ds.format)}`}>
                    {ds.format}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#14213D]">{ds.name}</h3>
                  <p className="text-xs text-[#5C728A] mt-1 leading-relaxed">{ds.description}</p>
                </div>
              </div>

              {/* Dataset Metadata List (Section 9) */}
              <div className="space-y-2 pt-3 border-t border-[#F0F4F8] text-xs">
                <div className="flex justify-between items-center text-[#5C728A]">
                  <span>Approx. Size:</span>
                  <span className="font-semibold text-[#14213D]">{ds.size}</span>
                </div>
                <div className="flex justify-between items-center text-[#5C728A]">
                  <span>Version:</span>
                  <span className="font-mono font-bold text-[#0A5B9E]">{ds.version}</span>
                </div>
                <div className="flex justify-between items-center text-[#5C728A]">
                  <span>Coverage:</span>
                  <span className="font-semibold text-[#14213D]">{ds.coverage}</span>
                </div>
                <div className="flex justify-between items-center text-[#5C728A]">
                  <span>Last Updated:</span>
                  <span className="text-[11px] text-[#7B8C9D]">{ds.lastUpdated}</span>
                </div>
              </div>

              {/* Download Action Button (Section 35) */}
              <div className="pt-3 border-t border-[#E4E7EB]">
                <button
                  onClick={() => handleDownload(ds)}
                  className={`w-full py-2 px-4 rounded text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isDownloaded
                      ? "bg-[#4EB050] text-white"
                      : "bg-[#0A5B9E] hover:bg-[#14213D] text-white"
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Downloaded {ds.format}
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Download Dataset ({ds.format})
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage Guidelines Banner */}
      <div className="p-4 rounded-lg bg-[#F0F4F8] border border-[#D9E2EC] text-xs text-[#5C728A] space-y-1">
        <div className="font-bold text-[#14213D] flex items-center gap-1.5">
          <Database className="w-4 h-4 text-[#0A5B9E]" /> Dataset Citation & Usage Guideline
        </div>
        <p className="leading-relaxed">
          All datasets exported from this portal represent standardized fare observations structured for statistical index research and verification.
        </p>
      </div>
    </div>
  );
}
