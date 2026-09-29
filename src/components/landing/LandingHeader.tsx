"use client";

import React from "react";
import Link from "next/link";
import { Plane, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/forms/Button";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { cn } from "@/lib/utils";

interface LandingHeaderProps {
  className?: string;
}

export function LandingHeader({ className }: LandingHeaderProps) {
  return (
    <header
      className={cn(
        "h-16 bg-white/90 backdrop-blur-md border-b border-[#D8E8EC] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40 shadow-sih-subtle",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="p-2 rounded-sih-md bg-[#167D8D] text-white shrink-0 shadow-sih-card">
            <Plane className="w-5 h-5 transform -rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-[#17324D] leading-none tracking-tight">
              AIRFARE INDEX
            </span>
            <span className="text-[10px] font-mono font-semibold text-[#167D8D] mt-0.5">
              INDIA ANALYTICS
            </span>
          </div>
        </Link>
        <div className="h-5 w-px bg-[#D8E8EC] hidden sm:block" />
        <MetricBadge label="NATIONAL INDEX" variant="primary" size="sm" />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-xs text-[#68818C] font-mono">
          <ShieldCheck className="w-4 h-4 text-[#2FA9B8]" />
          <span>Government Analytical Platform</span>
        </div>

        <Link href="/overview" className="no-underline">
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Explore Market
          </Button>
        </Link>
      </div>
    </header>
  );
}
