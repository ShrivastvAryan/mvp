import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // adjust path if needed
import { Message } from "@/models/Message";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const messages = await Message.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, messages },
      { status: 200 }
    );

  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}