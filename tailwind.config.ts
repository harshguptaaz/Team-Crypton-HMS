import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1769E0",
          bright: "#2587FF",
          light: "#EAF3FF",
        },
        navy: "#0B1F3A",
        surface: {
          bg: "#F5F9FF",
          border: "#DCE8F5",
        },
      },
    },
  },
  plugins: [],
};
export default config;
