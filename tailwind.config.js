/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // Healthcare-inspired light theme
      {
        light: {
          primary: "#4f46e5",
          "primary-content": "#ffffff",
          "base-100": "#f9fafb",
          "base-200": "#e5e7eb",
          "base-300": "#d1d5db",
          "rounded-box": "1.25rem",
          "rounded-btn": "0.75rem",
          "rounded-badge": "9999px",
        },
      },
      // Calm, low-contrast dark theme
      {
        dark: {
          primary: "#a5b4fc",
          "primary-content": "#020617",
          "base-100": "#020617",
          "base-200": "#020617",
          "base-300": "#1f2937",
          "rounded-box": "1.25rem",
          "rounded-btn": "0.75rem",
          "rounded-badge": "9999px",
        },
      },
    ],
    darkTheme: "dark",
  },
};
