import { NextResponse } from "next/server";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  const demoUsers = {
    buyer: { email: "buyer@test.com", password: "123456" },
    seller: { email: "seller@test.com", password: "123456" },
  };

  const user = demoUsers[role as "buyer" | "seller"];

  if (!user || user.email !== email || user.password !== password) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const payload = { email, role };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const response = NextResponse.json({
    success: true,
    user: { email, role },
  });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  response.cookies.set("isAuthenticated", "true", {
  httpOnly: false, 
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 ,
});

  response.cookies.set("role", role, {
    httpOnly: false,
    path: "/",
    maxAge: 60 * 60,
    });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
