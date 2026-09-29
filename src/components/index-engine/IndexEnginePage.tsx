"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterBar } from "@/components/forms/FilterBar";
import { Tabs } from "@/components/navigation/Tabs";
import { DataStatus } from "@/components/status/DataStatus";
import { Button } from "@/components/forms/Button";
import { IndexOverviewView } from "./IndexOverviewView";
import { RouteBasketView } from "./RouteBasketView";
import { WeightsView } from "./WeightsView";
import { BookingWindowsView } from "./BookingWindowsView";
import { CalculationView } from "./CalculationView";
import { HistoryView } from "./HistoryView";
import { BenchmarkView } from "./BenchmarkView";
import { MethodologyDrawer } from "@/components/overview/MethodologyDrawer";
import { IndexEngineTab } from "@/types/indexEngine";
import { BookOpen, Calculator, Layers, Scale, Clock, Sparkles, TrendingUp, CheckCircle2, Database, GitBranch } from "lucide-react";

export function IndexEnginePage() {
  const searchParams = useSearchParams();
  const initialView = (searchParams.get("view") as IndexEngineTab) || "overview";

  const [activeTab, setActiveTab] = useState<IndexEngineTab>(initialView);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "OVERVIEW", icon: <Calculator className="w-3.5 h-3.5" /> },
    { id: "route-basket", label: "ROUTE BASKET", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "weights", label: "WEIGHTS", icon: <Scale className="w-3.5 h-3.5" /> },
    { id: "booking-windows", label: "BOOKING WINDOWS", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "calculation", label: "CALCULATION", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "history", label: "HISTORY", icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: "benchmark", label: "BENCHMARK", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex-1 p-4 lg:p-8 max-w-[1440px] mx-auto w-full space-y-6 select-none">
      {/* 1. Page Header */}
      <PageHeader
        title="Index Engine & Statistical Methodology"
        description="Understand how standardized airfare observations are transformed into an aggregate airfare index."
        breadcrumbItems={[
          { label: "Index Engine", href: "/index-engine" },
          { label: activeTab.toUpperCase().replace("-", " ") },
        ]}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <DataStatus label="Statistical Basket" variant="prototype" />
            <Link href="/data-api?view=catalogue" className="no-underline">
              <Button
                variant="outline"
                size="sm"
                icon={<Database className="w-3.5 h-3.5 text-[#0A5B9E]" />}
              >
                Data Catalogue
              </Button>
            </Link>
            <Link href="/data-api?view=provenance" className="no-underline">
              <Button
                variant="outline"
                size="sm"
                icon={<GitBranch className="w-3.5 h-3.5 text-[#F3AC27]" />}
              >
                View Provenance
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

      {/* 2. Global Filter Bar */}
      <FilterBar />

      {/* 3. Sub-View Navigation Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as IndexEngineTab)}
      />

      {/* 4. Active Sub-View Component Switcher */}
      {activeTab === "overview" && <IndexOverviewView />}
      {activeTab === "route-basket" && <RouteBasketView />}
      {activeTab === "weights" && <WeightsView />}
      {activeTab === "booking-windows" && <BookingWindowsView />}
      {activeTab === "calculation" && <CalculationView />}
      {activeTab === "history" && <HistoryView />}
      {activeTab === "benchmark" && <BenchmarkView />}

      {/* 5. Methodology Drawer */}
      <MethodologyDrawer
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
