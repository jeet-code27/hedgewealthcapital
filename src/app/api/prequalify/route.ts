import { prequalify } from "@/lib/content";

type Inquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loanProduct: string;
  referralSource: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Partial<Inquiry>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!body.firstName?.trim()) errors.firstName = "Enter your first name.";
  if (!body.lastName?.trim()) errors.lastName = "Enter your last name.";
  if (!body.email || !EMAIL.test(body.email)) errors.email = "Enter a valid email address.";
  if ((body.phone ?? "").replace(/\D/g, "").length !== 10) errors.phone = "Enter a 10-digit US phone number.";
  if (!body.loanProduct || !prequalify.loanProducts.includes(body.loanProduct)) errors.loanProduct = "Select a loan product.";
  if (!body.referralSource || !prequalify.referralSources.includes(body.referralSource)) errors.referralSource = "Select an option.";
  return errors;
}

/**
 * Receives homepage prequalify inquiries.
 *
 * Set INQUIRY_WEBHOOK_URL (CRM, Zapier, email service, etc.) to deliver submissions.
 * Without it, development logs the inquiry; production reports failure so users are
 * never told an inquiry was received when it wasn't.
 */
export async function POST(request: Request) {
  let body: Partial<Inquiry>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const errors = validate(body);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const inquiry = { ...body, submittedAt: new Date().toISOString(), source: "homepage-prequalify" };
  const webhook = process.env.INQUIRY_WEBHOOK_URL;

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry),
    });
    if (!res.ok) return Response.json({ ok: false }, { status: 502 });
    return Response.json({ ok: true });
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[prequalify] inquiry (no INQUIRY_WEBHOOK_URL set):", inquiry);
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false }, { status: 503 });
}
