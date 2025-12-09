import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const id = context.params.id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 },
      );
    }

    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 },
      );
    }

    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Contact deleted successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error deleting contact:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete contact",
      },
      { status: 500 },
    );
  }
}
