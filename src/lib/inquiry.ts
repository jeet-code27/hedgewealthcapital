import { dbConnect } from "@/lib/server/db";
import { adminNotification, customerThankYou, mailConfigured, sendMail } from "@/lib/server/mailer";
import { Submission } from "@/lib/server/models";
import { site } from "@/lib/site";

/** Display names for each website form, shown in emails and the admin panel. */
export const formLabels: Record<string, string> = {
  "homepage-prequalify": "Prequalification Request",
  "contact-page": "Deal Inquiry",
  "broker-application": "Broker Application",
};

/** Keep only short string fields so stray keys in a request can't bloat the record. */
function clean(fields: Record<string, unknown>) {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields).slice(0, 30)) {
    if (typeof v === "string" && v.trim() && /^[a-zA-Z][a-zA-Z0-9]{0,40}$/.test(k)) out[k] = v.trim().slice(0, 2000);
  }
  return out;
}

/**
 * Saves a validated form submission to MongoDB, emails the team, and sends the customer a
 * thank-you. The visitor sees success if the submission was stored or the team was emailed,
 * so a lead is never reported as received when it wasn't.
 */
export async function deliverInquiry(source: string, raw: Record<string, unknown>, request: Request): Promise<Response> {
  const fields = clean(raw);
  const formLabel = formLabels[source] ?? "Website Inquiry";
  const name = fields.name || [fields.firstName, fields.lastName].filter(Boolean).join(" ");
  const firstName = fields.firstName || name.split(" ")[0] || "";

  let id: string | null = null;
  try {
    await dbConnect();
    const doc = await Submission.create({
      form: source,
      name,
      email: fields.email ?? "",
      phone: fields.phone ?? "",
      fields,
      meta: {
        ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
        userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? "",
        page: request.headers.get("referer") ?? "",
      },
    });
    id = String(doc._id);
  } catch (err) {
    console.error(`[${source}] could not save submission:`, err);
  }

  const emails = { admin: false, customer: false };
  if (mailConfigured()) {
    const adminUrl = `${site.url}/admin/submissions${id ? `?id=${id}` : ""}`;
    const notify = adminNotification(formLabel, fields, adminUrl);
    const thanks = customerThankYou(firstName, formLabel);
    const [a, c] = await Promise.allSettled([
      sendMail({ to: process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL!, subject: `New ${formLabel}: ${name || fields.email}`, replyTo: fields.email, ...notify }),
      fields.email ? sendMail({ to: fields.email, subject: `Thank you for contacting ${site.name}`, ...thanks }) : Promise.reject(new Error("no email")),
    ]);
    emails.admin = a.status === "fulfilled";
    emails.customer = c.status === "fulfilled";
    if (a.status === "rejected") console.error(`[${source}] admin email failed:`, a.reason);
    if (c.status === "rejected" && fields.email) console.error(`[${source}] customer email failed:`, c.reason);
    if (id) await Submission.updateOne({ _id: id }, { emails }).catch(() => {});
  } else {
    console.warn(`[${source}] SMTP not configured; no emails sent.`);
  }

  if (id || emails.admin) return Response.json({ ok: true });
  return Response.json({ ok: false }, { status: 503 });
}

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
