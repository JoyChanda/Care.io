import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { nid, name, email, contact, password } = await req.json();

    if (!nid || !name || !email || !contact || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { contact }, { nid }],
    });

    if (existingUser) {
      let message = "User already exists";
      if (existingUser.email === normalizedEmail) message = "Email already registered";
      else if (existingUser.contact === contact) message = "Contact number already registered";
      else if (existingUser.nid === nid) message = "NID already registered";
      
      return NextResponse.json(
        { error: message },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      nid,
      name,
      email: normalizedEmail,
      contact,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: newUser._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Full Registration Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
