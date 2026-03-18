import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const PHOTOGRAPHER_EMAIL = "renevision.media@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export const runtime = "nodejs";

type CalendlyWebhookPayload = {
  event?: string;
  created_at?: string;
  payload?: {
    event_type?: {
      name?: string;
      slug?: string;
    };
    scheduled_event?: {
      uri?: string;
      name?: string;
      status?: string;
      start_time?: string;
      end_time?: string;
    };
    invitee?: {
      uri?: string;
      email?: string;
      name?: string;
      status?: string;
      timezone?: string;
      canceled?: boolean;
    };
    tracking?: {
      utm_campaign?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_content?: string;
      utm_term?: string;
      salesforce_uuid?: string;
    };
  };
};

function parseSignatureHeader(header: string | null) {
  if (!header) {
    return null;
  }

  const pairs = new Map(
    header.split(",").map((part) => {
      const [key, value] = part.trim().split("=");
      return [key, value];
    })
  );

  const timestamp = pairs.get("t");
  const signature = pairs.get("v1") ?? pairs.get("signature");

  if (!timestamp || !signature) {
    return null;
  }

  return { timestamp, signature };
}

function verifyCalendlySignature(body: string, header: string | null, signingKey: string) {
  const parsed = parseSignatureHeader(header);
  if (!parsed) {
    return false;
  }

  const expected = createHmac("sha256", signingKey)
    .update(`${parsed.timestamp}.${body}`)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(parsed.signature, "hex");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer);
}

function summarizeEvent(data: CalendlyWebhookPayload) {
  return {
    event: data.event ?? "unknown",
    createdAt: data.created_at ?? null,
    inviteeEmail: data.payload?.invitee?.email ?? null,
    inviteeName: data.payload?.invitee?.name ?? null,
    inviteeStatus: data.payload?.invitee?.status ?? null,
    inviteeTimezone: data.payload?.invitee?.timezone ?? null,
    eventTypeName: data.payload?.event_type?.name ?? null,
    eventTypeSlug: data.payload?.event_type?.slug ?? null,
    scheduledEventUri: data.payload?.scheduled_event?.uri ?? null,
    scheduledEventName: data.payload?.scheduled_event?.name ?? null,
    scheduledEventStatus: data.payload?.scheduled_event?.status ?? null,
    startsAt: data.payload?.scheduled_event?.start_time ?? null,
    endsAt: data.payload?.scheduled_event?.end_time ?? null,
    tracking: data.payload?.tracking ?? null,
  };
}

type EventSummary = ReturnType<typeof summarizeEvent>;

function formatTime(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

async function sendBookingNotification(summary: EventSummary) {
  const isCancel = summary.event === "invitee.canceled";
  const subject = isCancel
    ? `Booking cancelled — ${summary.inviteeName ?? summary.inviteeEmail}`
    : `New booking — ${summary.inviteeName ?? summary.inviteeEmail}`;

  const html = `
    <h2 style="margin:0 0 16px">${isCancel ? "❌ Booking Cancelled" : "✅ New Booking"}</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td><strong>${summary.inviteeName ?? "—"}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${summary.inviteeEmail ?? "—"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Session</td><td>${summary.eventTypeName ?? summary.scheduledEventName ?? "—"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Starts</td><td>${formatTime(summary.startsAt)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Ends</td><td>${formatTime(summary.endsAt)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Timezone</td><td>${summary.inviteeTimezone ?? "—"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Status</td><td>${summary.inviteeStatus ?? "—"}</td></tr>
    </table>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: PHOTOGRAPHER_EMAIL,
      subject,
      html,
    });
  } catch (err) {
    console.error("[calendly webhook] failed to send notification email", err);
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/webhooks/calendly",
    message: "Calendly webhook receiver is ready.",
  });
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  const signatureHeader =
    request.headers.get("calendly-webhook-signature") ??
    request.headers.get("Calendly-Webhook-Signature");

  if (
    signingKey &&
    !verifyCalendlySignature(rawBody, signatureHeader, signingKey)
  ) {
    return NextResponse.json(
      { ok: false, error: "Invalid Calendly webhook signature." },
      { status: 401 }
    );
  }

  let payload: CalendlyWebhookPayload;

  try {
    payload = JSON.parse(rawBody) as CalendlyWebhookPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const summary = summarizeEvent(payload);

  console.log("Calendly webhook received", summary);

  await sendBookingNotification(summary);

  return NextResponse.json({ ok: true, received: summary, signatureVerified: Boolean(signingKey) });
}
