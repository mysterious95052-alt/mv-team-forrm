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
        background: "#0a0a0a",
        "secondary-bg": "#111111",
        accent: "#00e5ff",
        border: "#27272a",
        "primary-text": "#ffffff",
        "secondary-text": "#a1a1aa",
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 229, 255, 0.5)',
        'glow-lg': '0 0 30px rgba(0, 229, 255, 0.8)',
      }
    },
  },
  plugins: [],
};
export default config;
