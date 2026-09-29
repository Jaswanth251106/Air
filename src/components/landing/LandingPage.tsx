"use client";

import React from "react";
import { LandingHeader } from "./LandingHeader";
import { HeroSection } from "./HeroSection";
import { CapabilitySection } from "./CapabilitySection";
import { SystemStatusStrip } from "./SystemStatusStrip";
import { LandingCTASection } from "./LandingCTASection";
import { LandingFooter } from "./LandingFooter";
import { cn } from "@/lib/utils";

interface LandingPageProps {
  className?: string;
}

export function LandingPage({ className }: LandingPageProps) {
  return (
    <div className={cn("min-h-screen bg-[#F6F8FB] text-[#14213D] flex flex-col font-sans antialiased selection:bg-[#0A5B9E] selection:text-white", className)}>
      <LandingHeader />
      <main className="flex-1 space-y-4 pb-12">
        <HeroSection />
        <CapabilitySection />
        <SystemStatusStrip />
        <LandingCTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
