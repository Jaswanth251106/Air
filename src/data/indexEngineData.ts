import {
  MethodologyStep,
  RouteBasketItem,
  BookingWindowMetric,
  IndexHistoryPoint,
  RouteContributionItem,
  BenchmarkPoint,
  IndexFrequency,
} from "@/types/indexEngine";

/**
 * 8-Step Visual Methodology Pipeline (Section 6)
 */
export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    id: 1,
    title: "AIRFARE OBSERVATIONS",
    shortDesc: "Raw feed capture across carrier NDC APIs & GDS channels",
    detailText: "Raw fare observations are continuously ingested from direct carrier NDC endpoints, GDS Sabre/Amadeus, and OTA feeds every 5 minutes.",
    sampleInput: "Raw NDC Stream: 6E-2104 MAA-DEL ₹5,130",
    sampleOutput: "Ingested Observation Record #1420",
  },
  {
    id: 2,
    title: "STANDARDIZED PRODUCTS",
    shortDesc: "Filter by adult, one-way, nonstop, standard cabin",
    detailText: "Observations are normalized into standardized product definitions (1 Adult passenger, One-Way direct, Nonstop, Standard Flex cabin class).",
    sampleInput: "Raw fare listing with ancillary add-ons",
    sampleOutput: "Standardized Product ID: MAA-DEL-OW-STD",
  },
  {
    id: 3,
    title: "ELIGIBLE OBSERVATIONS",
    shortDesc: "Deduplication & outlier variance verification",
    detailText: "Deduplicates redundant carrier listings across multiple channels and removes non-standard promotional flash anomalies exceeding 2.5 sigma.",
    sampleInput: "28 multi-channel listings",
    sampleOutput: "24 Verified Eligible Observations",
  },
  {
    id: 4,
    title: "ROUTE PRICE MEASURE",
    shortDesc: "Geometric mean fare calculation per booking horizon",
    detailText: "Calculates the representative geometric mean fare for each route across eligible booking horizons (T+1, T+7, T+15, T+30, T+45).",
    sampleInput: "Verified fares: ₹4,900 ... ₹5,300",
    sampleOutput: "Representative Fare: ₹5,130 (T+30)",
  },
  {
    id: 5,
    title: "PRICE RELATIVES",
    shortDesc: "Ratio of current period price to reference base period",
    detailText: "Computes the price relative ratio by dividing current representative fare by reference base period fare (Jan 2026 = 100.0).",
    sampleInput: "P_current = ₹5,130 | P_base = ₹4,820",
    sampleOutput: "Price Relative (R_i) = 1.064",
  },
  {
    id: 6,
    title: "ROUTE WEIGHTS",
    shortDesc: "Illustrative route basket capacity weighting",
    detailText: "Applies passenger capacity weights to reflect the economic significance of each trunk corridor.",
    sampleInput: "MAA → DEL Corridor Weight",
    sampleOutput: "Basket Weight = 18.0%",
  },
  {
    id: 7,
    title: "AGGREGATION",
    shortDesc: "Paasche quantity-weighted aggregation summation",
    detailText: "Summates weighted price relatives across all 6 representative trunk corridors using Paasche quantity weighting methodology.",
    sampleInput: "∑ (R_i * W_i) for i = 1..6",
    sampleOutput: "Aggregated Score = 1.0642",
  },
  {
    id: 8,
    title: "AIRFARE PRICE INDEX",
    shortDesc: "Final scaled national airfare index score",
    detailText: "Scales aggregate score to baseline value (100.0) to produce the final National Airfare Price Index metric.",
    sampleInput: "Aggregated Score: 1.0642 * 100",
    sampleOutput: "National Index = 106.4 pts",
  },
];

/**
 * Representative Route Basket (Single Source of Truth for Weights - Section 7 & 10)
 */
export const MOCK_ROUTE_BASKET: RouteBasketItem[] = [
  {
    id: "del-bom",
    route: "DEL → BOM",
    origin: "DEL",
    destination: "BOM",
    trafficShare: "22.4% trunk capacity",
    prototypeWeight: 22,
    coveragePercent: 94,
    status: "validated",
    sampleCount: 320,
    coordinate: { from: { cx: 230, cy: 130 }, to: { cx: 150, cy: 290 } },
  },
  {
    id: "del-blr",
    route: "DEL → BLR",
    origin: "DEL",
    destination: "BLR",
    trafficShare: "19.8% trunk capacity",
    prototypeWeight: 20,
    coveragePercent: 92,
    status: "validated",
    sampleCount: 280,
    coordinate: { from: { cx: 230, cy: 130 }, to: { cx: 210, cy: 400 } },
  },
  {
    id: "maa-del",
    route: "MAA → DEL",
    origin: "MAA",
    destination: "DEL",
    trafficShare: "17.6% trunk capacity",
    prototypeWeight: 18,
    coveragePercent: 92,
    status: "alert",
    sampleCount: 260,
    coordinate: { from: { cx: 260, cy: 390 }, to: { cx: 230, cy: 130 } },
  },
  {
    id: "bom-blr",
    route: "BOM → BLR",
    origin: "BOM",
    destination: "BLR",
    trafficShare: "14.2% trunk capacity",
    prototypeWeight: 14,
    coveragePercent: 88,
    status: "observed",
    sampleCount: 210,
    coordinate: { from: { cx: 150, cy: 290 }, to: { cx: 210, cy: 400 } },
  },
  {
    id: "del-ccu",
    route: "DEL → CCU",
    origin: "DEL",
    destination: "CCU",
    trafficShare: "13.8% trunk capacity",
    prototypeWeight: 14,
    coveragePercent: 86,
    status: "observed",
    sampleCount: 190,
    coordinate: { from: { cx: 230, cy: 130 }, to: { cx: 330, cy: 240 } },
  },
  {
    id: "blr-hyd",
    route: "BLR → HYD",
    origin: "BLR",
    destination: "HYD",
    trafficShare: "12.2% trunk capacity",
    prototypeWeight: 12,
    coveragePercent: 90,
    status: "validated",
    sampleCount: 160,
    coordinate: { from: { cx: 210, cy: 400 }, to: { cx: 220, cy: 300 } },
  },
];

