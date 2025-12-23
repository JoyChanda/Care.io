"use client";

import Link from "next/link";
import ThemeToggle from "../app/components/ThemeToggle";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to elevate navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-base-100/90 backdrop-blur-xl shadow-lg"
            : "bg-base-100/80 backdrop-blur-md shadow-sm"
        } border-b border-base-200/70 dark:border-base-300/30`}
        aria-label="Primary"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            {/* Brand + Mobile trigger */}
            <div className="flex items-center gap-3">
              <button
                className="btn btn-ghost btn-circle lg:hidden hover:bg-base-200/70"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>

              <Link
                href="/"
                className="flex items-center gap-3 font-bold text-xl sm:text-2xl hover:opacity-90 transition"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 text-primary text-xl shadow-inner">
                  💙
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-base-content">Care.IO</span>
                  <span className="text-xs text-base-content/60">
                    Care that feels like family
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <ul className="flex items-center gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="px-3 py-2 text-sm font-medium rounded-full hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Link
                href="/login"
                className="hidden sm:inline-flex btn btn-ghost btn-sm px-4 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-primary btn-sm px-4 font-semibold shadow-md hover:shadow-lg"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[80vw] bg-base-100 shadow-2xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-5 py-4 border-b border-base-200/70">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary text-lg">
                  💙
                </span>
                <span className="font-semibold text-lg">Care.IO</span>
              </div>
              <button
                onClick={closeMenu}
                className="btn btn-ghost btn-circle btn-sm"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <ul className="menu menu-lg px-4 py-6 space-y-2 flex-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 font-medium hover:bg-primary/10"
                  >
                    <span className="text-lg">•</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="px-4 pb-6 space-y-2 border-t border-base-200/70 pt-4">
              <Link
                href="/login"
                onClick={closeMenu}
                className="btn btn-outline btn-block"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={closeMenu}
                className="btn btn-primary btn-block"
              >
                Register
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
