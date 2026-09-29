"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterBar } from "@/components/forms/FilterBar";
import { Tabs } from "@/components/navigation/Tabs";
import { DataStatus } from "@/components/status/DataStatus";
import { Button } from "@/components/forms/Button";
import { StatisticalSeparationBanner } from "./StatisticalSeparationBanner";
import { IntelligenceOverviewView } from "./IntelligenceOverviewView";
import { ForecastView } from "./ForecastView";
import { SurgeView } from "./SurgeView";
import { AnomalyView } from "./AnomalyView";
import { DriverView } from "./DriverView";
import { ElasticityView } from "./ElasticityView";
import { ModelCardView } from "./ModelCardView";
import { MethodologyDrawer } from "@/components/overview/MethodologyDrawer";
import { IntelligenceTab } from "@/types/intelligence";
import {
  Sparkles,
  TrendingUp,
  ShieldAlert,
  AlertCircle,
  Cpu,
  Clock,
  FileText,
  BookOpen,
  GitBranch,
  Terminal,
} from "lucide-react";

export function IntelligencePage() {
  const searchParams = useSearchParams();
  const initialView = (searchParams.get("view") as IntelligenceTab) || "overview";

  const [activeTab, setActiveTab] = useState<IntelligenceTab>(initialView);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "OVERVIEW", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "forecast", label: "FORECAST", icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: "surge", label: "SURGE DETECTION", icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: "anomalies", label: "FLAGGED ANOMALIES", icon: <AlertCircle className="w-3.5 h-3.5" /> },
    { id: "drivers", label: "FEATURE DRIVERS", icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: "elasticity", label: "LEAD-TIME ELASTICITY", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "model-card", label: "MODEL CARD", icon: <FileText className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex-1 p-4 lg:p-8 max-w-[1440px] mx-auto w-full space-y-6 select-none">
      {/* 1. Page Header */}
      <PageHeader
        title="Intelligence & ML Predictive Analytics"
        description="Exploratory machine learning predictive forecasts, surge signals, and anomaly inspection layer."
        breadcrumbItems={[
          { label: "Intelligence", href: "/intelligence" },
          { label: activeTab.toUpperCase().replace("-", " ") },
        ]}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <DataStatus label="ML Predictive Layer" variant="prototype" />
            <Link href="/data-api?view=provenance" className="no-underline">
              <Button
                variant="outline"
                size="sm"
                icon={<GitBranch className="w-3.5 h-3.5 text-[#F3AC27]" />}
              >
                View Data Source
              </Button>
            </Link>
            <Link href="/data-api?view=api-explorer" className="no-underline">
              <Button
                variant="outline"
                size="sm"
                icon={<Terminal className="w-3.5 h-3.5 text-[#6F498E]" />}
              >
                Model API Endpoint
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              icon={<BookOpen className="w-3.5 h-3.5 text-[#0A5B9E]" />}
              onClick={() => setIsMethodologyOpen(true)}
            >
              Open Methodology
            </Button>
          </div>
        }
      />

      {/* 2. Statistical Separation Principle Banner */}
      <StatisticalSeparationBanner />

      {/* 3. Global Filter Bar */}
      <FilterBar />

      {/* 4. Sub-View Navigation Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as IntelligenceTab)}
      />

      {/* 5. Active Sub-View Switcher */}
      {activeTab === "overview" && <IntelligenceOverviewView onSelectTab={(tab) => setActiveTab(tab)} />}
      {activeTab === "forecast" && <ForecastView />}
      {activeTab === "surge" && <SurgeView />}
      {activeTab === "anomalies" && <AnomalyView />}
      {activeTab === "drivers" && <DriverView />}
      {activeTab === "elasticity" && <ElasticityView />}
      {activeTab === "model-card" && <ModelCardView />}

      {/* 6. Methodology Drawer */}
      <MethodologyDrawer
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
