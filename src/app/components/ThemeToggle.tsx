"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      type="button"
      className={`relative w-16 h-8 flex items-center rounded-full px-1 transition-colors duration-300 focus:outline-none shadow-md ${
        isDark ? "bg-base-300" : "bg-base-200"
      }`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* Sun emoji */}
      <span className="absolute left-2 text-lg select-none">🌞</span>
      {/* Moon emoji */}
      <span className="absolute right-2 text-lg select-none">🌙</span>
      {/* Sliding circle */}
      <span
        className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-base-100 shadow-md transform transition-transform duration-300 flex items-center justify-center text-xl ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {/* Optionally, add a subtle shadow or border for the circle */}
      </span>
    </button>
  );
}
