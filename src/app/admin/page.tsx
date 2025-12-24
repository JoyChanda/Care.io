"use client";

import Link from "next/link";
import { LayoutDashboard, CreditCard, CalendarDays, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <LayoutDashboard className="text-primary h-8 w-8" />
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      </div>

      <p className="text-base-content/60 mb-12 max-w-2xl">
        This is a placeholder for admin functionalities. Features like user management, booking management, and analytics can be added here in the future.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {/* Payment History Card */}
        <Link
          href="/admin/payment-history"
          className="group relative overflow-hidden rounded-[2rem] border border-base-200 bg-base-100 p-8 text-center shadow-lg hover:shadow-xl transition-all hover:border-primary/20"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard size={100} />
          </div>
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <CreditCard size={28} />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Payment History</h2>
          <p className="text-sm text-base-content/60">View all payments and transaction details</p>
        </Link>

        {/* Bookings Management Card */}
        <div className="group relative overflow-hidden rounded-[2rem] border border-base-200 bg-base-100 p-8 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer hover:border-primary/20">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <CalendarDays size={100} />
          </div>
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarDays size={28} />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">Bookings</h2>
          <p className="text-sm text-base-content/60">Manage all service bookings and schedules</p>
        </div>

        {/* Users Management Card */}
        <div className="group relative overflow-hidden rounded-[2rem] border border-base-200 bg-base-100 p-8 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer hover:border-primary/20">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={100} />
          </div>
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">Users</h2>
          <p className="text-sm text-base-content/60">View and manage registered users</p>
        </div>
      </div>
    </main>
  );
}
