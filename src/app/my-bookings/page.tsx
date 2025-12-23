"use client";

import { useState } from "react";
import { 
  History, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Clock, 
  XCircle, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Booking {
  id: number;
  service: string;
  duration: number;
  location: string;
  total: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  date: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      service: "Baby Care",
      duration: 3,
      location: "Dhaka, Bangladesh",
      total: 2400,
      status: "Pending",
      date: "Oct 24, 2025"
    },
    {
      id: 2,
      service: "Elderly Care",
      duration: 7,
      location: "Chattogram, Bangladesh",
      total: 8400,
      status: "Confirmed",
      date: "Oct 20, 2025"
    },
    {
      id: 3,
      service: "Sick Care",
      duration: 2,
      location: "Dhaka, Bangladesh",
      total: 3000,
      status: "Completed",
      date: "Oct 15, 2025"
    }
  ]);

  const cancelBooking = (id: number) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: "Cancelled" } : b
      )
    );
  };

  const getStatusStyle = (status: Booking["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "Confirmed":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "Completed":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "Cancelled":
        return "bg-rose-500/10 text-rose-600 border-rose-200";
    }
  };

  const getStatusIcon = (status: Booking["status"]) => {
    switch (status) {
      case "Pending":
        return <Clock size={14} />;
      case "Confirmed":
        return <CheckCircle2 size={14} />;
      case "Completed":
        return <CheckCircle2 size={14} />;
      case "Cancelled":
        return <XCircle size={14} />;
    }
  };

  return (
    <main className="min-h-screen py-24 sm:py-32 bg-base-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
              <ClipboardList size={14} />
              User Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">My Bookings</h1>
            <p className="text-base-content/50 max-w-lg font-medium">
              Track your service requests, manage appointments, and view your care history in one place.
            </p>
          </div>
          <Link 
            href="/services" 
            className="btn btn-primary px-8 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all font-bold"
          >
            Book New Service
          </Link>
        </div>

        {/* Content Section */}
        <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-base-200/50">
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Service & Date</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Duration</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Location</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Total Cost</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Status</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-b-base-200 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {bookings.map((b) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={b.id} 
                      className="group hover:bg-base-200/30 transition-colors"
                    >
                      <td className="px-8 py-6 border-b border-base-200">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
                            <History size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-base">{b.service}</div>
                            <div className="text-xs font-medium text-base-content/40 flex items-center gap-1 mt-1">
                              <Calendar size={12} />
                              {b.date}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 border-b border-base-200">
                        <span className="font-bold text-sm">{b.duration} Days</span>
                      </td>
                      <td className="px-8 py-6 border-b border-base-200">
                        <div className="flex items-center gap-2 text-sm font-medium text-base-content/60">
                          <MapPin size={14} className="text-primary" />
                          {b.location}
                        </div>
                      </td>
                      <td className="px-8 py-6 border-b border-base-200">
                        <div className="flex items-center gap-2">
                          <CreditCard size={14} className="text-base-content/30" />
                          <span className="font-black text-base">৳{b.total.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 border-b border-base-200">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${getStatusStyle(b.status)}`}>
                          {getStatusIcon(b.status)}
                          {b.status}
                        </div>
                      </td>
                      <td className="px-8 py-6 border-b border-base-200 text-center">
                        {b.status === "Pending" ? (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="btn btn-sm btn-error btn-outline rounded-xl font-bold px-4"
                          >
                            Cancel
                          </button>
                        ) : b.status === "Cancelled" ? (
                          <span className="text-xs text-base-content/30 font-bold">No actions</span>
                        ) : (
                          <Link 
                            href={`/services/${b.service.toLowerCase().replace(' ', '-')}`} 
                            className="btn btn-sm btn-primary btn-outline rounded-xl font-bold px-4"
                          >
                            View Details
                          </Link>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {bookings.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto text-base-content/30">
                <AlertCircle size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl">No bookings found</h3>
                <p className="text-sm text-base-content/40">You haven't made any service bookings yet.</p>
              </div>
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="mt-12 p-8 rounded-[2rem] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gray-800 dark:text-gray-100">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg leading-tight">🤝 Need assistance?</h4>
              <p className="text-sm text-base-content/50">Our 24/7 care support team is always here to help.</p>
            </div>
          </div>
          <Link href="/contact" className="btn btn-outline btn-primary rounded-xl px-8 font-bold">
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}

// Minimal missing component for the link
function ShieldCheck({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
