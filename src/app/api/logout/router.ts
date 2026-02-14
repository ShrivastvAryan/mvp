import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // 🔥 Clear access token
  response.cookies.set("accessToken", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  // 🔥 Clear refresh token
  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  // 🔥 Clear auth flag
  response.cookies.set("isAuthenticated", "", {
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("role", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
