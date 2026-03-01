import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // adjust path if needed
import { Message } from "@/models/Message";

// CREATE MESSAGE

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const email = req.headers.get("user-email");

    if (!email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { message: "Message required" },
        { status: 400 }
      );
    }

    const message = await Message.create({
      content,
      email,
    });

    return NextResponse.json(
      { success: true, message },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// GET MESSAGES 

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