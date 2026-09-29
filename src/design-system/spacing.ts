/**
 * Airfare Index Design System - Spacing & Layout Tokens
 * Desktop-first 12-column grid support, 10–16px border radius, generous whitespace.
 */

export const SPACING_TOKENS = {
  grid: {
    columns: 12,
    gapDesktop: "1.5rem", // 24px
    gapTablet: "1rem", // 16px
    maxContainerWidth: "1440px",
    sidebarWidth: "260px",
    sidebarCollapsedWidth: "72px",
    headerHeight: "64px",
    contextBarHeight: "44px",
  },
  borderRadius: {
    sm: "6px",
    md: "10px",  // Specified 10-16px range
    lg: "14px",
    xl: "16px",
    full: "9999px",
  },
  shadows: {
    subtle: "0 1px 3px 0 rgba(20, 33, 61, 0.05), 0 1px 2px 0 rgba(20, 33, 61, 0.03)",
    card: "0 2px 8px -2px rgba(20, 33, 61, 0.06), 0 1px 4px -1px rgba(20, 33, 61, 0.04)",
    dropdown: "0 10px 25px -5px rgba(20, 33, 61, 0.1), 0 8px 10px -6px rgba(20, 33, 61, 0.05)",
    drawer: "-4px 0 24px 0 rgba(20, 33, 61, 0.08)",
  },
  whitespace: {
    xs: "0.25rem", // 4px
    sm: "0.5rem",  // 8px
    md: "1rem",    // 16px
    lg: "1.5rem",  // 24px
    xl: "2rem",    // 32px
    xxl: "3rem",   // 48px
  },
} as const;
