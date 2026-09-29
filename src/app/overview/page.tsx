"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { OverviewPage } from "@/components/overview/OverviewPage";

export default function Page() {
  return (
    <AppShell>
      <OverviewPage />
    </AppShell>
  );
}
