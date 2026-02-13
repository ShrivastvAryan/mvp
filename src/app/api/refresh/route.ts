import { NextResponse } from "next/server";
import {
  verifyRefreshToken,
  generateAccessToken,
} from "@/lib/jwt";

export async function POST(req: Request) {
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, message: "No refresh token" },
      { status: 401 }
    );
  }

  try {
    const decoded = verifyRefreshToken(refreshToken) as any;

    const newAccessToken = generateAccessToken({
      email: decoded.email,
      role: decoded.role,
    });

    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
