import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'x-black': '#000000',
        'x-gray': '#536471',
        'x-light-gray': '#cfd9de',
        'x-border': '#eff3f4',
        'x-hover': '#f7f9f9',
        'x-blue': '#1d9bf0',
        'x-blue-hover': '#1a8cd8',
        'x-red': '#f4212e',
        'x-green': '#00ba7c',
      },
    },
  },
  plugins: [],
};

export default config;
