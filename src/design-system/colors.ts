/**
 * Airfare Index Design System - Centralized Color Tokens
 * 
 * STRICT SEMANTIC RULES:
 * - Primary (#0A5B9E): Primary structure / primary statistical data
 * - Alert (#D1262C): Warnings, surge, critical changes
 * - Secondary (#7DC9DE): Secondary analytical information
 * - Attention / Event (#F3AC27): Events / calendar signals / attention
 * - Validation / Healthy (#4EB050): Validation / healthy operational state
 * - Forecast / ML (#6F498E): Forecast / ML output
 * - Secondary Data (#568AB2): Secondary data series
 * - Secondary Warning (#D16260): Secondary warning
 * - Text Ink (#14213D): Primary text
 * - Cloud (#F6F8FB): Application background
 * - White (#FFFFFF): Cards / surfaces
 */

export const COLOR_TOKENS = {
  // Brand Core Colors - Analogous Palette (Mint -> Aqua -> Cyan -> Sky -> Deep Teal)
  primary: {
    hex: "#167D8D",
    name: "Deep Teal",
    role: "Primary structure / primary statistical data",
    bgLight: "#DDF8F2",
    border: "#B2E0E3",
    hover: "#10606D",
  },
  alert: {
    hex: "#D1262C",
    name: "Aviation Red",
    role: "Warnings, price surge, critical statistical changes",
    bgLight: "#FDF0F1",
    border: "#F7C1C3",
    hover: "#B01E23",
  },
  secondary: {
    hex: "#59C7CB",
    name: "Aqua",
    role: "Secondary analytical information, secondary highlights",
    bgLight: "#E8F7FA",
    border: "#B4E6E8",
    hover: "#47B3B7",
  },
  attention: {
    hex: "#F3AC27",
    name: "Aviation Gold",
    role: "Events, holiday calendar signals, attention flags",
    bgLight: "#FEF8EC",
    border: "#FBE6B6",
    hover: "#D99318",
  },
  validation: {
    hex: "#2FA9B8",
    name: "Cyan Teal",
    role: "Validation, healthy operational state, normal variance",
    bgLight: "#E6F6F8",
    border: "#A5E1E8",
    hover: "#248995",
  },
  forecast: {
    hex: "#167D8D",
    name: "Deep Teal Predictive",
    role: "Forecast, ML model predictions, projected curves",
    bgLight: "#E8F7FA",
    border: "#B4E6E8",
    hover: "#10606D",
  },
  steel: {
    hex: "#2FA9B8",
    name: "Cyan",
    role: "Secondary data series, benchmark baseline comparisons",
    bgLight: "#EAF7FA",
    border: "#B2E2E8",
    hover: "#248995",
  },
  coral: {
    hex: "#D16260",
    name: "Coral",
    role: "Secondary warning, moderate volatility flags",
    bgLight: "#FDF3F3",
    border: "#F6C8C7",
    hover: "#B74D4B",
  },
  
  // Neutral Base Tokens
  ink: {
    hex: "#17324D",
    name: "Deep Slate Ink",
    role: "Primary high-contrast text",
    muted: "#68818C",
    subtle: "#95A7B0",
  },
  cloud: {
    hex: "#F7FBFC",
    name: "Cloud Canvas",
    role: "Application background canvas",
  },
  surface: {
    hex: "#FFFFFF",
    name: "White",
    role: "Card, table, modal, and drawer surfaces",
    border: "#D8E8EC",
    borderSubtle: "#EBF3F5",
  },
} as const;

export type ColorTokenKey = keyof typeof COLOR_TOKENS;

/**
 * Maps data status visual language to corresponding color token and style metadata
 */
export const DATA_STATUS_MAP = {
  observed: {
    color: COLOR_TOKENS.primary.hex,
    bgLight: COLOR_TOKENS.primary.bgLight,
    border: COLOR_TOKENS.primary.border,
    label: "Observed Data",
    lineStyle: "solid",
    iconName: "Activity",
    description: "Empirical historical & real-time observed fare data points",
  },
  forecast: {
    color: COLOR_TOKENS.forecast.hex,
    bgLight: COLOR_TOKENS.forecast.bgLight,
    border: COLOR_TOKENS.forecast.border,
    label: "ML Forecast",
    lineStyle: "dashed",
    iconName: "TrendingUp",
    description: "Predictive model estimation with 95% confidence bounds",
  },
  alert: {
    color: COLOR_TOKENS.alert.hex,
    bgLight: COLOR_TOKENS.alert.bgLight,
    border: COLOR_TOKENS.alert.border,
    label: "Surge Alert",
    lineStyle: "solid",
    iconName: "AlertTriangle",
    description: "Significant price variance or anomaly detected",
  },
  validated: {
    color: COLOR_TOKENS.validation.hex,
    bgLight: COLOR_TOKENS.validation.bgLight,
    border: COLOR_TOKENS.validation.border,
    label: "Validated",
    lineStyle: "solid",
    iconName: "CheckCircle2",
    description: "Cross-verified multi-source fare consistency",
  },
  event: {
    color: COLOR_TOKENS.attention.hex,
    bgLight: COLOR_TOKENS.attention.bgLight,
    border: COLOR_TOKENS.attention.border,
    label: "Calendar Event",
    lineStyle: "dotted",
    iconName: "Calendar",
    description: "Festival, holiday, or high-demand regional event factor",
  },
} as const;
