import {
  BookingWindowSummary,
  LeadTimeDataPoint,
  RouteHistoryDataPoint,
  FlightObservation,
  AirlineComparisonEntry,
  OTAComparisonEntry,
  FareCalendarEntry,
} from "@/types/marketData";
import { BookingWindow } from "@/types";

/**
 * 5 Core Booking Window Summaries (Section 7)
 */
export const MOCK_BOOKING_WINDOW_SUMMARIES: Record<string, BookingWindowSummary[]> = {
  "MAA-DEL": [
    { window: "T+45", fare: 4280, change: -6.2, availability: "Available", source: "Direct Carrier API" },
    { window: "T+30", fare: 4520, change: -5.4, availability: "Available", source: "Direct Carrier API" },
    { window: "T+15", fare: 5100, change: 12.8, availability: "Available", source: "GDS Sabre" },
    { window: "T+7", fare: 5980, change: 17.3, availability: "Limited", source: "OTA Aggregate" },
    { window: "T+1", fare: 7240, change: 21.1, availability: "Limited", source: "Direct Carrier API" },
  ],
  "DEL-BOM": [
    { window: "T+45", fare: 3950, change: -4.5, availability: "Available", source: "Direct Carrier API" },
    { window: "T+30", fare: 4200, change: -3.8, availability: "Available", source: "GDS Sabre" },
    { window: "T+15", fare: 4850, change: 15.4, availability: "Available", source: "OTA Aggregate" },
    { window: "T+7", fare: 5600, change: 15.5, availability: "Limited", source: "Direct Carrier API" },
    { window: "T+1", fare: 6950, change: 24.1, availability: "Limited", source: "Direct Carrier API" },
  ],
};

/**
 * Lead-Time Price Curve Data (Section 9)
 */
export function getLeadTimeCurveData(origin = "MAA", destination = "DEL"): LeadTimeDataPoint[] {
  const routeKey = `${origin}-${destination}`;
  const summaries = MOCK_BOOKING_WINDOW_SUMMARIES[routeKey] || MOCK_BOOKING_WINDOW_SUMMARIES["MAA-DEL"];

  return summaries.map((s, idx) => ({
    window: s.window,
    fare: s.fare,
    previousFare: idx > 0 ? summaries[idx - 1].fare : s.fare,
    changePercent: s.change,
  }));
}

/**
 * Route History Data Points (Section 10)
 */
export function getRouteHistoryData(period = "30D"): RouteHistoryDataPoint[] {
  const pointsCount = period === "7D" ? 7 : period === "20D" ? 20 : 30;
  const list: RouteHistoryDataPoint[] = [];

  for (let i = pointsCount - 1; i >= 0; i--) {
    const d = new Date(2026, 8, 28);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    const fare = Math.round(4800 + Math.sin(i * 0.4) * 350 + i * 15);

    list.push({
      date: dateStr,
      avgFare: fare,
      minFare: fare - 320,
      maxFare: fare + 450,
      window: "T+30",
    });
  }

  return list;
}

/**
 * Detailed Flight Observation List (Section 11)
 */
