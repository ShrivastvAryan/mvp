// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password, role } = await req.json();

if (!email || !password) {
  return NextResponse.json(
    { success: false, message: "Email and password required" },
    { status: 400 }
  );
}

// 🔎 Find user by email
const user = await User.findOne({ email }).select("+password");

if (!user) {
  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}

// 🔐 Check role mismatch (optional check)
if (role && user.role !== role) {
  return NextResponse.json(
    {
      success: false,
      message: `This account is registered as ${user.role}`,
    },
    { status: 403 }
  );
}


    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🔐 Compare hashed password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🎯 Payload from DB (NOT frontend)
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });

    // 🍪 Access Token
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    // 🍪 Refresh Token
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // 👇 Optional UI cookies (not required)
    response.cookies.set("isAuthenticated", "true", {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60,
    });

    response.cookies.set("role", user.role, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
