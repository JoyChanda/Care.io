/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#4f46e5",
          "secondary": "#7c3aed",
          "accent": "#0ea5e9",
          "neutral": "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#f1f5f9",
          "base-content": "#0f172a",
          "rounded-box": "1.5rem",
          "rounded-btn": "0.75rem",
          "rounded-badge": "9999px",
        },
      },
      {
        dark: {
          "primary": "#a5b4fc",
          "secondary": "#c4b5fd",
          "accent": "#7dd3fc",
          "neutral": "#f8fafc",
          "base-100": "#020617",
          "base-200": "#0f172a",
          "base-300": "#1e293b",
          "base-content": "#f8fafc",
          "rounded-box": "1.5rem",
          "rounded-btn": "0.75rem",
          "rounded-badge": "9999px",
        },
      },
    ],
    darkTheme: "dark",
  },
};
