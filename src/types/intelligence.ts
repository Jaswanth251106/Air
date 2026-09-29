/**
 * Real-Time Airfare Price Index for India
 * Intelligence / ML Predictive Analytics Type Definitions
 */

import { BookingWindow, CabinClass, SourceType } from "@/types";
import { SurgeClass } from "@/types/overview";

export type IntelligenceTab =
  | "overview"
  | "forecast"
  | "surge"
  | "anomalies"
  | "drivers"
  | "elasticity"
  | "model-card";

export type ForecastHorizon = "1D" | "3D" | "7D" | "14D" | "30D";

export type SeverityLevel = "Low" | "Medium" | "High";

export interface ForecastDataPoint {
  date: string;
  observedFare?: number;
  predictedFare?: number;
  lowerBound?: number;
  upperBound?: number;
  isForecast: boolean;
}

export interface ForecastSummaryMetrics {
  currentObserved: number;
  predictedNext: number;
  forecastHorizon: ForecastHorizon;
  lowerBound: number;
  upperBound: number;
  modelVersion: string;
}

export interface SurgeSignal {
  id: string;
  route: string;
  currentFare: number;
  baselineFare: number;
  movementPercent: number;
  severity: SurgeClass;
  bookingWindow: BookingWindow;
  timestamp: string;
}

export interface AnomalyObservation {
  id: string;
  route: string;
  date: string;
  fare: number;
  expectedMin: number;
  expectedMax: number;
  deviationPercent: number;
  severity: SeverityLevel;
  source: SourceType;
  bookingWindow: BookingWindow;
  airline: string;
  timestamp: string;
  anomalyScore: number;
  modelVersion: string;
}

export interface DriverContribution {
  featureName: string;
  importanceScore: number; // 0..100
  modelContribution: number; // e.g. +0.21
  interpretation: string;
}

export interface ElasticityPoint {
  window: BookingWindow;
  daysToDeparture: number;
  representativeFare: number;
  fareChange: number;
  coveragePercent: number;
}

export interface ModelParameter {
  name: string;
  value: string | number;
  description: string;
}

export interface ModelVersionItem {
  version: string;
  date: string;
  change: string;
  status: string;
}
