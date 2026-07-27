import { NextResponse } from "next/server";
import type { ContactFormData } from "@/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactFormData>;

    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "First name, last name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (
      firstName.length > MAX_FIELD_LENGTH ||
      lastName.length > MAX_FIELD_LENGTH ||
      email.length > MAX_FIELD_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        { error: "Submission too long." },
        { status: 400 }
      );
    }

    // Forward via Web3Forms when configured, otherwise accept silently so the
    // form still gives the visitor a success state during local development.
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (accessKey) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio contact from ${firstName} ${lastName}`,
          from_name: `${firstName} ${lastName}`,
          email,
          company: body.company ?? "",
          budget: body.budget ?? "",
          message,
        }),
      });
      if (!res.ok) {
        return NextResponse.json(
          { error: "Failed to deliver message. Please try again." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
