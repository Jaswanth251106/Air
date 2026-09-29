import {
  ForecastDataPoint,
  ForecastSummaryMetrics,
  SurgeSignal,
  AnomalyObservation,
  DriverContribution,
  ElasticityPoint,
  ModelParameter,
  ModelVersionItem,
  ForecastHorizon,
} from "@/types/intelligence";

/**
 * Filter-Indexed Forecast Time Series Data (Section 10)
 */
export function getForecastSeries(horizon: ForecastHorizon = "7D"): ForecastDataPoint[] {
  const horizonDays: Record<ForecastHorizon, number> = {
    "1D": 1,
    "3D": 3,
    "7D": 7,
    "14D": 14,
    "30D": 30,
  };

  const daysAhead = horizonDays[horizon] || 7;
  const list: ForecastDataPoint[] = [];

  // Historical observed points (past 14 days)
  for (let i = 14; i >= 1; i--) {
    const d = new Date(2026, 8, 28);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    const fare = Math.round(4900 + Math.sin(i * 0.4) * 220 + (14 - i) * 30);

    list.push({
      date: dateStr,
      observedFare: fare,
      isForecast: false,
    });
  }

  // Today anchor point
  const todayStr = "28 Sep";
  const currentFare = 5320;
  list.push({
    date: todayStr,
    observedFare: currentFare,
    predictedFare: currentFare,
    lowerBound: currentFare - 80,
    upperBound: currentFare + 80,
    isForecast: false,
  });

  // Future predicted points (1D to 30D ahead)
  for (let j = 1; j <= daysAhead; j++) {
    const d = new Date(2026, 8, 28);
    d.setDate(d.getDate() + j);
    const dateStr = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    const predFare = Math.round(currentFare + j * 42 + Math.sin(j * 0.5) * 60);
    const margin = Math.round(140 + j * 12);

    list.push({
      date: dateStr,
      predictedFare: predFare,
      lowerBound: predFare - margin,
      upperBound: predFare + margin,
      isForecast: true,
    });
  }

  return list;
}

/**
 * Forecast Summary Metrics (Section 12)
 */
export function getForecastSummary(horizon: ForecastHorizon = "7D"): ForecastSummaryMetrics {
  const daysMap: Record<ForecastHorizon, number> = { "1D": 1, "3D": 3, "7D": 7, "14D": 14, "30D": 30 };
  const addVal = (daysMap[horizon] || 7) * 42;

  return {
    currentObserved: 5320,
    predictedNext: 5320 + addVal,
    forecastHorizon: horizon,
    lowerBound: 5320 + addVal - 200,
    upperBound: 5320 + addVal + 200,
    modelVersion: "XGBoost Demo v1.0",
  };
}

/**
 * Surge Detection Signals (Section 15)
 */
export const MOCK_SURGE_SIGNALS: SurgeSignal[] = [
  {
    id: "SURGE-DEL-BOM",
    route: "DEL → BOM",
    currentFare: 6420,
    baselineFare: 5620,
    movementPercent: 14.2,
    severity: "HIGH SURGE",
    bookingWindow: "T+7",
    timestamp: "28 Sep 2026 • 09:00 IST",
  },
  {
    id: "SURGE-MAA-DEL",
    route: "MAA → DEL",
    currentFare: 6850,
    baselineFare: 6100,
    movementPercent: 12.3,
    severity: "HIGH SURGE",
    bookingWindow: "T+15",
    timestamp: "28 Sep 2026 • 08:55 IST",
  },
  {
    id: "SURGE-BLR-HYD",
    route: "BLR → HYD",
    currentFare: 4920,
    baselineFare: 4590,
    movementPercent: 7.2,
    severity: "ELEVATED",
    bookingWindow: "T+7",
    timestamp: "28 Sep 2026 • 08:45 IST",
  },
];

/**
 * Anomaly Observations List (Section 17)
 */
