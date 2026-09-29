/**
 * Airfare Index Design System - Typography Tokens
 * Standard typography scale strictly mapped to project constraints:
 * - Page title: 32–40px
 * - KPI values: 22–28px
 * - Body text: 14–16px
 * - Metadata / helper text: 12–13px
 */

export const TYPOGRAPHY_TOKENS = {
  fontFamily: {
    primary: "'Josefin Sans', system-ui, -apple-system, sans-serif",
    monospace: "'JetBrains Mono', monospace",
  },
  sizes: {
    pageTitle: {
      fontSize: "2rem", // 32px
      lineHeight: "2.375rem", // 38px
      fontWeight: "700",
      letterSpacing: "-0.02em",
    },
    sectionHeader: {
      fontSize: "1.375rem", // 22px
      lineHeight: "1.75rem", // 28px
      fontWeight: "600",
      letterSpacing: "-0.01em",
    },
    kpiValue: {
      fontSize: "1.625rem", // 26px
      lineHeight: "2rem",
      fontWeight: "700",
      letterSpacing: "-0.015em",
    },
    bodyLarge: {
      fontSize: "1rem", // 16px
      lineHeight: "1.5rem", // 24px
      fontWeight: "400",
    },
    bodyMedium: {
      fontSize: "0.9375rem", // 15px
      lineHeight: "1.375rem", // 22px
      fontWeight: "400",
    },
    bodySmall: {
      fontSize: "0.875rem", // 14px
      lineHeight: "1.25rem", // 20px
      fontWeight: "400",
    },
    metadata: {
      fontSize: "0.8125rem", // 13px
      lineHeight: "1.125rem", // 18px
      fontWeight: "500",
    },
    caption: {
      fontSize: "0.75rem", // 12px
      lineHeight: "1rem", // 16px
      fontWeight: "500",
      letterSpacing: "0.01em",
    },
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;
