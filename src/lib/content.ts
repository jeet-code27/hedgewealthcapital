/**
 * Homepage copy: client-supplied copy (Oct 2026 email), the current hedgewealthcapital.com
 * homepage, and content-reference/Hedge_Wealth_Capital_Website_content.docx.
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
  { label: "Areas", href: "/areas-we-serve" },
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
  eyebrow: "Limited Documentation – Same-Day Approval",
  title: "Private Money Loans for Real Estate Investors",
  accentWords: ["Real", "Estate", "Investors"],
  lead: "HWC offers a wide variety of no-income-verification loans for your real estate investment needs.",
  sub: "Fix & flip, ground-up construction, multifamily, and 30-year rental loans, funded with 100% of our own capital.",
  primaryCta: { label: "Find Out If You Prequalify", href: "#prequalify" },
  secondaryCta: { label: "Explore Loan Programs", href: "#loan-programs" },
  chips: [
    { label: "Up to 100% LTC", note: "Acquisition + rehab" },
    { label: "Same-Day Approval", note: "Limited documentation" },
    { label: "10-Day Closings", note: "Get funded fast" },
    { label: "All 50 States + DC", note: "Lending nationwide" },
  ],
  disclaimer:
    "Financing is subject to underwriting, property eligibility, program availability, and final loan terms.",
};

export const marquee = [
  "Up to 100% LTC",
  "Same-Day Approval",
  "10-Day Closings",
  "Price-Beat Guarantee",
  "No Tax Returns or W-2s",
  "30-Year Fixed Rental Loans",
  "All 50 States + DC",
  "100% Our Own Capital",
];

export const ltcPromo = {
  eyebrow: "Now Offering",
  value: 100,
  title: "Up to 100% LTC",
  lead: "Finance up to 100% of acquisition and rehab costs.",
  body: "Includes our usual low rates with an option for no upfront points.",
  callout: {
    title: "Property under contract?",
    body: "Contact us ASAP. We will beat any competitor’s loan to keep more cash in your pocket.",
  },
};

export const strategies = [
  {
    key: "fixFlip",
    tag: "100% Fix & Flip",
    title: "Premier Fix & Flip Loan",
    body: "The fix-to-flip loan for those who want to keep more cash in their pocket. Get 100% of purchase and rehab funds, up to 75% of ARV, including mixed-use properties.",
    link: { label: "Explore Hard Money Loans", href: "/hard-money-loans" },
  },
  {
    key: "construction",
    tag: "Ground Up",
    title: "Construction Loans",
    body: "The quick, smart, and effective alternative for financing up to 70% ACV with a 90% LTC prior to transitioning into a long-term loan.",
    link: { label: "Explore Construction Financing", href: "/bridge-loans#construction-bridge" },
  },
  {
    key: "multifamily",
    tag: "Multifamily",
    title: "Multifamily Properties Loan",
    body: "For experienced investors who seek purchase and rehab financing for 5–10 unit properties to maximize market rents. Also available to refinance owned properties for renovation.",
    link: { label: "Explore Bridge Loans", href: "/bridge-loans" },
  },
  {
    key: "dscr",
    tag: "30-Year Rental",
    title: "Rental Refi’s & Purchase",
    body: "The 30-year fixed-rate loan for investors looking to streamline into a 30-year Debt Service Coverage Ratio (DSCR) loan for rental properties.",
    link: { label: "Explore DSCR Loans", href: "/dscr-loans" },
  },
];

export const highlights = {
  eyebrow: "DSCR Rental Loans",
  title: "Program Highlights",
  lead: "Qualify on the property’s rental income: no tax returns, no W-2s, and no employment verification required.",
  featured: [
    { value: "80%", label: "Up to LTV" },
    { value: "30-YR", label: "Fixed rate" },
    { value: "680+", label: "FICO score" },
    { value: "10-Day", label: "Closings" },
  ],
  items: [
    "Price-Beat Guarantee",
    "10-Day Closings",
    "No Tax Returns, No W-2s and No Employment Required (DSCR Qualification)",
    "For Cash-Out, Rate & Term, and New Purchases",
    "Up to 80% LTV",
    "30-Year Fixed Rate",
    "No Call, 30-Year Amortization",
    "$100,000 Minimum Property Value",
    "680+ FICO Score",
    "Single-Family, 2–10 Unit Residential, 10+ Units, Mixed-Use and Commercial",
    "Eligible Entities: Corporations, LLCs and Individuals",
    "Prepayment Penalty: Declining Points",
  ],
};

export const process = {
  eyebrow: "How It Works",
  title: "Apply Today and Close in 5 to 10 Business Days",
  lead: "Get the money you need in half the time. HWC is the best choice for all your real estate investment private money loan needs.",
  steps: [
    { title: "Tell Us Your Story", body: "Share your property, your plan, and your timeline with our team." },
    { title: "Apply in Minutes", body: "Apply in minutes with just a few documents. No complicated forms." },
    { title: "Get Approved the Same Day", body: "Receive your approval the same day, then close in 5 to 10 business days." },
  ],
};

export const whyHwc = {
  eyebrow: "Why Choose HWC?",
  title: "HWC Is Invested in Your Success",
  body: "Whether you’re looking for a Fix-to-Flip or Fix-to-Rent loan, we evaluate borrowers as a whole and match your specific goals to a loan with the term that’s right for you. Other hard money lenders stick to hard-and-fast formulas. We review your full financial picture and use common-sense underwriting to make our decision.",
  benefits: [
    { icon: "phone", title: "Instant Information", body: "Call to price your loan in minutes." },
    { icon: "bolt", title: "Responsive Service", body: "Receive same-day loan approval." },
    { icon: "clock", title: "Fast Funding", body: "Loans close in 5 to 10 business days." },
    { icon: "percent", title: "Competitive Rates", body: "Contact us for your rate. Repeat borrowers save more." },
    { icon: "shield", title: "Easy Underwriting", body: "We make all underwriting decisions ourselves." },
    { icon: "doc", title: "Simple Application", body: "No complicated forms. Limited documentation requirements." },
    { icon: "wallet", title: "Keep More Cash", body: "Every loan is structured so you keep more of your money for your project." },
    { icon: "bank", title: "Industry-Leading Lender", body: "We fund loans with 100% of our own capital." },
  ],
};

export const about = {
  eyebrow: "About Hedge Wealth Capital",
  title: "A Lender Built by Investors, for Investors",
  paragraphs: [
    "Founded in 2010, Hedge Wealth Capital is a privately owned real estate financing firm known for speed, reliability, and exceptional service. With a dedicated team of 25 professionals based in Boston, Massachusetts, we serve investors nationwide, covering all 50 states and Washington, D.C.",
    "We offer a comprehensive suite of real estate investment financing solutions, including Ground-Up Construction, Multifamily Bridge Loans, Fix & Flip, and 15-Year Rental Loans.",
    "As real estate investors ourselves, we understand the challenges you face. With a portfolio of 275 properties under management, we created a lender specifically for investors, designed by investors who know the market, the risks, and the opportunities.",
  ],
  stats: [
    { value: 2010, prefix: "", suffix: "", label: "Founded", plain: true },
    { value: 50, prefix: "", suffix: " + DC", label: "States served" },
    { value: 25, prefix: "", suffix: "", label: "Dedicated professionals" },
    { value: 275, prefix: "", suffix: "", label: "Properties under management" },
  ],
  link: { label: "More About HWC", href: "/about-hedge-wealth-capital" },
};

export const broker = {
  eyebrow: "Broker Program",
  title: "Partner With Hedge Wealth Capital",
  body: "Our Broker Program is designed to complement the expertise of top-tier real estate brokers and expand loan offerings to investors nationwide. With a focus on speed, service, and reliability, Hedge Wealth Capital has funded over 9,000 projects totaling more than $2 billion in loan originations. Partner with us and experience the Hedge Wealth Capital difference today.",
  stats: [
    { value: 9000, prefix: "", suffix: "+", label: "Projects funded" },
    { value: 2, prefix: "$", suffix: "B+", label: "In loan originations" },
  ],
  points: ["Full DSCR Market Access", "100% White-Label Service", "DSCR, Bridge & Non-QM Access"],
  cta: { label: "Partner With Us", href: "/brokers" },
  deal: "Have a specific deal in mind? Call to price it out today.",
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
    "Private money loans for real estate investors: fix & flip, ground-up construction, multifamily, and 30-year rental loans in all 50 states.",
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
  body: "Just 5 minutes is all it takes to prequalify with HWC. Call or complete the form today.",
  points: [
    "Provide your contact information",
    "Answer a few simple questions",
    "Get your prequalification for an investment loan",
  ],
  loanProducts: ["Fix & Flip", "DSCR Rental", "Ground-Up Construction", "Multifamily Bridge", "Not sure yet"],
  referralSources: ["Builder Online", "BiggerPockets", "Direct Mail", "Event", "Facebook", "LinkedIn", "Referred", "RIR Podcast", "Think Realty", "Web Search", "Other"],
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
