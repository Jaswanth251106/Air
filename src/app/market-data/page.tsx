"use client";

import React, { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { MarketDataPage } from "@/components/market-data/MarketDataPage";
import { LoadingState } from "@/components/feedback/LoadingState";

export default function Page() {
  return (
    <AppShell>
      <Suspense fallback={<LoadingState label="Loading Market Data & Route Explorer..." />}>
        <MarketDataPage />
      </Suspense>
    </AppShell>
  );
}
