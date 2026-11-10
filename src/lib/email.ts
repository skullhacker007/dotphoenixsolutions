import { Resend } from "resend";

export interface ContactEmailPayload {
  email: string;
  phone?: string;
  requirement?: string;
  subCategory?: string;
  message: string;
  source?: string;
}

/**
 * Lazily initialize Resend.
 * API key remains server-side in .env.local.
 */
function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return new Resend(apiKey);
}

/**
 * Send contact form notification email.
 */
export async function sendContactEmail(data: ContactEmailPayload) {
  const resend = getResendClient();

  const { data: result, error } = await resend.emails.send({
    from: "Website Enquiry <no-reply@dotphoenixsolutions.com>",
    to: ["info@dotphoenixsolutions.com"],
    replyTo: data.email,
    subject: "New Website Contact Submission",

    html: `
      <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
        <h2>New Contact Form Submission</h2>

        <table width="100%" cellpadding="8" cellspacing="0"
          style="border-collapse:collapse">
          ${row("Email", data.email)}
          ${row("Phone", data.phone)}
          ${row("Requirement", data.requirement)}
          ${row("Sub Category", data.subCategory)}
          ${row("Source", data.source)}
        </table>

        <div style="margin-top:16px">
          <strong>Message</strong>
          <p style="white-space:pre-line">
            ${escapeHtml(data.message || "No message provided")}
          </p>
        </div>

        <hr style="margin:24px 0" />

        <small style="color:#666">
          Sent from dotphoenixsolutions.com
          • ${new Date().toISOString()}
        </small>
      </div>
    `,
  });

  // Resend may return an error without throwing an exception.
  if (error) {
    console.error("Resend email delivery error:", error);
    throw new Error("Failed to send contact email");
  }

  if (!result?.id) {
    throw new Error("Email delivery was not confirmed by Resend");
  }

  return result;
}

/* ---------- Rendering helpers ---------- */

function row(label: string, value?: string): string {
  if (!value) return "";

  return `
    <tr>
      <td style="font-weight:600">${escapeHtml(label)}</td>
      <td>${escapeHtml(value)}</td>
    </tr>
  `;
}

/**
 * Prevent HTML injection in email content.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}