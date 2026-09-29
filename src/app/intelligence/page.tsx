"use client";

import React, { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { IntelligencePage } from "@/components/intelligence/IntelligencePage";
import { LoadingState } from "@/components/feedback/LoadingState";

export default function Page() {
  return (
    <AppShell>
      <Suspense fallback={<LoadingState label="Loading Intelligence & Predictive Analytics..." />}>
        <IntelligencePage />
      </Suspense>
    </AppShell>
  );
}
