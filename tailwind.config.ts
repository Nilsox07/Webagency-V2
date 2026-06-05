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
        // Marke: tiefes Navy (Grundfarbe – Header, Footer, dunkle Sektionen, Hero, Logo).
        // 900 = Navy-Basis (#07111F), 700 = Navy hell/Hover (#0F1F33),
        // 600 = mittleres Navy für Primär-Buttons/Links auf Hell (weißer Text lesbar).
        brand: {
          50: "#EEF1F6",
          100: "#D7DEEA",
          200: "#B3C0D6",
          300: "#8497B7",
          400: "#51648A",
          500: "#2C3F60",
          600: "#182B47",
          700: "#0F1F33",
          800: "#0A1626",
          900: "#07111F",
          950: "#04090F",
        },
        // Akzent: Signal-Lime. NUR für Akzente/Haupt-CTA (10%-Regel).
        // WICHTIG: Lime-Flächen IMMER mit Navy-Text (text-brand-900), nie weiß.
        // Lime als Text nur auf Navy. 600 = Lime (#B6FF3B), 700 = Hover (#9BE01F).
        lumi: {
          50: "#F6FFE4",
          100: "#ECFFC8",
          200: "#DCFF98",
          300: "#CCFF68",
          400: "#C0FF48",
          500: "#BBFF40",
          600: "#B6FF3B",
          700: "#9BE01F",
          800: "#79B216",
          900: "#5A8511",
          950: "#324A09",
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
