import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sfpro: ["var(--font-sfpro)"],
        mont: ["var(--font-mont)"],
        pacifico: ["var(--font-pacifico)"],
      },
      colors: {
        primary: "#b71c1c",
        dark: "#3a3a3a",
        light: "#fafafa",
        warning: "#cc0000",
        "gray-fill": "#ebebeb",
      },
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [],
};
export default config;
