// /app/api/admin/recent-contacts/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const recentContacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      data: recentContacts,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error fetching contacts" },
      { status: 500 },
    );
  }
}
