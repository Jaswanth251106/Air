"use client";

import React, { useState } from "react";
import { Activity, Shield, AlertTriangle, Layers, Database, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { KPICard } from "@/components/data-display/KPICard";
import { StatCard } from "@/components/data-display/StatCard";
import { DataTable } from "@/components/data-display/DataTable";
import { StatusBadge } from "@/components/data-display/StatusBadge";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { SourceBadge } from "@/components/data-display/SourceBadge";
import { Button } from "@/components/forms/Button";
import { IconButton } from "@/components/forms/IconButton";
import { Select } from "@/components/forms/Select";
import { MultiSelect } from "@/components/forms/MultiSelect";
import { DatePicker } from "@/components/forms/DatePicker";
import { FilterBar } from "@/components/forms/FilterBar";
import { SearchInput } from "@/components/forms/SearchInput";
import { Toggle } from "@/components/forms/Toggle";
import { SegmentedControl } from "@/components/forms/SegmentedControl";
import { Tooltip } from "@/components/feedback/Tooltip";
import { Modal } from "@/components/feedback/Modal";
import { Drawer } from "@/components/feedback/Drawer";
import { Toast } from "@/components/feedback/Toast";
import { Alert } from "@/components/feedback/Alert";
import { EmptyState } from "@/components/feedback/EmptyState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { ChartContainer } from "@/components/visualization/ChartContainer";
import { MetricTrend } from "@/components/visualization/MetricTrend";
import { Divider } from "@/components/visualization/Divider";
import { Tag } from "@/components/visualization/Tag";
import { Chip } from "@/components/visualization/Chip";
import { Tabs } from "@/components/navigation/Tabs";
import { SecondaryTabs } from "@/components/navigation/SecondaryTabs";
import { Section } from "@/components/layout/Section";
import { ContentGrid } from "@/components/layout/ContentGrid";
import { useFilterState } from "@/hooks/useFilterState";
import { MOCK_OVERVIEW_KPIS, MOCK_SAMPLE_INDEX_ROWS } from "@/data/mockData";
import { COLOR_TOKENS } from "@/design-system/colors";
import { DataTableColumn } from "@/types";

export function DesignSystemShowcase() {
  const { filters, updateFilter, resetFilters } = useFilterState();
  const [activeTab, setActiveTab] = useState("all-components");
  const [activeSecondaryTab, setActiveSecondaryTab] = useState("observed");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toggleState, setToggleState] = useState(true);
  const [multiSelectVals, setMultiSelectVals] = useState(["6E", "AI"]);
  const [showToast, setShowToast] = useState(true);
  const [segmentVal, setSegmentVal] = useState("30d");

  const tableColumns: DataTableColumn<(typeof MOCK_SAMPLE_INDEX_ROWS)[0]>[] = [
    { key: "corridor", header: "Trunk Corridor", width: "160px" },
    { key: "indexValue", header: "Index (pts)", align: "right", render: (r) => <span className="font-bold">{r.indexValue}</span> },
    { key: "meanFare", header: "Observed Fare", align: "right" },
    { key: "tPlus30Fare", header: "T+30 Advance", align: "right" },
    { key: "change24h", header: "24h Shift", align: "center", render: (r) => <MetricTrend value={parseFloat(r.change24h)} /> },
    { key: "status", header: "Status Convention", align: "center", render: (r) => <StatusBadge status={r.status} /> },
    { key: "source", header: "Feed Source", render: (r) => <SourceBadge source={r.source} /> },
  ];

  return (
    <div className="space-[#14213D] space-y-8">
      {/* Overview Banner */}
      <Alert variant="info" title="PHASE 0 DESIGN SYSTEM FOUNDATION ACTIVE">
        This page demonstrates the centralized, government-grade statistical design tokens, reusable UI primitives, layout shell, and accessibility rules established for SIH Problem Statement 26056. No real scrapers or ML endpoints are connected in Phase 0.
      </Alert>

      {/* Global Filter Architecture */}
      <Section title="1. Global Filter System (Mock Architecture)" subtitle="Reusable data-driven filter controls for route, carrier, cabin, and advance booking windows">
        <FilterBar filters={filters} onUpdateFilter={updateFilter} onResetFilters={resetFilters} />
      </Section>

      {/* Color Tokens & Semantic Rules */}
      <Section title="2. Design Token System & Semantic Color Roles" subtitle="Strict color semantic mapping to prevent random color usage and enforce multi-modal contrast">
        <ContentGrid columns={4}>
          <div className="p-4 rounded-sih-md border border-[#B2D4F0] bg-[#EAF3FB] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-[#0A5B9E]">Primary Structure</span>
              <p className="text-sm font-bold text-[#14213D] mt-1">Deep Aviation Blue (#0A5B9E)</p>
            </div>
            <span className="text-xs text-[#5B6B82] mt-3">Used for primary statistical data & structure</span>
          </div>

          <div className="p-4 rounded-sih-md border border-[#F7C1C3] bg-[#FDF0F1] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-[#D1262C]">Alert / Surge</span>
              <p className="text-sm font-bold text-[#14213D] mt-1">Aviation Red (#D1262C)</p>
            </div>
            <span className="text-xs text-[#5B6B82] mt-3">Used for price surges & critical anomalies</span>
          </div>

          <div className="p-4 rounded-sih-md border border-[#D2C1E3] bg-[#F4EFF8] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-[#6F498E]">Forecast / ML</span>
              <p className="text-sm font-bold text-[#14213D] mt-1">Plum (#6F498E)</p>
            </div>
            <span className="text-xs text-[#5B6B82] mt-3">Used for predictive model output & confidence curves</span>
          </div>

          <div className="p-4 rounded-sih-md border border-[#B9E4BA] bg-[#EFF8EF] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-[#4EB050]">Validated</span>
              <p className="text-sm font-bold text-[#14213D] mt-1">Teal Green (#4EB050)</p>
            </div>
            <span className="text-xs text-[#5B6B82] mt-3">Used for verified operational health & multi-feed consensus</span>
          </div>
        </ContentGrid>
      </Section>

      {/* Data Status Language Primitives */}
      <Section title="3. Data Status Language (Section 10 Conventions)" subtitle="Multi-modal visual indicators combining line styles, color, text, and icons">
        <div className="bg-white p-5 rounded-sih-md border border-[#E2E8F0] shadow-sih-card flex flex-wrap gap-4 items-center justify-between">
          <StatusBadge status="observed" />
          <StatusBadge status="forecast" />
          <StatusBadge status="alert" />
          <StatusBadge status="validated" />
          <StatusBadge status="event" />
        </div>
      </Section>

      {/* Data Display: Executive KPI Cards */}
      <Section title="4. Executive KPI & Stat Display Components" subtitle="Restrained typography hierarchy and executive statistical card containers">
        <ContentGrid columns={4}>
          {MOCK_OVERVIEW_KPIS.map((kpi, idx) => (
            <KPICard key={idx} {...kpi} />
          ))}
        </ContentGrid>

        <div className="mt-4">
          <ContentGrid columns={3}>
            <StatCard label="Active Data Streams" value="14 / 14 Feeds" subtext="Direct carrier APIs & GDS pipelines" icon={<Database className="w-4 h-4" />} />
            <StatCard label="Median Statistical Confidence" value="98.4%" subtext="Cross-source reconciliation index" accentColor="#4EB050" icon={<Shield className="w-4 h-4" />} />
            <StatCard label="Model Ensemble Drift" value="0.04 sigma" subtext="Well within 0.15 threshold" accentColor="#6F498E" icon={<Sparkles className="w-4 h-4" />} />
          </ContentGrid>
        </div>
      </Section>

      {/* Data Table Primitive */}
      <Section title="5. Data Table System" subtitle="Government-grade statistical table layout with multi-column formatting">
        <DataTable data={MOCK_SAMPLE_INDEX_ROWS} columns={tableColumns} />
      </Section>

      {/* Form Controls & Action Controls */}
      <Section title="6. Form Controls & Interactive Primitives" subtitle="Reusable buttons, toggles, segmented controls, selects, and dialog triggers">
        <div className="bg-white p-6 rounded-sih-md border border-[#E2E8F0] shadow-sih-card space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" icon={<Activity className="w-4 h-4" />}>Primary Action</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="alert" icon={<AlertTriangle className="w-4 h-4" />}>Alert Action</Button>
            <Button variant="forecast">Forecast Action</Button>
            <IconButton icon={<Filter className="w-4 h-4" />} ariaLabel="Filter action" />
          </div>

          <Divider label="Inputs & Switches" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Toggle checked={toggleState} onChange={setToggleState} label="Live Anomaly Monitoring" description="Trigger notifications on > 2.0 std dev variance" />
            <SegmentedControl options={[{ value: "7d", label: "7 Days" }, { value: "30d", label: "30 Days" }, { value: "90d", label: "90 Days" }]} value={segmentVal} onChange={setSegmentVal} />
            <MultiSelect label="Carrier Filter" options={[{ value: "6E", label: "IndiGo (6E)" }, { value: "AI", label: "Air India (AI)" }, { value: "UK", label: "Vistara (UK)" }]} selectedValues={multiSelectVals} onChange={setMultiSelectVals} />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>Open Inspection Modal</Button>
            <Button variant="outline" size="sm" onClick={() => setIsDrawerOpen(true)}>Open Side Drawer</Button>
          </div>
        </div>
      </Section>

      {/* Visualization Primitives */}
      <Section title="7. Visualization Container & Legend Primitives" subtitle="Recharts wrapper container adhering strictly to Plum = Forecast and Blue = Observed rules">
        <ChartContainer title="National Trunk Corridor Price Index (Paasche Aggregated)" subtitle="Time series comparison of observed fare trajectory against ensemble ML forecast" status="observed">
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-[#E2E8F0] rounded bg-[#F6F8FB] text-xs font-mono text-[#5B6B82] p-6 text-center">
            <p className="font-bold text-[#0A5B9E] mb-1">Recharts Visual Canvas Primitive Ready</p>
            <p className="max-w-md text-[#5B6B82]">Phase 0 styling container configured. In Phase 1+, live Recharts Area/Line series will bind directly to data APIs.</p>
          </div>
        </ChartContainer>
      </Section>

      {/* Feedback States & Banners */}
      <Section title="8. Feedback & State Containers" subtitle="Standardized empty, loading, error, and toast feedback states">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LoadingState label="Recalculating Index Weights..." sublabel="Processing 1,420 observations across 6 corridors" />
          <ErrorState onRetry={() => alert("Retrying feed sync...")} />
        </div>

        {showToast && (
          <div className="mt-4 flex justify-end">
            <Toast type="info" title="Feed Synchronization Successful" message="All 14 airfare data pipelines responding with < 50ms latency." onClose={() => setShowToast(false)} />
          </div>
        )}
      </Section>

      {/* Modals & Drawers */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Corridor Statistical Inspection" subtitle="MAA → DEL Index Methodology Verification" footer={<Button onClick={() => setIsModalOpen(false)}>Close Inspection</Button>}>
        <div className="space-y-4 font-sans text-xs text-[#14213D]">
          <p>This modal dialog is a global feedback component designed for inspecting detailed statistical methodology, carrier fare distribution, and confidence scores.</p>
          <div className="p-3 bg-[#F6F8FB] rounded border border-[#E2E8F0] font-mono">
            <code>Calculation Method: Paasche Price Index (Base Period: Jan 2026 = 100.0)</code>
          </div>
        </div>
      </Modal>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Analytical Parameters" subtitle="Configure statistical sensitivity thresholds">
        <div className="space-y-4 text-xs font-sans">
          <p className="text-[#5B6B82]">Use this side drawer to adjust statistical variance thresholds and inspect underlying raw observation feeds.</p>
          <Select label="Variance Model" value="std" onChange={() => {}} options={[{ value: "std", label: "Standard Deviation (2.5 sigma)" }, { value: "iqr", label: "Interquartile Range (IQR)" }]} />
        </div>
      </Drawer>
    </div>
  );
}
