import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust paths based on your project structure
  ],
theme: {
  extend: {
    colors: {
      bg: "hsl(var(--bg))",
      card: "hsl(var(--card))",
      text: "hsl(var(--text))",
      muted: "hsl(var(--muted))",
      primary: "hsl(var(--primary))",
      success: "hsl(var(--success))",
      warning: "hsl(var(--warning))",
      danger: "hsl(var(--danger))",
    },
    borderRadius: { xl: "1rem", '2xl': "1.25rem" },
    boxShadow: { card: "0 8px 24px rgba(0,0,0,.08)" }
  }
},
plugins: [],
};

export default config;