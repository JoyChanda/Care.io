"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Calendar, 
  MapPin, 
  Map, 
  CreditCard, 
  ArrowLeft, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const serviceChargeMap: Record<string, { price: number; type: string }> = {
  "baby-care": { price: 500, type: "hour" },
  "elderly-care": { price: 1500, type: "day" },
  "sick-care": { price: 1200, type: "day" },
};

type Props = {
  params: Promise<{ service_id: string }>;
};

export default function BookingPage({ params }: Props) {
  const router = useRouter();
  const { service_id } = use(params);

  // Requirement Match: Auth Guard
  useEffect(() => {
    // Check for "isLoggedIn" or "token" in localStorage/cookies
    // For this simulation, we'll check a simulated flag
    const checkAuth = () => {
      const user = localStorage.getItem("user"); 
      if (!user) {
        // Not logged in -> Redirect to login
        router.push("/auth/login");
      }
    };
    checkAuth();
  }, [router]);

  const [days, setDays] = useState(1);
  const [division, setDivision] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  const serviceData = serviceChargeMap[service_id] || { price: 0, type: "day" };
  const basePrice = serviceData.price;
  const totalCost = days * basePrice;

  const handleBooking = async () => {
    if (!division || !address) {
      setError("Please fill in all location details.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalCost, serviceName }),
      });

      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setShowCheckout(true);
      } else {
        throw new Error(data.error || "Failed to initialize payment");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const createBookingRecord = async () => {
    try {
      // In a real app, userEmail comes from Auth session
      const userEmail = "customer@example.com"; 

      const bookingData = {
        service: service_id,
        duration: days,
        division,
        address,
        totalCost,
        status: "Confirmed",
        userEmail,
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        router.push("/my-bookings");
      } else {
        throw new Error("Failed to save booking record.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const serviceName = service_id.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  if (!basePrice) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold italic">Invalid Service</h2>
          <Link href="/">
            <button className="btn btn-primary">Return to Services</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-base-200/30 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          href={`/services/${service_id}`} 
          className="inline-flex items-center gap-2 text-sm font-medium text-base-content/50 hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Service Details
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-base-100 rounded-[2.5rem] p-8 sm:p-10 shadow-xl shadow-base-content/5 border border-base-200"
            >
              <div className="mb-10">
                <h1 className="text-3xl font-black tracking-tight mb-2">Book {serviceName}</h1>
                <p className="text-base-content/50 text-sm">Please provide the details below to complete your booking.</p>
              </div>

              <div className="space-y-8">
                {/* Duration */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-base-content/60">
                    <Calendar size={18} className="text-primary" />
                    How many {serviceData.type}s?
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min={1}
                      max={720} // Allow more for hourly
                      value={days}
                      onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                      className="input input-lg input-bordered w-full rounded-2xl font-bold focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                    <span className="text-lg font-bold text-base-content/40 capitalize whitespace-nowrap">
                      {serviceData.type}s
                    </span>
                  </div>
                </div>

                {/* Location Section */}
                <div className="space-y-6 pt-6 border-t border-base-200">
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-base-content/60">
                      <Map size={18} className="text-primary" />
                      Division
                    </label>
                    <select
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="select select-lg select-bordered w-full rounded-2xl font-semibold focus:ring-4 focus:ring-primary/10 transition-all"
                    >
                      <option value="" disabled>Choose your division</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chattogram">Chattogram</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barishal">Barishal</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-base-content/60">
                      <MapPin size={18} className="text-primary" />
                      Detailed Address
                    </label>
                    <textarea
                      placeholder="Street address, House no, Flat..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="textarea textarea-lg textarea-bordered w-full rounded-2xl font-medium min-h-[120px] focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 p-4 mt-8 rounded-2xl bg-error/10 text-error text-sm font-bold border border-error/20 overflow-hidden"
                  >
                    <AlertCircle size={20} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Extra Trust Info */}
            <div className="flex items-center gap-4 p-6 rounded-3xl bg-primary/5 border border-primary/10">
              <ShieldCheck className="text-primary shrink-0" size={32} />
              <p className="text-sm text-base-content/60 leading-relaxed font-medium text-balance">
                Your booking is protected. Our caregivers are background-checked and professionally verified.
              </p>
            </div>
          </div>

          {/* Checkout Summary Card */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 bg-base-100 rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-200"
            >
              <div className="bg-primary p-8 text-primary-content">
                <h3 className="text-xl font-black uppercase tracking-widest opacity-80 mb-1">Total Summary</h3>
                <p className="text-sm font-medium opacity-60 italic">Care service estimation</p>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-base-content/50 font-medium tracking-tight">Service</span>
                    <span className="font-bold text-base-content tracking-tight">{serviceName}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-base-content/50 font-medium tracking-tight">Base Charge</span>
                    <span className="font-bold text-base-content tracking-tight">৳{basePrice} / {serviceData.type}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-base-content/50 font-medium tracking-tight">Booking Period</span>
                    <span className="font-bold text-base-content tracking-tight">{days} {days > 1 ? `${serviceData.type}s` : serviceData.type}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed border-base-300">
                  <div className="flex justify-between items-end mb-8">
                    <div className="space-y-1">
                      <span className="text-xs font-black uppercase tracking-widest text-base-content/30 italic">Total Cost</span>
                      <p className="text-3xl font-black text-primary">৳{totalCost}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <CreditCard size={24} />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {!showCheckout ? (
                      <motion.button 
                        key="book-btn"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleBooking}
                        disabled={isSubmitting}
                        className="btn btn-primary btn-block h-16 rounded-2xl text-lg font-black shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-50 group"
                      >
                        {isSubmitting ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          <>
                            Proceed to Payment
                            <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={20} />
                          </>
                        )}
                      </motion.button>
                    ) : (
                      <motion.div
                        key="stripe-form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        {clientSecret && (
                          <Elements 
                            stripe={stripePromise} 
                            options={{ 
                              clientSecret,
                              appearance: {
                                theme: 'stripe',
                                variables: {
                                  colorPrimary: '#0a84ff',
                                },
                              }
                            }}
                          >
                            <CheckoutForm 
                              amount={totalCost} 
                              onSuccess={createBookingRecord} 
                              onCancel={() => setShowCheckout(false)}
                            />
                          </Elements>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-bold text-base-content/30 uppercase tracking-widest text-center">
                    <CheckCircle2 size={12} />
                    Verified & Secure Checkout
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
