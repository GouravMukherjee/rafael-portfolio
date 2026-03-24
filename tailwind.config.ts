import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          mist:    "#c4d4bb",
          light:   "#b0c2a5",
          DEFAULT: "#89a17d",
          deep:    "#4d6b47",
          dark:    "#2d4a2a",
        },
        pitch: {
          1: "#111410",
          2: "#0a0a0a",
          3: "#000000",
        },
        stone: {
          light:   "#e8e8e6",
          DEFAULT: "#8a8f87",
          dark:    "#555a52",
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
