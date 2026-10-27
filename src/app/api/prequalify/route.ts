import { prequalify } from "@/lib/content";
import { deliverInquiry, EMAIL } from "@/lib/inquiry";

type Inquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loanProduct: string;
  referralSource: string;
};

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

/** Receives homepage prequalify inquiries. */
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

  return deliverInquiry("homepage-prequalify", body);
}
