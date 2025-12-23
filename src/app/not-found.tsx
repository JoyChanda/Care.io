"use client";

import Link from "next/link";
import { 
  Heart, 
  ArrowLeft, 
  Home, 
  Search, 
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen relative flex items-center justify-center py-12 px-4 overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
        {/* Floating 404 Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block"
        >
          <span className="text-[12rem] sm:text-[18rem] font-black leading-none tracking-tighter text-base-content/5 selection:bg-primary/20">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="h-32 w-32 sm:h-40 sm:w-40 rounded-[2.5rem] bg-base-100 shadow-2xl border border-base-200 flex items-center justify-center text-primary relative"
            >
              <Heart size={64} fill="currentColor" className="opacity-20 absolute" />
              <Search size={48} strokeWidth={2.5} className="relative z-10" />
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-error/10 text-error text-xs font-black uppercase tracking-widest border border-error/20">
            <AlertCircle size={14} />
            Page Not Found
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Lost in the <span className="text-primary italic">Right place</span>?
          </h1>
          <p className="text-lg text-base-content/50 max-w-lg mx-auto font-medium leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Navigation Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link href="/">
            <button className="btn btn-primary btn-lg px-8 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all font-bold gap-3 group h-16 w-full sm:w-auto">
              <Home size={20} />
              Return Home
              <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/contact">
            <button className="btn btn-ghost btn-lg px-8 rounded-2xl border-base-300 hover:bg-base-200 transition-all font-bold gap-3 h-16 w-full sm:w-auto">
              <HelpCircle size={20} />
              Contact Support
            </button>
          </Link>
        </motion.div>

        {/* Decorative footer text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-12 text-[10px] font-black uppercase tracking-[0.4em] text-base-content/20"
        >
          Care.IO Trust & Safety System
        </motion.p>
      </div>
    </main>
  );
}
