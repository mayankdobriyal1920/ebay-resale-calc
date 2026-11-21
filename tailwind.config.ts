import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-950": "#063B2B",
        "green-800": "#075E45",
        "green-700": "#087F5B",
        "green-600": "#0A9B68",
        "green-400": "#4ADE9B",
        "green-100": "#DDF8EA",
        surface: "rgba(255,255,255,0.72)",
        "surface-strong": "rgba(255,255,255,0.88)",
        text: "#10251D",
        muted: "#64756D",
        border: "rgba(8,95,67,0.14)",
        danger: "#C0392B",
        warning: "#A16207",
      },
      borderRadius: {
        card: "20px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontVariantNumeric: {
        tabular: "tabular-nums",
      },
    },
  },
  plugins: [],
};

export default config;