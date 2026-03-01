import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import cloudinary from "@/lib/cloudinary";

/* CREATE EVENT */

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const address = formData.get("address") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;

    const imageFiles = formData.getAll("images") as File[];

    if (!name || !category || !address || !date || !time) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    let uploadedImages: string[] = [];

    // 🔥 Upload images to Cloudinary
    for (const file of imageFiles) {
      if (!file || file.size === 0) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "events" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      uploadedImages.push(uploadResult.secure_url);
    }

    const event = await Event.create({
      name,
      category,
      address,
      date,
      time,
      images: uploadedImages,
    });

    return NextResponse.json({
      success: true,
      event,
    });

  } catch (error: any) {
    console.error("CREATE EVENT ERROR:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

/* GET ALL EVENTS */
export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, events },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}