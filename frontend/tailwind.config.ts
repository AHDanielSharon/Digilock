import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: "#7C3AED",
        cyber: "#06B6D4"
      }
    }
  },
  plugins: []
};

export default config;
