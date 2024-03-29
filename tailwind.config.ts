// tailwind.config.js
const { nextui } = require("@nextui-org/react");

import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/pol-ui/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [nextui()],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#B49CFF",
          50: "#F9F7FE",
          100: "#F3F0FD",
          200: "#EAE4FC",
          300: "#E0D8FB",
          400: "#D7CCFA",
          500: "#B49CFF",
          600: "#9B7DE6",
          700: "#816ECB",
          800: "#675FAF",
          900: "#4D5094",
        },
        secondary: {
          DEFAULT: "#BFBFBF",
          50: "#F6F6F6",
          100: "#EDEDED",
          200: "#E4E4E4",
          300: "#DBDBDB",
          400: "#D2D2D2",
          500: "#BFBFBF",
          600: "#A6A6A6",
          700: "#8D8D8D",
          800: "#747474",
          900: "#5B5B5B",
        },
        error: {
          DEFAULT: "#F44336",
          50: "#FEF5F5",
          100: "#FEEEEE",
          200: "#FCD6D6",
          300: "#FBBCBC",
          400: "#F9A2A2",
          500: "#F44336",
          600: "#D23C30",
          700: "#A83228",
          800: "#7E281F",
          900: "#651E18",
        },
        success: {
          DEFAULT: "#4CAF50",
          50: "#F5FDF6",
          100: "#ECFAED",
          200: "#D8F5D5",
          300: "#C4F0BC",
          400: "#B0EBA4",
          500: "#4CAF50",
          600: "#42A347",
          700: "#378B3B",
          800: "#2C7230",
          900: "#225926",
        },
        warning: {
          DEFAULT: "#FFC107",
          50: "#FFFDF6",
          100: "#FFFCEC",
          200: "#FFF9D4",
          300: "#FFF6BB",
          400: "#FFF3A2",
          500: "#FFC107",
          600: "#DBA006",
          700: "#B78A05",
          800: "#936404",
          900: "#784F03",
        },
        info: {
          DEFAULT: "#2196F3",
          50: "#F5F9FE",
          100: "#EBF3FD",
          200: "#CDE1FA",
          300: "#AFCFF7",
          400: "#71ABF1",
          500: "#2196F3",
          600: "#1E87DA",
          700: "#196FA9",
          800: "#145678",
          900: "#0F4251",
        },
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        rotate360: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "fade-in": "fadeIn 200ms ease-in-out",
        "rotate-360": "rotate360 1s linear infinite",
      },
    },
  },
};

export default config;
