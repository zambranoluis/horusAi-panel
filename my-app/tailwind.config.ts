import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arial: ["Arial", "sans-serif"],
        brownPro: ["BrownPro", "sans-serif"],
        mont: ["Mont", "sans-serif"],
        myriadPro: ["MyriadPro", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "",
        foreground: "",
        primary: "#67664c",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
