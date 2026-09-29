import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Activity } from "lucide-react";
import { Button } from "@/components/forms/Button";
import { cn } from "@/lib/utils";

interface LandingCTASectionProps {
  className?: string;
}

export function LandingCTASection({ className }: LandingCTASectionProps) {
  return (
    <section className={cn("py-8 max-w-[1440px] mx-auto px-4 lg:px-8", className)}>
      <div className="bg-gradient-to-r from-[#0A5B9E] via-[#08497E] to-[#14213D] text-white rounded-sih-xl p-8 lg:p-10 shadow-sih-dropdown border border-[#B2D4F0]/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:32px_32px] opacity-5 pointer-events-none" />

        <div className="relative z-10 space-y-2 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 text-[#7DC9DE] text-xs font-mono font-semibold border border-white/20">
            <Activity className="w-3.5 h-3.5" /> Ready to Inspect India Airfare Movement?
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
            Enter the Statistical Intelligence Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Access composite Paasche indices, trunk corridor distributions, advance booking window curves, and multi-source feed status.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 shrink-0">
          <Link href="/overview" className="no-underline">
            <Button
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="bg-white text-[#0A5B9E] hover:bg-slate-100 border-white shadow-sih-card cursor-pointer font-bold"
            >
              Explore Market
            </Button>
          </Link>

          <Link href="/index-engine" className="no-underline">
            <Button
              variant="ghost"
              size="lg"
              icon={<BookOpen className="w-4 h-4 text-[#7DC9DE]" />}
              iconPosition="left"
              className="text-slate-200 hover:text-white hover:bg-white/10 border-white/30 cursor-pointer"
            >
              View Methodology
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
