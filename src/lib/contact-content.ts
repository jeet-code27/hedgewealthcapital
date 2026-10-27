/**
 * Contact page copy, from content-reference/Hedge_Wealth_Capital_Website_content.docx (section 14)
 * and the current hedgewealthcapital.com contact details.
 */
import { contact } from "@/lib/content";

export const contactMeta = {
  title: "Contact Hedge Wealth Capital | Discuss Your Deal",
  description:
    "Contact Hedge Wealth Capital about real estate investment financing. Share your property, project type, financing need and timeline, or call 1-800-674-3804.",
};

export const contactHero = {
  eyebrow: "Contact HWC",
  title: "Tell Us About Your",
  accent: "Next Investment",
  lead: "Share where the property is, what you plan to do, and the financing questions you need answered. Our loan officers are standing by to help.",
};

export const contactChannels = [
  { key: "phone", label: "Call a loan officer", value: contact.phone, href: contact.phoneHref, note: "Price your loan in minutes" },
  { key: "email", label: "Email our team", value: contact.email, href: `mailto:${contact.email}`, note: "Send your deal summary" },
  {
    key: "office",
    label: "Visit our office",
    value: contact.address,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`,
    note: "Get directions",
  },
] as const;

export const inquiryOptions = {
  contactMethods: ["Phone", "Email", "Text"],
  purposes: [
    "Fix & Flip / Hard Money",
    "DSCR Rental Loan",
    "Cash-Out Refinance",
    "Rental Portfolio",
    "Bridge Loan",
    "Ground-Up Construction",
    "Multifamily",
    "Not sure yet",
  ],
  timings: ["ASAP – under contract", "Within 30 days", "1–3 months", "Just exploring"],
  states: [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  ],
};

export const inquiryCopy = {
  title: "Start Your Deal Inquiry",
  helper:
    "Please do not include Social Security numbers, bank account numbers, identification documents, or other sensitive financial information in this inquiry form.",
  button: "Send My Deal Inquiry",
  note: "Submitting this form requests a financing conversation. It is not a loan application approval, rate lock, or commitment to lend.",
  success: `Thank you. Your inquiry has been submitted. If your transaction is time-sensitive, please call ${contact.phone} and reference the property location.`,
  error: "Your inquiry could not be submitted. Please try again or contact HWC by phone or email.",
};

export const contactFaqs = [
  { q: "Do I need every document before contacting HWC?", a: "No. Begin with the information available and explain what is still being confirmed." },
  { q: "Should I email bank statements or identification?", a: "Ask HWC for its approved document-submission method before sending sensitive information." },
  { q: "Can I discuss more than one property?", a: "Yes. Describe each property separately so its location, purpose, and financing requirements are clear." },
  {
    q: "When should I follow up?",
    a: "If your transaction has a deadline, call 1-800-674-3804 and explain the timing. Do not rely on an unconfirmed response or closing schedule.",
  },
];
