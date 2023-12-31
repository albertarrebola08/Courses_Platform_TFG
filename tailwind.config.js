// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", "./node_modules/pol-ui/src/**/*.{js,ts,jsx,tsx}"],

  plugins: [nextui()],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F2A97E",
          50: "#FEF9F6",
          100: "#FDF3ED",
          200: "#FCEBDE",
          300: "#FBE3CE",
          400: "#F9D2AF",
          500: "#F2A97E",
          600: "#D08F6A",
          700: "#A97856",
          800: "#7E6042",
          900: "#654D35",
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
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      rotate: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      "fade-in": "fadeIn 200ms ease-in-out",
      rotate: "rotate 1s linear infinite",
    },
  },
};
