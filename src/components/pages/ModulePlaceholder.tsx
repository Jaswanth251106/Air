"use client";

import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterBar } from "@/components/forms/FilterBar";
import { Alert } from "@/components/feedback/Alert";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { StatCard } from "@/components/data-display/StatCard";
import { Shield, Sparkles, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/forms/Button";
import Link from "next/link";

interface ModulePlaceholderProps {
  moduleName: string;
  moduleDescription: string;
  plannedFeatures: string[];
  icon: React.ReactNode;
  nextRoute?: string;
  nextRouteLabel?: string;
}

export function ModulePlaceholder({
  moduleName,
  moduleDescription,
  plannedFeatures,
  icon,
  nextRoute = "/overview",
  nextRouteLabel = "Return to Overview",
}: ModulePlaceholderProps) {
  return (
    <div className="flex-1 p-4 lg:p-8 max-w-[1440px] mx-auto w-full">
      <PageHeader
        title={moduleName}
        description={moduleDescription}
        breadcrumbItems={[
          { label: moduleName },
        ]}
      />

      <FilterBar />

      <div className="space-y-6">
        <Alert variant="info" title="Phase 2 Application Shell Active">
          This is a professional placeholder for <strong>{moduleName}</strong>. The navigation route, global filter binding, context bar synchronization, and layout shell are fully operational. Analytical calculations and live data charts will be bound in subsequent implementation phases.
        </Alert>

        <div className="bg-white border border-[#E2E8F0] rounded-sih-xl p-6 lg:p-8 shadow-sih-card space-y-6">
          <div className="flex items-center gap-3 border-b border-[#EDF2F7] pb-4">
            <div className="p-3 rounded-sih-md bg-[#0A5B9E] text-white">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#14213D] font-sans">
                Planned Analytical Architecture — {moduleName}
              </h3>
              <p className="text-xs text-[#5B6B82] font-sans">
                "Analytics module coming in the next implementation phase."
              </p>
            </div>
          </div>

          <ContentGrid columns={3}>
            {plannedFeatures.map((feature, idx) => (
              <StatCard
                key={idx}
                label={`Module Capability ${idx + 1}`}
                value={feature}
                subtext="Phase 3+ Analytics Pipeline Target"
                icon={<Sparkles className="w-4 h-4 text-[#0A5B9E]" />}
                accentColor={idx % 2 === 0 ? "#0A5B9E" : "#7DC9DE"}
              />
            ))}
          </ContentGrid>

          <div className="p-4 bg-[#F6F8FB] rounded-sih-md border border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#5B6B82] font-mono">
              <Shield className="w-4 h-4 text-[#4EB050]" />
              <span>Platform Core Verification • Data Context Synced</span>
            </div>
            <Link href={nextRoute} className="no-underline">
              <Button
                variant="outline"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                {nextRouteLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
