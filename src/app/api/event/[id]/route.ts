import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import cloudinary from "@/lib/cloudinary"

/* GET SINGLE EVENT */
// export async function GET(
//   req: NextRequest,
//    context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();

//     const event = await EventModel.findById(id);

//     if (!event) {
//       return NextResponse.json(
//         { message: "Event not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, event });
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: error.message },
//       { status: 500 }
//     );
//   }
// }

/* UPDATE EVENT */

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const address = formData.get("address") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;

    const newFiles = formData.getAll("newImages") as File[];
    const existingImagesFromClient = formData.getAll(
      "existingImages"
    ) as string[];

    // 🔥 Detect removed images
    const removedImages = event.images.filter(
      (img: string) => !existingImagesFromClient.includes(img)
    );

    // 🔥 Delete removed images from Cloudinary
    for (const url of removedImages) {
      const publicId = url.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`events/${publicId}`);
      }
    }

    // Start with images user kept
    let updatedImages: string[] = [...existingImagesFromClient];

    // 🔥 Upload new images
    for (const file of newFiles) {
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

      updatedImages.push(uploadResult.secure_url);
    }

    // Optional: enforce max images
    if (updatedImages.length > 1) {
      return NextResponse.json(
        { message: "Maximum 1 image allowed" },
        { status: 400 }
      );
    }

    // 🔥 Update fields
    event.name = name || event.name;
    event.category = category || event.category;
    event.address = address || event.address;
    event.date = date || event.date;
    event.time = time || event.time;
    event.images = updatedImages;

    await event.save();

    return NextResponse.json({
      success: true,
      event,
    });

  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

/* DELETE EVENT */

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // 🔥 Delete all images from Cloudinary
    for (const url of event.images) {
      const publicId = url.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`events/${publicId}`);
      }
    }

    await event.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    });

  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}