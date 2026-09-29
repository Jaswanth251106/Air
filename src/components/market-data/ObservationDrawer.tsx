"use client";

import React from "react";
import { Drawer } from "@/components/feedback/Drawer";
import { FlightObservation } from "@/types/marketData";
import { MetricBadge } from "@/components/data-display/MetricBadge";
import { SourceBadge } from "@/components/data-display/SourceBadge";
import { Server, Clock, ShieldCheck, Tag } from "lucide-react";

interface ObservationDrawerProps {
  observation: FlightObservation | null;
  onClose: () => void;
}

export function ObservationDrawer({ observation, onClose }: ObservationDrawerProps) {
  if (!observation) return null;

  return (
    <Drawer
      isOpen={!!observation}
      onClose={onClose}
      title={`Flight Observation — ${observation.flightNo}`}
      subtitle={`${observation.route} | ${observation.airline}`}
    >
      <div className="space-y-6 text-xs text-[#14213D] font-sans">
        {/* Header summary */}
        <div className="p-4 bg-[#EAF3FB] rounded-sih-md border border-[#B2D4F0] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-[#5B6B82] uppercase">Total Observed Fare</span>
            <p className="text-2xl font-bold text-[#0A5B9E] font-sans">
              ₹{observation.totalFare.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="text-right">
            <MetricBadge
              label={observation.availability}
              variant={observation.availability === "AVAILABLE" ? "validated" : "attention"}
            />
            <p className="text-[10px] font-mono text-[#5B6B82] mt-1">{observation.bookingWindow} Advance</p>
          </div>
        </div>

        {/* Fare Component Breakdown */}
        <div className="space-y-2">
          <h4 className="font-bold text-xs uppercase font-mono text-[#0A5B9E] tracking-wider">
            Fare Component Reconciled Breakdown
          </h4>
          <div className="p-3 bg-white border border-[#E2E8F0] rounded-sih-md font-mono space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-[#5B6B82]">Base Fare:</span>
              <span className="font-bold">₹{observation.baseFare.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5B6B82]">GST & Govt Taxes:</span>
              <span className="font-bold">₹{observation.taxes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5B6B82]">User Development Fee (UDF):</span>
              <span className="font-bold">₹{observation.udf}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5B6B82]">Other Airline Charges:</span>
              <span className="font-bold">₹{observation.otherCharges}</span>
            </div>
            {observation.discount > 0 && (
              <div className="flex justify-between text-[#4EB050]">
                <span>Discount / Promo:</span>
                <span>-₹{observation.discount}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-[#E2E8F0] font-bold text-[#14213D] text-sm">
              <span>Reconciled Total:</span>
              <span className="text-[#0A5B9E]">₹{observation.totalFare.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Observation Provenance Metadata */}
        <div className="space-y-2">
          <h4 className="font-bold text-xs uppercase font-mono text-[#0A5B9E] tracking-wider">
            Source Provenance & Audit Metadata
          </h4>
          <div className="p-3 bg-[#F6F8FB] rounded border border-[#E2E8F0] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#5B6B82]">Source Provider:</span>
              <SourceBadge source={observation.source} />
            </div>
            <div className="flex items-center justify-between font-mono">
              <span className="text-[#5B6B82]">Observation Timestamp:</span>
              <span className="font-semibold text-[#14213D]">{observation.timestamp}</span>
            </div>
            <p className="text-[11px] text-[#5B6B82] pt-1 border-t border-[#E2E8F0]">
              {observation.provenance}
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
