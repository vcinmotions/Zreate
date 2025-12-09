import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // ✅ FIX: Use ONLY NextResponse.json() with cookies.set()
    // Remove the serialize() method - it was causing conflicts
    const res = NextResponse.json({
      message: "Login successful",
      user: safeUser,
    });

    // ✅ Set cookies with consistent options
    const cookieOptions = {
      httpOnly: true,

      sameSite: "strict" as const,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    };

    res.cookies.set("token", token, cookieOptions);
    res.cookies.set("role", user.role, cookieOptions);
    res.cookies.set("user", JSON.stringify(safeUser), cookieOptions);

    return res;
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
