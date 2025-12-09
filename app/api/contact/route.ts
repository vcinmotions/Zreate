// import { NextResponse } from "next/server";
// import { GoogleSpreadsheet } from "google-spreadsheet";
// import { JWT } from "google-auth-library";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       fullName,
//       companyName,
//       email,
//       phone,
//       serviceRequest,
//       subject,
//       message,
//     } = body;

//     if (!fullName || !email || !message) {
//       return NextResponse.json(
//         { success: false, error: "Required fields missing" },
//         { status: 400 },
//       );
//     }

//     // ✅ Read Service Account from ENV instead of file
//     const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64!;
//     if (!base64)
//       throw new Error("GOOGLE_SERVICE_ACCOUNT_BASE64 is not defined");

//     const json = Buffer.from(base64, "base64").toString("utf8");
//     const creds = JSON.parse(json);

//     const serviceAccountAuth = new JWT({
//       email: creds.client_email,
//       key: creds.private_key,
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });

//     const doc = new GoogleSpreadsheet(
//       process.env.GOOGLE_SHEET_ID as string,
//       serviceAccountAuth,
//     );

//     await doc.loadInfo();
//     const sheet = doc.sheetsByIndex[0];

//     await sheet.addRow({
//       Date: new Date().toLocaleString(),
//       "Full Name": fullName,
//       Company: companyName || "",
//       Email: email,
//       Phone: phone || "",
//       Service: serviceRequest || "",
//       Subject: subject || "",
//       Message: message,
//     });

//     return NextResponse.json({ success: true, message: "Data saved" });
//   } catch (error) {
//     console.error("Google Sheet Error:", error);

//     return NextResponse.json(
//       { success: false, error: "Data not saved" },
//       { status: 500 },
//     );
//   }
// }
import { NextResponse } from "next/server";
// make sure this path is correct
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      companyName,
      email,
      phone,
      serviceRequest,
      subject,
      message,
    } = body;

    // ✅ Basic validation
    if (!fullName || !email || !serviceRequest || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Required fields are missing" },
        { status: 400 },
      );
    }

    // ✅ Save to DB using Prisma Contact model
    const contact = await prisma.contact.create({
      data: {
        fullName,
        companyName,
        email,
        phone,
        serviceRequest,
        subject,
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Contact data saved successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
// export async function GET() {
//   try {
//     const contacts = await prisma.contact.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json({
//       success: true,
//       data: contacts,
//     });
//   } catch (error) {
//     console.error("CONTACT GET ERROR:", error);

//     return NextResponse.json(
//       { success: false, error: "Failed to fetch contacts" },
//       { status: 500 },
//     );
//   }
// }
