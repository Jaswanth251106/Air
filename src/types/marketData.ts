/**
 * Real-Time Airfare Price Index for India
 * Market Data & Route Explorer Type Definitions
 */

import { BookingWindow, CabinClass, DataStatus, SourceType } from "@/types";

export type MarketViewTab =
  | "explorer"
  | "airlines"
  | "otas"
  | "fare-components"
  | "availability"
  | "fare-calendar";

export type AvailabilityState =
  | "AVAILABLE"
  | "LIMITED"
  | "SOLD OUT"
  | "CANCELLED"
  | "PARSE ERROR"
  | "BLOCKED";

export interface BookingWindowSummary {
  window: BookingWindow;
  fare: number;
  change: number;
  availability: "Available" | "Limited";
  source: string;
}

export interface LeadTimeDataPoint {
  window: BookingWindow;
  fare: number;
  previousFare: number;
  changePercent: number;
}

export interface RouteHistoryDataPoint {
  date: string;
  avgFare: number;
  minFare: number;
  maxFare: number;
  window: BookingWindow;
}

export interface FlightObservation {
  id: string;
  route: string;
  origin: string;
  destination: string;
  airline: string;
  flightNo: string;
  departureTime: string;
  cabin: CabinClass;
  fareFamily: string;
  bookingClass: string;
  baseFare: number;
  taxes: number;
  udf: number;
  otherCharges: number;
  discount: number;
  totalFare: number;
  availability: AvailabilityState;
  source: SourceType;
  sourceName: string;
  bookingWindow: BookingWindow;
  timestamp: string;
  provenance: string;
}

export interface AirlineComparisonEntry {
  airline: string;
  code: string;
  fare: number;
  change: number;
  availability: AvailabilityState;
  observationCount: number;
}

export interface OTAComparisonEntry {
  sourceName: string;
  sourceType: SourceType;
  fare: number;
  spreadVsDirect: number;
  availability: AvailabilityState;
  timestamp: string;
}

export interface FareCalendarEntry {
  date: string;
  dayNumber: number;
  dayOfWeek: string;
  fare: number;
  availability: AvailabilityState;
  isPeak: boolean;
}
