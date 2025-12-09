import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const contactCount = await prisma.contact.count();

    return NextResponse.json({
      success: true,
      userCount,
      contactCount,
    });
  } catch (error: any) {
    console.error("Error fetching counts:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch counts" },
      { status: 500 },
    );
  }
}
