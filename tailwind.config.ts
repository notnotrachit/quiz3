import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark",
      {
        matrix: {
          "primary": "#00ff2b",
          "secondary": "#a5f3fc",
          "accent": "#00ffff",
          "neutral": "#059669",
          "base-100": "#064e3b",
          "info": "#a5f3fc",
          "success": "#86efac",
          "warning": "#fef08a",
          "error": "#fecdd3",
          },
        }
      ],
  },
};
export default config;
