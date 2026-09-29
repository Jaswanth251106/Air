/**
 * Real-Time Airfare Price Index for India
 * Index Engine / Statistical Methodology Type Definitions
 */

import { BookingWindow, DataStatus } from "@/types";

export type IndexEngineTab =
  | "overview"
  | "route-basket"
  | "weights"
  | "booking-windows"
  | "calculation"
  | "history"
  | "benchmark";

export type IndexFrequency = "Daily" | "Weekly" | "Monthly";

export interface MethodologyStep {
  id: number;
  title: string;
  shortDesc: string;
  detailText: string;
  sampleInput: string;
  sampleOutput: string;
}

export interface RouteBasketItem {
  id: string;
  route: string;
  origin: string;
  destination: string;
  trafficShare: string;
  prototypeWeight: number; // percentage, e.g., 18
  coveragePercent: number;
  status: DataStatus;
  sampleCount: number;
  coordinate: {
    from: { cx: number; cy: number };
    to: { cx: number; cy: number };
  };
}

export interface BookingWindowMetric {
  window: BookingWindow;
  description: string;
  observationCount: number;
  representativeFare: number;
  availabilityCoverage: number;
  indexRelevance: string;
}

export interface CalculationStepData {
  stepName: string;
  formula: string;
  inputValue: string;
  resultValue: string;
  explanation: string;
}

export interface IndexHistoryPoint {
  date: string;
  indexValue: number;
  dailyChange: number;
  weeklyChange: number;
  monthlyChange: number;
}

export interface RouteContributionItem {
  route: string;
  weightPercent: number;
  priceMovement: number;
  indexContributionPoints: number;
  bookingWindow: BookingWindow;
}

export interface BenchmarkPoint {
  period: string;
  prototypeIndex: number;
  dgcaBenchmark: number;
  difference: number;
}
