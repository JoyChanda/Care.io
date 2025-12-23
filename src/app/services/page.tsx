"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { Search, Sparkles, ShieldCheck, Heart } from "lucide-react";

export default function ServicesPage() {
  const services = ["Baby Care", "Elderly Care", "Sick Care"];

  return (
    <main className="min-h-screen bg-base-100 selection:bg-primary/20">
      {/* Header Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest border border-primary/10"
          >
            <Sparkles size={14} />
            Our Marketplace
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]"
          >
            Professional care for <br />
            <span className="text-primary italic">every family</span> need.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-base-content/50 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Choose from our specialized care services, all provided by verified 
            and compassionate professionals dedicated to your family's safety.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <ServiceCard title={service} />
            </motion.div>
          ))}
        </div>

        {/* Trust Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-10 md:p-16 rounded-[3rem] bg-base-200/50 border border-base-200 flex flex-col md:flex-row items-center gap-12"
        >
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Your safety is our priority</h2>
            <p className="text-lg text-base-content/50 font-medium leading-relaxed">
              Every caregiver on Care.IO passes a multi-step vetting process, 
              including background checks, professional training verification, 
              and personal interviews.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm font-bold opacity-60">
                <Heart size={18} className="text-primary" fill="currentColor" />
                Verified Care
              </div>
              <div className="flex items-center gap-2 text-sm font-bold opacity-60">
                <Search size={18} className="text-primary" />
                Transparent Vetting
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
             <div className="aspect-video rounded-[2rem] bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl absolute inset-0 -z-10 opacity-50" />
             <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-200 shadow-2xl space-y-4">
                <div className="flex items-center gap-4 border-b border-base-200 pb-4">
                   <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="text-primary" size={24} />
                   </div>
                   <div>
                      <p className="font-bold">Trust Badge</p>
                      <p className="text-xs text-base-content/40">Verified Professional</p>
                   </div>
                </div>
                <p className="text-sm italic font-medium text-base-content/60">
                  "The standard for caregiving has been elevated. Care.IO provides 
                  the most reliable professionals I've ever worked with."
                </p>
                <div className="pt-2 text-sm font-bold text-primary italic">
                  — Care.IO Verification Team
                </div>
             </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
