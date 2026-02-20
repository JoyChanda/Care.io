"use client";

import { 
  Heart, 
  LayoutDashboard, 
  CreditCard, 
  Users, 
  Activity, 
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/payment-history", label: "Payments", icon: CreditCard },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/system-health", label: "System Health", icon: Activity },
  { href: "#", label: "Settings", icon: Settings, disabled: true },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    toast.success("Admin session ended.");
  };

  return (
    <nav 
      className={`sticky top-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? "bg-base-100/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-b border-base-200" 
          : "bg-base-100 py-2 border-b border-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="flex h-20 items-center justify-between gap-8">
          
          {/* Brand/Logo Section */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform">
              <div className="h-11 w-11 rounded-2xl bg-primary flex items-center justify-center text-primary-content shadow-lg shadow-primary/20">
                <Heart size={22} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none">Care.IO</span>
                <span className="text-[10px] uppercase tracking-widest font-black text-primary/60 mt-0.5">Admin Console</span>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-1 bg-base-200/50 p-1.5 rounded-[1.25rem] border border-base-300/50">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    link.disabled 
                      ? "opacity-40 cursor-not-allowed" 
                      : isActive 
                        ? "bg-base-100 text-primary shadow-sm" 
                        : "text-base-content/50 hover:text-base-content hover:bg-base-100/50"
                  }`}
                >
                  <link.icon size={18} />
                  {link.label}
                  {link.disabled && <span className="text-[8px] uppercase px-1.5 py-0.5 bg-base-300 rounded text-base-content/60">Soon</span>}
                </Link>
              );
            })}
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 relative group w-64 mr-2">
              <Search className="absolute left-4 text-base-content/30" size={18} />
              <input 
                type="text" 
                placeholder="Global admin search..." 
                className="w-full bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary/30 rounded-2xl pl-12 pr-4 py-2.5 text-sm font-medium transition-all"
              />
            </div>

            <div className="h-10 w-10 btn btn-circle btn-ghost text-base-content/60 hover:text-primary hover:bg-primary/10">
              <Bell size={20} />
            </div>

            <div className="h-10 w-10 flex items-center justify-center">
              <ThemeToggle />
            </div>

            <div className="h-10 w-[1px] bg-base-300 mx-2 hidden sm:block" />

            <button 
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 btn btn-ghost hover:bg-rose-500/10 hover:text-rose-600 rounded-2xl px-5 text-base-content/60"
            >
              <LogOut size={18} />
              <span className="font-bold text-xs uppercase tracking-widest">Logout</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="xl:hidden btn btn-ghost btn-circle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden absolute top-full left-4 right-4 bg-base-100 rounded-[2rem] border border-base-200 p-6 shadow-2xl z-[101] mt-2 space-y-2"
          >
             {adminLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-2xl text-base font-bold ${
                    pathname === link.href ? "bg-primary/10 text-primary" : "text-base-content/60 hover:bg-base-200/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <link.icon size={20} />
                    {link.label}
                  </div>
                  {link.disabled && <span className="text-[10px] tracking-widest bg-base-200 px-2 py-1 rounded">SOON</span>}
                </Link>
             ))}
             <div className="h-[1px] bg-base-200 my-4" />
             <button 
               onClick={handleLogout}
               className="flex items-center gap-4 p-4 w-full rounded-2xl text-rose-500 font-bold hover:bg-rose-50"
             >
               <LogOut size={20} />
               Logout Session
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
