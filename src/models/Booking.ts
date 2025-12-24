import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  service: string;
  duration: number;
  division: string;
  address: string;
  totalCost: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
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

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
