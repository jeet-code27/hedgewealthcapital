import type { ServiceSlug } from "@/lib/services";

/** Copy for the /loan-programs comparison hub. Figures match the individual program pages. */
export const hubMeta = {
  title: "Compare Investor Loan Programs | Hedge Wealth Capital",
  description:
    "Compare fix and flip, construction, multifamily bridge, DSCR, cash-out and portfolio loans side by side, and find the right loan for your investment property.",
};

export const hubHero = {
  eyebrow: "All Loan Programs",
  title: "Compare Investor",
  accent: "Loan Programs",
  intro:
    "Every program below is business-purpose financing for non-owner-occupied investment property, in all 50 states and Washington, D.C. Start with what you want to do, then compare the options side by side.",
};

export const goals: { label: string; text: string; programs: ServiceSlug[] }[] = [
  { label: "Flip a house", text: "Buy, renovate and sell. Start with a fix and flip loan, or size on finished value with an ARV loan.", programs: ["hard-money-loans", "arv-loans"] },
  { label: "Build from the ground up", text: "Finance entitled land, site work and vertical construction on a shovel-ready project.", programs: ["ground-up-construction", "bridge-loans"] },
  { label: "Reposition an apartment building", text: "Fund the purchase and renovation of a 5–10 unit building before rents are stabilized.", programs: ["multifamily-bridge", "bridge-loans"] },
  { label: "Buy or hold a rental", text: "Lock in a 30-year fixed rate that qualifies on the property's rent, not your personal income.", programs: ["dscr-loans", "rental-portfolio-loans"] },
  { label: "Pull cash from a rental", text: "Refinance a property you own and turn its equity into capital for the next deal.", programs: ["cash-out-refinance", "dscr-loans"] },
  { label: "Close quickly", text: "When an acquisition can't wait for a bank, bridge capital gets you to the closing table.", programs: ["bridge-loans", "private-money-lenders"] },
];

export const compareRows: { slug: ServiceSlug; bestFor: string; term: string; leverage: string; basis: string }[] = [
  { slug: "hard-money-loans", bestFor: "Flipping a house", term: "Short-term", leverage: "Up to 100% of purchase + rehab, ARV capped", basis: "The property and your project plan" },
  { slug: "arv-loans", bestFor: "Heavier renovations", term: "6–12 months", leverage: "Sized on after-repair value, up to 100% of rehab", basis: "The value after renovation" },
  { slug: "ground-up-construction", bestFor: "Building from entitled land", term: "Short-term", leverage: "Up to 90% LTC", basis: "A shovel-ready plan and budget" },
  { slug: "multifamily-bridge", bestFor: "Value-add 5–10 unit buildings", term: "Short-term", leverage: "Up to 90% LTC", basis: "Your business plan; current cash flow isn't considered" },
  { slug: "bridge-loans", bestFor: "Time-sensitive acquisitions", term: "Short-term", leverage: "Up to 90% LTC", basis: "The property and your exit plan" },
  { slug: "dscr-loans", bestFor: "Buying or holding rentals", term: "30-year fixed", leverage: "Up to 80% LTV on purchase", basis: "Rental income and a 680+ FICO" },
  { slug: "cash-out-refinance", bestFor: "Pulling equity from a rental", term: "30-year fixed", leverage: "Up to 75% LTV", basis: "Rental income and a 680+ FICO" },
  { slug: "rental-portfolio-loans", bestFor: "Scaling several rentals", term: "Long-term", leverage: "Set by the portfolio", basis: "Cash flow, not personal income" },
];

export const hubFaqs = [
  { q: "Which loan is right for my investment property?", a: "It depends on your plan. Fix and flip and ARV loans suit renovations you will sell, construction loans suit new builds, bridge loans suit time-sensitive or unstabilized properties, and DSCR loans suit rentals you plan to hold." },
  { q: "What is the difference between LTC and LTV?", a: "Loan-to-cost (LTC) compares the loan to what the project costs you, including purchase and renovation. Loan-to-value (LTV) compares the loan to what the property is worth." },
  { q: "Does 100% financing mean I bring no cash to closing?", a: "No. Up to 100% applies to the purchase price and rehab budget, subject to an after-repair value cap. Closing costs, reserves and interest are paid separately, and final terms are set in underwriting." },
  { q: "Can I use more than one program on the same property?", a: "Yes. A common path is a short-term bridge or fix and flip loan during the renovation, followed by a 30-year DSCR loan once the property is rented." },
  { q: "Are these loans for a home I will live in?", a: "No. All of our programs are business-purpose loans for non-owner-occupied investment property." },
  { q: "How do I find out which programs I qualify for?", a: "Complete our short prequalification form or call 1-800-674-3804. Share the property, your plan and your timeline, and we will point you to the right program." },
];
