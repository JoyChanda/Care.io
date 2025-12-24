"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  // Use state to avoid hydration mismatch
  const [currentYear, setCurrentYear] = useState(2025);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-base-100 border-t border-base-200 overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <Link href="/" className="flex items-center gap-3 w-fit group md:mx-0 mx-auto">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-inner group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <Heart size={20} fill="currentColor" />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-base-content font-bold text-xl tracking-tight">
                  Care.IO
                </span>
                <span className="text-[10px] uppercase tracking-widest text-base-content/50 font-semibold italic">
                  Family-First Care
                </span>
              </div>
            </Link>

            <p className="text-sm text-base-content/60 leading-relaxed max-w-[260px] mx-auto md:mx-0">
              Providing compassionate and professional caregiving services for
              families who value safety, reliability, and peace of mind.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg text-primary hover:text-primary-content hover:bg-primary transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* X (Twitter) */}
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg text-primary hover:text-primary-content hover:bg-primary transition-all duration-200 hover:scale-110"
                aria-label="X"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg text-primary hover:text-primary-content hover:bg-primary transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg text-primary hover:text-primary-content hover:bg-primary transition-all duration-200 hover:scale-110"
                aria-label="YouTube"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <h4 className="font-bold text-base tracking-tight">Company</h4>
            <nav className="flex flex-col items-center md:items-start gap-3">
              <Link
                href="/about"
                className="text-sm text-base-content/60 hover:text-primary transition-colors hover:translate-x-1 transition-transform inline-block"
              >
                About Us
              </Link>
              <Link
                href="/our-team"
                className="text-sm text-base-content/60 hover:text-primary transition-colors hover:translate-x-1 transition-transform inline-block"
              >
                Our Team
              </Link>
              <Link
                href="/contact"
                className="text-sm text-base-content/60 hover:text-primary transition-colors hover:translate-x-1 transition-transform inline-block"
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className="text-sm text-base-content/60 hover:text-primary transition-colors hover:translate-x-1 transition-transform inline-block"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <h4 className="font-bold text-base tracking-tight">Services</h4>
            <nav className="flex flex-col items-center md:items-start gap-3">
              <Link
                href="/services/baby-care"
                className="text-sm text-base-content/60 hover:text-primary transition-colors hover:translate-x-1 transition-transform inline-block"
              >
                Baby Care
              </Link>
              <Link
                href="/services/elderly-care"
                className="text-sm text-base-content/60 hover:text-primary transition-colors hover:translate-x-1 transition-transform inline-block"
              >
                Elderly Care
              </Link>
              <Link
                href="/services/sick-care"
                className="text-sm text-base-content/60 hover:text-primary transition-colors hover:translate-x-1 transition-transform inline-block"
              >
                Sick Care
              </Link>
              <Link
                href="/services"
                className="text-sm text-base-content/60 hover:text-primary transition-colors hover:translate-x-1 transition-transform inline-block"
              >
                All Services
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <h4 className="font-bold text-base tracking-tight">Contact</h4>
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex flex-col items-center md:flex-row md:items-start gap-3">
                <span className="text-primary mt-0.5 px-1 font-bold">
                  <MapPin size={18} />
                </span>
                <p className="text-sm text-base-content/60">
                  123 Care Street, Analytics Ave
                  <br />
                  Careland, CA 90210
                </p>
              </div>
              <div className="flex flex-col items-center md:flex-row md:items-start gap-3">
                <span className="text-primary mt-0.5 px-1 font-bold">
                  <Phone size={18} />
                </span>
                <p className="text-sm text-base-content/60">
                  +1 (555) 000-0000
                </p>
              </div>
              <div className="flex flex-col items-center md:flex-row md:items-start gap-3">
                <span className="text-primary mt-0.5 px-1 font-bold">
                  <Mail size={18} />
                </span>
                <p className="text-sm text-base-content/60">support@care.io</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-base-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-base-content/50">
          <p>
            © {currentYear} Care.IO — Caring for your world. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
