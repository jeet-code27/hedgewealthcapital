import nodemailer, { type Transporter } from "nodemailer";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

let transporter: Transporter | null = null;

export const mailConfigured = () => Boolean(process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD);

function getTransporter() {
  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_PASSWORD },
  });
  return transporter;
}

export async function sendMail(opts: { to: string; subject: string; html: string; text: string; replyTo?: string }) {
  if (!mailConfigured()) throw new Error("SMTP_EMAIL / SMTP_PASSWORD are not set.");
  await getTransporter().sendMail({ from: `"${site.name}" <${process.env.SMTP_EMAIL}>`, ...opts });
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
export const labelFor = (key: string) => key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());

// Hosted on Cloudinary so emails show the logo no matter which site is live on the domain.
const LOGO = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/h_120,f_png/hedgewealthcapital/email/logo.png`;

const perks = ["Up to 100% LTC", "Same-day approvals", "Close in 5–10 business days", "Lending in all 50 states + DC"];

/** Shared branded shell: logo header, navy text, green accent. Table layout for email clients. */
function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f2f4f9;font-family:Arial,Helvetica,sans-serif;color:#192861">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f9;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden">
<tr><td style="background:#ffffff;padding:22px 32px;border-bottom:1px solid #eef0f6"><img src="${LOGO}" alt="${site.name}" width="123" height="56" style="display:block;width:123px;height:56px;border:0"></td></tr>
<tr><td style="height:4px;background:#7AC644"></td></tr>
<tr><td style="padding:32px"><h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#192861">${esc(title)}</h1>${body}</td></tr>
<tr><td style="padding:20px 32px;background:#f7f8fc;font-size:12px;line-height:1.6;color:#6b7280">${site.name} · ${esc(contact.address)}<br>${esc(contact.phone)} · <a href="mailto:${contact.email}" style="color:#192861">${contact.email}</a></td></tr>
</table></td></tr></table></body></html>`;
}

export function adminNotification(formLabel: string, fields: Record<string, string>, adminUrl: string) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 12px;border-bottom:1px solid #eef0f6;font-size:13px;color:#6b7280;width:38%;vertical-align:top">${esc(labelFor(k))}</td><td style="padding:10px 12px;border-bottom:1px solid #eef0f6;font-size:14px;font-weight:bold;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("");
  const html = layout(
    `New ${formLabel}`,
    `<p style="margin:0 0 20px;font-size:15px;color:#4b5563">A new submission just came in from the website.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef0f6;border-radius:12px">${rows}</table>
<p style="margin:24px 0 0"><a href="${adminUrl}" style="display:inline-block;background:#192861;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:10px">Open in Admin Panel</a></p>`,
  );
  const text = `New ${formLabel}\n\n${Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${labelFor(k)}: ${v}`)
    .join("\n")}\n\n${adminUrl}`;
  return { html, text };
}

export function customerThankYou(firstName: string, formLabel: string) {
  const hello = firstName ? `Thank you, ${firstName}!` : "Thank you!";
  const html = layout(
    hello,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#4b5563">Thank you for filling out our ${esc(formLabel.toLowerCase())} form. We've received your details and a member of our lending team will contact you soon, typically within one business day.</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.7;color:#4b5563">Need to talk sooner? Call us at <a href="${contact.phoneHref}" style="color:#192861;font-weight:bold">${esc(contact.phone)}</a>.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="background:#f2f9ec;border-radius:12px;width:100%"><tr><td style="padding:18px 20px 10px;font-size:14px;font-weight:bold;color:#192861">Why investors choose ${site.name}</td></tr>
${perks.map((p) => `<tr><td style="padding:4px 20px;font-size:14px;line-height:1.5;color:#192861"><span style="display:inline-block;width:20px;height:20px;line-height:20px;text-align:center;border-radius:10px;background:#7AC644;color:#192861;font-weight:bold;font-size:12px;margin-right:8px">✓</span>${p === perks[0] ? `<strong>${p}</strong> on fix &amp; flip and construction` : p}</td></tr>`).join("")}
<tr><td style="height:12px"></td></tr></table>
<p style="margin:24px 0 0;font-size:15px;color:#192861">— The ${site.name} Team</p>`,
  );
  const text = `${hello}\n\nThank you for filling out our ${formLabel.toLowerCase()} form. A member of our lending team will contact you soon.\n\nNeed to talk sooner? Call ${contact.phone}.\n\nWhy investors choose ${site.name}:\n${perks.map((p) => `- ${p}`).join("\n")}\n\n— The ${site.name} Team`;
  return { html, text };
}
