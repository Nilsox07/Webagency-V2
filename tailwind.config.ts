import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Marke: vertrauensvolles Tiefblau (Transparenz/Seriosität)
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#bcd3ff",
          300: "#8eb6ff",
          400: "#598cff",
          500: "#3563f6",
          600: "#1f43eb",
          700: "#1832d8",
          800: "#1a2caf",
          900: "#1c2c8a",
          950: "#151c54",
        },
        // Lumi: eigene, klar unterscheidbare Akzentfarbe (Violett/Teal-Mix)
        lumi: {
          50: "#f3f1ff",
          100: "#e9e5ff",
          200: "#d5ceff",
          300: "#b7a8ff",
          400: "#9478ff",
          500: "#7c4dff",
          600: "#6f31f7",
          700: "#5f1fe0",
          800: "#4f1bbc",
          900: "#421a99",
          950: "#280f66",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
