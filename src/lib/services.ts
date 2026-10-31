/**
 * Service page copy. Sources: the client's Oct 2026 email, the live hedgewealthcapital.com
 * loan-program pages, and content-reference/service and area pages.docx (keywords + structure).
 *
 * Each page is written around its own search intent so no two pages repeat the same copy.
 * Inline links use [anchor text](/path) and are rendered as internal links.
 * Hero/section photos are Unsplash placeholders in /public/images/services.
 */

export type ServiceSlug =
  | "hard-money-loans"
  | "private-money-lenders"
  | "dscr-loans"
  | "arv-loans"
  | "cash-out-refinance"
  | "rental-portfolio-loans"
  | "bridge-loans"
  | "ground-up-construction"
  | "multifamily-bridge";

export type ServiceWidget = "ltc-calculator" | "dscr-calculator" | "before-after";

export type ServicePage = {
  slug: ServiceSlug;
  path: string;
  name: string;
  tag: string;
  icon: "hammer" | "handshake" | "home" | "trend" | "cash" | "grid" | "bridge" | "crane" | "building";
  meta: { title: string; description: string; keywords: string[] };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    image: { src: string; alt: string };
    chips: { label: string; note: string }[];
  };
  stats: { value: string; label: string }[];
  sections: {
    id: string;
    heading: string;
    paragraphs: string[];
    points?: { title: string; text: string }[];
    image?: { src: string; alt: string };
  }[];
  widget?: ServiceWidget;
  steps: { heading: string; items: { title: string; text: string }[] };
  compare?: { heading: string; intro: string; columns: [string, string, string]; rows: [string, string, string][] };
  faqs: { q: string; a: string }[];
  related: ServiceSlug[];
};

