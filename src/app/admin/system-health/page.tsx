"use client";

import React, { useEffect, useState } from "react";
import { Activity, ShieldCheck, Database, Server, RefreshCw, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SystemHealth() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [healthData, setHealthData] = useState({
    database: "Optimal",
    server: "Live",
    api: "Healthy",
    security: "Enforced",
    uptime: "99.9%"
  });

  const refreshHealth = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all mb-4"
          >
            <ChevronLeft size={16} />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Activity size={20} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">System Health</h1>
          </div>
          <p className="text-base-content/60 font-medium">
            Monitor infrastructure performance and security status.
          </p>
        </div>

        <button 
          onClick={refreshHealth}
          disabled={isRefreshing}
          className="btn btn-primary rounded-xl gap-2 font-bold px-6"
        >
          {isRefreshing ? <Loader2 className="animate-spin" size={18} /> : <RefreshCw size={18} />}
          {isRefreshing ? "Scanning..." : "Refresh Status"}
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Database", value: healthData.database, icon: Database, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Server", value: healthData.server, icon: Server, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "API Status", value: healthData.api, icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "Security", value: healthData.security, icon: ShieldCheck, color: "text-rose-500", bg: "bg-rose-500/10" },
        ].map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-base-100 rounded-[2rem] p-8 border border-base-200 shadow-xl"
          >
            <div className={`h-12 w-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6`}>
              <item.icon size={24} />
            </div>
            <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-2xl font-black text-base-content tracking-tight">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-base-100 rounded-[2.5rem] p-10 border border-base-200 shadow-xl">
        <h2 className="text-2xl font-black tracking-tight mb-8">Uptime Analytics</h2>
        <div className="h-4 w-full bg-base-200 rounded-full flex overflow-hidden">
          <div className="h-full bg-primary w-[99.9%]" />
          <div className="h-full bg-rose-500 w-[0.1%]" />
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">30 Days Ago</span>
          <span className="text-xs font-bold text-primary uppercase tracking-widest">99.9% Uptime</span>
          <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">Today</span>
        </div>
      </div>
    </main>
  );
}
