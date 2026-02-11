"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Heart, 
  Mail, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Check,
  Eye,
  EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Field states
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Catch URL errors during mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlError = params.get("error");
    if (urlError) {
      if (urlError === "OAuthCallback") {
        setError("Login failed: Redirect URI mismatch or Google settings incorrect.");
      } else if (urlError === "OAuthSignin") {
        setError("Login failed: Could not start Google Sign-in. Check your Client ID.");
      } else {
        setError(`Auth Error: ${urlError}`);
      }
      toast.error(`Sign-in problem: ${urlError}`);
    }
  }, []);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/" });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier,
        password,
      });

      if (result?.error) {
        // next-auth prefixes errors with 'CredentialsSignin' or similar in some versions,
        // but often 'result.error' contains the actual message thrown if redirect is false.
        const errorMessage = result.error.includes("Read more") 
          ? "Invalid email/phone or password" 
          : result.error;
        
        setError(errorMessage);
        toast.error(errorMessage);
        setIsLoading(false);
        return;
      }

      toast.success("Login successful. Welcome back!");
      setSuccess(true);
      setTimeout(() => {
        // Check for callbackUrl in URL search params if needed, or default to home/dashboard
        const urlParams = new URLSearchParams(window.location.search);
        const callbackUrl = urlParams.get('callbackUrl') || "/";
        router.push(callbackUrl);
      }, 1000);
    } catch (err) {
      setError("Login failed");
      toast.error("Something went wrong. Please try again later.");
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
                <h2 className="text-2xl font-bold">Welcome Back!</h2>
                <p className="text-base-content/60">You've successfully authenticated. Redirecting you home...</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Social Login */}
                <div className="flex justify-center w-full">
                  <button
                    onClick={handleGoogleLogin}
                    className="btn h-16 w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-2xl gap-3 shadow-md hover:shadow-lg transition-all normal-case font-black text-base flex justify-center items-center px-10"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-base-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-base-100 text-base-content/40 font-medium">Or continue with email</span>
                  </div>
                </div>

                <form key="form" onSubmit={handleLogin} className="space-y-6">
                {/* Email / Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-base-content/40 px-1">Email or Phone</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" size={18} />
                    <input 
                      type="text"
                      className="input input-lg h-16 input-bordered w-full rounded-2xl pl-12 text-sm font-semibold focus:ring-4 focus:ring-primary/10 transition-all" 
                      placeholder="Email or Phone Number" 
                      required 
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
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
                      type={showPassword ? "text" : "password"}
                      className="input input-lg h-16 input-bordered w-full rounded-2xl pl-12 pr-12 text-sm font-semibold focus:ring-4 focus:ring-primary/10 transition-all"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
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
                    <Link 
                      href={`/register${typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('callbackUrl') ? `?callbackUrl=${new URLSearchParams(window.location.search).get('callbackUrl')}` : '') : ''}`} 
                      className="text-primary font-black hover:underline underline-offset-4"
                    >
                      Register
                    </Link>
                  </p>
                </div>
                </form>
              </div>
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
