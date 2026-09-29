import {
  OverviewKPIMetrics,
  IndexTrendDataPoint,
  RouteMovement,
  MarketPulseData,
  TimePeriod,
} from "@/types/overview";
import { BookingWindow } from "@/types";

/**
 * Filter-Indexed KPI Metrics Generator
 */
export function getOverviewKPIs(window: BookingWindow = "T+30"): OverviewKPIMetrics {
  const windowMultipliers: Record<BookingWindow, { index: number; daily: number; weekly: number; monthly: number }> = {
    "T+1": { index: 128.4, daily: 3.2, weekly: 8.7, monthly: 14.2 },
    "T+7": { index: 118.2, daily: 2.1, weekly: 6.4, monthly: 10.5 },
    "T+15": { index: 112.0, daily: 1.5, weekly: 5.1, monthly: 8.4 },
    "T+30": { index: 106.4, daily: 1.8, weekly: 4.6, monthly: 7.3 },
    "T+45": { index: 101.5, daily: 0.4, weekly: 2.1, monthly: 3.8 },
  };

  const m = windowMultipliers[window] || windowMultipliers["T+30"];

  return {
    nationalIndex: m.index,
    nationalIndexChange: 2.4,
    dailyChange: m.daily,
    weeklyChange: m.weekly,
    monthlyChange: m.monthly,
    freshnessLabel: "Current observation cycle",
    lastUpdated: "28 Sep 2026 • 09:00 IST",
    referencePeriod: "vs base period (Jan 2026 = 100.0)",
    observationCount: 1420,
  };
}

/**
 * Filter-Indexed Time Series Data Generator for Recharts Trend Line
 */
export function getOverviewTrendSeries(period: TimePeriod = "30D", window: BookingWindow = "T+30"): IndexTrendDataPoint[] {
  const daysMap: Record<TimePeriod, number> = {
    "7D": 7,
    "20D": 20,
    "30D": 30,
    "90D": 45, // Use 45 points for smooth visualization
  };

  const pointsCount = daysMap[period] || 30;
  const baseIndex = window === "T+1" ? 122 : window === "T+7" ? 114 : window === "T+15" ? 109 : window === "T+30" ? 102 : 99;
  
  const series: IndexTrendDataPoint[] = [];
  const startDate = new Date(2026, 8, 28); // Sep 28 2026

  for (let i = pointsCount - 1; i >= 0; i--) {
    const d = new Date(startDate);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    
    // Deterministic curve with realistic noise
    const indexVal = parseFloat((baseIndex + (pointsCount - i) * 0.18 + Math.sin(i * 0.5) * 1.4).toFixed(1));
    const histVal = parseFloat((indexVal - 3.5 + Math.cos(i * 0.4) * 0.8).toFixed(1));
    const fare = Math.round(indexVal * 54.2);

    series.push({
      date: dateStr,
      indexValue: indexVal,
      historicalValue: histVal,
      observedFare: fare,
      sampleSize: 120 + (i % 15) * 8,
    });
  }

  return series;
}

/**
 * Market Pulse Data Object
 */
export const MOCK_MARKET_PULSE: MarketPulseData = {
  topRising: [
    { route: "MAA → DEL", change: 12.4 },
    { route: "DEL → BOM", change: 9.8 },
    { route: "BLR → HYD", change: 7.2 },
  ],
  topFalling: [
    { route: "DEL → CCU", change: -4.1 },
    { route: "BOM → BLR", change: -2.8 },
  ],
  largestSpread: [
    { route: "MAA → DEL", spread: "Airline Direct vs OTA", percent: 3.8 },
    { route: "DEL → BOM", spread: "GDS Sabre vs Metasearch", percent: 2.9 },
  ],
  surgeAlerts: [
    { route: "DEL → BOM", level: "HIGH SURGE", description: "Diwali event demand acceleration" },
    { route: "MAA → DEL", level: "ELEVATED", description: "Capacity constraint on 6E/AI feeds" },
  ],
};

/**
 * Representative Route Data Basket (Section 13)
 */
export const MOCK_ROUTE_MOVEMENTS: RouteMovement[] = [
  {
    id: "maa-del",
    origin: "MAA",
    destination: "DEL",
    route: "MAA → DEL",
    airline: "IndiGo",
    cabin: "Economy",
    bookingWindow: "T+30",
    priceChange: 12.4,
    surgeClass: "HIGH SURGE",
    sourceSpread: 3.8,
    observationTime: "09:00 IST",
    meanFare: 6850,
    status: "alert",
    primarySource: "Direct Airline API",
    coordinate: { from: { cx: 260, cy: 390 }, to: { cx: 230, cy: 130 } },
  },
  {
    id: "del-bom",
    origin: "DEL",
    destination: "BOM",
    route: "DEL → BOM",
    airline: "Air India",
    cabin: "Economy",
    bookingWindow: "T+30",
    priceChange: 9.8,
    surgeClass: "HIGH SURGE",
    sourceSpread: 2.9,
    observationTime: "09:00 IST",
    meanFare: 5910,
    status: "alert",
    primarySource: "GDS",
    coordinate: { from: { cx: 230, cy: 130 }, to: { cx: 150, cy: 290 } },
  },
  {
    id: "del-blr",
    origin: "DEL",
    destination: "BLR",
    route: "DEL → BLR",
    airline: "Vistara",
    cabin: "Economy",
    bookingWindow: "T+30",
    priceChange: 4.2,
    surgeClass: "ELEVATED",
    sourceSpread: 1.8,
    observationTime: "08:55 IST",
    meanFare: 6150,
    status: "validated",
    primarySource: "OTA",
    coordinate: { from: { cx: 230, cy: 130 }, to: { cx: 210, cy: 400 } },
  },
  {
    id: "bom-blr",
    origin: "BOM",
    destination: "BLR",
    route: "BOM → BLR",
    airline: "Akasa Air",
    cabin: "Economy",
    bookingWindow: "T+30",
    priceChange: -2.8,
    surgeClass: "NORMAL",
    sourceSpread: 1.1,
    observationTime: "08:50 IST",
    meanFare: 4890,
    status: "observed",
    primarySource: "Direct Airline API",
    coordinate: { from: { cx: 150, cy: 290 }, to: { cx: 210, cy: 400 } },
  },
  {
    id: "blr-hyd",
    origin: "BLR",
    destination: "HYD",
    route: "BLR → HYD",
    airline: "SpiceJet",
    cabin: "Economy",
    bookingWindow: "T+30",
    priceChange: 7.2,
    surgeClass: "ELEVATED",
    sourceSpread: 2.2,
    observationTime: "08:45 IST",
    meanFare: 4600,
    status: "validated",
    primarySource: "Metasearch",
    coordinate: { from: { cx: 210, cy: 400 }, to: { cx: 220, cy: 300 } },
  },
  {
    id: "del-ccu",
    origin: "DEL",
    destination: "CCU",
    route: "DEL → CCU",
    airline: "Air India Express",
    cabin: "Economy",
    bookingWindow: "T+30",
    priceChange: -4.1,
    surgeClass: "NORMAL",
    sourceSpread: 0.9,
    observationTime: "08:40 IST",
    meanFare: 5400,
    status: "observed",
    primarySource: "GDS",
    coordinate: { from: { cx: 230, cy: 130 }, to: { cx: 330, cy: 240 } },
  },
];
