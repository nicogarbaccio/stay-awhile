import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0C8346",
        "dark": "#0D5D56",
        "shamrock": "329f5b",
        "celadon": "#8FD5A6"
      },
    },
  },
  plugins: [],
};
export default config;
