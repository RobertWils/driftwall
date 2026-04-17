import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060F1C",
          900: "#0A1628",
          800: "#0F1F38",
          700: "#152A47",
        },
        teal: {
          DEFAULT: "#00D4FF",
          glow: "#33DDFF",
          dim: "#0099BB",
        },
        danger: {
          DEFAULT: "#FF4D6D",
          dim: "#CC3D57",
        },
        warn: {
          DEFAULT: "#FFB84D",
        },
        ok: {
          DEFAULT: "#4ADE80",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-teal":
          "radial-gradient(ellipse at top, rgba(0,212,255,0.15), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(0,212,255,0.45)",
        "glow-sm": "0 0 20px -6px rgba(0,212,255,0.35)",
        danger: "0 0 40px -10px rgba(255,77,109,0.45)",
      },
      keyframes: {
        pulseRing: {
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blink: {
          "0%,50%": { opacity: "1" },
          "51%,100%": { opacity: "0" },
        },
      },
      animation: {
        pulseRing: "pulseRing 2.4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
