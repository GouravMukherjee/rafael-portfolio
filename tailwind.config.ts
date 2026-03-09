import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          1: "#DAD7CD",
          2: "#A3B18A",
          3: "#588157",
          4: "#3A5A40",
          5: "#344E41",
        },
        midnight: {
          1: "#0D1B2A",
          2: "#1B263B",
          3: "#415A77",
          4: "#778DA9",
          5: "#E0E1DD",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
      },
      animation: {
        "marquee":      "marqueeScroll 18s linear infinite",
        "grain":        "grain 0.8s steps(2) infinite",
        "grid-shift":   "gridShift 20s linear infinite",
        "scroll-pulse": "scrollPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
