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

  // Prevent background scroll on mobile when sidebar is open
  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    
    if (isMenuOpen && isMobile) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const scrollY = window.scrollY;
      
      // Prevent scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      
      return () => {
        // Restore scroll
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
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
            {/* Left Side: Hamburger + Logo (Mobile) / Logo (Desktop) */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Hamburger: Only visible on mobile/tablet */}
              <button
                className="btn btn-ghost btn-icon rounded-xl lg:!hidden flex items-center justify-center p-0 w-11 h-11 active:scale-90 transition-transform"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Navigation"
              >
                {isMenuOpen ? <X size={26} /> : <SquareMenu size={26} strokeWidth={1.75} />}
              </button>

              {/* Brand Logo & Text */}
              <Link href="/" className="flex items-center gap-1.5 sm:gap-3 group transition-transform active:scale-95">
                <span className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-inner group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
                  <Heart size={16} className="sm:size-5" fill="currentColor" />
                </span>
                <div className="flex flex-col leading-none">
                  <span className="text-base-content font-black text-base sm:text-xl tracking-tight">Care.IO</span>
                  <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] text-primary/70 font-semibold mt-0.5 sm:mt-1">
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

            {/* Right Side: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-2">
                {status === "authenticated" ? (
                  <UserMenu />
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="hidden lg:inline-flex btn btn-ghost btn-sm px-4 font-bold rounded-xl"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="btn btn-primary btn-sm sm:btn-md px-5 sm:px-8 h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-primary/20 whitespace-nowrap flex items-center justify-center"
                    >
                      Join Us
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