/**
 * Airfare Index Design System - Master Tokens Aggregator
 */

import { COLOR_TOKENS, DATA_STATUS_MAP } from "./colors";
import { TYPOGRAPHY_TOKENS } from "./typography";
import { SPACING_TOKENS } from "./spacing";

export const DESIGN_TOKENS = {
  colors: COLOR_TOKENS,
  typography: TYPOGRAPHY_TOKENS,
  spacing: SPACING_TOKENS,
  statusMap: DATA_STATUS_MAP,
  systemInfo: {
    projectName: "Real-Time Airfare Price Index for India",
    platformVersion: "1.0.0",
    productType: "Web-based Statistical Intelligence Platform",
    designPrinciples: [
      "Government-grade statistical analytical clarity",
      "Aviation domain identity without promotional airline branding",
      "Strict multi-modal indicator contrast (never color alone)",
      "Calm, high-density presentation optimized for projector displays",
      "Desktop-first 12-column structural grid",
    ],
  },
} as const;

export default DESIGN_TOKENS;
