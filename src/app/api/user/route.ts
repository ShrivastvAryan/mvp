import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

// GET → Fetch all users (Admin)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const users = await User.find({})
      .select("-password") // never expose password
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}