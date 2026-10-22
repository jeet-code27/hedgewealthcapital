/**
 * Homepage copy, taken from content-reference/Hedge_Wealth_Capital_Website_content.docx.
 *
 * IMAGES: drop files into /public/images and set the `image` paths below
 * (e.g. "/images/fix-flip.jpg"). Leave `undefined` to show the styled placeholder.
 */

export const contact = {
  phone: "1-800-674-3804",
  phoneHref: "tel:18006743804",
  email: "info@hedgewealthcapital.com",
  address: "1017 Turnpike St., Suite 31, Canton, MA 02021",
};

export const nav = [
  { label: "Loan Programs", href: "/#loan-programs" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Brokers", href: "/brokers" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about-hedge-wealth-capital" },
  { label: "Contact", href: "/contact-us" },
];

// Current photos are free-licence stock from Unsplash (unsplash.com/license); swap for client photos anytime.
export const images: Record<string, string | undefined> = {
  fixFlip: "/images/fix-flip.jpg",
  dscr: "/images/dscr-rental.jpg",
  construction: "/images/construction.jpg",
  multifamily: "/images/multifamily.jpg",
  financing: "/images/financing.jpg",
  cta: "/images/cta.jpg",
};

export const certifications = [
  { src: "/images/certs/great-place-to-work.webp", alt: "Great Place To Work Certified, USA", width: 1086, height: 1536 },
  { src: "/images/certs/aapl-member.webp", alt: "Proud member of the American Association of Private Lenders", width: 145, height: 122 },
  { src: "/images/certs/nahb.webp", alt: "National Association of Home Builders member", width: 350, height: 251 },
];

export const hero = {
  eyebrow: "Real Estate Investment Financing",
  title: "Real Estate Investment Loans for Your Next Move",
  lead: "Buying a property, renovating for resale, building from the ground up, or growing your rental holdings? Start with financing that fits the project you actually plan to execute.",
  sub: "Explore Hedge Wealth Capital’s loan programs and discuss your property, budget, and timeline with our team.",
  primaryCta: { label: "Discuss Your Deal", href: "#prequalify" },
  secondaryCta: { label: "Compare Loan Programs", href: "#loan-programs" },
  disclaimer:
    "Financing is subject to underwriting, property eligibility, program availability, and final loan terms.",
};

export const strategies = [
  {
    key: "fixFlip",
    tag: "Fix & Flip",
    title: "Buy, Renovate, and Sell",
    body: "Explore fix-and-flip financing for an investment property that needs improvements before resale. Consider the acquisition, renovation budget, carrying costs, and exit together.",
    link: { label: "Explore Fix & Flip Loans", href: "/loan-programs/fix-flip-loans" },
  },
  {
    key: "dscr",
    tag: "DSCR Rental",
    title: "Purchase or Refinance a Rental",
    body: "Explore DSCR rental financing, where the property’s rental income is an important part of the qualification process.",
    link: { label: "Explore DSCR Rental Loans", href: "/loan-programs/rental-loans" },
  },
  {
    key: "construction",
    tag: "Ground-Up Construction",
    title: "Build a New Residential Project",
    body: "Discuss construction financing around your site, plans, budget, experience, and completion schedule.",
    link: { label: "Explore Construction Loans", href: "/loan-programs/construction-loans" },
  },
  {
    key: "multifamily",
    tag: "Multifamily Bridge",
    title: "Improve a Multifamily Property",
    body: "Explore bridge financing for an acquisition or transition that needs time before a sale or longer-term financing.",
    link: { label: "Explore Multifamily Bridge Loans", href: "/loan-programs/multifamily-bridge-loans" },
  },
];

export const financing = {
  title: "Understand the Financing Before You Commit",
  lead: "A useful financing discussion goes beyond the headline rate.",
  body: "Ask what you will need at closing, how renovation or construction funds are released, what ongoing payments look like, and how the loan ends. Compare the full structure with your budget and intended exit.",
  closing: "Bring us the project details. Start the conversation with the questions that matter to your investment.",
  layers: [
    { label: "At Closing", q: "What will you need at closing?" },
    { label: "Fund Release", q: "How are renovation or construction funds released?" },
    { label: "Ongoing Payments", q: "What do ongoing payments look like?" },
    { label: "Loan Exit", q: "How does the loan end?" },
  ],
};

export const process = {
  title: "From Property Details to a Financing Decision",
  steps: [
    { title: "Share the Opportunity", body: "Tell us where the property is, what you plan to do, and when financing is needed." },
    { title: "Review the Requirements", body: "Discuss the appropriate program, supporting documents, and issues that may affect eligibility." },
    { title: "Evaluate the Proposed Terms", body: "Review any proposed pricing, fees, conditions, and cash requirements before deciding whether to proceed." },
    { title: "Complete the Closing Requirements", body: "Funding follows final approval and completion of the applicable closing conditions." },
  ],
};

