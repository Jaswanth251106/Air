"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RouteMovement } from "@/types/overview";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { HeatmapLegend } from "./HeatmapLegend";
import { AirNetworkMap } from "@/components/air-network/AirNetworkMap";
import { AIRPORTS_DATA } from "@/data/airports";
import { AIR_ROUTES_DATA } from "@/data/airRoutes";
import Link from "next/link";
import { Plane, Info, Compass, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RouteHeatmapProps {
  routes: RouteMovement[];
  onSelectRoute?: (route: RouteMovement) => void;
  className?: string;
}

export function RouteHeatmap({ routes, onSelectRoute, className }: RouteHeatmapProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "bg-white border border-[#E2E8F0] rounded-sih-md p-5 shadow-sih-card flex flex-col justify-between select-none relative overflow-hidden",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDF2F7] pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono">
              India Trunk Corridor Sector Map
            </h3>
            <MetricBadge label="Real Map Stream" variant="primary" size="sm" />
          </div>
          <p className="text-xs text-[#5B6B82] mt-0.5 font-sans">
            Geographic airfare price movement concentration across major Indian metro corridors.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <HeatmapLegend />
          <Link href="/air-network" className="no-underline">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A5B9E] text-white rounded-sih-md text-xs font-mono font-bold hover:bg-[#08487E] transition-colors cursor-pointer shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>Full Air Network Explorer →</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Real Google Map Container & Redirection Overlay */}
      <div className="relative w-full h-[360px] rounded-sih-md border border-[#E2E8F0] overflow-hidden group cursor-pointer shadow-inner">
        <AirNetworkMap
          airports={AIRPORTS_DATA}
          routes={AIR_ROUTES_DATA}
          selectedOrigin="MAA"
          selectedDestination="DEL"
          selectedRoute={AIR_ROUTES_DATA[0]}
          onSelectAirport={(code) => router.push(`/air-network?from=${code}`)}
          onSelectRoute={(r) => router.push(`/air-network?from=${r.origin}&to=${r.destination}`)}
          viewMode="network"
          className="h-[360px]"
        />

        {/* Interactive Click Banner Overlay to Redirect to /air-network */}
        <Link href="/air-network" className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-all z-20 flex items-end p-3 pointer-events-auto">
          <div className="bg-[#14213D]/90 text-white p-2.5 px-4 rounded-sih-md border border-white/20 text-xs font-mono font-bold flex items-center justify-between w-full shadow-lg backdrop-blur-md group-hover:bg-[#0A5B9E] transition-all">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#F3AC27]" />
              <span>Live India Geographic Air Network Active</span>
            </div>
            <span className="flex items-center gap-1 text-[#7DC9DE]">
              Click Map to Open Full Screen Explorer <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
      </div>

      <div className="mt-3 text-[11px] font-mono text-[#8A99AD] flex items-center justify-between">
        <span>Click any route segment to launch full 2D Air Network Explorer map with active route context.</span>
        <Link href="/air-network" className="flex items-center gap-1 text-[#0A5B9E] font-bold hover:underline">
          <Compass className="w-3.5 h-3.5" />
          <span>Launch Air Network Explorer →</span>
        </Link>
      </div>
    </div>
  );
}
