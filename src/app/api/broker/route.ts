import { brokerForm } from "@/lib/broker-content";
import { deliverInquiry, EMAIL } from "@/lib/inquiry";

type BrokerApplication = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  state: string;
  nmls: string;
  volBusiness: string;
  volDscr: string;
  volConsumer: string;
  referralSource: string;
  details: string;
};

function validate(body: Partial<BrokerApplication>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!body.firstName?.trim()) errors.firstName = "Enter your first name.";
  if (!body.lastName?.trim()) errors.lastName = "Enter your last name.";
  if (!body.email || !EMAIL.test(body.email)) errors.email = "Enter a valid email address.";
  if ((body.phone ?? "").replace(/\D/g, "").length !== 10) errors.phone = "Enter a 10-digit US phone number.";
  if (!body.company?.trim()) errors.company = "Enter your company or brokerage.";
  if (!body.state || !brokerForm.states.includes(body.state)) errors.state = "Select your state.";
  if (!body.nmls || !brokerForm.nmls.includes(body.nmls)) errors.nmls = "Select an option.";
  if (!body.referralSource || !brokerForm.referralSources.includes(body.referralSource)) errors.referralSource = "Select an option.";
  if ((body.details ?? "").length > 2000) errors.details = "Keep details under 2,000 characters.";
  return errors;
}

/** Receives broker partner applications from the Brokers page. */
export async function POST(request: Request) {
  let body: Partial<BrokerApplication>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const errors = validate(body);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  return deliverInquiry("broker-application", body, request);
}
