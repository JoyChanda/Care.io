import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import { sendInvoice } from "@/utils/sendInvoice";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Basic validation
    if (!body.service || !body.duration || !body.userEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = await Booking.create(body);

    // Send email invoice asynchronously
    try {
      await sendInvoice(body.userEmail, booking);
    } catch (emailError) {
      console.error("Email delivery failed:", emailError);
      // We don't fail the request if email fails, but we log it
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    
    // Optional: Filter by userEmail if provided in query params
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("email");
    
    const query = userEmail ? { userEmail } : {};
    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
