import { NextResponse } from "next/server";
import type { ContactFormData } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactFormData;

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // TODO: Integrate email service (e.g. Resend, Nodemailer)
    console.log("Contact form submission:", body);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
