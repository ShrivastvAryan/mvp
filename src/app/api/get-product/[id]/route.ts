
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();

  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, product });
}