export const MOCK_ANOMALY_OBSERVATIONS: AnomalyObservation[] = [
  {
    id: "ANO-MAA-DEL-01",
    route: "MAA → DEL",
    date: "28 Sep 2026",
    fare: 8120,
    expectedMin: 5900,
    expectedMax: 6700,
    deviationPercent: 22.1,
    severity: "High",
    source: "Direct Airline API",
    bookingWindow: "T+1",
    airline: "IndiGo",
    timestamp: "09:00 IST",
    anomalyScore: 0.89,
    modelVersion: "Isolation Forest v1.0",
  },
  {
    id: "ANO-DEL-BOM-02",
    route: "DEL → BOM",
    date: "27 Sep 2026",
    fare: 7650,
    expectedMin: 5400,
    expectedMax: 6200,
    deviationPercent: 18.5,
    severity: "High",
    source: "GDS",
    bookingWindow: "T+7",
    airline: "Air India",
    timestamp: "14:20 IST",
    anomalyScore: 0.81,
    modelVersion: "Isolation Forest v1.0",
  },
  {
    id: "ANO-CCU-DEL-03",
    route: "DEL → CCU",
    date: "26 Sep 2026",
    fare: 3400,
    expectedMin: 4800,
    expectedMax: 5600,
    deviationPercent: -29.2,
    severity: "Medium",
    source: "OTA",
    bookingWindow: "T+30",
    airline: "SpiceJet",
    timestamp: "11:15 IST",
    anomalyScore: 0.74,
    modelVersion: "Isolation Forest v1.0",
  },
];

/**
 * Driver Contribution Features (Section 19)
 */
export const MOCK_DRIVER_CONTRIBUTIONS: DriverContribution[] = [
  { featureName: "Booking Window (Lead Time)", importanceScore: 88, modelContribution: 0.28, interpretation: "Shorter advance lead time associated with elevated model prediction" },
  { featureName: "Carrier Availability Class", importanceScore: 74, modelContribution: 0.21, interpretation: "Limited seat inventory bucket associated with upward shift" },
  { featureName: "Historical Route Volatility", importanceScore: 62, modelContribution: 0.16, interpretation: "High variance corridor baseline associated with model spread" },
  { featureName: "Multi-Source Spread Width", importanceScore: 48, modelContribution: 0.11, interpretation: "OTA vs Direct spread width input" },
  { featureName: "Day of Week Signal", importanceScore: 35, modelContribution: 0.07, interpretation: "Weekend departure proximity signal" },
  { featureName: "Calendar Festival Proximity", importanceScore: 28, modelContribution: 0.05, interpretation: "Regional festival seasonal signal proximity" },
];

/**
 * Lead-Time Elasticity Dataset (Section 24)
 */
export const MOCK_ELASTICITY_POINTS: ElasticityPoint[] = [
  { window: "T+45", daysToDeparture: 45, representativeFare: 4250, fareChange: 0, coveragePercent: 98 },
  { window: "T+30", daysToDeparture: 30, representativeFare: 4520, fareChange: 6.4, coveragePercent: 95 },
  { window: "T+15", daysToDeparture: 15, representativeFare: 5020, fareChange: 11.1, coveragePercent: 92 },
  { window: "T+7",  daysToDeparture: 7,  representativeFare: 5860, fareChange: 16.7, coveragePercent: 84 },
  { window: "T+1",  daysToDeparture: 1,  representativeFare: 7120, fareChange: 21.5, coveragePercent: 76 },
];

/**
 * Model Parameters (Section 28)
 */
export const MOCK_MODEL_PARAMETERS: ModelParameter[] = [
  { name: "n_estimators", value: 200, description: "Number of boosting iterations" },
  { name: "max_depth", value: 6, description: "Maximum decision tree depth" },
  { name: "learning_rate", value: 0.05, description: "Boosting learning rate shrinkage" },
  { name: "subsample", value: 0.8, description: "Subsample ratio of training instances" },
  { name: "colsample_bytree", value: 0.8, description: "Subsample ratio of columns per tree" },
];

/**
 * Model Version History (Section 30)
 */
export const MOCK_MODEL_VERSIONS: ModelVersionItem[] = [
  { version: "v0.1", date: "15 Aug 2026", change: "Initial baseline feature specification", status: "Archived" },
  { version: "v0.2", date: "01 Sep 2026", change: "Added multi-source spread features", status: "Archived" },
  { version: "v1.0-demo", date: "28 Sep 2026", change: "Ensemble XGBoost demonstration model", status: "Active Demo" },
];
