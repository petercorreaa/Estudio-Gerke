import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/content/site";
import { getPracticeAreaById } from "@/content/practice-areas";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
/** Real visitors take longer than this to fill the form; bots submit instantly. */
const MIN_ELAPSED_MS = 1500;

const payloadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  company: z.string().trim().max(200).optional().default(""),
  email: z.email().max(200),
  phone: z.string().trim().max(50).optional().default(""),
  areaId: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(20).max(2000),
  locale: z.enum(["es", "en"]),
  honeypot: z.string().optional().default(""),
  startedAt: z.number(),
});

/** Simple in-memory rate limiter — fine for a low-traffic boutique-firm site. */
const submissionsByIp = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = submissionsByIp.get(ip);

  if (!entry || now > entry.resetAt) {
    submissionsByIp.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

const emailLabels = {
  es: { name: "Nombre", company: "Empresa", email: "Correo", phone: "Teléfono", area: "Área de práctica", message: "Mensaje" },
  en: { name: "Name", company: "Company", email: "Email", phone: "Phone", area: "Practice area", message: "Message" },
} as const;

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    console.error("[api/contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars.");
    return NextResponse.json({ ok: false, error: "server_not_configured" }, { status: 500 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const data = parsed.data;

  // Spam: honeypot filled, or the form was submitted faster than a human can
  // type. Report success without sending mail, so the bot learns nothing.
  const elapsed = Date.now() - data.startedAt;
  if (data.honeypot !== "" || elapsed < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true });
  }

  const labels = emailLabels[data.locale];
  const areaName = data.areaId ? getPracticeAreaById(data.areaId)?.name[data.locale] : undefined;

  const lines = [
    `${labels.name}: ${data.name}`,
    data.company ? `${labels.company}: ${data.company}` : null,
    `${labels.email}: ${data.email}`,
    data.phone ? `${labels.phone}: ${data.phone}` : null,
    areaName ? `${labels.area}: ${areaName}` : null,
    "",
    data.message,
  ].filter((line): line is string => line !== null);

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: `${site.shortName} <${fromEmail}>`,
      to: toEmail,
      replyTo: data.email,
      subject: `${site.shortName} — ${labels.name}: ${data.name}`,
      text: lines.join("\n"),
    });

    if (result.error) {
      console.error("[api/contact] Resend error:", result.error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact] Unexpected error sending mail:", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
