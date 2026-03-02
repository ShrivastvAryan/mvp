import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const seller = req.headers.get("user-id");
    if (!seller) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const mrp = formData.get("mrp") as string;
    const price = formData.get("price") as string;
    const stock = formData.get("stock") as string;
    const description = formData.get("description") as string;

    const files = formData.getAll("images") as File[];

    // ✅ Validation
    if (
      !name ||
      !category ||
      !mrp ||
      !price ||
      !stock ||
      !description ||
      files.length === 0
    ) {
      return NextResponse.json(
        { message: "All fields and at least one image required" },
        { status: 400 }
      );
    }

    if (files.length > 4) {
      return NextResponse.json(
        { message: "Maximum 4 images allowed" },
        { status: 400 }
      );
    }

    // 🔥 Upload all images to Cloudinary
    const imageUrls: string[] = [];

    for (const file of files) {
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

      imageUrls.push(uploadResult.secure_url);
    }

    // ✅ Create product
    const product = await Product.create({
      name,
      category,
      mrp: mrp,
      price: price,
      stock: stock,
      description,
      seller,
      images: imageUrls, // 🔥 array
    });

    return NextResponse.json(
      { success: true, product },
      { status: 201 }
    );

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  const sellerId = req.headers.get("user-id");

  if (!sellerId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const products = await Product.find({ seller: sellerId }) // 🔥 FILTER HERE
    .populate("seller", "name email")
    .sort({ createdAt: -1 });

  return NextResponse.json({ success: true, products });
}