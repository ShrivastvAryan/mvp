export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect product creation & contact routes
  if (
    pathname.startsWith("/api/product") ||
    pathname.startsWith("/api/contact")
  ) {
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No token" },
        { status: 401 }
      );
    }

    try {
      const decoded = verifyAccessToken(token) as {
        userId: string;
        role: string;
        email: string;
      };

      const headers = new Headers(request.headers);

      headers.set("user-id", decoded.userId);
      headers.set("user-email", decoded.email); // 🔥 add this for contact

      // Only restrict role for product
      if (pathname.startsWith("/api/product")) {
        if (decoded.role !== "seller") {
          return NextResponse.json(
            { message: "Access denied" },
            { status: 403 }
          );
        }
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });

    } catch (error) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}