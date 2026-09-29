"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterBar } from "@/components/forms/FilterBar";
import { Tabs } from "@/components/navigation/Tabs";
import { DataStatus } from "@/components/status/DataStatus";
import { Button } from "@/components/forms/Button";
import { DataOverviewView } from "./DataOverviewView";
import { CatalogueView } from "./CatalogueView";
import { DownloadsView } from "./DownloadsView";
import { ApiExplorerView } from "./ApiExplorerView";
import { MethodologyDataView } from "./MethodologyDataView";
import { ProvenanceView } from "./ProvenanceView";
import { SystemHealthView } from "./SystemHealthView";
import { MethodologyDrawer } from "@/components/overview/MethodologyDrawer";
import { DataApiTab } from "@/types/dataApi";
import {
  Database,
  Download,
  Terminal,
  BookOpen,
  GitBranch,
  Activity,
  Sparkles,
} from "lucide-react";

export function DataApiPage() {
  const searchParams = useSearchParams();
  const initialView = (searchParams.get("view") as DataApiTab) || "overview";

  const [activeTab, setActiveTab] = useState<DataApiTab>(initialView);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "OVERVIEW", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "catalogue", label: "CATALOGUE", icon: <Database className="w-3.5 h-3.5" /> },
    { id: "downloads", label: "DOWNLOADS", icon: <Download className="w-3.5 h-3.5" /> },
    { id: "api-explorer", label: "API EXPLORER", icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: "methodology", label: "METHODOLOGY", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "provenance", label: "PROVENANCE", icon: <GitBranch className="w-3.5 h-3.5" /> },
    { id: "system-health", label: "SYSTEM HEALTH", icon: <Activity className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex-1 p-4 lg:p-8 max-w-[1440px] mx-auto w-full space-y-6 select-none">
      {/* 1. Page Header (Section 4 requirement) */}
      <PageHeader
        title="Data & API"
        description="Explore datasets, provenance, methodology and machine-readable outputs."
        breadcrumbItems={[
          { label: "Data & API", href: "/data-api" },
          { label: activeTab.toUpperCase().replace("-", " ") },
        ]}
        action={
          <div className="flex items-center gap-3">
            <DataStatus label="Data Portal" variant="prototype" />
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
        onChange={(id) => setActiveTab(id as DataApiTab)}
      />

      {/* 4. Active Sub-View Switcher */}
      {activeTab === "overview" && <DataOverviewView onSelectTab={(tab) => setActiveTab(tab)} />}
      {activeTab === "catalogue" && (
        <CatalogueView
          onViewProvenance={(provId) => {
            setActiveTab("provenance");
          }}
        />
      )}
      {activeTab === "downloads" && <DownloadsView />}
      {activeTab === "api-explorer" && <ApiExplorerView />}
      {activeTab === "methodology" && <MethodologyDataView />}
      {activeTab === "provenance" && <ProvenanceView />}
      {activeTab === "system-health" && <SystemHealthView />}

      {/* 5. Methodology Drawer */}
      <MethodologyDrawer
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
