import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // adjust path if needed
import { Message } from "@/models/Message";


// CREATE MESSAGE
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { content, email } = body;

    if (!content || !email) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      content,
      email,
    });

    return NextResponse.json(
      { success: true, data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


// GET MESSAGES (optional filter by recipient)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const recipient = searchParams.get("recipient");

    const filter = recipient ? { recipient } : {};

    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .populate("sender", "name email")
      .populate("recipient", "name email");

    return NextResponse.json(
      { success: true, data: messages },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}