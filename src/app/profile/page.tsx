"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (session?.user?.image) {
      setImageUrl(session.user.image);
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/profile");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <main className="min-h-screen py-24 sm:py-32 bg-base-100/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-base-content/50 hover:text-primary transition-colors mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">My Profile</h1>
          <p className="text-base-content/60 font-medium">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 rounded-[2.5rem] shadow-xl border border-base-200 overflow-hidden"
        >
          <div className="p-8 sm:p-12">
            {/* Profile Image & Basic Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-base-200">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lg">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="Profile image"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary text-4xl font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 justify-center sm:justify-start">
                  <User size={24} className="text-primary" />
                  {user?.name || "User"}
                </h2>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                  <p className="text-base-content/70 flex items-center gap-2">
                    <Mail size={18} className="text-base-content/40" />
                    {user?.email || "No email provided"}
                  </p>
                </div>
                <p className="text-sm text-base-content/50 mt-3 flex items-center gap-2 justify-center sm:justify-start">
                  <ShieldCheck size={16} />
                  Email cannot be changed
                </p>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4 text-base-content/80">Account Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-base-200/50 border border-base-200">
                    <div>
                      <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider">Name</p>
                      <p className="text-base font-bold mt-1">{user?.name || "Not set"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-base-200/50 border border-base-200">
                    <div>
                      <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider">Email</p>
                      <p className="text-base font-bold mt-1">{user?.email || "Not set"}</p>
                    </div>
                  </div>

                  {/* Profile Image URL (Optional) */}
                  <div className="p-4 rounded-2xl bg-base-200/50 border border-base-200">
                    <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-2">
                       Profile Image URL (Optional)
                    </p>

                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="input input-bordered w-full rounded-xl text-sm"
                    />

                    <p className="text-xs text-base-content/50 mt-2">
                       Paste a valid image URL to update your profile picture.
                    </p>
                  </div>

                  {(user as any)?.id && (
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-base-200/50 border border-base-200">
                      <div>
                        <p className="text-sm font-semibold text-base-content/60 uppercase tracking-wider">User ID</p>
                        <p className="text-xs font-mono text-base-content/50 mt-1 break-all">
                          {(user as any).id}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-base-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href="/my-bookings"
                    className="btn btn-primary btn-outline flex-1 rounded-xl font-semibold"
                  >
                    View My Bookings
                  </Link>
                  <Link 
                    href="/services"
                    className="btn btn-primary flex-1 rounded-xl font-semibold"
                  >
                    Book a Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

