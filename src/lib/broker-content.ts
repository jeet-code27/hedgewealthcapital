/**
 * Brokers page copy, from the current hedgewealthcapital.com/brokers page, the client's
 * Oct 2026 email (broker program bullets) and the content doc (section 11).
 */
import { prequalify } from "@/lib/content";

export const brokerMeta = {
  title: "Broker Program | Partner With a Direct Private Lender | Hedge Wealth Capital",
  description:
    "Partner with Hedge Wealth Capital: DSCR, bridge and non-QM access, white-label service, Price-Beat Guarantee and nationwide lending in all 50 states. Apply to become a broker partner.",
};

export const brokerHero = {
  eyebrow: "Hedge Wealth Capital Broker Program",
  title: "Faster Closings,",
  accent: "Better Rates",
  lead: "Our Broker Program is designed to complement the expertise of top-tier real estate brokers and expand loan offerings to investors nationwide.",
  sub: "With a focus on speed, service, and reliability, Hedge Wealth Capital has funded over 9,000 projects totaling more than $2 billion in loan originations.",
  flow: [
    { label: "Your client", note: "Investor with a deal" },
    { label: "Your brokerage", note: "You own the relationship" },
    { label: "Hedge Wealth Capital", note: "We underwrite and fund" },
  ],
};

export const brokerPerks = [
  { title: "Full DSCR Market Access", text: "Bring rental deals of every size, from a single-family home to 10 units." },
  { title: "100% White-Label Service", text: "Your brand stays in front of your client while we handle the lending." },
  { title: "DSCR, Bridge & Non-QM Access", text: "One partner for long-term rentals, short-term bridge capital and non-QM scenarios." },
];

export const brokerPillars = [
  {
    key: "fast",
    title: "Fast",
    text: "In real estate, timing is everything. Our streamlined processes, experienced team and efficient underwriting allow for quick approvals and funding in as little as a few days.",
  },
  {
    key: "simple",
    title: "Simple",
    text: "We remove unnecessary hurdles. You work directly with decision-makers and get clear guidance at every step, so you can focus on serving your clients.",
  },
  {
    key: "reliable",
    title: "Reliable",
    text: "Consistent, dependable service, flexible terms and competitive rates. We deliver the capital your clients need, when they need it, so projects stay on track.",
  },
];

export const brokerDscr = {
  title: "Long-Term Rental Loans for Your Clients",
  body: "Flexible long-term rental financing for refinances and new purchases, structured around DSCR, so qualification is based on the property's cash flow with no personal tax returns or pay stubs required. Our DSCR Price-Beat Guarantee gives your clients added confidence that they are getting competitive rates and terms.",
  points: [
    "Competitive rates with Price-Beat Guarantee",
    "Up to 80% LTV",
    "680+ FICO and $100,000 minimum property value",
    "Single-family and 2–10 unit residential",
    "Various prepayment options",
    "Available in all 50 states and D.C.",
  ],
};

export const brokerSubmission = {
  title: "Start With a Complete Deal Summary",
  items: [
    "Property location and transaction purpose",
    "Purchase price or current value",
    "Requested financing amount",
    "Borrower's relevant experience",
    "Timing and any closing deadline",
    "Renovation or construction budget, if any",
    "Rent and operating information for income properties",
  ],
  roles: "Confirm who communicates with the borrower, what documents are needed and how your participation is documented, and discuss any compensation arrangements before making commitments to your client.",
};

export const brokerForm = {
  title: "Become a Broker Partner",
  nmls: ["Yes", "No"],
  referralSources: prequalify.referralSources,
  states: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida",
    "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
    "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Puerto Rico",
  ],
  volumes: [
    { key: "volBusiness", label: "Business purpose loans (RTL, fix & flip, bridge)" },
    { key: "volDscr", label: "DSCR loans" },
    { key: "volConsumer", label: "Residential consumer (agency, conventional, other non-QM)" },
  ],
  consent: prequalify.consent,
  success: "Thank you. Your broker application has been submitted. Our team will follow up about next steps.",
  error: "Your application could not be submitted. Please try again or call 1-800-674-3804.",
};

export const brokerFaqs = [
  {
    q: "Do I need to be a licensed mortgage broker?",
    a: "Broker licensing requirements vary by state, with the type of license dictated by the location of the subject property. If necessary, both the broker business entity and the originator must hold licenses as required by the state where the property is located.",
  },
  {
    q: "What do you need from me and my clients for a DSCR loan?",
    a: "A short one-page application, proof of insurance, an executed lease, the purchase settlement statement, valid identification, two months of bank statements, and entity documents with a W-9 if the borrower is an LLC.",
  },
  {
    q: "What prepayment options are available on DSCR loans?",
    a: "Borrowers can choose from several structures, including zero prepayment penalty, a 3-2-1 declining schedule, or 5-4-3-2-1 for the most competitive rate.",
  },
  { q: "Where does Hedge Wealth Capital lend?", a: "We lend in all 50 states and Washington, D.C." },
  {
    q: "Can I submit a client's deal for discussion?",
    a: "Yes. Contact HWC with a deal summary and confirm current broker participation requirements before sending sensitive borrower documents.",
  },
  {
    q: "Is broker compensation guaranteed?",
    a: "No compensation is promised by this page. Eligibility, payment terms, disclosures and any agreement are confirmed for each relationship and transaction.",
  },
  {
    q: "Can I advertise HWC's terms to my clients?",
    a: "Use only current materials HWC has approved for that purpose, and avoid presenting indicative terms as an approval.",
  },
  {
    q: "What if my client's transaction changes?",
    a: "Update HWC promptly. Changes to the property, borrower, financing need or timeline can affect the review.",
  },
];
