"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-base-200/70 to-base-100 dark:from-slate-900 dark:to-slate-950 text-base-content border-t border-base-200/60 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand Section */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-3 justify-center sm:justify-start mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary text-xl shadow-inner">
                💙
              </span>
              <span className="font-bold text-xl text-base-content">Care.IO</span>
            </div>
            <p className="text-sm text-base-content/60 text-center sm:text-left">
              Compassionate care and support
            </p>
            <p className="text-sm text-base-content/70 leading-relaxed max-w-sm mt-3 text-center sm:text-left">
              Professional caregiving assistance built for families who need reliable baby, elderly, and sick care services.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 mt-4 justify-center sm:justify-start">
              {/* Facebook */}
              <button
                className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              {/* Twitter/X */}
              <button
                className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>

              {/* Instagram */}
              <button
                className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="font-semibold text-base text-base-content mb-4">
              Our Services
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-lg">👶</span>
                <Link
                  href="/services/baby-care"
                  className="text-sm text-base-content/70 hover:text-primary transition-colors group flex items-center gap-1"
                >
                  Baby Care
                  <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-lg">👴</span>
                <Link
                  href="/services/elderly-care"
                  className="text-sm text-base-content/70 hover:text-primary transition-colors group flex items-center gap-1"
                >
                  Elderly Care
                  <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-lg">🏥</span>
                <Link
                  href="/services/sick-care"
                  className="text-sm text-base-content/70 hover:text-primary transition-colors group flex items-center gap-1"
                >
                  Sick Care
                  <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-semibold text-base text-base-content mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-lg">🏠</span>
                <Link
                  href="/"
                  className="text-sm text-base-content/70 hover:text-primary transition-colors group flex items-center gap-1"
                >
                  Home
                  <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-lg">ℹ️</span>
                <Link
                  href="/about"
                  className="text-sm text-base-content/70 hover:text-primary transition-colors group flex items-center gap-1"
                >
                  About Us
                  <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-lg">📞</span>
                <Link
                  href="/contact"
                  className="text-sm text-base-content/70 hover:text-primary transition-colors group flex items-center gap-1"
                >
                  Contact
                  <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-base text-base-content mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-lg">📍</span>
                <span className="text-sm text-base-content/70">
                  123 Care Street, <br className="hidden sm:block" />
                  City, Country
                </span>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-lg">📧</span>
                <a
                  href="mailto:support@care.io"
                  className="text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  support@care.io
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-lg">📞</span>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <span className="text-lg">🚨</span>
                <a
                  href="tel:911"
                  className="text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  Emergency: 911
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-base-200/70 dark:border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/60">
          <p className="text-center sm:text-left">
            © {currentYear} Care.IO. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
