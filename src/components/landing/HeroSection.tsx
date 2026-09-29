import React from "react";
import { HeroActions } from "./HeroActions";
import { AviationVisual } from "./AviationVisual";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={cn("py-8 lg:py-14 max-w-[1440px] mx-auto px-4 lg:px-8", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Platform Positioning & Hero Copy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2">
            <MetricBadge label="NATIONAL STATISTICAL PLATFORM" variant="primary" size="sm" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#68818C]">
              Statistical Intelligence Platform
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17324D] tracking-tight leading-[1.15] font-sans">
              India Airfare <br />
              <span className="text-[#167D8D]">Price Index</span>
            </h1>
            <p className="text-base sm:text-lg font-semibold text-[#68818C] leading-snug font-sans max-w-xl">
              Track, compare and understand airfare movement across routes, airlines and booking horizons.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#68818C] leading-relaxed max-w-lg font-sans border-l-2 border-[#167D8D] pl-3 py-0.5">
            Transforms multi-source airfare observations into a transparent, government-grade statistical view of India’s aviation market.
          </p>

          <div className="pt-2">
            <HeroActions />
          </div>
        </div>

        {/* Right Column: Aviation Visual Graphic */}
        <div className="lg:col-span-6 flex justify-center">
          <AviationVisual />
        </div>
      </div>
    </section>
  );
}
