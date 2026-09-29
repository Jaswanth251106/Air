"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/data-display/DataTable";
import { StatusBadge } from "@/components/data-display/StatusBadge";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { MOCK_ROUTE_BASKET } from "@/data/indexEngineData";
import { RouteBasketItem } from "@/types/indexEngine";
import { Plane, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function RouteBasketView() {
  const [selectedRoute, setSelectedRoute] = useState<RouteBasketItem>(MOCK_ROUTE_BASKET[0]);

  const columns = [
    { key: "route", header: "Trunk Corridor", width: "160px", render: (r: any) => <span className="font-bold text-[#0A5B9E]">{r.route}</span> },
    { key: "trafficShare", header: "Traffic Contribution", render: (r: any) => <span className="text-xs">{r.trafficShare}</span> },
    { key: "prototypeWeight", header: "Basket Weight", align: "right" as const, render: (r: any) => <span className="font-bold font-mono text-[#14213D]">{r.prototypeWeight}%</span> },
    { key: "coveragePercent", header: "Observation Coverage", align: "right" as const, render: (r: any) => <span className="font-mono text-[#4EB050]">{r.coveragePercent}%</span> },
    { key: "sampleCount", header: "Samples", align: "right" as const, render: (r: any) => <span className="font-mono">{r.sampleCount}</span> },
    { key: "status", header: "Status", align: "center" as const, render: (r: any) => <StatusBadge status={r.status} size="sm" /> },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Route Basket Selection & Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* SVG Route Map Visual */}
        <div className="lg:col-span-7 bg-white p-5 rounded-sih-md border border-[#E2E8F0] shadow-sih-card flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#EDF2F7] pb-3 mb-3">
            <div>
              <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
                Representative Trunk Corridor Basket Map
              </h3>
              <p className="text-xs text-[#5B6B82] font-sans">
                Line thickness corresponds to route basket weight.
              </p>
            </div>
            <MetricBadge label="6 Routes" variant="primary" size="sm" />
          </div>

          <div className="relative w-full h-[320px] bg-[#F6F8FB]/50 rounded border border-[#E2E8F0] flex items-center justify-center p-4">
            <svg viewBox="0 0 440 460" className="w-full h-full overflow-visible">
              <path
                d="M 210 40 C 250 40, 290 70, 310 100 C 330 130, 370 170, 380 210 C 390 250, 350 290, 320 330 C 290 370, 260 430, 235 450 C 210 430, 180 380, 150 330 C 120 280, 90 230, 105 190 C 120 150, 170 40, 210 40 Z"
                fill="#FFFFFF"
                stroke="#BDD3E4"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-80"
              />

              {MOCK_ROUTE_BASKET.map((r) => {
                const isSelected = selectedRoute.id === r.id;
                const strokeWidth = (r.prototypeWeight / 5) + 1.5;

                return (
                  <g
                    key={r.id}
                    onClick={() => setSelectedRoute(r)}
                    className="cursor-pointer group"
                  >
                    <path
                      d={`M ${r.coordinate.from.cx} ${r.coordinate.from.cy} Q ${(r.coordinate.from.cx + r.coordinate.to.cx) / 2 + 15} ${(r.coordinate.from.cy + r.coordinate.to.cy) / 2 - 15} ${r.coordinate.to.cx} ${r.coordinate.to.cy}`}
                      fill="none"
                      stroke={isSelected ? "#0A5B9E" : "#568AB2"}
                      strokeWidth={isSelected ? strokeWidth + 2 : strokeWidth}
                      strokeLinecap="round"
                    />
                    <g transform={`translate(${(r.coordinate.from.cx + r.coordinate.to.cx) / 2}, ${(r.coordinate.from.cy + r.coordinate.to.cy) / 2 - 10})`}>
                      <rect x="-18" y="-8" width="36" height="15" rx="3" fill={isSelected ? "#0A5B9E" : "#14213D"} />
                      <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono, monospace">
                        {r.prototypeWeight}%
                      </text>
                    </g>
                  </g>
                );
              })}

              {[
                { code: "DEL", cx: 230, cy: 130 },
                { code: "BOM", cx: 150, cy: 290 },
                { code: "BLR", cx: 210, cy: 400 },
                { code: "MAA", cx: 260, cy: 390 },
                { code: "HYD", cx: 220, cy: 300 },
                { code: "CCU", cx: 330, cy: 240 },
              ].map((city) => (
                <g key={city.code} transform={`translate(${city.cx}, ${city.cy})`}>
                  <circle r="4" fill="#0A5B9E" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="8" y="3" fontSize="10" fontWeight="bold" fill="#14213D" fontFamily="JetBrains Mono, monospace">{city.code}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Selected Route Specification Card */}
        <div className="lg:col-span-5 bg-white p-5 rounded-sih-md border border-[#E2E8F0] shadow-sih-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#EDF2F7] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-[#0A5B9E]" />
                <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
                  Route Basket Detail
                </h3>
              </div>
              <StatusBadge status={selectedRoute.status} size="sm" />
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-[#8A99AD] uppercase">Selected Corridor</span>
                <h4 className="text-xl font-bold text-[#0A5B9E] font-sans">{selectedRoute.route}</h4>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 bg-[#F6F8FB] rounded border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#8A99AD] uppercase">Route Weight</span>
                  <p className="text-lg font-bold text-[#14213D]">{selectedRoute.prototypeWeight}%</p>
                </div>
                <div className="p-3 bg-[#F6F8FB] rounded border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#8A99AD] uppercase">Coverage</span>
                  <p className="text-lg font-bold text-[#4EB050]">{selectedRoute.coveragePercent}%</p>
                </div>
              </div>

              <div className="p-3 bg-[#EEF4F8] rounded border border-[#BDD3E4] text-xs font-mono space-y-1">
                <span className="font-bold text-[#568AB2]">Eligible Booking Horizons:</span>
                <p className="text-[#14213D]">T+1, T+7, T+15, T+30, T+45</p>
              </div>

              <p className="text-xs text-[#5B6B82] leading-relaxed font-sans">
                {selectedRoute.trafficShare}. Monitored as a key trunk corridor in the national basket.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#EDF2F7] text-[10px] text-[#8A99AD] font-mono flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-[#0A5B9E]" />
            <span>Capacity traffic contribution • National basket</span>
          </div>
        </div>
      </div>

      <DataTable data={MOCK_ROUTE_BASKET} columns={columns} onRowClick={(row) => setSelectedRoute(row)} />
    </div>
  );
}
