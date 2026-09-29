"use client";

import React, { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DataApiPage } from "@/components/data-api/DataApiPage";
import { LoadingState } from "@/components/feedback/LoadingState";

export default function Page() {
  return (
    <AppShell>
      <Suspense fallback={<LoadingState label="Loading Data & API Portal..." />}>
        <DataApiPage />
      </Suspense>
    </AppShell>
  );
}
