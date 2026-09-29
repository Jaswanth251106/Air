/**
 * Real-Time Airfare Price Index for India
 * Data & API Module Type Definitions
 */

import { BookingWindow, CabinClass, SourceType } from "@/types";

export type DataApiTab =
  | "overview"
  | "catalogue"
  | "downloads"
  | "api-explorer"
  | "methodology"
  | "provenance"
  | "system-health";

export type ObservationAvailability = "AVAILABLE" | "LIMITED" | "SOLD_OUT";

export type ValidationStatus = "PASSED" | "FLAGGED" | "PENDING";

export interface CatalogueObservation {
  id: string; // e.g. OBS-001
  timestamp: string; // e.g. 28 Sep 2026 09:00 IST
  route: string; // e.g. MAA → DEL
  source: SourceType; // e.g. Airline Direct, GDS, OTA
  airline: string; // e.g. IndiGo
  flightNumber: string; // e.g. 6E-5312
  cabin: CabinClass; // e.g. Economy
  fareFamily: string; // e.g. Saver, Standard, Flexi
  bookingWindow: BookingWindow; // e.g. T+30
  baseFare: number;
  taxes: number;
  udf: number; // User Development Fee
  convenienceFee: number;
  otherCharges: number;
  discount: number;
  totalFare: number;
  availability: ObservationAvailability;
  version: string;
  departureDate: string; // e.g. 2026-10-28
  departureTime: string; // e.g. 06:15 IST
  parserVersion: string; // e.g. v1.0-demo
  validationStatus: ValidationStatus;
  provenanceId: string; // e.g. PROV-MAA-DEL-001
}

export interface DatasetMetadata {
  id: string;
  name: string;
  description: string;
  format: "CSV" | "JSON" | "Excel";
  size: string; // e.g. Demo dataset (~2.4 MB)
  version: string;
  lastUpdated: string;
  coverage: string;
  downloadFileName: string;
  fileContentGenerator: () => string;
}

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiEndpoint {
  id: string;
  method: "GET" | "POST";
  path: string;
  purpose: string;
  category: "Index" | "Fares" | "Forecasts" | "System";
  parameters: ApiParameter[];
  exampleRequest: string;
  exampleResponse: string;
  analystSummary: string;
  status: "Active" | "Operational" | "Prototype";
}

export interface ProvenanceStep {
  stage: string;
  label: string;
  detail: string;
  status: "Passed" | "Verified" | "Logged";
}

export interface ProvenanceRecord {
  id: string; // e.g. PROV-MAA-DEL-001
  indexValue: number;
  route: string;
  observationIds: string[];
  source: string;
  timestamp: string;
  parserVersion: string;
  qualityStatus: string;
  steps: ProvenanceStep[];
}

export type HealthStatus = "HEALTHY" | "PARTIAL" | "FAILED" | "NOT AVAILABLE";

export interface SourceHealth {
  id: string;
  source: string;
  type: "Airline Direct" | "GDS" | "OTA" | "Aggregator";
  lastSuccess: string;
  parserVersion: string;
  errorRate: string;
  coverage: string;
  status: HealthStatus;
}

export interface CollectionJob {
  id: string;
  source: string;
  startedAt: string;
  completedAt: string;
  routesProcessed: number;
  successfulObs: number;
  failedObs: number;
  parserVersion: string;
  qualityScore: number;
  status: "COMPLETED" | "PARTIAL" | "FAILED";
}
