"use client";
import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* HERO / BANNER */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-24 text-center"
      >
        <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
          Trusted Care Platform
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Caring for Your <span className="text-primary">Loved Ones</span>,
          <br className="hidden sm:block" />
          Like Our Own
        </h1>

        <p className="mt-6 text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto">
          Easily book trusted baby care, elderly care, and home care services —
          safe, reliable, and professional.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button className="btn btn-primary px-8">Get Started</button>
          <button className="btn btn-outline px-8">View Services</button>
        </div>
      </motion.section>

      {/* SERVICES */}
      <section className="py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          Our Care Services
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard title="Baby Care" />
          <ServiceCard title="Elderly Care" />
          <ServiceCard title="Sick Care" />
        </div>
      </section>
    </main>
  );
}
