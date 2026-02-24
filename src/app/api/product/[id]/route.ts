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
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // 🔥 unwrap params (Next.js 14 fix)
    const { id } = await context.params;

    const seller = req.headers.get("user-id");
    if (!seller) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // 🔥 Ownership check
    if (product.seller.toString() !== seller) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const mrp = formData.get("mrp") as string;
    const price = formData.get("price") as string;
    const stock = formData.get("stock") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File | null;

    let imageUrl = product.image;

    // 🔥 If new image uploaded
    if (file && file.size > 0) {
      // Delete old Cloudinary image
      const publicId = product.image.split("/").pop()?.split(".")[0];

      if (publicId) {
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }

      // Upload new image
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

      imageUrl = uploadResult.secure_url;
    }

    // 🔥 Update fields
    product.name = name || product.name;
    product.mrp = mrp ? mrp : product.mrp;
    product.price = price ? price : product.price;
    product.stock = stock ? stock : product.stock;
    product.description = description || product.description;
    product.image = imageUrl;

    await product.save();

    return NextResponse.json({
      success: true,
      product,
    });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE PRODUCT (only owner + delete Cloudinary image)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // 🔥 unwrap params
    const { id } = await context.params;

    const seller = req.headers.get("user-id");
    if (!seller) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // 🔥 ownership check
    if (product.seller.toString() !== seller) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    // 🔥 Delete image from Cloudinary
    if (product.image) {
      const publicId = product.image.split("/").pop()?.split(".")[0];

      if (publicId) {
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }
    }

    await product.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}