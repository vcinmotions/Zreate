import { NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import fs from "fs";
import path from "path";

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

    const filePath = path.join(process.cwd(), "keys", "google.json");
    const creds = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const serviceAccountAuth = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID as string,
      serviceAccountAuth,
    );

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({
      Date: new Date().toLocaleString(),
      "Full Name": fullName,
      Company: companyName,
      Email: email,
      Phone: phone,
      Service: serviceRequest,
      Subject: subject,
      Message: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google Sheet Error:", error);
    return NextResponse.json(
      { success: false, error: "Data not saved" },
      { status: 500 },
    );
  }
}
