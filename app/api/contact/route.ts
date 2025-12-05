import { NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

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

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Required fields missing" },
        { status: 400 },
      );
    }

    // ✅ Read Service Account from ENV instead of file
    const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64!;
    if (!base64)
      throw new Error("GOOGLE_SERVICE_ACCOUNT_BASE64 is not defined");

    const json = Buffer.from(base64, "base64").toString("utf8");
    const creds = JSON.parse(json);

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
      Company: companyName || "",
      Email: email,
      Phone: phone || "",
      Service: serviceRequest || "",
      Subject: subject || "",
      Message: message,
    });

    return NextResponse.json({ success: true, message: "Data saved" });
  } catch (error) {
    console.error("Google Sheet Error:", error);

    return NextResponse.json(
      { success: false, error: "Data not saved" },
      { status: 500 },
    );
  }
}
