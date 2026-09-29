"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ContextBar } from "./ContextBar";
import { FilterProvider } from "@/context/FilterContext";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  showContextBar?: boolean;
}

function AppShellContent({
  children,
  showContextBar = true,
}: AppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#14213D] flex font-sans antialiased selection:bg-[#0A5B9E] selection:text-white">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Sidebar Overlay Sheet */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-[#14213D]/50 backdrop-blur-xs">
          <Sidebar
            className="flex"
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />
          <div
            className="flex-1 cursor-pointer"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close mobile sidebar overlay"
          />
        </div>
      )}

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
        {showContextBar && <ContextBar />}
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}

export function AppShell({ children, showContextBar = true }: AppShellProps) {
  return (
    <FilterProvider>
      <AppShellContent showContextBar={showContextBar}>{children}</AppShellContent>
    </FilterProvider>
  );
}
