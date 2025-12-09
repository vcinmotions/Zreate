// app/api/auth/signout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create a response
    const response = NextResponse.json({ message: "Signed out successfully" });

    // Delete the token cookie (if you’re using a cookie for auth)
    response.cookies.set("token", "", { maxAge: 0, path: "/" });
    response.cookies.set("role", "", { maxAge: 0, path: "/" });
    response.cookies.set("user", "", { maxAge: 0, path: "/" });

    return response;
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.json({ error: "Signout failed" }, { status: 500 });
  }
}
