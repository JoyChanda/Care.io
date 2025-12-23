"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-16 h-8" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      role="switch"
      aria-checked={isDark}
      data-state={isDark ? "checked" : "unchecked"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`toggle-pill relative w-16 h-8 rounded-full flex items-center transition-colors duration-300
        ${isDark ? "bg-primary" : "bg-base-300"}
      `}
    >
      {/* Sliding Thumb */}
      <span
        className={`absolute w-6 h-6 rounded-full bg-base-100 shadow-xl
          flex items-center justify-center
          transition-transform duration-300 ease-out
          ${isDark ? "translate-x-9" : "translate-x-1"}
        `}
      >
        {isDark ? (
          <Moon size={14} className="text-primary" />
        ) : (
          <Sun size={14} className="text-primary" />
        )}
      </span>
    </button>
  );
}
