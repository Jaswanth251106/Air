/**
 * Real-Time Airfare Price Index for India
 * Overview Dashboard Type Definitions
 */

import { BookingWindow, DataStatus, SourceType } from "@/types";

export type SurgeClass = "NORMAL" | "ELEVATED" | "HIGH SURGE";

export type TimePeriod = "7D" | "20D" | "30D" | "90D";

export type OverviewTabMode = "PRESENT" | "HISTORICAL";

export interface OverviewKPIMetrics {
  nationalIndex: number;
  nationalIndexChange: number;
  dailyChange: number;
  weeklyChange: number;
  monthlyChange: number;
  freshnessLabel: string;
  lastUpdated: string;
  referencePeriod: string;
  observationCount: number;
}

export interface IndexTrendDataPoint {
  date: string;
  indexValue: number;
  historicalValue?: number;
  observedFare: number;
  sampleSize: number;
}

export interface RouteMovement {
  id: string;
  origin: string;
  destination: string;
  route: string;
  airline: string;
  cabin: string;
  bookingWindow: BookingWindow;
  priceChange: number;
  surgeClass: SurgeClass;
  sourceSpread: number;
  observationTime: string;
  meanFare: number;
  status: DataStatus;
  primarySource: SourceType;
  coordinate: {
    from: { cx: number; cy: number };
    to: { cx: number; cy: number };
  };
}

export interface MarketPulseData {
  topRising: { route: string; change: number }[];
  topFalling: { route: string; change: number }[];
  largestSpread: { route: string; spread: string; percent: number }[];
  surgeAlerts: { route: string; level: SurgeClass; description: string }[];
}
