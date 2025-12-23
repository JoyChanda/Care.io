"use client";

import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import { Users } from "lucide-react";

export default function Home() {
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
          className="inline-block mb-6 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20 shadow-sm"
        >
          Trusted Care Platform
        </motion.span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-base-content leading-tight mb-8">
          Caring for Your <span className="text-primary italic">Loved Ones</span>,<br className="hidden sm:block" />
          Like They're Truly Our Own
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-base-content/70 leading-relaxed">
          Experience the peace of mind that comes with professional, safe, and reliable baby, elderly, and home care services. We prioritize family first.
        </p>

        <div className="mt-12 flex justify-center gap-4 flex-wrap">
          <button className="btn btn-primary px-10 h-14 text-base font-bold">
            Get Started Now
          </button>
          <button className="btn btn-outline btn-primary px-10 h-14 text-base font-bold bg-transparent">
            Explore Services
          </button>
        </div>
      </motion.section>

      {/* SERVICES */}
      <section className="py-24 border-y border-base-200">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content mb-4">Our Specialized Care Services</h2>
          <p className="max-w-xl mx-auto text-base text-base-content/50 leading-relaxed">
            Tailored solutions designed to provide support, safety, and comfort for every stage of your family's journey.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard title="Baby Care" />
          <ServiceCard title="Elderly Care" />
          <ServiceCard title="Sick Care" />
        </div>
      </section>

      {/* WHY CHOOSE US (Differentiator) */}
      <section className="py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-left text-2xl sm:text-3xl font-bold tracking-tight text-base-content">Why Families Trust <span className="text-primary italic">Care.IO</span></h2>
            <div className="space-y-6 text-left">
              {[
                { title: 'Verified Professionals', desc: 'Every caregiver undergoes rigorous background checks and training.' },
                { title: 'Personalized Plans', desc: 'We tailor our services to meet the specific cultural and emotional needs of your family.' },
                { title: '24/7 Priority Support', desc: 'Our team is always available to ensure your loved ones are safe and happy.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-bold text-xl group-hover:bg-primary group-hover:text-primary-content transition-all">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-base-content mb-1">{item.title}</h4>
                    <p className="text-sm text-base-content/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-tr from-primary/20 to-secondary/10 rounded-[3rem] rotate-3 blur-2xl absolute inset-0 -z-10" />
            <div className="aspect-square bg-base-200 border border-base-300 rounded-[3rem] p-12 flex flex-col justify-center items-center text-center space-y-4">
              <span className="text-primary/20"><Users size={64} /></span>
              <p className="text-xl font-bold italic tracking-tight uppercase">"The care they provided was truly exceptional and professional."</p>
              <span className="text-sm font-bold uppercase tracking-widest text-primary">— Sarah Johnson</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
