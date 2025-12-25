import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, image } = await req.json();

    await dbConnect();

    // Prepare update data
    const updateData: any = {};
    if (name) updateData.name = name;

    // Validate and update image only if provided
    if (image && image.trim()) {
      const trimmedImage = image.trim();
      // Optional: Basic URL validation
      if (trimmedImage.startsWith("http://") || trimmedImage.startsWith("https://")) {
        updateData.image = trimmedImage;
      } else {
        return NextResponse.json({ error: "Invalid image URL format" }, { status: 400 });
      }
    }

    // Update user in database
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
