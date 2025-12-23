"use client";

import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
}

export default function ServiceCard({ title }: ServiceCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary/50 transition-colors"
    >
      <div className="card-body items-center text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-2xl">
           {title.includes("Baby") ? "👶" : title.includes("Elderly") ? "🧓" : title.includes("Sick") ? "🏥" : "✨"}
        </div>
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-base-content/70">
          Professional {title.toLowerCase()} services tailored to fit your specific family needs with care and compassion.
        </p>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm btn-outline">View Details</button>
        </div>
      </div>
    </motion.div>
  );
}
