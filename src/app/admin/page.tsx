"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  CreditCard, 
  CalendarDays, 
  Users, 
  TrendingUp, 
  Activity,
  ArrowRight,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
            <Activity size={14} />
            System Overview
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4">
            <LayoutDashboard className="text-primary h-12 w-12" />
            Admin Dashboard
          </h1>
          <p className="text-base-content/50 max-w-lg font-medium italic">
            Real-time analytics and management for the Care.IO platform.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {[
          { label: "Total Bookings", value: stats.totalBookings, icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-500/10" },
          { label: "Total Revenue", value: `৳${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-500/10" },
          { label: "Active Users", value: stats.totalUsers, icon: Users, color: "text-purple-600", bg: "bg-purple-500/10" },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-base-100 rounded-[2rem] p-8 border border-base-200 shadow-xl shadow-base-content/5 relative overflow-hidden group"
          >
            <div className={`absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
              <stat.icon size={120} />
            </div>
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
              <stat.icon size={24} />
            </div>
            {loading ? (
              <Loader2 className="animate-spin text-base-content/20" size={24} />
            ) : (
              <p className="text-4xl font-black tracking-tighter text-base-content mb-1">{stat.value}</p>
            )}
            <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Quick Actions Card */}
        <div className="bg-base-100 rounded-[2.5rem] p-10 border border-base-200 shadow-xl space-y-8">
          <h2 className="text-2xl font-black tracking-tight">Quick Management</h2>
          <div className="grid gap-4">
            <Link
              href="/admin/payment-history"
              className="flex items-center justify-between p-6 rounded-2xl bg-base-200/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base-content">Financial Records</h3>
                  <p className="text-xs text-base-content/40 font-medium">Verify payments and invoices</p>
                </div>
              </div>
              <ArrowRight className="text-base-content/20 group-hover:text-primary transition-colors" size={20} />
            </Link>

            <Link
              href="/admin/system-health"
              className="flex items-center justify-between p-6 rounded-2xl bg-base-200/50 hover:bg-secondary/10 border border-transparent hover:border-secondary/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base-content">System Health</h3>
                  <p className="text-xs text-base-content/40 font-medium">Monitor infrastructure status</p>
                </div>
              </div>
              <ArrowRight className="text-base-content/20 group-hover:text-secondary transition-colors" size={20} />
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center justify-between p-6 rounded-2xl bg-base-200/50 hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base-content">User Registry</h3>
                  <p className="text-xs text-base-content/40 font-medium">Access user profiles and safety protocols</p>
                </div>
              </div>
              <ArrowRight className="text-base-content/20 group-hover:text-accent transition-colors" size={20} />
            </Link>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-primary rounded-[2.5rem] p-10 text-primary-content shadow-2xl shadow-primary/20 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute -right-20 -bottom-20 opacity-10">
            <LayoutDashboard size={400} />
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-black tracking-tight leading-tight">Secure Care <br/>Management Portal</h2>
            <p className="text-primary-content/70 font-medium text-lg leading-relaxed">
              We ensure every booking is verified for safety. As an administrator, your oversight helps maintain the standard of "Compassion First" for every family.
            </p>
            <div className="pt-4">
              <Link href="/services" className="btn btn-outline border-primary-content/30 text-primary-content hover:bg-primary-content hover:text-primary rounded-2xl px-10 border-2 font-black">
                View Site
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-2 mt-12">
        <div className="bg-base-100 rounded-[2.5rem] p-10 border border-base-200 shadow-xl space-y-8 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight">Recent Platform Activity</h2>
            <Link href="/admin/payment-history" className="text-sm font-bold text-primary hover:underline">View All</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-base-content/40 uppercase text-[10px] font-black tracking-widest">
                  <th className="bg-transparent border-b border-base-200">Activity</th>
                  <th className="bg-transparent border-b border-base-200">User</th>
                  <th className="bg-transparent border-b border-base-200">Status</th>
                  <th className="bg-transparent border-b border-base-200 text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {/* Mock recent activities for visual excellence, in a real app these would be fetched */}
                {[
                  { type: "New Booking", user: "sarah@example.com", status: "Pending", time: "2 mins ago" },
                  { type: "Payment Received", user: "john_doe@gmail.com", status: "Confirmed", time: "15 mins ago" },
                  { type: "User Registered", user: "mariya_k@outlook.com", status: "Active", time: "1 hour ago" },
                  { type: "Service Completed", user: "rahul@care.io", status: "Completed", time: "3 hours ago" },
                ].map((activity, i) => (
                  <tr key={i} className="group hover:bg-base-200/50 transition-colors">
                    <td className="py-4 border-b border-base-200/50 font-bold text-sm tracking-tight">{activity.type}</td>
                    <td className="py-4 border-b border-base-200/50 text-sm text-base-content/60 font-medium">{activity.user}</td>
                    <td className="py-4 border-b border-base-200/50">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/20">
                        {activity.status}
                      </span>
                    </td>
                    <td className="py-4 border-b border-base-200/50 text-right text-xs font-bold text-base-content/30 italic">{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
