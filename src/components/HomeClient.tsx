"use client";

import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { Users, Heart } from "lucide-react";
import Link from "next/link";

export default function HomeClient() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* HERO / BANNER */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative pt-24 pb-32 text-center"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent blur-3xl" />
        
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex mb-6 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20 shadow-sm"
        >
          Trusted Care Platform
        </motion.span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-base-content leading-[1.1] mb-8">
          Caring for Your <span className="text-primary italic">Loved Ones</span>,<br className="hidden sm:block" />
          Like They're Truly Our Own
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-base-content/60 leading-relaxed font-medium">
          Experience the peace of mind that comes with professional, safe, and reliable baby, elderly, and home care services. We prioritize family first.
        </p>

        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <Link href="/login">
            <button className="btn btn-primary px-10 h-16 rounded-2xl text-base font-black shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all">
              Get Started Now
            </button>
          </Link>
          <Link href="/services">
            <button className="btn btn-outline btn-primary px-10 h-16 rounded-2xl text-base font-black border-2 hover:bg-primary/5 transition-all">
              Explore Services
            </button>
          </Link>
        </div>
      </motion.section>

      {/* SERVICES */}
      <section className="py-24 border-y border-base-200">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            <Heart size={12} fill="currentColor" />
            Our Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">Specialized Care Services</h2>
          <p className="max-w-xl mx-auto text-base text-base-content/50 leading-relaxed font-medium">
            Tailored solutions designed to provide support, safety, and comfort for every stage of your family's journey.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard title="Baby Care" />
          <ServiceCard title="Elderly Care" />
          <ServiceCard title="Sick Care" />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
               <h2 className="text-left text-3xl sm:text-4xl font-black tracking-tight text-base-content leading-tight">
                Why Families Trust <br/>
                <span className="text-primary italic underline underline-offset-8 decoration-primary/20">Care.IO</span>
              </h2>
            </div>
            
            <div className="space-y-8 text-left">
              {[
                { title: 'Verified Professionals', desc: 'Every caregiver undergoes rigorous background checks and training.' },
                { title: 'Personalized Plans', desc: 'We tailor our services to meet the specific cultural and emotional needs of your family.' },
                { title: '24/7 Priority Support', desc: 'Our team is always available to ensure your loved ones are safe and happy.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xl group-hover:bg-primary group-hover:text-primary-content transition-all shadow-inner">
                    0{i + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg text-base-content tracking-tight">{item.title}</h4>
                    <p className="text-sm text-base-content/50 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-6 blur-2xl -z-10 group-hover:rotate-3 transition-transform duration-700" />
            <div className="relative bg-base-100 border border-base-200 rounded-[3.5rem] p-12 sm:p-16 shadow-2xl flex flex-col justify-center items-center text-center space-y-8">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                <Users size={40} />
              </div>
              <p className="text-xl sm:text-2xl font-black italic tracking-tight text-base-content leading-relaxed">
                "The care they provided was truly exceptional and professional. Our family felt supported every step of the way."
              </p>
              <div className="space-y-1">
                <span className="block text-sm font-black uppercase tracking-[0.2em] text-primary">— Sarah Johnson</span>
                <span className="block text-xs font-bold text-base-content/30 uppercase tracking-widest">Happy Family Member</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
