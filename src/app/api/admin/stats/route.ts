import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    const [totalBookings, bookings, totalUsers] = await Promise.all([
      Booking.countDocuments(),
      Booking.find({ status: { $in: ["Confirmed", "Completed"] } }),
      User.countDocuments(),
    ]);

    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalCost, 0);

    return NextResponse.json({
      totalBookings,
      totalRevenue,
      totalUsers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
