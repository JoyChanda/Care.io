"use client";

import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface CheckoutFormProps {
  amount: number;
  onSuccess: () => Promise<void>;
  onCancel: () => void;
}

export default function CheckoutForm({ amount, onSuccess, onCancel }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      await onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement className="mb-4" />
      
      {errorMessage && (
        <div className="p-4 rounded-xl bg-error/10 text-error text-sm font-bold flex items-center gap-2 border border-error/20">
          <AlertCircle size={18} />
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="btn btn-ghost flex-1 rounded-2xl h-14 font-bold"
        >
          Cancel
        </button>
        <button
          disabled={!stripe || isProcessing}
          className="btn btn-primary flex-[2] rounded-2xl h-14 font-black shadow-lg shadow-primary/20"
        >
          {isProcessing ? (
            <span className="loading loading-spinner"></span>
          ) : (
            `Pay ৳${amount.toLocaleString()}`
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-base-content/30 uppercase tracking-widest text-center mt-4">
        <CheckCircle2 size={12} />
        Secure SSL Encrypted Payment
      </div>
    </form>
  );
}
