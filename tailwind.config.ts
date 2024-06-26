import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "dark-green": "#3A4D49",
        // pink: "#E7A0A2",
        // "bright-pink": "#EB2E69",
        // "light-pink": "#F2C2CB",
        // yellow: "#E79F34",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        pulse: {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.2)" },
          "60%": { transform: "scale(1)" },
        },
      },
      animation: {
        pulse: "pulse 0.6s 0.3s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