export const compare = {
  title: "Find the Financing That Fits Your Property Strategy",
  lead: "The right starting point depends on what happens after you buy: renovate and sell, lease and hold, build, or reposition.",
  rows: [
    { program: "Fix & Flip", objective: "Improve a property for resale", points: "Purchase, renovation budget, expected value, and sale timeline" },
    { program: "DSCR Rental", objective: "Purchase or refinance an income property", points: "Rent, housing expenses, credit, equity, and holding strategy" },
    { program: "Ground-Up Construction", objective: "Develop a residential project", points: "Land, approvals, plans, budget, builder, and completion" },
    { program: "Multifamily Bridge", objective: "Acquire or improve a property during transition", points: "Occupancy, operating performance, renovation, and exit" },
  ],
  note: "A lower advertised rate does not necessarily produce a lower total cost. Review origination charges, third-party expenses, draw fees, interest calculations, extension terms, and prepayment provisions.",
};

export const faqs = [
  {
    q: "What types of financing can I discuss with HWC?",
    a: "HWC’s website presents fix-and-flip, DSCR rental, ground-up construction, and multifamily bridge programs. The appropriate option depends on the property, intended use, borrower profile, and current program availability.",
  },
  {
    q: "Can I ask about financing before choosing a property?",
    a: "You can contact HWC to discuss your investment plans and preparation. Any property-specific financing decision will require details about the proposed transaction.",
  },
  {
    q: "Does submitting an inquiry mean my loan is approved?",
    a: "No. An inquiry begins a conversation. Approval and funding require review of the borrower, property, documents, and applicable conditions.",
  },
  {
    q: "How do I find out my rate and cash requirements?",
    a: "Request a review of your specific transaction. A useful quote should identify pricing assumptions, fees, required equity, reserves, and any conditions affecting the offer.",
  },
];

export const footer = {
  brand:
    "Real estate investment financing for acquisition, renovation, rental ownership, construction, and multifamily transitions.",
  disclosure:
    "Website information is for general informational purposes and is not a commitment to lend. Financing is subject to underwriting, eligibility, availability, and final documentation. Rates, fees, leverage, terms, and conditions vary by transaction. Examples and calculations are illustrative and do not guarantee approval, investment performance, or future financing.",
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Licensing Disclosures", href: "/licensing-disclosures" },
  ],
};

export const prequalify = {
  eyebrow: "Find Out If You Prequalify",
  title: "Have a Property in Mind?",
  body: "Tell us what you are buying, building, or refinancing—and what needs to happen next.",
  points: [
    "Share the property, plan, and timeline",
    "Discuss the program that fits your strategy",
    "Review requirements before you commit",
  ],
  loanProducts: ["Fix & Flip", "DSCR Rental", "Ground-Up Construction", "Multifamily Bridge", "Not sure yet"],
  referralSources: ["Google Search", "Referral", "Broker", "Social Media", "Event", "Other"],
  helper:
    "Please do not include Social Security numbers, bank account numbers, identification documents, or other sensitive financial information in this inquiry form.",
  consent:
    "Loan Communications: By submitting this form, you agree to receive text messages and calls from HEDGE WEALTH CAPITAL related to your loan application and borrower account. Message & data rates may apply. Message frequency varies. Reply HELP for help and STOP to cancel.",
  note: "Submitting this form requests a financing conversation. It is not a loan application approval, rate lock, or commitment to lend.",
  success: `Thank you. Your inquiry has been submitted. If your transaction is time-sensitive, please call ${contact.phone} and reference the property location.`,
  error: "Your inquiry could not be submitted. Please try again or contact HWC by phone or email.",
};

export const glossary = {
  eyebrow: "Financing Glossary",
  title: "Understand the Financing Behind the Investment",
  lead: "Clear explanations help you ask better questions.",
  terms: [
    { term: "LTV", name: "Loan-to-Value", def: "Loan amount divided by the property value used in the calculation." },
    { term: "LTC", name: "Loan-to-Cost", def: "Loan amount divided by the eligible project costs used in the calculation." },
    { term: "ARV", name: "After-Repair Value", def: "An estimate of property value after specified improvements." },
    { term: "Draw", name: "Fund Release", def: "A release of loan funds under the agreement’s conditions." },
    { term: "Maturity", name: "Loan End Date", def: "The date the remaining loan balance becomes due." },
    { term: "Refinance", name: "Replacement Loan", def: "A new loan used to replace existing financing." },
    { term: "DSCR", name: "Debt-Service Coverage Ratio", def: "Evaluates the relationship between qualifying property income and the payment obligations used by the program." },
  ],
};
