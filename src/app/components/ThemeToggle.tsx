"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="btn btn-ghost btn-circle" aria-hidden />;
  }

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={resolvedTheme === "dark"}
      title="Toggle theme"
      className={`relative inline-flex items-center w-14 h-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        resolvedTheme === "dark" ? "bg-indigo-600" : "bg-yellow-300"
      }`}
    >
      {/* Sun icon (left) */}
      <span className="absolute left-1.5 text-xs text-white/90">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36l-1.42-1.42M7.05 6.34L5.63 4.92"
          />
        </svg>
      </span>

      {/* Knob */}
      <span
        className={`relative block w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
          resolvedTheme === "dark" ? "translate-x-6" : "translate-x-1"
        }`}
      >
        {/* small inner icon to match knob */}
        <span className="absolute inset-0 flex items-center justify-center">
          {resolvedTheme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-indigo-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-yellow-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
          )}
        </span>
      </span>

      {/* Moon icon (right) */}
      <span className="absolute right-1.5 text-xs text-white/90">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      </span>
    </button>
  );
}
