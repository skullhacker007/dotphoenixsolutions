import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Configuration
const MAX_REQUEST_SIZE = 10 * 1024; // 10 KB
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_REQUIREMENT_LENGTH = 200;
const MAX_SUBCATEGORY_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_SOURCE_LENGTH = 200;

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;
const MAX_RATE_LIMIT_ENTRIES = 5000;

const rateLimitStore = new Map<
  string,
  { count: number; resetAt: number }
>();

function cleanupRateLimitStore(now: number) {
  if (rateLimitStore.size > MAX_RATE_LIMIT_ENTRIES) {
    for (const [ip, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(ip);
      }
    }
    if (rateLimitStore.size > MAX_RATE_LIMIT_ENTRIES) {
      const oldestKeys = Array.from(rateLimitStore.keys()).slice(0, 1000);
      for (const k of oldestKeys) {
        rateLimitStore.delete(k);
      }
    }
  }
}

const RESPONSE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
  "X-Content-Type-Options": "nosniff",
};

interface ContactRequestBody {
  company?: unknown; // Honeypot field
  email?: unknown;
  phone?: unknown;
  requirement?: unknown;
  subCategory?: unknown;
  message?: unknown;
  source?: unknown;
}

export async function POST(req: Request) {
  try {
    // 1. Validate content type
    const contentType = req.headers.get("content-type");

    if (!contentType?.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 415, headers: RESPONSE_HEADERS },
      );
    }

    // 2. Protect against oversized requests
    const contentLength = Number(req.headers.get("content-length") || 0);

    if (contentLength > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { error: "Request payload too large" },
        { status: 413, headers: RESPONSE_HEADERS },
      );
    }

    // 3. Parse JSON
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400, headers: RESPONSE_HEADERS },
      );
    }

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400, headers: RESPONSE_HEADERS },
      );
    }

    const input = body as ContactRequestBody;

    // 4. Honeypot verification (silent drop for automated bots)
    if (
      typeof input.company === "string" &&
      input.company.trim().length > 0
    ) {
      return NextResponse.json(
        { success: true },
        { status: 200, headers: RESPONSE_HEADERS },
      );
    }

    // 5. Sanitize inputs
    const payload = {
      email: sanitizeSingleLine(input.email),
      phone: sanitizeSingleLine(input.phone),
      requirement: sanitizeSingleLine(input.requirement),
      subCategory: sanitizeSingleLine(input.subCategory),
      message: sanitizeMultiLine(input.message),
      source: sanitizeSingleLine(input.source),
    };

    // 6. Validate required fields
    if (!payload.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400, headers: RESPONSE_HEADERS },
      );
    }

    // 7. Validate field lengths
    const limits: Record<string, number> = {
      email: MAX_EMAIL_LENGTH,
      phone: MAX_PHONE_LENGTH,
      requirement: MAX_REQUIREMENT_LENGTH,
      subCategory: MAX_SUBCATEGORY_LENGTH,
      message: MAX_MESSAGE_LENGTH,
      source: MAX_SOURCE_LENGTH,
    };

    for (const [field, maxLength] of Object.entries(limits)) {
      if (payload[field as keyof typeof payload].length > maxLength) {
        return NextResponse.json(
          { error: `${field} exceeds maximum allowed length` },
          { status: 400, headers: RESPONSE_HEADERS },
        );
      }
    }

    // 8. Validate email format
    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400, headers: RESPONSE_HEADERS },
      );
    }

    // 9. Rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const rawIp =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const clientIp = rawIp.replace(/[^a-zA-Z0-9.:_-]/g, "").slice(0, 45);

    const now = Date.now();
    cleanupRateLimitStore(now);

    const rateLimit = rateLimitStore.get(clientIp);

    if (rateLimit && now < rateLimit.resetAt) {
      if (rateLimit.count >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          {
            status: 429,
            headers: {
              ...RESPONSE_HEADERS,
              "Retry-After": String(
                Math.ceil((rateLimit.resetAt - now) / 1000),
              ),
            },
          },
        );
      }

      rateLimit.count++;
    } else {
      rateLimitStore.set(clientIp, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW,
      });
    }

    // 10. Send email
    try {
      await sendContactEmail(payload);
    } catch (error) {
      console.error("Contact email delivery failed:", error);

      return NextResponse.json(
        { error: "Email service unavailable" },
        { status: 503, headers: RESPONSE_HEADERS },
      );
    }

    // 11. Success
    return NextResponse.json(
      { success: true },
      { status: 200, headers: RESPONSE_HEADERS },
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { error: "Failed to process contact request" },
      { status: 500, headers: RESPONSE_HEADERS },
    );
  }
}

/* ---------- Helpers ---------- */

function sanitizeSingleLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]/g, " ").trim();
}

function sanitizeMultiLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

function isValidEmail(email: string): boolean {
  if (email.length > MAX_EMAIL_LENGTH) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
