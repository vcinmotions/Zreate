// /app/api/admin/recent-users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      data: recentUsers,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error fetching users" },
      { status: 500 },
    );
  }
}
