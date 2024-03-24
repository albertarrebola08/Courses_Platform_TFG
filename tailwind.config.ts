// tailwind.config.js
const { nextui } = require("@nextui-org/react");

import { poluiPlugin } from "pol-ui";
import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/pol-ui/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [
    poluiPlugin({
      colors: {
        primary: {
          50: "#fff5e6",
          100: "#ffdfb0",
          200: "#ffd08a",
          300: "#ffbb54",
          400: "#ffad33",
          500: "#ff9900",
          600: "#e88b00",
          700: "#b56d00",
          800: "#8c5400",
          900: "#6b4000",
        },
      },
    }),
    nextui(),
  ],
};

export default config;
