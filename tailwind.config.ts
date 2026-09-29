import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/design-system/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Semantic Tokens - Analogous Palette (Mint -> Aqua -> Cyan -> Sky -> Deep Teal)
        brand: {
          primary: "#167D8D",     // Deep Teal (Primary brand structure)
          secondary: "#59C7CB",   // Aqua (Secondary accent)
          mint: "#98FBCB",        // Mint Green
          cyan: "#2FA9B8",        // Vibrant Cyan / Teal
          sky: "#DDEFFA",         // Soft Sky Blue
          alert: "#D1262C",       // Aviation Red (Critical Alerts)
          attention: "#F3AC27",   // Aviation Gold (Calendar Events / Warnings)
          validation: "#2FA9B8",  // Validation / Healthy state (Teal)
          forecast: "#167D8D",    // Deep Teal (ML / Forecast predictions)
          steel: "#2FA9B8",       // Cyan (Secondary analytical data)
          coral: "#D16260",       // Coral (Secondary warning)
          ink: "#17324D",         // Deep Slate Ink (Primary text)
          cloud: "#F7FBFC",       // Application canvas background
          surface: "#FFFFFF",     // White (Cards / surfaces)
          
          // Token Shades & Interactive States
          "primary-hover": "#10606D",
          "primary-light": "#DDF8F2",
          "secondary-light": "#E8F7FA",
          "mint-light": "#E9FDF4",
          "cyan-light": "#E6F6F8",
          "sky-light": "#EBF6FC",
          "alert-light": "#FDF0F1",
          "attention-light": "#FEF8EC",
          "validation-light": "#E6F6F8",
          "forecast-light": "#E8F7FA",
          "steel-light": "#EAF7FA",
          "coral-light": "#FDF3F3",

          // Muted border and text tokens
          border: "#D8E8EC",
          "border-subtle": "#EBF3F5",
          "ink-muted": "#68818C",
          "ink-light": "#95A7B0",
        },
      },
      fontFamily: {
        sans: ["Josefin Sans", "var(--font-josefin)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "page-title": ["2rem", { lineHeight: "2.25rem", fontWeight: "700" }], // 32px
        "section-header": ["1.375rem", { lineHeight: "1.75rem", fontWeight: "600" }], // 22px
        "kpi-val": ["1.625rem", { lineHeight: "2rem", fontWeight: "700" }], // 26px
        "body-md": ["0.9375rem", { lineHeight: "1.375rem", fontWeight: "400" }], // 15px
        "body-sm": ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }], // 14px
        "meta": ["0.75rem", { lineHeight: "1rem", fontWeight: "500" }], // 12px
      },
      borderRadius: {
        "sih-sm": "6px",
        "sih-md": "10px",
        "sih-lg": "14px",
        "sih-xl": "16px",
      },
      boxShadow: {
        "sih-subtle": "0 1px 3px 0 rgba(23, 50, 77, 0.05), 0 1px 2px 0 rgba(23, 50, 77, 0.03)",
        "sih-card": "0 2px 8px -2px rgba(23, 50, 77, 0.06), 0 1px 4px -1px rgba(23, 50, 77, 0.04)",
        "sih-dropdown": "0 10px 25px -5px rgba(23, 50, 77, 0.1), 0 8px 10px -6px rgba(23, 50, 77, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