export const MOCK_FLIGHT_OBSERVATIONS: FlightObservation[] = [
  {
    id: "OBS-6E-501",
    route: "MAA → DEL",
    origin: "MAA",
    destination: "DEL",
    airline: "IndiGo",
    flightNo: "6E-2104",
    departureTime: "08:30 IST",
    cabin: "economy",
    fareFamily: "Standard Flex",
    bookingClass: "Y",
    baseFare: 4100,
    taxes: 780,
    udf: 150,
    otherCharges: 100,
    discount: 0,
    totalFare: 5130,
    availability: "AVAILABLE",
    source: "Direct Airline API",
    sourceName: "IndiGo NDC Direct API",
    bookingWindow: "T+30",
    timestamp: "28 Sep 2026 • 09:00 IST",
    provenance: "Verified carrier direct feed. Transaction ID #NDC-6E-9941",
  },
  {
    id: "OBS-AI-102",
    route: "MAA → DEL",
    origin: "MAA",
    destination: "DEL",
    airline: "Air India",
    flightNo: "AI-430",
    departureTime: "10:15 IST",
    cabin: "economy",
    fareFamily: "Flex Saver",
    bookingClass: "M",
    baseFare: 4350,
    taxes: 820,
    udf: 150,
    otherCharges: 100,
    discount: 0,
    totalFare: 5420,
    availability: "AVAILABLE",
    source: "GDS",
    sourceName: "Amadeus GDS",
    bookingWindow: "T+30",
    timestamp: "28 Sep 2026 • 08:55 IST",
    provenance: "Verified GDS inventory record. Ticket class M",
  },
  {
    id: "OBS-QP-304",
    route: "MAA → DEL",
    origin: "MAA",
    destination: "DEL",
    airline: "Akasa Air",
    flightNo: "QP-1311",
    departureTime: "14:45 IST",
    cabin: "economy",
    fareFamily: "Saver",
    bookingClass: "K",
    baseFare: 3950,
    taxes: 760,
    udf: 150,
    otherCharges: 120,
    discount: 0,
    totalFare: 4980,
    availability: "LIMITED",
    source: "OTA",
    sourceName: "OTA Aggregate Feed",
    bookingWindow: "T+30",
    timestamp: "28 Sep 2026 • 08:50 IST",
    provenance: "OTA aggregate listing. Remaining seats <= 3",
  },
  {
    id: "OBS-SG-802",
    route: "MAA → DEL",
    origin: "MAA",
    destination: "DEL",
    airline: "SpiceJet",
    flightNo: "SG-8172",
    departureTime: "18:20 IST",
    cabin: "economy",
    fareFamily: "Standard",
    bookingClass: "N",
    baseFare: 3800,
    taxes: 720,
    udf: 140,
    otherCharges: 100,
    discount: 0,
    totalFare: 4760,
    availability: "AVAILABLE",
    source: "Metasearch",
    sourceName: "Metasearch Price Crawler",
    bookingWindow: "T+30",
    timestamp: "28 Sep 2026 • 08:45 IST",
    provenance: "Crawler observation. Seat selection excluded",
  },
];

/**
 * Airline Comparison Dataset (Section 15)
 */
export const MOCK_AIRLINE_COMPARISONS: AirlineComparisonEntry[] = [
  { airline: "IndiGo", code: "6E", fare: 5130, change: 7.4, availability: "AVAILABLE", observationCount: 14 },
  { airline: "Air India", code: "AI", fare: 5420, change: 8.2, availability: "AVAILABLE", observationCount: 10 },
  { airline: "Akasa Air", code: "QP", fare: 4980, change: 5.9, availability: "LIMITED", observationCount: 8 },
  { airline: "SpiceJet", code: "SG", fare: 4760, change: 3.4, availability: "AVAILABLE", observationCount: 6 },
];

/**
 * OTA Comparison Dataset (Section 16)
 */
export const MOCK_OTA_COMPARISONS: OTAComparisonEntry[] = [
  { sourceName: "Airline Direct NDC", sourceType: "Direct Airline API", fare: 6420, spreadVsDirect: 0, availability: "AVAILABLE", timestamp: "09:00 IST" },
  { sourceName: "OTA Partner Alpha", sourceType: "OTA", fare: 6120, spreadVsDirect: -300, availability: "AVAILABLE", timestamp: "08:55 IST" },
  { sourceName: "OTA Partner Beta", sourceType: "OTA", fare: 6280, spreadVsDirect: -140, availability: "AVAILABLE", timestamp: "08:52 IST" },
  { sourceName: "GDS Sabre Channel", sourceType: "GDS", fare: 6450, spreadVsDirect: 30, availability: "LIMITED", timestamp: "08:48 IST" },
];

/**
 * Fare Calendar Grid Dataset (Section 19)
 */
export function getFareCalendarData(): FareCalendarEntry[] {
  const days: FareCalendarEntry[] = [];
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  for (let day = 1; day <= 30; day++) {
    const d = new Date(2026, 9, day); // Oct 2026
    const dayOfWeek = daysOfWeek[d.getDay()];
    const isWeekend = d.getDay() === 0 || d.getDay() === 5 || d.getDay() === 6;
    const fare = isWeekend ? Math.round(5800 + (day % 4) * 220) : Math.round(4600 + (day % 3) * 150);

    days.push({
      date: `2026-10-${day < 10 ? "0" + day : day}`,
      dayNumber: day,
      dayOfWeek,
      fare,
      availability: day === 15 || day === 24 ? "LIMITED" : "AVAILABLE",
      isPeak: isWeekend || day === 15,
    });
  }

  return days;
}
