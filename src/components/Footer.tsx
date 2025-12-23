"use client";

import Link from "next/link";
import { Heart, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

            {/* Social Links - MODERN X LOGO via Lucide */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              {[
                { label: 'Facebook', Icon: Facebook },
                { label: 'X', Icon: Twitter },
                { label: 'Instagram', Icon: Instagram }
              ].map((social) => (
                <button
                  key={social.label}
                  className="btn-icon w-10 h-10 flex items-center justify-center rounded-xl bg-base-200 hover:bg-primary/10 hover:text-primary transition-all shadow-sm"
                  aria-label={social.label}
                >
                  <social.Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <h4 className="font-bold text-base tracking-tight">Company</h4>
            <nav className="flex flex-col items-center md:items-start gap-3">
              {["About Us", "Our Team", "Careers", "Contact"].map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="text-sm text-base-content/60 hover:text-primary transition-colors hover:translate-x-1 transition-transform inline-block"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <h4 className="font-bold text-base tracking-tight">Services</h4>
            <nav className="flex flex-col items-center md:items-start gap-3">
              {["Baby Care", "Elderly Care", "Sick Care", "House Keeping"].map(
                (link) => (
                  <Link
                    key={link}
                    href="#"
                    className="text-sm text-base-content/60 hover:text-primary transition-colors hover:translate-x-1 transition-transform inline-block"
                  >
                    {link}
                  </Link>
                )
              )}
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
