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

    const files = formData.getAll("images") as File[];

    let imageUrls = product.images;

    // 🔥 If new images uploaded → replace all
    if (files.length > 0) {

      // Delete old images from Cloudinary
      for (const url of product.images) {
        const publicId = url.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`products/${publicId}`);
        }
      }

      imageUrls = [];

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
    }

    product.name = name || product.name;
    product.mrp = mrp ? mrp : product.mrp;
    product.price = price ? price : product.price;
    product.stock = stock ? stock : product.stock;
    product.description = description || product.description;
    product.images = imageUrls;

    await product.save();

    return NextResponse.json({ success: true, product });

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

    if (product.seller.toString() !== seller) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    // 🔥 Delete all images from Cloudinary
    for (const url of product.images) {
      const publicId = url.split("/").pop()?.split(".")[0];
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