import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const PHOTOGRAPHER_EMAIL = "j-r@renevision.net";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  const { name, email, sessionType, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    // Notify photographer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: PHOTOGRAPHER_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}${sessionType ? ` — ${sessionType}` : ""}`,
      html: `
        <h2 style="margin:0 0 16px">New Contact Inquiry</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:4px 16px 4px 0;color:#666">Name</td><td><strong>${name}</strong></td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#666">Email</td><td>${email}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#666">Session type</td><td>${sessionType || "Not specified"}</td></tr>
        </table>
        <p style="margin:20px 0 4px;font-family:sans-serif;font-size:14px;color:#666">Message</p>
        <p style="font-family:sans-serif;font-size:14px;background:#f5f5f5;padding:12px;border-radius:6px">${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Got your message — René Vision",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. I'll get back to you within 1–2 business days.</p>
        <p>In the meantime, feel free to browse the portfolio or book a consultation directly at <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL}">${process.env.NEXT_PUBLIC_CALENDLY_URL}</a>.</p>
        <p>— Jean-Robert</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
