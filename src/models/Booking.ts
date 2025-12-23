import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    service: { type: String, required: true },
    duration: { type: Number, required: true },
    division: { type: String, required: true },
    address: { type: String, required: true },
    totalCost: { type: Number, required: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    },
    userEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
