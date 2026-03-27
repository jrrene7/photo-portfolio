import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);
const PHOTOGRAPHER_EMAIL = "j-r@renevision.net";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(ip, 3, 60_000).allowed) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
  }

  const { email, website } = await req.json();

  // Honeypot — bots fill this, humans don't
  if (website) return NextResponse.json({ success: true });

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    // Notify photographer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: PHOTOGRAPHER_EMAIL,
      subject: "New session prep guide request",
      html: `<p>Someone requested the session prep guide.</p><p><strong>Email:</strong> ${email}</p>`,
    });

    // Confirm to subscriber
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Your session prep guide is on its way",
      html: `
        <p>Hi,</p>
        <p>Thanks for your interest! I'll personally send your session prep guide within 24 hours.</p>
        <p>In the meantime, feel free to browse packages or book a consultation at <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL}">${process.env.NEXT_PUBLIC_CALENDLY_URL}</a>.</p>
        <p>— Jean-Robert</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe]", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
