"use client";

import React, { useEffect, useState } from "react";
import { Users, Search, Filter, Loader2, ChevronLeft, Shield, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  contact?: string;
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (err) {
        console.error(err);
        toast.error("Could not load user registry.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role: newRole }),
      });
      if (res.ok) {
        setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
        toast.success(`User role updated to ${newRole}!`);
      } else {
        throw new Error("Failed to update role");
      }
    } catch (err) {
      toast.error("Failed to update user role.");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 min-h-screen">
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
              <Users size={20} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">User Registry</h1>
          </div>
          <p className="text-base-content/60 font-medium">
            Manage all registered users and their account privileges.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-primary" size={40} />
              <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest">Accessing records...</p>
            </div>
          ) : filteredUsers.length > 0 ? (
            <table className="table w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-base-200/50">
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">User Details</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Contact Info</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Joined Date</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200">Role</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-base-content/40 border-b border-base-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="group hover:bg-base-200/30 transition-colors">
                    <td className="px-8 py-6 border-b border-base-200">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm tracking-tight">{u.name}</span>
                          <span className="text-xs text-base-content/40">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 border-b border-base-200">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-base-content/60">
                          <Mail size={12} />
                          {u.email}
                        </div>
                        {u.contact && (
                          <div className="text-xs font-bold text-base-content/40">
                             {u.contact}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 border-b border-base-200">
                      <div className="flex items-center gap-2 text-sm font-medium text-base-content/60">
                        <Calendar size={14} />
                        {new Date(u.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6 border-b border-base-200">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        u.role === "admin" 
                          ? "bg-rose-500/10 text-rose-600" 
                          : "bg-emerald-500/10 text-emerald-600"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-8 py-6 border-b border-base-200 text-right">
                      <button 
                        onClick={() => toggleRole(u._id, u.role)}
                        className="btn btn-ghost btn-sm rounded-lg hover:bg-primary/10 hover:text-primary gap-2"
                      >
                        <Shield size={14} />
                        {u.role === "admin" ? "Demote" : "Promote"}
                      </button>
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
              <h3 className="font-bold text-xl">No users match your criteria</h3>
            </div>
          )}
        </div>
      </motion.div>
    </main>
  );
}
