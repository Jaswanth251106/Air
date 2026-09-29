"use client";

import React, { useState } from "react";
import { MOCK_API_ENDPOINTS } from "@/data/dataApiData";
import { ApiEndpoint } from "@/types/dataApi";
import { Terminal, Copy, Check, Filter, Search, Code, UserCheck, CheckCircle2, ChevronRight } from "lucide-react";

export function ApiExplorerView() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(MOCK_API_ENDPOINTS[0]);
  const [audienceMode, setAudienceMode] = useState<"ANALYST" | "DEVELOPER">("DEVELOPER");
  const [copiedRequest, setCopiedRequest] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const filteredEndpoints = MOCK_API_ENDPOINTS.filter((ep) => {
    if (categoryFilter !== "ALL" && ep.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ep.path.toLowerCase().includes(q) ||
        ep.purpose.toLowerCase().includes(q) ||
        ep.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopyRequest = () => {
    navigator.clipboard.writeText(selectedEndpoint.exampleRequest);
    setCopiedRequest(true);
    setTimeout(() => setCopiedRequest(false), 2000);
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(selectedEndpoint.exampleResponse);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header & Audience Switcher */}
      <div className="bg-white p-5 rounded-lg border border-[#D9E2EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#0A5B9E]" />
            <h2 className="text-lg font-bold text-[#14213D]">API Explorer</h2>
          </div>
          <p className="text-sm text-[#5C728A] mt-1">
            Machine-readable RESTful interface specification and endpoint schema viewer.
          </p>
        </div>

        {/* Audience Toggle (Section 14) */}
        <div className="flex items-center bg-[#F0F4F8] p-1 rounded-lg border border-[#D9E2EC] text-xs font-bold">
          <button
            onClick={() => setAudienceMode("ANALYST")}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
              audienceMode === "ANALYST"
                ? "bg-[#0A5B9E] text-white shadow-xs"
                : "text-[#5C728A] hover:text-[#14213D]"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" /> Analyst Mode
          </button>
          <button
            onClick={() => setAudienceMode("DEVELOPER")}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
              audienceMode === "DEVELOPER"
                ? "bg-[#0A5B9E] text-white shadow-xs"
                : "text-[#5C728A] hover:text-[#14213D]"
            }`}
          >
            <Code className="w-3.5 h-3.5" /> Developer Mode
          </button>
        </div>
      </div>

      {/* Grid Layout: Endpoint List & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Endpoint Cards List (5 Columns on LG) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Filters */}
          <div className="bg-white p-3 rounded-lg border border-[#D9E2EC] shadow-sm space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#5C728A]" />
              <input
                type="text"
                placeholder="Search endpoints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-[#D9E2EC] rounded bg-[#F0F4F8] focus:bg-white text-xs text-[#14213D]"
              />
            </div>
            <div className="flex gap-2">
              {["ALL", "Index", "Fares", "Forecasts", "System"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2 py-1 rounded text-[11px] font-bold transition-colors ${
                    categoryFilter === cat
                      ? "bg-[#14213D] text-white"
                      : "bg-[#F0F4F8] text-[#5C728A] hover:bg-[#E4E7EB]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Endpoint List Cards (Section 10 & 11) */}
          <div className="space-y-2">
            {filteredEndpoints.map((ep) => {
              const isSelected = selectedEndpoint.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => setSelectedEndpoint(ep)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer bg-white ${
                    isSelected
                      ? "border-[#0A5B9E] ring-2 ring-[#0A5B9E]/10 shadow-md"
                      : "border-[#D9E2EC] hover:border-[#9FB3C8] shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0A5B9E]/10 text-[#0A5B9E] border border-[#0A5B9E]/30">
                        {ep.method}
                      </span>
                      <span className="font-mono font-bold text-xs text-[#14213D]">{ep.path}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0F4F8] text-[#5C728A] border border-[#D9E2EC]">
                      {ep.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C728A] mt-2 line-clamp-1">
                    {audienceMode === "ANALYST" ? ep.analystSummary : ep.purpose}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Endpoint Inspector (7 Columns on LG) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-lg border border-[#D9E2EC] shadow-sm overflow-hidden space-y-6 p-6">
            {/* Inspector Header */}
            <div className="pb-4 border-b border-[#E4E7EB] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#0A5B9E] text-white">
                    {selectedEndpoint.method}
                  </span>
                  <h3 className="text-lg font-mono font-bold text-[#14213D]">{selectedEndpoint.path}</h3>
                </div>
                <p className="text-xs text-[#5C728A] mt-1.5">{selectedEndpoint.purpose}</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#4EB050]/10 text-[#4EB050] border border-[#4EB050]/30">
                {selectedEndpoint.status} Endpoint
              </span>
            </div>

            {/* Analyst Summary Card (Analyst Audience Mode) */}
            {audienceMode === "ANALYST" && (
              <div className="p-4 rounded-lg bg-[#F0F4F8] border border-[#D9E2EC] space-y-2 text-xs">
                <span className="font-bold text-[#0A5B9E] uppercase tracking-wider text-[11px]">
                  Analyst Overview & Guidance
                </span>
                <p className="text-[#14213D] leading-relaxed">{selectedEndpoint.analystSummary}</p>
                <div className="pt-2 text-[11px] text-[#5C728A] flex items-center gap-2">
                  <span>Category: </span>
                  <span className="font-bold text-[#14213D]">{selectedEndpoint.category}</span>
                </div>
              </div>
            )}

            {/* Parameters Table */}
            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#5C728A]">
                Query Parameters ({selectedEndpoint.parameters.length})
              </h4>
              {selectedEndpoint.parameters.length > 0 ? (
                <div className="border border-[#D9E2EC] rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs text-[#14213D]">
                    <thead className="bg-[#F0F4F8] text-[#5C728A] font-semibold text-[11px] border-b border-[#D9E2EC]">
                      <tr>
                        <th className="p-2.5">Parameter</th>
                        <th className="p-2.5">Type</th>
                        <th className="p-2.5 text-center">Required</th>
                        <th className="p-2.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E7EB]">
                      {selectedEndpoint.parameters.map((param, idx) => (
                        <tr key={idx} className="hover:bg-[#F0F4F8]">
                          <td className="p-2.5 font-mono font-bold text-[#0A5B9E]">{param.name}</td>
                          <td className="p-2.5 font-mono text-[#5C728A] text-[11px]">{param.type}</td>
                          <td className="p-2.5 text-center">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                param.required
                                  ? "bg-[#D1262C]/10 text-[#D1262C]"
                                  : "bg-[#5C728A]/10 text-[#5C728A]"
                              }`}
                            >
                              {param.required ? "REQUIRED" : "OPTIONAL"}
                            </span>
                          </td>
                          <td className="p-2.5 text-[#5C728A]">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-3 bg-[#F0F4F8] text-xs text-[#5C728A] rounded border border-[#D9E2EC]">
                  No query parameters required for this endpoint.
                </div>
              )}
            </div>

            {/* Example Request Card & Copy Button (Section 12) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#5C728A]">
                  Example HTTP Request
                </h4>
                <button
                  onClick={handleCopyRequest}
                  className="px-2.5 py-1 bg-[#F0F4F8] hover:bg-[#0A5B9E] text-[#0A5B9E] hover:text-white font-medium rounded text-xs transition-colors flex items-center gap-1 border border-[#D9E2EC]"
                >
                  {copiedRequest ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4EB050]" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Request
                    </>
                  )}
                </button>
              </div>
              <div className="p-3 bg-[#14213D] text-[#7DC9DE] font-mono text-xs rounded-lg border border-[#0A5B9E]">
                {selectedEndpoint.exampleRequest}
              </div>
            </div>

            {/* Code-Style Response Viewer (Section 13) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#5C728A]">
                  Example JSON Response Payload
                </h4>
                <button
                  onClick={handleCopyResponse}
                  className="px-2.5 py-1 bg-[#F0F4F8] hover:bg-[#0A5B9E] text-[#0A5B9E] hover:text-white font-medium rounded text-xs transition-colors flex items-center gap-1 border border-[#D9E2EC]"
                >
                  {copiedResponse ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4EB050]" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy JSON
                    </>
                  )}
                </button>
              </div>
              <div className="bg-[#14213D] p-4 rounded-lg border border-[#0A5B9E] text-white font-mono text-xs overflow-x-auto leading-relaxed max-h-72">
                <pre className="text-[#9FB3C8]">{selectedEndpoint.exampleResponse}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
