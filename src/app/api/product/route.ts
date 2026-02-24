import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const seller = req.headers.get("user-id");
    if (!seller) {
      return NextResponse.json({ message: "Unauthorized-route wala hai" }, { status: 401 });
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const mrp = formData.get("mrp") as string;
    const price = formData.get("price") as string;
    const stock = formData.get("stock") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    if (!name || !category || !mrp || !price || !stock || !description || !file) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    const product = await Product.create({
      name,
      category,
      mrp,
      price,
      stock,
      description,
      seller,
      image: uploadResult.secure_url,
    });

    return NextResponse.json({ success: true, product }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}