"use client";

import React from "react";
import Link from "next/link";
import { AirRoute } from "@/data/airRoutes";
import { Airport } from "@/data/airports";
import { Plane, ArrowRight, TrendingUp, ShieldAlert, CheckCircle2, Calculator, Brain, ExternalLink, Activity } from "lucide-react";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { Button } from "@/components/forms/Button";
import { cn } from "@/lib/utils";

interface RouteDetailsPanelProps {
  route: AirRoute | null;
  originAirport: Airport | undefined;
  destinationAirport: Airport | undefined;
  className?: string;
}

export function RouteDetailsPanel({
  route,
  originAirport,
  destinationAirport,
  className,
}: RouteDetailsPanelProps) {
  if (!route) {
    return (
      <div className={cn("bg-white p-6 rounded-sih-xl border border-[#E2E8F0] shadow-sih-card flex flex-col items-center justify-center text-center space-y-3 h-full min-h-[400px] select-none", className)}>
        <div className="w-12 h-12 rounded-full bg-[#EAF3FB] border border-[#B2D4F0] flex items-center justify-center text-[#0A5B9E]">
          <Plane className="w-6 h-6 transform -rotate-45" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#14213D] font-mono uppercase">
            No Route Selected
          </h4>
          <p className="text-xs text-[#5B6B82] mt-1 max-w-[240px]">
            Click any flight route line or airport marker on the map to inspect live fare intelligence.
          </p>
        </div>
      </div>
    );
  }

  // Fare signal colors
  const signalConfig = {
    Stable: { bg: "bg-[#EFF8EF]", text: "text-[#4EB050]", border: "border-[#B9E4BA]", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    Elevated: { bg: "bg-[#FEF8EC]", text: "text-[#F3AC27]", border: "border-[#FBE6B6]", icon: <TrendingUp className="w-3.5 h-3.5" /> },
    "High Surge": { bg: "bg-[#FDF2F2]", text: "text-[#E63946]", border: "border-[#F8B4B4]", icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    Unavailable: { bg: "bg-[#F6F8FB]", text: "text-[#8A99AD]", border: "border-[#E2E8F0]", icon: <Activity className="w-3.5 h-3.5" /> },
  };

  const signal = signalConfig[route.fareSignal] || signalConfig.Stable;
  const routeCodeParam = `${route.origin}-${route.destination}`;

  return (
    <div className={cn("bg-white p-5 rounded-sih-xl border border-[#E2E8F0] shadow-sih-card space-y-5 select-none font-sans", className)}>
      {/* 1. Header Card */}
      <div className="bg-[#14213D] text-white p-4 rounded-sih-lg space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#7DC9DE] uppercase tracking-wider">Flight Corridor</span>
          <span className="text-blue-200">{route.distanceKm} km</span>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold font-mono tracking-tight text-white flex items-center gap-2">
            <span>{route.origin}</span>
            <ArrowRight className="w-4 h-4 text-[#F3AC27]" />
            <span>{route.destination}</span>
          </h3>
          <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold border", signal.bg, signal.text, signal.border)}>
            {signal.icon}
            {route.fareSignal}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-blue-100 pt-1 border-t border-white/10 font-mono">
          <span>{route.airline} ({route.flightNumber})</span>
          <span>{route.nonstop ? "Nonstop" : "Connecting"}</span>
        </div>
      </div>

      {/* 2. Fare Metrics Breakdown */}
      <div className="bg-[#F6F8FB] p-4 rounded-sih-lg border border-[#E2E8F0] space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs border-b border-[#EDF2F7] pb-2">
          <span className="text-[#8A99AD]">Total Observed Fare</span>
          <span className="text-xl font-extrabold text-[#0A5B9E]">
            ₹{route.totalFare.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-[#8A99AD] uppercase block">Base Fare</span>
            <span className="font-bold text-[#14213D]">₹{route.baseFare.toLocaleString("en-IN")}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8A99AD] uppercase block">Taxes & Fees</span>
            <span className="font-bold text-[#14213D]">₹{route.taxes.toLocaleString("en-IN")}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8A99AD] uppercase block">Booking Window</span>
            <span className="font-bold text-[#0A5B9E]">{route.bookingWindow}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8A99AD] uppercase block">Data Source</span>
            <span className="font-bold text-[#14213D]">{route.sourceType}</span>
          </div>
        </div>
      </div>

      {/* 3. Lead-Time Fare Snapshot */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-[#14213D] uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-[#0A5B9E]" />
          Lead-Time Fare Horizon Curve
        </h4>
        <div className="grid grid-cols-5 gap-1.5 font-mono text-center">
          {Object.entries(route.leadTimeFares).map(([windowKey, fareVal]) => {
            const isCurrent = route.bookingWindow === windowKey;
            return (
              <div
                key={windowKey}
                className={cn(
                  "p-2 rounded-sih-md border text-xs space-y-0.5 transition-all",
                  isCurrent ? "bg-[#0A5B9E] text-white border-[#0A5B9E] shadow-sm" : "bg-[#F6F8FB] text-[#14213D] border-[#E2E8F0]"
                )}
              >
                <span className={cn("text-[9px] uppercase block", isCurrent ? "text-blue-200" : "text-[#8A99AD]")}>
                  {windowKey}
                </span>
                <span className="font-bold block text-[11px]">
                  ₹{(fareVal / 1000).toFixed(1)}k
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Cross-Module Product Navigation Actions */}
      <div className="pt-3 border-t border-[#EDF2F7] space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#8A99AD] block">
          Platform Deep Dive Navigation:
        </span>
        <div className="flex flex-col gap-2">
          <Link href={`/market-data?route=${routeCodeParam}&window=${route.bookingWindow}`} className="no-underline">
            <Button variant="primary" size="sm" className="w-full justify-between" icon={<ExternalLink className="w-3.5 h-3.5" />}>
              View Market Data Observation
            </Button>
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <Link href={`/index-engine?route=${routeCodeParam}`} className="no-underline">
              <Button variant="outline" size="sm" className="w-full text-xs" icon={<Calculator className="w-3.5 h-3.5 text-[#0A5B9E]" />}>
                Index Engine
              </Button>
            </Link>

            <Link href={`/intelligence?route=${routeCodeParam}`} className="no-underline">
              <Button variant="outline" size="sm" className="w-full text-xs" icon={<Brain className="w-3.5 h-3.5 text-[#6F498E]" />}>
                ML Forecast
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
