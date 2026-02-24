import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

interface Params {
  params: { id: string };
}

// ✅ GET SINGLE PRODUCT
export async function GET(req: NextRequest, { params }: Params) {
  await connectDB();

  const product = await Product.findById(params.id)
    .populate("seller", "name email");

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, product });
}

// ✅ UPDATE PRODUCT (only owner)
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const seller = req.headers.get("user-id");
    if (!seller) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (product.seller.toString() !== seller) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const updated = await Product.findByIdAndUpdate(
      params.id,
      {
        ...body,
        mrp: body.mrp ? Number(body.mrp) : product.mrp,
        price: body.price ? Number(body.price) : product.price,
        stock: body.stock ? Number(body.stock) : product.stock,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, product: updated });

  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ✅ DELETE PRODUCT (only owner + delete Cloudinary image)
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const seller = req.headers.get("user-id");
    if (!seller) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (product.seller.toString() !== seller) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Extract public_id from image URL
    const publicId = product.image.split("/").pop()?.split(".")[0];

    if (publicId) {
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await product.deleteOne();

    return NextResponse.json({ success: true, message: "Product deleted" });

  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}