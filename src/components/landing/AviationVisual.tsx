"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AirNetworkMap } from "@/components/air-network/AirNetworkMap";
import { AIRPORTS_DATA } from "@/data/airports";
import { AIR_ROUTES_DATA } from "@/data/airRoutes";
import { Compass, ShieldCheck, ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface AviationVisualProps {
  className?: string;
}

export function AviationVisual({ className }: AviationVisualProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "relative w-full max-w-lg mx-auto aspect-square bg-white border border-[#D8E8EC] rounded-sih-xl p-4 shadow-sih-card overflow-hidden flex flex-col justify-between select-none group cursor-pointer",
        className
      )}
    >
      {/* Header Indicator */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#EBF3F5] pb-3 mb-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#167D8D]" />
          <span className="text-xs font-mono font-bold text-[#17324D] uppercase tracking-wider">
            Live Trunk Corridor Network
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#DDF8F2] text-[#167D8D] border border-[#B2E0E3]">
          <ShieldCheck className="w-3 h-3" /> Real Map Stream
        </span>
      </div>

      {/* Main Google Maps Embed Container */}
      <div className="relative z-10 flex-1 w-full rounded-sih-lg overflow-hidden border border-[#D8E8EC] shadow-inner">
        <AirNetworkMap
          airports={AIRPORTS_DATA}
          routes={AIR_ROUTES_DATA}
          selectedOrigin="MAA"
          selectedDestination="DEL"
          selectedRoute={AIR_ROUTES_DATA[0]}
          onSelectAirport={(code) => router.push(`/air-network?from=${code}`)}
          onSelectRoute={(r) => router.push(`/air-network?from=${r.origin}&to=${r.destination}`)}
          viewMode="network"
          className="h-full min-h-[320px]"
        />

        {/* Click Redirection Banner Overlay */}
        <Link href="/air-network" className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-all z-20 flex items-end p-3 pointer-events-auto">
          <div className="bg-[#17324D]/90 text-white p-2.5 px-3.5 rounded-sih-md border border-white/20 text-xs font-mono font-bold flex items-center justify-between w-full shadow-lg backdrop-blur-md group-hover:bg-[#167D8D] transition-all">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F3AC27]" />
              <span>India Air Network Map Active</span>
            </div>
            <span className="flex items-center gap-1 text-[#59C7CB]">
              Explore Map <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
      </div>

      {/* Bottom Floating Footer */}
      <div className="relative z-10 pt-2.5 mt-2 border-t border-[#EBF3F5] flex items-center justify-between text-[11px] font-mono text-[#68818C]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#167D8D]" /> MAA → DEL
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#59C7CB]" /> DEL → BOM
          </span>
        </div>
        <Link href="/air-network" className="font-bold text-[#167D8D] hover:underline flex items-center gap-1">
          <span>Open Explorer</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
