export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect product creation & seller routes
  if (pathname.startsWith("/api/product")) {
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No token ye error hai" },
        { status: 401 }
      );
    }

    try {
      const decoded = verifyAccessToken(token) as {
        userId: string;
        role: string;
      };

      // Allow only sellers to create products
      if (decoded.role !== "seller") {
        return NextResponse.json(
          { message: "Access denied" },
          { status: 403 }
        );
      }

      // Inject userId into headers
      const headers = new Headers(request.headers);
      headers.set("user-id", decoded.userId);

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
