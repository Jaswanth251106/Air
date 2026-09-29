import React from "react";
import Link from "next/link";
import { Plane, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface LandingFooterProps {
  className?: string;
}

export function LandingFooter({ className }: LandingFooterProps) {
  return (
    <footer className={cn("bg-white border-t border-[#E2E8F0] py-8 text-xs font-sans text-[#5B6B82]", className)}>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded bg-[#0A5B9E] text-white">
            <Plane className="w-4 h-4 transform -rotate-45" />
          </div>
          <div>
            <span className="font-bold text-[#14213D]">India Airfare Price Index</span>
            <p className="text-[11px] text-[#8A99AD]">Real-Time Airfare Price Intelligence for India • Statistical Intelligence Platform</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
          <Link href="/overview" className="hover:text-[#0A5B9E] transition-colors">Overview</Link>
          <Link href="/market-data" className="hover:text-[#0A5B9E] transition-colors">Market Data</Link>
          <Link href="/index-engine" className="hover:text-[#0A5B9E] transition-colors">Index Engine</Link>
          <Link href="/intelligence" className="hover:text-[#0A5B9E] transition-colors">Intelligence</Link>
          <Link href="/data-api" className="hover:text-[#0A5B9E] transition-colors">Data & API</Link>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#4EB050] bg-[#EFF8EF] px-2.5 py-1 rounded border border-[#B9E4BA]">
          <ShieldCheck className="w-3.5 h-3.5" /> Statistical Platform Verified
        </div>
      </div>
    </footer>
  );
}