/**
 * Booking Window Ladder Metrics (Section 12)
 */
export const MOCK_BOOKING_WINDOW_METRICS: BookingWindowMetric[] = [
  { window: "T+45", description: "Long-range advance booking horizon", observationCount: 180, representativeFare: 4280, availabilityCoverage: 98, indexRelevance: "Early baseline price stability" },
  { window: "T+30", description: "Standard benchmark advance window", observationCount: 340, representativeFare: 4520, availabilityCoverage: 95, indexRelevance: "Primary reference index horizon" },
  { window: "T+15", description: "Mid-range advance window", observationCount: 290, representativeFare: 5100, availabilityCoverage: 92, indexRelevance: "Early demand acceleration signal" },
  { window: "T+7",  description: "Short-range advance window", observationCount: 240, representativeFare: 5980, availabilityCoverage: 84, indexRelevance: "High-yield fare escalation" },
  { window: "T+1",  description: "Immediate departure horizon", observationCount: 190, representativeFare: 7240, availabilityCoverage: 76, indexRelevance: "Last-minute distress/surge peak" },
];

/**
 * Deterministic Calculation Helper (Section 14 & 15)
 */
export function calculateDeterministicIndex(currentFare: number, referenceFare: number, weightPercent: number) {
  const priceRelative = parseFloat((currentFare / Math.max(1, referenceFare)).toFixed(4));
  const weightedContribution = parseFloat((priceRelative * (weightPercent / 100)).toFixed(4));
  const routeIndexContribution = parseFloat((priceRelative * weightPercent).toFixed(2));

  return {
    priceRelative,
    weightedContribution,
    routeIndexContribution,
  };
}

/**
 * Route Contribution Items (Section 20)
 */
export const MOCK_ROUTE_CONTRIBUTIONS: RouteContributionItem[] = [
  { route: "DEL → BOM", weightPercent: 22, priceMovement: 9.8, indexContributionPoints: 2.15, bookingWindow: "T+30" },
  { route: "DEL → BLR", weightPercent: 20, priceMovement: 4.2, indexContributionPoints: 0.84, bookingWindow: "T+30" },
  { route: "MAA → DEL", weightPercent: 18, priceMovement: 12.4, indexContributionPoints: 2.23, bookingWindow: "T+30" },
  { route: "BOM → BLR", weightPercent: 14, priceMovement: -2.8, indexContributionPoints: -0.39, bookingWindow: "T+30" },
  { route: "DEL → CCU", weightPercent: 14, priceMovement: -4.1, indexContributionPoints: -0.57, bookingWindow: "T+30" },
  { route: "BLR → HYD", weightPercent: 12, priceMovement: 7.2, indexContributionPoints: 0.86, bookingWindow: "T+30" },
];

/**
 * Historical Index Series Data (Section 19)
 */
export function getIndexHistorySeries(period = "30D", frequency: IndexFrequency = "Daily"): IndexHistoryPoint[] {
  const pointsCount = period === "7D" ? 7 : period === "30D" ? 30 : period === "90D" ? 45 : 60;
  const list: IndexHistoryPoint[] = [];

  for (let i = pointsCount - 1; i >= 0; i--) {
    const d = new Date(2026, 8, 28);
    d.setDate(d.getDate() - (frequency === "Weekly" ? i * 7 : frequency === "Monthly" ? i * 30 : i));
    const dateStr = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    const indexVal = parseFloat((100.0 + (pointsCount - i) * 0.14 + Math.sin(i * 0.4) * 1.2).toFixed(1));

    list.push({
      date: dateStr,
      indexValue: indexVal,
      dailyChange: 0.4,
      weeklyChange: 1.8,
      monthlyChange: 6.4,
    });
  }

  return list;
}

/**
 * DGCA Benchmark Data Series (Section 22)
 */
export const MOCK_DGCA_BENCHMARK: BenchmarkPoint[] = [
  { period: "May 2026", prototypeIndex: 101.2, dgcaBenchmark: 100.8, difference: 0.4 },
  { period: "Jun 2026", prototypeIndex: 102.8, dgcaBenchmark: 102.1, difference: 0.7 },
  { period: "Jul 2026", prototypeIndex: 103.5, dgcaBenchmark: 103.2, difference: 0.3 },
  { period: "Aug 2026", prototypeIndex: 104.9, dgcaBenchmark: 104.4, difference: 0.5 },
  { period: "Sep 2026", prototypeIndex: 106.4, dgcaBenchmark: 105.8, difference: 0.6 },
];
