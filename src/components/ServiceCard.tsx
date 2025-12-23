"use client";

import { motion } from "framer-motion";
import { Baby, Accessibility, Stethoscope, Sparkles } from "lucide-react";

interface ServiceCardProps {
  title: string;
}

const descriptions: Record<string, string> = {
  "Baby Care": "Nurturing and safe environment for your little ones, provided by certified specialists.",
  "Elderly Care": "Compassionate daily assistance and companionship to ensure dignity and comfort for seniors.",
  "Sick Care": "Dedicated medical support and personalized attention to help your loved ones recover faster.",
};

const iconMap: Record<string, any> = {
  "Baby Care": Baby,
  "Elderly Care": Accessibility,
  "Sick Care": Stethoscope,
};

export default function ServiceCard({ title }: ServiceCardProps) {
  const Icon = iconMap[title] || Sparkles;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="card flex flex-col h-full bg-base-100 group"
    >
      <div className="card-body p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
           <Icon size={32} className="text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold text-base-content mb-3 tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="flex-grow text-sm text-base-content/60 leading-relaxed mb-8">
          {descriptions[title] || "Professional care services tailored to fit your specific family needs with maximum compassion."}
        </p>
        
        <button className="btn btn-outline btn-primary w-full tracking-wide font-bold">
          Learn More
        </button>
      </div>
    </motion.div>
  );
}
