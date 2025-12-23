"use client";
import { ThemeProvider } from "next-themes";

export default function ThemeProviders({ children }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
