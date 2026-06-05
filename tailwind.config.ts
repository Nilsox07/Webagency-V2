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
        // Marke: tiefes Petrol/Teal (Struktur, Primär, Sekundär) – WCAG-AA-geprüft
        // 600 = Petrol (#0E5C63, primär), 700 = Petrol dunkel (#0A444A, hover),
        // 500 = Teal hell (#1A8C94, sekundär)
        brand: {
          50: "#ECF6F6",
          100: "#D2E9EA",
          200: "#A8D4D6",
          300: "#74B9BD",
          400: "#3DA1A8",
          500: "#1A8C94",
          600: "#0E5C63",
          700: "#0A444A",
          800: "#093A3F",
          900: "#082F33",
          950: "#03191B",
        },
        // Akzent: warme Koralle – NUR für CTAs / wichtigste Hinweise (10%-Regel).
        // 600 = Koralle (#E55340), 700 = Koralle dunkel (#C9402F, hover)
        lumi: {
          50: "#FDEEEB",
          100: "#FBD9D3",
          200: "#F6B7AC",
          300: "#F0907F",
          400: "#EB6E59",
          500: "#E85D49",
          600: "#E55340",
          700: "#C9402F",
          800: "#A5341F",
          900: "#87291A",
          950: "#4A130B",
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
