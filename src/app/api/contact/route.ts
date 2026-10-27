import { inquiryOptions } from "@/lib/contact-content";
import { deliverInquiry, EMAIL } from "@/lib/inquiry";

type ContactInquiry = {
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  purpose: string;
  city: string;
  state: string;
  address: string;
  amount: string;
  timing: string;
  description: string;
};

function validate(body: Partial<ContactInquiry>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!body.name?.trim()) errors.name = "Enter your name.";
  if (!body.email || !EMAIL.test(body.email)) errors.email = "Enter a valid email address.";
  if ((body.phone ?? "").replace(/\D/g, "").length !== 10) errors.phone = "Enter a 10-digit US phone number.";
  if (!body.contactMethod || !inquiryOptions.contactMethods.includes(body.contactMethod)) errors.contactMethod = "Choose how we should contact you.";
  if (!body.purpose || !inquiryOptions.purposes.includes(body.purpose)) errors.purpose = "Select a financing purpose.";
  if (!body.city?.trim()) errors.city = "Enter the property city.";
  if (!body.state || !inquiryOptions.states.includes(body.state)) errors.state = "Select a state.";
  if (!body.timing || !inquiryOptions.timings.includes(body.timing)) errors.timing = "Select your timing.";
  if ((body.description ?? "").length > 2000) errors.description = "Keep the description under 2,000 characters.";
  return errors;
}

/** Receives deal inquiries from the Contact page. */
export async function POST(request: Request) {
  let body: Partial<ContactInquiry>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const errors = validate(body);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  return deliverInquiry("contact-page", body);
}
