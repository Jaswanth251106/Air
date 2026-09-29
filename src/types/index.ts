/**
 * Real-Time Airfare Price Index for India
 * Core Foundation Type Definitions
 */

export type DataStatus = "observed" | "forecast" | "alert" | "validated" | "event";

export type BookingWindow = "T+1" | "T+7" | "T+15" | "T+30" | "T+45";

export type CabinClass = "economy" | "premium_economy" | "business" | "first";

export type SourceType = "GDS" | "OTA" | "Direct Airline API" | "Metasearch";

export interface RouteOption {
  code: string;
  name: string;
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
}

export interface AirlineOption {
  id: string;
  name: string;
  code: string;
  active: boolean;
}

export interface FilterState {
  origin: string;
  destination: string;
  departurePeriod: string;
  airline: string;
  sourceType: SourceType | "all";
  cabin: CabinClass | "all";
  fareFamily: string;
  bookingWindow: BookingWindow;
  timeRange: string;
  searchQuery: string;
}

export interface NavItemType {
  label: string;
  href: string;
  iconName: string;
  badge?: string;
  badgeVariant?: "primary" | "secondary" | "alert" | "attention" | "validated" | "forecast" | "steel" | "coral" | "neutral";
  description?: string;
}

export interface ContextBarData {
  route: string;
  origin: string;
  destination: string;
  departureDate: string;
  airline: string;
  cabin: string;
  bookingWindow: BookingWindow;
  lastUpdated?: string;
  sampleCount?: number;
}

export interface KPICardData {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  trend?: "up" | "down" | "neutral";
  status?: DataStatus;
  statusLabel?: string;
  subtitle?: string;
  tooltipText?: string;
}

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
  align?: "left" | "center" | "right";
  width?: string;
  render?: (row: T) => React.ReactNode;
}

export interface MetricBadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "alert" | "attention" | "validated" | "forecast" | "steel" | "coral" | "neutral";
  size?: "sm" | "md";
  icon?: React.ReactNode;
  dotted?: boolean;
}

export interface StatusBadgeProps {
  status: DataStatus;
  label?: string;
  showIcon?: boolean;
  size?: "sm" | "md";
}

export interface SourceBadgeProps {
  source: SourceType;
  reliabilityScore?: number;
}
