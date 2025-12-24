"use client";

import React, { useEffect, useState } from "react";
import { CreditCard, Calendar, User, Package, ChevronLeft, Search, Filter, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type Payment = {
  id: string;
  user: string;
  service: string;
  amount: number;
  date: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
};

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("/api/bookings");
        if (res.ok) {
          const data = await res.json();
          const transformed = data.map((b: any) => ({
            id: b._id,
            user: b.userEmail,
            service: b.service.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            amount: b.totalCost,
            date: new Date(b.createdAt).toLocaleDateString(),
            status: b.status,
          }));
          setPayments(transformed);
        } else {
          throw new Error("Failed to fetch payments");
        }
      } catch (err) {
        console.error(err);
        toast.error("Could not load payment history.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(p => 
    p.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 min-h-screen">
      {/* Header & Back Button */}
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
              <CreditCard size={20} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Payment History</h1>
          </div>
          <p className="text-base-content/60 font-medium">
            Monitor all financial transactions and payment statuses across the platform.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" size={18} />
            <input 
              type="text" 
              placeholder="Search payments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered rounded-xl pl-10 focus:ring-4 focus:ring-primary/10 transition-all w-full md:w-64"
            />
          </div>
          <button className="btn btn-outline border-base-200 rounded-xl px-4">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-primary" size={40} />
              <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest">Fetching payment data...</p>
            </div>
          ) : filteredPayments.length > 0 ? (
            <table className="table w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-base-200/50">
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Transaction ID</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">User / Customer</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Service Type</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Amount</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Date</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="group hover:bg-base-200/30 transition-colors">
                    <td className="px-8 py-6 border-b border-base-200">
                      <span className="font-mono text-xs font-bold bg-base-200 px-2 py-1 rounded text-base-content/70">
                        {p.id.substring(0, 8)}...
                      </span>
                    </td>
                    <td className="px-8 py-6 border-b border-base-200">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-base-200 flex items-center justify-center text-xs font-bold text-base-content/60 capitalize">
                          {p.user.charAt(0)}
                        </div>
                        <span className="font-bold text-sm tracking-tight">{p.user}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 border-b border-base-200">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Package size={14} className="text-primary" />
                        {p.service}
                      </div>
                    </td>
                    <td className="px-8 py-6 border-b border-base-200">
                      <span className="font-black text-base">৳{p.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-6 border-b border-base-200">
                      <div className="flex items-center gap-2 text-sm font-medium text-base-content/60">
                        <Calendar size={14} />
                        {p.date}
                      </div>
                    </td>
                    <td className="px-8 py-6 border-b border-base-200">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                          p.status === "Completed" || p.status === "Confirmed"
                            ? "bg-green-500/10 text-green-600 border-green-200"
                            : p.status === "Pending"
                            ? "bg-amber-500/10 text-amber-600 border-amber-200"
                            : "bg-rose-500/10 text-rose-600 border-rose-200"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto text-base-content/30">
                <Search size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl">No payments found</h3>
                <p className="text-sm text-base-content/40">We couldn't find any financial transactions matches your search.</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <div className="px-8 py-6 bg-base-200/30 flex items-center justify-between">
          <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">
            {filteredPayments.length} transactions found
          </p>
        </div>
      </motion.div>
    </main>
  );
}
