import type { Config } from "tailwindcss";

const mainBlue = "#54b2d3";
const blue70 = "#55b1d3b3";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "main-gradient": `linear-gradient(0deg, #fff 80%, rgba(84,178,211,1) 100%)`,
      },
      colors: {
        "main-blue": mainBlue,
        "blue-70": blue70,
      },
      boxShadow: {
        "main-shadow": "0px 4px 16px 0px rgba(0,0,0,0.2)",
      }
    },
  },
  plugins: [],
};
export default config;
