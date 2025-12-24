"use client";

import { Heart, SquareMenu, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../app/components/ThemeToggle";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import UserMenu from "./UserMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const authenticatedNavLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/profile", label: "Profile" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-base-100/90 backdrop-blur-xl shadow-sm border-b border-base-200"
            : "bg-transparent py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            {/* Brand + Mobile trigger */}
            <div className="flex items-center gap-4">
              <button
                className="btn btn-ghost btn-icon rounded-xl lg:!hidden flex items-center justify-center p-0 w-10 h-10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Navigation"
              >
                {isMenuOpen ? <X size={24} /> : <SquareMenu size={24} strokeWidth={1.75} />}
              </button>

              <Link href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-inner group-hover:bg-primary group-hover:text-primary-content transition-colors">
                  <Heart size={20} fill="currentColor" />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-base-content font-bold text-lg sm:text-xl tracking-tight">Care.IO</span>
                  <span className="text-[10px] uppercase tracking-widest text-base-content/50 font-semibold">
                    Trusted Care System
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {(status === "authenticated" ? authenticatedNavLinks : navLinks).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium rounded-xl hover:text-primary hover:bg-primary/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <ThemeToggle />
              <div className="flex items-center gap-2">
                {status === "authenticated" ? (
                  <UserMenu />
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="hidden md:inline-flex btn btn-ghost btn-sm px-4 font-bold rounded-xl"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="btn btn-primary btn-sm sm:btn-md px-6 font-black rounded-2xl shadow-lg shadow-primary/20"
                    >
                      Join
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-neutral/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-[300px] bg-base-100 border-r border-base-200 shadow-2xl transition-transform duration-300 ease-out flex flex-col z-[70] ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ backgroundColor: 'hsl(var(--b1))' }}
        >
          <div className="flex items-center justify-between p-6 border-b border-base-200 bg-base-100" style={{ backgroundColor: 'hsl(var(--b1))' }}>
             <div className="flex items-center gap-3">
               <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                 <Heart size={18} fill="currentColor" />
               </span>
               <span className="font-bold text-lg">Care.IO</span>
             </div>
             <button onClick={closeMenu} className="btn btn-ghost rounded-xl btn-sm flex items-center justify-center">
                <X size={20} />
             </button>
          </div>
          
          <div className="px-4 py-6 flex-grow overflow-y-auto bg-base-100" style={{ backgroundColor: 'hsl(var(--b1))' }}>
             <div className="flex items-center justify-start px-4 mb-6 sm:hidden">
               <ThemeToggle />
             </div>
             
             <nav className="flex flex-col gap-2">
                {(status === "authenticated" ? authenticatedNavLinks : navLinks).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center px-4 py-3 rounded-2xl text-base font-medium hover:bg-primary/5 hover:text-primary transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
             </nav>
          </div>

          <div className="p-6 border-t border-base-200 bg-base-100" style={{ backgroundColor: 'hsl(var(--b1))' }}>
             <div className="grid grid-cols-2 gap-3">
               {status === "authenticated" ? (
                 <button 
                  onClick={() => { 
                    signOut(); 
                    closeMenu();
                    toast.success("You have been logged out successfully.");
                  }} 
                  className="btn btn-outline btn-block rounded-xl border-error text-error hover:bg-error/10 col-span-2"
                >
                  Logout
                </button>
               ) : (
                 <>
                  <Link href="/login" onClick={closeMenu} className="btn btn-outline btn-block rounded-xl">Login</Link>
                  <Link href="/register" onClick={closeMenu} className="btn btn-primary btn-block rounded-xl">Join</Link>
                 </>
               )}
             </div>
          </div>
        </aside>
      </div>
    </>
  );
}
