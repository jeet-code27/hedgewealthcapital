/**
 * Delivers a validated inquiry to INQUIRY_WEBHOOK_URL (CRM, Zapier, email service, etc.).
 * Without a webhook, development logs the inquiry; production reports failure so users are
 * never told an inquiry was received when it wasn't.
 */
export async function deliverInquiry(source: string, fields: Record<string, unknown>): Promise<Response> {
  const inquiry = { ...fields, submittedAt: new Date().toISOString(), source };
  const webhook = process.env.INQUIRY_WEBHOOK_URL;

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry),
    });
    return res.ok ? Response.json({ ok: true }) : Response.json({ ok: false }, { status: 502 });
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(`[${source}] inquiry (no INQUIRY_WEBHOOK_URL set):`, inquiry);
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false }, { status: 503 });
}

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
