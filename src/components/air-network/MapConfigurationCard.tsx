"use client";

import React from "react";
import { MapPin, KeyRound, RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/forms/Button";
import { cn } from "@/lib/utils";

interface MapConfigurationCardProps {
  onRetry?: () => void;
  className?: string;
}

export function MapConfigurationCard({ onRetry, className }: MapConfigurationCardProps) {
  return (
    <div
      className={cn(
        "w-full h-[580px] bg-[#F8FAFC] rounded-sih-xl border border-[#E2E8F0] shadow-sih-card flex flex-col items-center justify-center p-6 text-center select-none space-y-5",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-[#EAF3FB] border border-[#B2D4F0] flex items-center justify-center text-[#0A5B9E] shadow-sm">
        <MapPin className="w-8 h-8" />
      </div>

      <div className="max-w-md space-y-2">
        <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#0A5B9E] bg-[#EAF3FB] px-2.5 py-1 rounded border border-[#B2D4F0] inline-block">
          MAP CONFIGURATION REQUIRED
        </span>
        <h3 className="text-xl font-extrabold text-[#14213D] font-mono tracking-tight">
          Google Maps API Key Required
        </h3>
        <p className="text-xs text-[#5B6B82] leading-relaxed">
          The Air Network Explorer uses the live Google Maps JavaScript API to render interactive light geographic basemaps and aviation routes across India.
        </p>
      </div>

      <div className="w-full max-w-lg bg-white p-4 rounded-sih-lg border border-[#E2E8F0] text-left font-mono text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-[#14213D] border-b border-[#EDF2F7] pb-2">
          <KeyRound className="w-4 h-4 text-[#F3AC27]" />
          <span>Environment Variable Setup Instructions</span>
        </div>
        <p className="text-[11px] text-[#5B6B82] font-sans">
          Add your Google Maps API Key to your local environment file:
        </p>
        <div className="bg-[#0F172A] text-[#7DC9DE] p-3 rounded-sih-md text-[11px] overflow-x-auto">
          <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here</code>
        </div>
        <p className="text-[10px] text-[#8A99AD] font-sans">
          Restart the Next.js dev server (<code className="bg-[#F1F5F9] px-1 py-0.5 rounded text-[#14213D]">npm run dev</code>) after adding the key.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        {onRetry && (
          <Button
            variant="primary"
            size="md"
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={onRetry}
          >
            Retry Map Loading
          </Button>
        )}
      </div>
    </div>
  );
}
