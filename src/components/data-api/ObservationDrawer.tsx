"use client";

import React from "react";
import { CatalogueObservation } from "@/types/dataApi";
import { X, CheckCircle2, ShieldAlert, Tag, Building2, Calendar, Clock, CreditCard, Layers, ExternalLink } from "lucide-react";

interface ObservationDrawerProps {
  observation: CatalogueObservation | null;
  onClose: () => void;
  onViewProvenance?: (provenanceId: string) => void;
}

export function ObservationDrawer({ observation, onClose, onViewProvenance }: ObservationDrawerProps) {
  if (!observation) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#D9E2EC] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E4E7EB] bg-[#14213D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-white/10 text-white">
              <Tag className="w-5 h-5 text-[#7DC9DE]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#9FB3C8] font-bold">
                Observation Record Detail
              </span>
              <h3 className="text-lg font-bold text-white">{observation.id}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs select-none">
          {/* Status & Summary Card */}
          <div className="p-4 rounded-lg bg-[#F0F4F8] border border-[#D9E2EC] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#14213D] text-sm">{observation.route}</span>
              <span
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  observation.validationStatus === "PASSED"
                    ? "bg-[#4EB050]/10 text-[#4EB050] border border-[#4EB050]/30"
                    : "bg-[#F3AC27]/10 text-[#B87A00] border border-[#F3AC27]/30"
                }`}
              >
                {observation.validationStatus}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-[#D9E2EC]">
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#5C728A]">Total Displayed Fare</span>
                <span className="font-bold text-base text-[#0A5B9E]">₹{observation.totalFare.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#5C728A]">Booking Window</span>
                <span className="font-bold text-sm text-[#14213D]">{observation.bookingWindow}</span>
              </div>
            </div>
          </div>

          {/* Fare Itemization Breakdown (Section 7 & 18) */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#5C728A] flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#0A5B9E]" /> Standardized Fare Components
            </h4>
            <div className="p-4 rounded-lg border border-[#D9E2EC] bg-white space-y-2">
              <div className="flex justify-between items-center text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A]">Base Passenger Fare:</span>
                <span className="font-semibold text-[#14213D]">₹{observation.baseFare.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A]">Government Taxes (GST/AFT):</span>
                <span className="font-semibold text-[#14213D]">+ ₹{observation.taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A]">User Development Fee (UDF):</span>
                <span className="font-semibold text-[#14213D]">+ ₹{observation.udf.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A]">Convenience & Booking Fee:</span>
                <span className="font-semibold text-[#14213D]">+ ₹{observation.convenienceFee.toLocaleString()}</span>
              </div>
              {observation.discount > 0 && (
                <div className="flex justify-between items-center text-xs py-1 border-b border-[#F0F4F8] text-[#4EB050]">
                  <span>Eligible Promotion / Discount:</span>
                  <span className="font-bold">- ₹{observation.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-[#D9E2EC] text-[#14213D]">
                <span>Reconciled Total Fare:</span>
                <span className="text-[#0A5B9E]">₹{observation.totalFare.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Observation Itinerary Metadata */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#5C728A] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0A5B9E]" /> Flight & Provider Metadata
            </h4>
            <div className="space-y-2 border border-[#D9E2EC] rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#0A5B9E]" /> Airline & Flight
                </span>
                <span className="font-medium text-[#14213D]">{observation.airline} ({observation.flightNumber})</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#0A5B9E]" /> Cabin & Fare Family
                </span>
                <span className="font-medium text-[#14213D] capitalize">{observation.cabin.replace("_", " ")} • {observation.fareFamily}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0A5B9E]" /> Departure Schedule
                </span>
                <span className="font-medium text-[#14213D]">{observation.departureDate} @ {observation.departureTime}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#F0F4F8]">
                <span className="text-[#5C728A] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0A5B9E]" /> Collection Timestamp
                </span>
                <span className="font-medium text-[#14213D]">{observation.timestamp}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-[#5C728A]">Parser & Schema Version</span>
                <span className="font-mono text-[#0A5B9E] font-bold">{observation.parserVersion}</span>
              </div>
            </div>
          </div>

          {/* Provenance Trace Action */}
          <div className="p-4 rounded-lg bg-[#F0F4F8] border border-[#D9E2EC] flex items-center justify-between">
            <div>
              <span className="block font-bold text-[#14213D]">Auditable Provenance ID</span>
              <span className="font-mono text-xs text-[#0A5B9E] font-bold">{observation.provenanceId}</span>
            </div>
            {onViewProvenance && (
              <button
                onClick={() => onViewProvenance(observation.provenanceId)}
                className="px-3 py-1.5 bg-[#0A5B9E] hover:bg-[#14213D] text-white font-medium rounded text-xs transition-colors flex items-center gap-1"
              >
                Trace Chain <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#E4E7EB] bg-[#F0F4F8] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#14213D] hover:bg-[#0A5B9E] text-white font-medium rounded text-xs transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
