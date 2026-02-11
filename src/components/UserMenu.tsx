"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  LogOut, 
  Calendar, 
  ChevronDown,
  UserCircle,
  Shield
} from "lucide-react";
import toast from "react-hot-toast";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  // If not authenticated, the Navbar will handle not showing this component
  if (!isAuthenticated) return null;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scroll on mobile when dropdown is open
  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    
    if (isOpen && isMobile) {
      // Store original overflow value and scroll position
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
  }, [isOpen]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
    toast.success("Logged out successfully! 👋");
  };

  const menuVariants: any = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.3, 
        ease: "easeOut",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 p-1 px-1.5 rounded-full border transition-all duration-300 ${
          isOpen 
            ? "bg-primary/10 border-primary/30 shadow-md translate-y-[-1px]" 
            : "bg-base-100 border-base-300 hover:border-primary/40 hover:bg-primary/5 shadow-sm active:scale-95"
        }`}
      >
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary/20 transition-all flex-shrink-0">
          {user?.image ? (
            <Image
              src={user.image}
              alt="Avatar"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="font-bold text-sm sm:text-base">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-base-100 rounded-full" />
        </div>
        <ChevronDown 
          size={16} 
          className={`text-base-content/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} 
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="absolute right-0 mt-3 w-72 origin-top-right rounded-[2rem] bg-base-100/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-base-200 overflow-hidden z-[100]"
          >
            {/* Header / User Info */}
            <div className="p-7 text-center bg-gradient-to-b from-primary/5 to-transparent border-b border-base-200/50">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 bg-primary/20 rounded-[1.5rem] rotate-6 animate-pulse" />
                <div className="relative w-20 h-20 rounded-[1.5rem] overflow-hidden shadow-2xl ring-4 ring-base-100 z-10">
                  {user?.image ? (
                    <Image src={user.image} alt="Profile" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-black text-2xl">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-black text-lg text-base-content tracking-tight uppercase">{user?.name}</h3>
                <p className="text-xs text-base-content/40 font-bold tracking-wider">{user?.email}</p>
              </div>
            </div>

            {/* Links */}
            <div className="p-3 space-y-1">
              <DropdownItem 
                variants={itemVariants}
                href="/profile" 
                icon={<UserCircle size={20} className="text-primary" />} 
                label="My Profile" 
                onClick={() => setIsOpen(false)}
              />
              <DropdownItem 
                variants={itemVariants}
                href="/my-bookings" 
                icon={<Calendar size={20} className="text-secondary" />} 
                label="Booking History" 
                onClick={() => setIsOpen(false)}
              />
              {(session?.user as any)?.role === "admin" && (
                <DropdownItem 
                  variants={itemVariants}
                  href="/admin" 
                  icon={<Shield size={20} className="text-error" />} 
                  label="Admin Dashboard" 
                  onClick={() => setIsOpen(false)}
                />
              )}
            </div>

            {/* Footer / Logout */}
            <div className="p-3 pt-0">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-error hover:bg-error/10 transition-all duration-300 group overflow-hidden relative"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error/10 group-hover:bg-error group-hover:text-error-content transition-all duration-300 relative z-10">
                  <LogOut size={20} />
                </div>
                <span className="font-black text-xs uppercase tracking-[0.2em] relative z-10">Sign Out 🚪</span>
                <div className="absolute inset-0 bg-gradient-to-r from-error/0 to-error/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({ href, icon, label, onClick, variants }: any) {
  return (
    <motion.div variants={variants}>
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-primary/5 transition-all group"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-base-200 group-hover:bg-primary/10 transition-all">
          {icon}
        </div>
        <span className="font-bold text-sm tracking-tight text-base-content/80 group-hover:text-primary transition-colors">
          {label}
        </span>
      </Link>
    </motion.div>
  );
}

