import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

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

  return NextResponse.json({
    ok: true,
    received: summary,
    note:
      "Persist this event or trigger downstream actions here after connecting your datastore or CRM.",
    signatureVerified: Boolean(signingKey),
  });
}