export const services: ServicePage[] = [
  {
    slug: "hard-money-loans",
    path: "/hard-money-loans",
    name: "Hard Money Loans",
    tag: "Fix & Flip Financing",
    icon: "hammer",
    meta: {
      title: "Hard Money Loans for Flipping Houses | Up to 100% LTC",
      description:
        "Hard money fix and flip loans covering up to 100% of purchase and rehab. Same-day approval, pre-approval with no deal required, fast closings in all 50 states.",
      keywords: ["hard money loans for flipping houses", "hard money fix and flip loans", "hard money loan to flip houses", "hard money lenders for fix and flip"],
    },
    hero: {
      eyebrow: "Hard Money Fix & Flip Loans",
      title: "Hard Money Loans for",
      accent: "Flipping Houses",
      intro:
        "Buy the house and fund the renovation with one short-term loan. Hedge Wealth Capital lends up to 100% of the purchase price and 100% of the rehab budget, so more of your cash stays free for the next deal.",
      image: { src: "/images/services/hard-money-rehab.jpg", alt: "House under renovation with scaffolding, financed with a hard money loan" },
      chips: [
        { label: "Up to 100% LTC", note: "Purchase + rehab" },
        { label: "Same-Day Approval", note: "In-house underwriting" },
      ],
    },
    stats: [
      { value: "100%", label: "Of purchase price" },
      { value: "100%", label: "Of rehab budget" },
      { value: "6–12", label: "Month interest-only terms" },
      { value: "$0", label: "Prepayment penalty" },
    ],
    sections: [
      {
        id: "how-hard-money-works",
        heading: "How a Hard Money Loan to Flip Houses Works",
        paragraphs: [
          "A hard money loan is short-term, asset-based financing secured by the property you are buying. Instead of qualifying you on W-2s and debt-to-income ratios, we look at the deal itself: the purchase price, the scope of work, and what the home should be worth once the work is done.",
          "Your loan amount is sized on both total project cost (loan-to-cost) and the after-repair value. Fund up to 100% of acquisition and rehab, subject to an ARV cap that keeps every project sensibly leveraged. If ARV is the number that drives your deal, our [ARV loans](/arv-loans) page explains how after-repair value is measured.",
          "Payments are interest-only for a 6 to 12 month term, with the balance due when you sell or refinance. There is no prepayment penalty, so paying the loan off the week the house sells costs you nothing extra.",
        ],
        image: { src: "/images/fix-flip.jpg", alt: "Interior gut renovation in progress on a fix and flip property" },
      },
      {
        id: "pre-approval",
        heading: "Get Pre-Approved Before You Find the Deal",
        paragraphs: [
          "Speed wins deals. With our Investor Line of Credit you can become an approved borrower before you have a property under contract, so financing is already in place when the right house appears.",
        ],
        points: [
          { title: "No deal required", text: "Apply once, then shop with confidence. We provide proof of funds every 60 days or whenever you ask." },
          { title: "In-house underwriting", text: "Pre-approved borrowers can skip the third-party appraisal; we review the deal ourselves and can fund in as little as 48 hours." },
          { title: "Cash reserves", text: "We recommend at least $30,000 in available reserves to qualify for a line of credit and move quickly." },
          { title: "No upfront points option", text: "Ask about structures with no upfront origination points to keep more cash in the project." },
        ],
      },
      {
        id: "what-we-finance",
        heading: "Properties and Borrowers We Finance",
        paragraphs: [
          "We primarily finance single-family attached and detached homes, plus small multifamily rentals that need work before they can be sold or refinanced. Loans are business-purpose only, so we do not lend on owner-occupied primary residences.",
          "Perfect credit is not required. We look at the reasons behind any credit challenges, although a bankruptcy, foreclosure, short sale, lien or judgment in the last 24 months may stop an approval for now. Planning to keep the house as a rental? Exit straight into a long-term [DSCR loan](/dscr-loans) once the renovation is complete.",
        ],
      },
    ],
    widget: "ltc-calculator",
    steps: {
      heading: "From Pre-Approval to Payoff",
      items: [
        { title: "Get pre-approved", text: "Share a recent bank statement, a personal financial statement and two years of tax returns. Your tax-return bottom line is not a qualifying factor." },
        { title: "Lock up the property", text: "Send the contract, purchase price and a line-item scope of work for the renovation." },
        { title: "Close and start work", text: "We fund the purchase at closing and hold the rehab budget for draws as work is completed." },
        { title: "Sell or refinance", text: "Pay off the loan with no prepayment penalty, then repeat on the next project." },
      ],
    },
    compare: {
      heading: "Hard Money vs. a HELOC for Your Flip",
      intro: "A home equity line can work, but it puts your own house on the line if a project runs long.",
      columns: ["", "HWC hard money loan", "HELOC on your home"],
      rows: [
        ["Collateral", "The investment property", "Your primary residence"],
        ["Rehab funding", "Up to 100% of the budget", "Limited to your available line"],
        ["Credit impact", "Lines are not reported under normal circumstances", "Maxing the line can lower your score"],
        ["Approval basis", "The deal and your experience", "Personal income and DTI"],
      ],
    },
    faqs: [
      { q: "How much of a fix and flip can a hard money loan cover?", a: "Hedge Wealth Capital lends up to 100% of the purchase price and up to 100% of the rehab budget, subject to an after-repair value cap. You cover closing costs and any expenses outside the approved budget." },
      { q: "Do you lend on the purchase price or the appraised value?", a: "Both loan-to-cost and after-repair value are used to size the loan. We will not calculate your loan solely from the purchase price." },
      { q: "Is there a prepayment penalty on hard money loans?", a: "No. You can repay the loan before its maturity date with no prepayment fee." },
      { q: "Are your hard money loans fully amortizing?", a: "No. They are interest-only with a balloon payment due at the end of the 6 to 12 month term, which keeps monthly payments lower during the renovation." },
      { q: "Can I roll closing costs and points into the loan?", a: "No. We keep pricing competitive, and we believe borrowers should have some skin in the game, so closing costs are paid at closing." },
      { q: "What if the renovation takes longer than planned?", a: "Extensions are available when a project runs long. Extension pricing is set out in your loan terms, so ask your loan officer before closing." },
      { q: "Will you lend on my primary residence?", a: "No. Hard money loans are business-purpose commercial loans, so we only finance non-owner-occupied investment properties." },
      { q: "Is there a limit on how many deals I can do?", a: "No. You are limited only by the size of the Investor Line of Credit you are approved for, which can grow as your experience and finances grow." },
    ],
    related: ["arv-loans", "bridge-loans", "dscr-loans"],
  },

  {
    slug: "private-money-lenders",
    path: "/private-money-lenders",
    name: "Private Money Lenders",
    tag: "Direct Private Lender",
    icon: "handshake",
    meta: {
      title: "Private Money Lenders for Real Estate Investors | HWC",
      description:
        "Direct private money lender funding investors with its own capital since 2010. In-house underwriting, same-day approvals, loans in all 50 states and D.C.",
      keywords: ["private money lenders for real estate", "private money lender", "private lenders for real estate", "private mortgage lenders"],
    },
    hero: {
      eyebrow: "Direct Private Real Estate Lender",
      title: "Private Money Lenders for",
      accent: "Real Estate Investors",
      intro:
        "Hedge Wealth Capital is a privately owned lender that funds every loan with its own capital. No outside investors to answer to, no committee delays: just investors financing investors since 2010.",
      image: { src: "/images/services/private-lender-handshake.jpg", alt: "Real estate investor and private money lender shaking hands over a model house" },
      chips: [
        { label: "100% Own Capital", note: "Direct, not a broker" },
        { label: "Since 2010", note: "Investors ourselves" },
      ],
    },
    stats: [
      { value: "15+", label: "Years lending" },
      { value: "9,000+", label: "Loans funded" },
      { value: "$2B+", label: "In originations" },
      { value: "50 + DC", label: "States served" },
    ],
    sections: [
      {
        id: "what-is-a-private-lender",
        heading: "What a Private Money Lender Does Differently",
        paragraphs: [
          "Banks lend depositors' money under strict agency guidelines, so a missing kitchen or an investor's self-employment income can stop a loan cold. A private money lender lends its own capital and sets its own rules, which means decisions are based on the real estate, the plan and the person behind it.",
          "Because we make every underwriting decision ourselves, you talk directly to the people who approve your loan. That is how we deliver same-day approvals and keep closing dates, deal after deal.",
        ],
        image: { src: "/images/services/investors-meeting.jpg", alt: "Investor meeting a private lender outside a modern building" },
      },
      {
        id: "investors-financing-investors",
        heading: "A Lender Built by Real Estate Investors",
        paragraphs: [
          "Hedge Wealth Capital is part of a vertically integrated real estate group that acquires, renovates and manages its own properties, with a rental portfolio of more than 275 units. We know what a stalled draw or a slipped closing costs an investor, because we have lived it. Read more [about Hedge Wealth Capital](/about-hedge-wealth-capital).",
        ],
        points: [
          { title: "Common-sense underwriting", text: "We review your full financial picture instead of running you through a rigid formula." },
          { title: "Direct communication", text: "No middlemen. Your loan officer works alongside the people who approve and fund the loan." },
          { title: "Repeat-borrower pricing", text: "Contact us for your rate; repeat borrowers save more." },
          { title: "Price-Beat Guarantee", text: "Property under contract? Bring us a competing offer and we will work to beat it." },
        ],
      },
      {
        id: "private-lender-loans",
        heading: "Private Lender Loans for Every Strategy",
        paragraphs: [
          "One relationship can cover the full life of an investment. Buy and renovate with [hard money loans for flipping houses](/hard-money-loans), move fast on time-sensitive acquisitions with [bridge loans](/bridge-loans), then hold for the long term with a 30-year [DSCR loan](/dscr-loans) or pull equity out through a [cash-out refinance](/rental-loans/cash-out-refinance).",
          "Growing past a handful of doors? Our [rental portfolio loans](/rental-portfolio-loans) are built for investors who want one lender behind an entire portfolio.",
        ],
      },
    ],
    steps: {
      heading: "How to Choose a Private Lender",
      items: [
        { title: "Confirm they are direct", text: "Ask whether the lender funds loans with its own capital or brokers them to someone else." },
        { title: "Check the track record", text: "Look for years in business, loans funded and how consistently they hit closing dates." },
        { title: "Compare the full cost", text: "Look past the rate to points, fees, draw terms, extensions and prepayment provisions." },
        { title: "Talk to the decision-maker", text: "The best private lenders let you speak with the people who actually approve the loan." },
      ],
    },
    compare: {
      heading: "Private Money vs. Bank Financing",
      intro: "Where a private lender fits next to a conventional bank loan.",
      columns: ["", "Hedge Wealth Capital", "Conventional bank"],
      rows: [
        ["Decision maker", "In-house, by investors", "Committee and agency guidelines"],
        ["Approval speed", "Same-day approval", "Weeks of underwriting"],
        ["Property condition", "Distressed and mid-renovation OK", "Must be move-in ready"],
        ["Income documentation", "Low-doc options available", "Tax returns, W-2s and DTI"],
      ],
    },
    faqs: [
      { q: "What is a private money lender in real estate?", a: "A private money lender is a non-bank lender that funds real estate loans with its own capital. Hedge Wealth Capital lends 100% of its own funds to real estate investors and makes all underwriting decisions in-house." },
      { q: "How are private lender loans different from conventional mortgages?", a: "They are business-purpose loans approved on the property and the investor's plan rather than agency guidelines, so they can close faster and finance properties a bank would not touch." },
      { q: "Is Hedge Wealth Capital a broker or a direct lender?", a: "We are a direct lender. We fund loans with our own capital, which is why we can approve the same day and control our closing timelines." },
      { q: "Where do you lend?", a: "We lend in all 50 states and Washington, D.C." },
      { q: "Do private money lenders finance the renovation budget?", a: "We do. Our fix and flip program funds up to 100% of both purchase and rehab, subject to an after-repair value cap." },
      { q: "Can I borrow through an LLC?", a: "Yes. LLCs are welcome, and our loans are structured for business owners and investment entities." },
      { q: "Do you lend on owner-occupied homes?", a: "No. We only finance non-owner-occupied investment properties." },
      { q: "How do I get started?", a: "Complete the short prequalification form or call 1-800-674-3804. A loan officer will review your property and strategy and recommend the right program." },
    ],
    related: ["hard-money-loans", "bridge-loans", "rental-portfolio-loans"],
  },

  {
    slug: "dscr-loans",
    path: "/dscr-loans",
    name: "DSCR Loans",
    tag: "30-Year Rental Loans",
    icon: "home",
    meta: {
      title: "DSCR Loans for Investment Property | 30-Year Fixed | HWC",
      description:
        "30-year fixed DSCR loans that qualify on rental cash flow, not personal income. Up to 80% LTV, 680+ FICO, no tax returns or W-2s, in all 50 states.",
      keywords: ["dscr loan", "dscr loans", "dscr loan for investment property", "dscr loan lenders", "dscr loan program"],
    },
    hero: {
      eyebrow: "DSCR Loan Program",
      title: "DSCR Loans for",
      accent: "Investment Property",
      intro:
        "Qualify on what the property earns, not on your pay stubs. Our 30-year fixed DSCR loan uses rental cash flow to approve purchases, rate-and-term refinances and cash-out refinances, with no tax returns required.",
      image: { src: "/images/services/dscr-rental-home.jpg", alt: "Single-family rental home financed with a 30-year DSCR loan" },
      chips: [
        { label: "No Tax Returns", note: "No W-2s, no DTI" },
        { label: "30-Year Fixed", note: "No call" },
      ],
    },
    stats: [
      { value: "80%", label: "Max LTV on purchase" },
      { value: "30-YR", label: "Fixed rate, no call" },
      { value: "680+", label: "FICO score" },
      { value: "$100K", label: "Min. property value" },
    ],
    sections: [
      {
        id: "what-is-dscr",
        heading: "What Is a DSCR Loan?",
        paragraphs: [
          "A debt service coverage ratio (DSCR) loan is approved on the cash flow of the rental itself. We compare the property's rental income with its monthly debt payment. If the rent covers the payment, the property can qualify, regardless of what your personal tax return says.",
          "That makes DSCR financing the natural long-term home for investors who are self-employed, own several properties, or simply do not want to document personal income for every purchase. It is also the most common exit for [hard money loans](/hard-money-loans) once a renovation is finished.",
        ],
        image: { src: "/images/dscr-rental.jpg", alt: "Well-kept rental property with a porch and lawn" },
      },
      {
        id: "dscr-highlights",
        heading: "DSCR Program Highlights",
        paragraphs: ["Built for buy-and-hold investors who want predictable, long-term debt."],
        points: [
          { title: "Up to 80% LTV", text: "80% on purchases and rate-and-term refinances, and up to 75% on cash-out refinances." },
          { title: "680+ FICO", text: "Minimum score of 680, with exceptions considered down to 660. Your score helps set your rate." },
          { title: "Single-family to 10 units", text: "Single-family and 2–10 unit residential rentals, including short-term rentals." },
          { title: "LLCs and individuals", text: "Close in your own name or your entity's, with cash-flow based approval and no DTI." },
          { title: "Flexible prepayment", text: "Declining prepayment structures such as 3-2-1 or 5-4-3-2-1, with zero-penalty options available." },
          { title: "15-year option", text: "Prefer to pay down faster? Ask about our 15-year term with 15-year amortization." },
        ],
      },
    ],
    widget: "dscr-calculator",
    steps: {
      heading: "Documents for a DSCR Loan",
      items: [
        { title: "One-page application", text: "A short application covering you, the property and the loan you want." },
        { title: "Lease and insurance", text: "An executed lease showing rental income, plus proof of property insurance." },
        { title: "Settlement statement", text: "The purchase settlement statement for the property being financed." },
        { title: "ID, bank statements and entity docs", text: "Valid ID, two months of bank statements, and entity documents with a W-9 if borrowing through an LLC." },
      ],
    },
    compare: {
      heading: "DSCR Loan vs. Conventional Mortgage",
      intro: "Conventional loans can carry lower rates for those who qualify, but they are hard to scale.",
      columns: ["", "HWC DSCR loan", "Conventional loan"],
      rows: [
        ["Qualifies on", "Property cash flow and credit", "Personal income and DTI"],
        ["Paperwork", "Low-doc: no tax returns or pay stubs", "Full income documentation"],
        ["Borrower", "LLCs and individuals", "Usually individuals only"],
        ["Scaling", "From one rental to a portfolio", "Agency limits on financed properties"],
      ],
    },
    faqs: [
      { q: "What is the minimum credit score for a DSCR loan?", a: "The minimum FICO score is 680, with exceptions considered as low as 660. Your credit score helps determine the rate you are quoted." },
      { q: "What is the maximum LTV on a DSCR loan?", a: "Up to 80% for purchases and rate-and-term refinances, and up to 75% for cash-out refinances. The maximum depends on credit, location and the property's DSCR." },
      { q: "Do DSCR loans require tax returns or W-2s?", a: "No. Qualification is based on the property's rental cash flow and your credit, not pay stubs, tax returns or personal income." },
      { q: "Do you lend on short-term rentals?", a: "Yes, short-term rentals are eligible on our DSCR program." },
      { q: "Can I finance a property with more than four units?", a: "Yes. The 30-year DSCR program goes up to 10 residential units." },
      { q: "Do you finance commercial properties with DSCR loans?", a: "No. The DSCR program is for non-owner-occupied residential investment properties." },
      { q: "What prepayment options are available?", a: "You can choose from several structures, including zero prepayment penalty, a 3-2-1 declining schedule, or 5-4-3-2-1 for the most competitive rate." },
      { q: "How fast can I get a DSCR quote?", a: "Most investors receive a quote within 24 hours of sending the property details." },
    ],
    related: ["cash-out-refinance", "rental-portfolio-loans", "hard-money-loans"],
  },

  {
    slug: "arv-loans",
    path: "/arv-loans",
    name: "ARV Loans",
    tag: "After-Repair Value Lending",
    icon: "trend",
    meta: {
      title: "ARV Loans for Investors | After Repair Value Financing | HWC",
      description:
        "ARV loans sized on what your property will be worth after renovation. Fund purchase and rehab with draws as work is completed, in all 50 states.",
      keywords: ["arv loan", "arv loans", "arv lenders", "loan to arv", "arv finance"],
    },
    hero: {
      eyebrow: "After-Repair Value Financing",
      title: "ARV Loans Built on",
      accent: "What It Will Be Worth",
      intro:
        "Traditional lenders value a distressed house as it stands today. An ARV loan looks ahead to the finished property, so the value you are creating can support the financing you need to create it.",
      image: { src: "/images/services/arv-after.jpg", alt: "Bright renovated kitchen showing a property's after-repair value" },
      chips: [
        { label: "Sized on ARV", note: "Future value counts" },
        { label: "Rehab Draws", note: "Released as work is done" },
      ],
    },
    stats: [
      { value: "ARV", label: "Drives the loan size" },
      { value: "100%", label: "Of rehab budget" },
      { value: "6–12", label: "Month terms" },
      { value: "Same Day", label: "Approval" },
    ],
    sections: [
      {
        id: "what-is-arv",
        heading: "What Is After-Repair Value?",
        paragraphs: [
          "After-repair value (ARV) is a realistic estimate of what a property will sell for once your planned renovation is finished. It is built from recent sales of comparable, already-renovated homes nearby, adjusted for size, condition and features.",
          "Loan to ARV is simply the loan amount divided by that projected value. Lenders cap it so there is a healthy equity cushion between what you owe and what the finished home is worth. That cushion protects you as much as it protects us if the market softens before you sell.",
        ],
      },
      {
        id: "how-arv-loans-are-sized",
        heading: "How ARV Lenders Size Your Loan",
        paragraphs: [
          "We look at two numbers together. Loan-to-cost measures the loan against what you are actually spending on purchase and rehab, and we can fund up to 100% of both. Loan to ARV then sets the ceiling, keeping the total loan within a set percentage of the finished value.",
          "The stronger your scope of work and comparable sales, the more confidently the ARV supports your request. For a full walkthrough of fix and flip financing terms, see [hard money loans for flipping houses](/hard-money-loans).",
        ],
        points: [
          { title: "Line-item scope of work", text: "Itemized labor, materials, permits and timeline make the ARV credible." },
          { title: "Renovated comparables", text: "Recent sales of finished homes close to the subject property support the value." },
          { title: "Contingency built in", text: "A realistic buffer for surprises keeps the project inside its ARV cap." },
        ],
      },
    ],
    widget: "before-after",
    steps: {
      heading: "How Rehab Funds Are Released",
      items: [
        { title: "Budget approved", text: "Your rehab budget is approved with the loan and held for the project." },
        { title: "Complete a phase", text: "Finish a stage of work from your scope, such as demolition, rough-ins or finishes." },
        { title: "Request a draw", text: "Submit the draw request; completed work is verified before funds are released." },
        { title: "Exit at full value", text: "Sell at the after-repair value, or refinance into a long-term [DSCR loan](/dscr-loans) and keep the property." },
      ],
    },
    faqs: [
      { q: "What is an ARV loan?", a: "An ARV loan is short-term renovation financing sized on a property's projected after-repair value rather than only its current, as-is value." },
      { q: "What does loan to ARV mean?", a: "Loan to ARV is the loan amount divided by the property's after-repair value. Lenders cap this percentage to leave an equity cushion." },
      { q: "How is after-repair value determined?", a: "ARV is estimated from recent sales of comparable renovated homes near the subject property, adjusted for the planned improvements in your scope of work." },
      { q: "Does an ARV loan cover the renovation?", a: "Yes. We can fund up to 100% of the rehab budget alongside the purchase, subject to the ARV cap." },
      { q: "How are renovation funds paid out?", a: "Rehab funds are released in draws as each phase of work is completed and verified." },
      { q: "What if my renovation costs go over budget?", a: "Costs beyond the approved budget are the borrower's responsibility, which is why we recommend building a contingency into your scope of work." },
      { q: "Can I keep the property as a rental after the rehab?", a: "Yes. Many investors refinance out of their ARV loan into a 30-year DSCR rental loan once the property is leased." },
      { q: "Can I use an ARV loan on my own home?", a: "No. ARV loans are business-purpose loans for non-owner-occupied investment properties only." },
    ],
    related: ["hard-money-loans", "dscr-loans", "bridge-loans"],
  },

  {
    slug: "cash-out-refinance",
    path: "/rental-loans/cash-out-refinance",
    name: "Cash-Out Refinance",
    tag: "Rental Property Refinance",
    icon: "cash",
    meta: {
      title: "Cash-Out Refinance on Rental Property | Up to 75% LTV",
      description:
        "Cash-out refinance your rental based on rental cash flow, not personal income. Up to 75% LTV, typical 3-month seasoning, and a Delayed Purchase option.",
      keywords: ["cash out refinance rental property", "rental property cash out refinance", "cash out refi on rental property", "rental property refinance lenders"],
    },
    hero: {
      eyebrow: "Rental Property Cash-Out Refinance",
      title: "Cash-Out Refinance for",
      accent: "Rental Property",
      intro:
        "Your rentals have built equity. A cash-out refinance turns that equity into capital for your next acquisition, while the property's own rent qualifies the new 30-year loan.",
      image: { src: "/images/services/cash-out-home.jpg", alt: "Rental home with built-up equity available through a cash-out refinance" },
      chips: [
        { label: "Up to 75% LTV", note: "On cash-out" },
        { label: "No Tax Returns", note: "Cash-flow approval" },
      ],
    },
    stats: [
      { value: "75%", label: "Max LTV on cash-out" },
      { value: "3 mo", label: "Typical seasoning" },
      { value: "30-YR", label: "Fixed-rate term" },
      { value: "680+", label: "FICO score" },
    ],
    sections: [
      {
        id: "how-cash-out-works",
        heading: "How a Cash-Out Refi on Rental Property Works",
        paragraphs: [
          "We pay off the existing loan and replace it with a new, larger 30-year loan based on the property's current value. The difference, after closing costs, comes to you as cash you can use however your business needs.",
          "Because it runs on our [DSCR loan program](/dscr-loans), the new loan qualifies on the property's rental income and your credit. There are no pay stubs, personal tax returns or debt-to-income calculations involved.",
        ],
        image: { src: "/images/about/keys.jpg", alt: "Keys handed over above model houses representing refinanced rentals" },
      },
      {
        id: "seasoning",
        heading: "Seasoning and the Delayed Purchase Option",
        paragraphs: [
          "Most cash-out refinances need around three months of ownership seasoning, extending up to six months depending on loan scope, credit and borrower profile.",
          "Bought the property free and clear with cash? Our Delayed Purchase program needs no seasoning. Within the first six months you can finance based on your original purchase price plus documented rehab costs; after that, you refinance on the property's true loan-to-value.",
        ],
        points: [
          { title: "Typical seasoning", text: "About 3 months, up to 6 depending on the file." },
          { title: "Delayed Purchase", text: "No seasoning for cash purchases within the first 6 months." },
          { title: "BRRRR ready", text: "Buy, rehab and rent with a [hard money loan](/hard-money-loans), then refinance out with cash." },
        ],
      },
    ],
    steps: {
      heading: "Ways Investors Use Cash-Out Proceeds",
      items: [
        { title: "Fund the next down payment", text: "Recycle equity into your next acquisition instead of waiting years to save it." },
        { title: "Renovate to raise rents", text: "Upgrade units to lift rents and long-term property value." },
        { title: "Retire short-term debt", text: "Pay off a maturing [bridge loan](/bridge-loans) or hard money note with permanent financing." },
        { title: "Build reserves", text: "Strengthen your cash position for vacancies, repairs and new opportunities." },
      ],
    },
    compare: {
      heading: "Cash-Out vs. Rate-and-Term Refinance",
      intro: "Both run on the same DSCR program; the difference is whether you take equity out.",
      columns: ["", "Cash-out refinance", "Rate-and-term refinance"],
      rows: [
        ["Goal", "Turn equity into cash", "Improve the rate or term"],
        ["Max LTV", "Up to 75%", "Up to 80%"],
        ["Cash to you", "Yes, after payoff and costs", "No"],
        ["Best for", "Scaling into more properties", "Lowering or fixing payments"],
      ],
    },
    faqs: [
      { q: "What is a cash-out refinance on a rental property?", a: "It replaces your current loan with a new, larger one based on today's value, and pays you the difference in cash after the old loan and closing costs are paid." },
      { q: "What is the maximum LTV on a rental property cash-out refinance?", a: "Up to 75% of the property's value. The exact maximum depends on credit, location and the property's debt service coverage." },
      { q: "How long do I need to own the property first?", a: "Most cash-out refinances need about three months of seasoning, extending up to six months depending on the file. Properties bought free and clear may qualify immediately under our Delayed Purchase program." },
      { q: "Do I need personal tax returns to qualify?", a: "No. Approval is based on the property's rental cash flow and your credit, not your personal income." },
      { q: "What credit score do I need?", a: "A minimum FICO of 680, with exceptions considered down to 660." },
      { q: "Which rental properties qualify?", a: "Non-owner-occupied single-family and 2–10 unit residential rentals with a minimum value of $100,000, including short-term rentals." },
      { q: "Can I refinance several rentals at once?", a: "Yes. If you are refinancing multiple properties, ask about financing them together through our rental portfolio loans." },
      { q: "Is there a prepayment penalty?", a: "Prepayment follows the DSCR program's declining structure, with zero-penalty and 3-2-1 options among the choices." },
    ],
    related: ["dscr-loans", "rental-portfolio-loans", "hard-money-loans"],
  },

  {
    slug: "rental-portfolio-loans",
    path: "/rental-portfolio-loans",
    name: "Rental Portfolio Loans",
    tag: "Portfolio Financing",
    icon: "grid",
    meta: {
      title: "Rental Portfolio Loans for Growing Investors | HWC",
      description:
        "Rental portfolio loans for investors scaling from one property to many. Cash-flow approval, no personal income verification, LLCs welcome, all 50 states.",
      keywords: ["rental portfolio loans", "rental portfolio lenders", "rental property portfolio loans", "single family rental portfolio financing"],
    },
    hero: {
      eyebrow: "Rental Portfolio Financing",
      title: "Rental Portfolio Loans to",
      accent: "Scale Your Holdings",
      intro:
        "Whether you own a single rental or manage dozens of doors, financing each property separately slows you down. Our rental portfolio loans give growing investors one lender, one process and approvals based on how the portfolio performs.",
      image: { src: "/images/services/portfolio-townhomes.jpg", alt: "Row of rental townhomes in an investor's portfolio" },
      chips: [
        { label: "One Lender", note: "For the whole portfolio" },
        { label: "LLCs Welcome", note: "Built for businesses" },
      ],
    },
    stats: [
      { value: "1 → Many", label: "Properties financed" },
      { value: "No DTI", label: "Cash-flow approval" },
      { value: "2–10", label: "Unit buildings eligible" },
      { value: "50 + DC", label: "States served" },
    ],
    sections: [
      {
        id: "why-portfolio",
        heading: "Why Investors Move to Portfolio Financing",
        paragraphs: [
          "Conventional lenders cap how many financed properties one borrower can hold, and every new loan means another round of tax returns and income checks. Rental portfolio financing removes that ceiling by qualifying on the cash flow your properties produce.",
          "We built Hedge Wealth Capital's own rental portfolio past 275 units, so we understand the operational side of scaling: staggered maturities, mixed property types and the need for one lending partner who knows your whole business.",
        ],
        image: { src: "/images/services/portfolio-aerial.jpg", alt: "Aerial view of a neighborhood of single-family rental homes" },
      },
      {
        id: "what-qualifies",
        heading: "What a Rental Property Portfolio Loan Covers",
        paragraphs: [
          "Portfolio financing runs on the same cash-flow underwriting as our [DSCR loans](/dscr-loans): we look at whether rents cover the debt and at your credit, not your personal income.",
        ],
        points: [
          { title: "Single-family and 2–10 units", text: "Mix single-family homes with small multifamily rentals in one relationship." },
          { title: "LLCs and individuals", text: "Hold properties in your own name or across your entities." },
          { title: "Purchase, refi or cash-out", text: "Add new acquisitions, refinance existing debt or pull equity with a [cash-out refinance](/rental-loans/cash-out-refinance)." },
          { title: "Nationwide", text: "Properties in any of the 50 states and Washington, D.C." },
        ],
      },
    ],
    steps: {
      heading: "Building a Portfolio With HWC",
      items: [
        { title: "Acquire and renovate", text: "Buy below value with [hard money loans](/hard-money-loans) or a [bridge loan](/bridge-loans)." },
        { title: "Stabilize", text: "Finish the work and place tenants to establish rental income." },
        { title: "Refinance long-term", text: "Move each stabilized property onto 30-year fixed DSCR financing." },
        { title: "Recycle equity", text: "Pull cash out as values rise and repeat with the next acquisition." },
      ],
    },
    compare: {
      heading: "Portfolio Loan vs. Financing One Property at a Time",
      intro: "As the number of doors grows, the gap between these two approaches widens.",
      columns: ["", "Portfolio approach", "One loan per property"],
      rows: [
        ["Paperwork", "One relationship, one process", "Repeat documentation every time"],
        ["Qualification", "Property cash flow", "Often personal income and DTI"],
        ["Borrower limits", "Built to scale", "Conventional caps on financed properties"],
        ["Management", "Streamlined servicing", "Many lenders, many payment dates"],
      ],
    },
    faqs: [
      { q: "What is a rental portfolio loan?", a: "It is financing designed for investors who own or are building multiple rental properties, approved on how the properties perform rather than on personal income." },
      { q: "Do you verify personal income on portfolio loans?", a: "No. Like our DSCR program, approval is based on property cash flow and credit, with no pay stubs, personal tax returns or DTI." },
      { q: "Can I mix single-family and multifamily properties?", a: "Yes. Single-family homes and 2–10 unit residential rentals can be financed within the same relationship." },
      { q: "Can I hold the properties in different LLCs?", a: "Yes. LLCs are welcome, and we can work with investors who hold properties across more than one entity." },
      { q: "Can I take cash out of my portfolio?", a: "Yes. Cash-out refinancing is available up to 75% LTV, subject to seasoning and property cash flow." },
      { q: "Do you finance commercial properties in a portfolio?", a: "Our rental programs cover non-owner-occupied residential properties. Ask a loan officer about any mixed-use or larger assets in your portfolio." },
      { q: "Where can the properties be located?", a: "Anywhere in the 50 states and Washington, D.C." },
      { q: "How do I start?", a: "Send a schedule of your properties with addresses, rents and current debt, and a loan officer will recommend the best structure." },
    ],
    related: ["dscr-loans", "cash-out-refinance", "private-money-lenders"],
  },

  {
    slug: "bridge-loans",
    path: "/bridge-loans",
    name: "Bridge Loans",
    tag: "Short-Term Bridge Capital",
    icon: "bridge",
    meta: {
      title: "Bridge Loans for Real Estate Investors | HWC",
      description:
        "Short-term bridge loans for investment property: up to 90% LTC on multifamily and new construction, with closings in as little as 7 days in all 50 states.",
      keywords: ["bridge loans for real estate investors", "bridge loan lenders", "bridge loan for investment property", "multifamily bridge loans"],
    },
    hero: {
      eyebrow: "Investment Property Bridge Loans",
      title: "Bridge Loans for",
      accent: "Real Estate Investors",
      intro:
        "When a deal can't wait for a bank, a bridge loan gets you to the closing table. Hedge Wealth Capital funds acquisitions, multifamily repositions and construction projects in as little as 7 days.",
      image: { src: "/images/services/bridge-framing.jpg", alt: "Construction worker framing a new building financed with a bridge loan" },
      chips: [
        { label: "Close in 7 Days", note: "When timing matters" },
        { label: "Up to 90% LTC", note: "No appraisal required" },
      ],
    },
    stats: [
      { value: "7 Days", label: "Closings as fast as" },
      { value: "90%", label: "Loan-to-cost" },
      { value: "No", label: "Appraisal required" },
      { value: "50 + DC", label: "States served" },
    ],
    sections: [
      {
        id: "when-to-use-bridge",
        heading: "When a Bridge Loan for Investment Property Makes Sense",
        paragraphs: [
          "A bridge loan is short-term capital that carries a property from where it is today to its next stage: renovated, stabilized, built or sold. It is the right tool when the opportunity is time-sensitive or the property does not yet qualify for long-term financing.",
          "On our [multifamily bridge program](/loan-programs/multifamily-bridge), current cash flow and DSCR are not considered, which means a half-vacant building or a project mid-construction can still be financed on its business plan.",
        ],
        points: [
          { title: "Fast acquisitions", text: "Compete with cash buyers on auctions, estate sales and off-market deals." },
          { title: "Multifamily repositioning", text: "Fund acquisition and rehab on apartment buildings before rents are stabilized." },
          { title: "New construction", text: "Acquisition, horizontal and vertical costs on ground-up projects." },
          { title: "Retiring maturing debt", text: "Replace a note that is coming due while you finish the business plan." },
        ],
        image: { src: "/images/multifamily.jpg", alt: "Multifamily apartment building suited to a bridge loan reposition" },
      },
      {
        id: "construction-bridge",
        heading: "Bridge Capital for Ground-Up Construction",
        paragraphs: [
          "For shovel-ready residential projects, our [ground-up construction loans](/loan-programs/ground-up-construction) finance up to 90% loan-to-cost, covering up to 50% of the acquisition of entitled land, up to 75% of horizontal development and up to 100% of vertical construction. Draws can be funded in as little as 3 business days.",
          "We also offer reimbursement of cost basis on free-and-clear land, returning capital you have already put into the site. Financing is available for single-family homes, multifamily buildings, scattered-site developments and subdivisions.",
        ],
      },
    ],
    steps: {
      heading: "Common Bridge Loan Exit Strategies",
      items: [
        { title: "Sell the property", text: "Pay off the bridge from the sale once the renovation or build is complete." },
        { title: "Refinance into a DSCR loan", text: "Move a stabilized rental onto a 30-year [DSCR loan](/dscr-loans)." },
        { title: "Cash-out refinance", text: "Refinance and pull equity with a [cash-out refinance](/rental-loans/cash-out-refinance)." },
        { title: "Portfolio refinance", text: "Roll several stabilized properties into [rental portfolio financing](/rental-portfolio-loans)." },
      ],
    },
    compare: {
      heading: "Bridge Loan vs. Hard Money Loan",
      intro: "The terms are often used interchangeably; here is how we use them.",
      columns: ["", "Bridge loan", "Hard money fix & flip loan"],
      rows: [
        ["Typical project", "Multifamily, construction, larger repositions", "Single-family purchase and rehab"],
        ["Leverage", "Up to 90% LTC", "Up to 100% LTC, ARV capped"],
        ["Closing speed", "As little as 7 days", "As little as 48 hours when pre-approved"],
        ["Learn more", "You are here", "[Hard money loans](/hard-money-loans)"],
      ],
    },
    faqs: [
      { q: "What is a bridge loan for real estate investors?", a: "It is short-term financing that carries an investment property from acquisition through renovation, construction or stabilization until it is sold or refinanced." },
      { q: "How fast can you fund a bridge loan?", a: "Our multifamily bridge loans can close in as little as 7 days." },
      { q: "How much leverage is available?", a: "Up to 90% loan-to-cost, with funds available for acquisition, horizontal and vertical costs." },
      { q: "Do I need an appraisal?", a: "No appraisal is required on our multifamily bridge program." },
      { q: "Do you consider the property's current cash flow?", a: "No. Current cash flow and DSCR are not considered on the multifamily bridge program, so value-add properties can qualify on the business plan." },
      { q: "Can a bridge loan fund new construction?", a: "Yes. On shovel-ready projects we lend up to 90% LTC, including up to 100% of vertical construction costs, with draws funded in as little as 3 business days." },
      { q: "Where do you offer bridge loans?", a: "In all 50 states and Washington, D.C." },
      { q: "How do I exit a bridge loan?", a: "Most investors sell the finished property or refinance into a 30-year DSCR rental loan, a cash-out refinance or portfolio financing." },
    ],
    related: ["hard-money-loans", "dscr-loans", "private-money-lenders"],
  },
  {
    slug: "ground-up-construction",
    path: "/loan-programs/ground-up-construction",
    name: "Ground-Up Construction Loans",
    tag: "New Build Financing",
    icon: "crane",
    meta: {
      title: "Ground-Up Construction Loans | Up to 90% LTC | HWC",
      description:
        "Ground-up construction loans up to 90% LTC, covering land, horizontal and vertical costs, with draws in as little as 3 business days in all 50 states.",
      keywords: ["ground up construction loans", "construction loans for investors", "new construction financing for investors", "spec home construction loans"],
    },
    hero: {
      eyebrow: "Investor Construction Financing",
      title: "Ground-Up Construction",
      accent: "Loans for Investors",
      intro:
        "Take a shovel-ready site from entitled land to finished building with one lender. Hedge Wealth Capital finances land, site work and vertical construction, then helps you move into long-term financing when the build is done.",
      image: { src: "/images/construction.jpg", alt: "Timber roof trusses on a new home under construction" },
      chips: [
        { label: "Up to 90% LTC", note: "Across the project" },
        { label: "3-Day Draws", note: "As little as 3 business days" },
      ],
    },
    stats: [
      { value: "90%", label: "Loan-to-cost" },
      { value: "100%", label: "Of vertical costs" },
      { value: "3 Days", label: "Draws funded as fast as" },
      { value: "50 + DC", label: "States served" },
    ],
    sections: [
      {
        id: "what-the-loan-covers",
        heading: "What a Ground-Up Construction Loan Covers",
        paragraphs: [
          "A construction budget has three very different stages, and each one carries different risk. We size each stage separately, so you can see where the loan funds the work and where your own capital goes in.",
          "Total leverage reaches up to 90% loan-to-cost and up to 70% of after-completed value (ACV). Your final numbers depend on the site, the budget and the plan, and are set in underwriting.",
        ],
        points: [
          { title: "Entitled land", text: "Up to 50% of the acquisition cost of land that is ready to build." },
          { title: "Horizontal development", text: "Up to 75% of site work such as grading, utilities and roads." },
          { title: "Vertical construction", text: "Up to 100% of the cost of the structure itself." },
          { title: "Land you already own", text: "Reimbursement of cost basis on free-and-clear land returns capital already in the site." },
        ],
        image: { src: "/images/about/new-build.jpg", alt: "Newly built three-story residential building at dusk" },
      },
      {
        id: "projects-we-finance",
        heading: "Projects We Finance",
        paragraphs: [
          "We lend on investor-owned residential projects: single-family spec homes, multifamily buildings, scattered-site developments and subdivisions. The project needs to be shovel-ready, which means your plans and entitlements are in place when you come to us.",
          "If your project is a heavy renovation rather than a new build, a [hard money loan](/hard-money-loans) or an [ARV loan](/arv-loans) is usually the better fit. Compare every option on our [loan programs page](/loan-programs).",
        ],
      },
      {
        id: "how-draws-work",
        heading: "How Construction Draws Work",
        paragraphs: [
          "Construction funds are released in stages as work is completed, not as one lump sum at closing. You pay for a completed phase, request a draw, and once it is reviewed the funds are released, in as little as 3 business days.",
          "Plan your cash flow around that cycle. Subcontractor payment timing and the sequence of your budget matter as much as the loan amount, so walk us through your schedule before you close.",
        ],
      },
    ],
    steps: {
      heading: "From Site to Stabilized in Four Steps",
      items: [
        { title: "Share the project", text: "Send the site address, plans, budget and timeline." },
        { title: "Get your terms", text: "We review the deal in-house and size each stage of the budget." },
        { title: "Close and build", text: "Close the loan, start work and request draws as phases are completed." },
        { title: "Sell or refinance", text: "Sell the finished property or move it onto a 30-year [DSCR loan](/dscr-loans)." },
      ],
    },
    compare: {
      heading: "Construction Loan vs. Fix and Flip Loan",
      intro: "Both fund work in stages. The difference is whether a building already exists.",
      columns: ["", "Ground-up construction", "Hard money fix & flip"],
      rows: [
        ["Starting point", "Entitled land, ready to build", "Existing property to renovate"],
        ["Leverage", "Up to 90% LTC", "Up to 100% LTC, ARV capped"],
        ["How funds release", "Draws as phases are completed", "Purchase at closing, rehab in draws"],
        ["Learn more", "You are here", "[Hard money loans](/hard-money-loans)"],
      ],
    },
    faqs: [
      { q: "How much can I borrow for a ground-up construction project?", a: "Up to 90% of total project cost and up to 70% of after-completed value, with separate limits for land, horizontal development and vertical construction. Final terms are set in underwriting." },
      { q: "Do construction loans cover the land?", a: "Yes. We finance up to 50% of the acquisition of entitled land. If you already own the land free and clear, reimbursement of your cost basis may be available." },
      { q: "How fast are construction draws funded?", a: "Draws can be funded in as little as 3 business days once the completed work has been reviewed." },
      { q: "What types of projects qualify?", a: "Investor residential projects including single-family homes, multifamily buildings, scattered-site developments and subdivisions." },
      { q: "Does my project need to be shovel-ready?", a: "Yes. This program is for shovel-ready projects, so plans and entitlements should be in place." },
      { q: "Can I build a home to live in?", a: "No. Our loans are business-purpose financing for non-owner-occupied investment property." },
      { q: "What happens when construction is finished?", a: "Most investors sell the finished property or refinance into a 30-year DSCR rental loan." },
      { q: "Where do you offer construction loans?", a: "In all 50 states and Washington, D.C." },
    ],
    related: ["bridge-loans", "multifamily-bridge", "dscr-loans"],
  },
  {
    slug: "multifamily-bridge",
    path: "/loan-programs/multifamily-bridge",
    name: "Multifamily Bridge Loans",
    tag: "5–10 Unit Value-Add",
    icon: "building",
    meta: {
      title: "Multifamily Bridge Loans | Hedge Wealth Capital",
      description:
        "Multifamily bridge loans for 5–10 unit value-add deals: purchase and rehab financing up to 90% LTC, no appraisal required, closings in as little as 7 days.",
      keywords: ["multifamily bridge loans", "apartment bridge loans", "value add multifamily financing", "5-10 unit property loans"],
    },
    hero: {
      eyebrow: "Value-Add Apartment Financing",
      title: "Multifamily Bridge",
      accent: "Loans for Investors",
      intro:
        "Buy an underperforming 5–10 unit building, renovate it and bring rents to market. Our multifamily bridge loans look at your business plan, so current vacancy doesn't stop the deal.",
      image: { src: "/images/multifamily.jpg", alt: "Multifamily apartment building financed with a bridge loan" },
      chips: [
        { label: "Up to 90% LTC", note: "Purchase + renovation" },
        { label: "No Appraisal", note: "Required on this program" },
      ],
    },
    stats: [
      { value: "5–10", label: "Unit properties" },
      { value: "90%", label: "Loan-to-cost" },
      { value: "7 Days", label: "Closings as fast as" },
      { value: "No", label: "Appraisal required" },
    ],
    sections: [
      {
        id: "why-bridge-for-multifamily",
        heading: "Why Value-Add Multifamily Needs Bridge Financing",
        paragraphs: [
          "Long-term lenders underwrite the rents a building collects today. That is a problem when your whole plan is to change those rents. A half-empty building with dated units often can't qualify for a permanent loan until after the work you need the money to do.",
          "A multifamily bridge loan solves that sequence. Current cash flow and DSCR are not considered on this program, so the loan can fund the purchase and the renovation while you stabilize the property.",
        ],
        points: [
          { title: "Purchase and rehab", text: "One loan for buying the building and renovating the units." },
          { title: "Refinance for renovation", text: "Already own the property? Refinance it to fund the upgrades." },
          { title: "Vacancy is workable", text: "Current cash flow and DSCR are not part of the decision." },
          { title: "Speed to close", text: "No appraisal required, with closings in as little as 7 days." },
        ],
        image: { src: "/images/services/portfolio-townhomes.jpg", alt: "Row of multi-unit residential townhomes" },
      },
      {
        id: "who-its-for",
        heading: "Who This Loan Is For",
        paragraphs: [
          "This program is built for experienced investors taking on purchase and rehab projects on 5–10 unit properties, with the goal of maximizing market rents. Bring your renovation scope, your rent assumptions and your exit plan.",
          "Smaller or simpler deal? A [fix and flip loan](/hard-money-loans) may suit a single-family renovation, and [general bridge financing](/bridge-loans) covers other time-sensitive acquisitions. See them side by side on our [loan programs page](/loan-programs).",
        ],
      },
    ],
    steps: {
      heading: "The Value-Add Path",
      items: [
        { title: "Buy", text: "Acquire the building with purchase and rehab funds from one lender." },
        { title: "Renovate", text: "Upgrade units and common areas on your planned scope and budget." },
        { title: "Lease up", text: "Fill vacancies and bring rents to market." },
        { title: "Exit", text: "Sell, or refinance onto a [DSCR loan](/dscr-loans) or [portfolio financing](/rental-portfolio-loans)." },
      ],
    },
    compare: {
      heading: "Multifamily Bridge vs. DSCR Rental Loan",
      intro: "Many investors use both: the bridge loan to stabilize, then a DSCR loan to hold.",
      columns: ["", "Multifamily bridge", "DSCR rental loan"],
      rows: [
        ["Best stage", "Before stabilization", "After the property is rented"],
        ["Qualifies on", "Your business plan", "The property's rental income"],
        ["Loan type", "Short-term", "30-year fixed"],
        ["Learn more", "You are here", "[DSCR loans](/dscr-loans)"],
      ],
    },
    faqs: [
      { q: "What is a multifamily bridge loan?", a: "It is short-term financing that funds the purchase and renovation of an apartment building until it is stabilized and can be sold or refinanced." },
      { q: "What size properties do you finance?", a: "This program is for 5–10 unit properties." },
      { q: "Does current occupancy matter?", a: "Current cash flow and DSCR are not considered on this program, so value-add properties can qualify on the business plan." },
      { q: "Do I need an appraisal?", a: "No appraisal is required on our multifamily bridge program." },
      { q: "How fast can you close?", a: "Multifamily bridge loans can close in as little as 7 days, depending on the deal and how quickly documents are provided." },
      { q: "Can I refinance a building I already own?", a: "Yes. The program is also available to refinance owned properties for renovation." },
      { q: "Is this program for first-time investors?", a: "It is designed for experienced investors. If you are newer to investing, talk to us about which program fits your project." },
      { q: "How do I exit the loan?", a: "Most investors sell the stabilized property or refinance into a 30-year DSCR loan or rental portfolio financing." },
    ],
    related: ["bridge-loans", "dscr-loans", "ground-up-construction"],
  },
];

export const getService = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!;
