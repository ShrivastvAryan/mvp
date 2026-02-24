import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import "@/models/User";

export async function GET() {
  await connectDB();

  const products = await Product.find()
    .populate("seller", "name email")
    .sort({ createdAt: -1 });

  return NextResponse.json({ success: true, products });
}