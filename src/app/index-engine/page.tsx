"use client";

import React, { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { IndexEnginePage } from "@/components/index-engine/IndexEnginePage";
import { LoadingState } from "@/components/feedback/LoadingState";

export default function Page() {
  return (
    <AppShell>
      <Suspense fallback={<LoadingState label="Loading Index Engine & Methodology..." />}>
        <IndexEnginePage />
      </Suspense>
    </AppShell>
  );
}
