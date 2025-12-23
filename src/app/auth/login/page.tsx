"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Heart, 
  Mail, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  Check,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Field states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Backend API call placeholder
      console.log("Logging in user:", { email, password });
      
      // Simulate API delay for premium feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Requirement Match: router.back() or redirect
      setTimeout(() => {
        // We'll use router.back() as requested, but fall back to "/" if history is empty
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center py-20 px-4 sm:px-6">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-base-100 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-base-200 relative overflow-hidden">
          {/* Progress bar for success state */}
          {success && (
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              className="absolute top-0 left-0 h-1.5 bg-success z-20"
            />
          )}

          <div className="text-center mb-10 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-inner">
                <Heart size={20} fill="currentColor" />
              </span>
              <span className="text-2xl font-black tracking-tight">Care.IO</span>
            </Link>
            <h1 className="text-3xl font-black tracking-tight">Welcome Back</h1>
            <p className="text-sm text-base-content/50 font-medium">Log in to manage your care services and bookings.</p>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} />
                </div>
                <h2 className="text-2xl font-bold">Authenticated</h2>
                <p className="text-base-content/60">Redirecting you to your previous page...</p>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleLogin} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-base-content/40 px-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" size={18} />
                    <input 
                      type="email"
                      className="input input-lg input-bordered w-full rounded-2xl pl-12 text-sm font-semibold focus:ring-4 focus:ring-primary/10 transition-all" 
                      placeholder="hello@example.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-black uppercase tracking-widest text-base-content/40">Password</label>
                    <Link href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" size={18} />
                    <input
                      name="password"
                      type="password"
                      className="input input-lg input-bordered w-full rounded-2xl pl-12 text-sm font-semibold focus:ring-4 focus:ring-primary/10 transition-all"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-error/10 text-error text-sm font-bold flex items-center gap-3 border border-error/20"
                  >
                    <AlertCircle size={20} />
                    {error}
                  </motion.div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="btn btn-primary btn-block h-16 rounded-2xl text-lg font-black shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-50 group mt-4"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      Login
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </>
                  )}
                </button>

                <div className="pt-6 text-center">
                  <p className="text-sm font-medium text-base-content/60">
                    Don't have an account?{" "}
                    <Link href="/auth/register" className="text-primary font-black hover:underline underline-offset-4">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-base-content/30">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} />
            <span className="text-[11px] font-black uppercase tracking-widest">Secure Login</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-base-content/20" />
          <div className="text-[11px] font-black uppercase tracking-widest">Care.IO Trusted</div>
        </div>
      </motion.div>
    </main>
  );
}
