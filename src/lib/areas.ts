/**
 * Area (local SEO) page copy. Structure and keywords come from the two SEO Word files in
 * content-reference/; figures are limited to what the client has confirmed (see services.ts).
 * Hard money and DSCR pages for the same state are written around different intents
 * (renovation markets vs. rental demand) so they don't duplicate each other.
 * Inline links use [anchor](/path).
 */
import type { ServiceSlug } from "@/lib/services";

export type MapKey = "TX" | "FL" | "GA" | "NC" | "CO" | "NYC" | "CT" | "WOR";

export type AreaSlug =
  | "new-york"
  | "connecticut"
  | "worcester-county-ma"
  | "texas-hard-money"
  | "texas-dscr"
  | "florida-hard-money"
  | "florida-dscr"
  | "georgia-hard-money"
  | "georgia-dscr"
  | "north-carolina-hard-money"
  | "north-carolina-dscr"
  | "colorado-hard-money";

export type AreaPage = {
  slug: AreaSlug;
  path: string;
  region: string;
  short: string;
  kind: "Hard Money" | "DSCR" | "Hard Money & DSCR";
  map: MapKey;
  meta: { title: string; description: string; keywords: string[] };
  hero: { eyebrow: string; title: string; accent: string; intro: string };
  stats: { value: string; label: string }[];
  markets: { heading: string; intro: string; items: { name: string; pin: string; note: string; spots: string[] }[] };
  programs: { heading: string; intro: string; items: { service: ServiceSlug; text: string }[] };
  local: { heading: string; paragraphs: string[]; notes: { title: string; text: string }[] };
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  nearby: AreaSlug[];
};

const hmStats = (metros: number) => [
  { value: "100%", label: "LTC on purchase + rehab" },
  { value: "Same Day", label: "Approvals" },
  { value: "5–10", label: "Business days to close" },
  { value: String(metros), label: "Metros featured" },
];
const dscrStats = (metros: number) => [
  { value: "80%", label: "Max LTV on purchase" },
  { value: "30-YR", label: "Fixed rate, no call" },
  { value: "680+", label: "FICO score" },
  { value: String(metros), label: "Metros featured" },
];

export const areas: AreaPage[] = [
  {
    slug: "new-york",
    path: "/new-york/hard-money-dscr-lenders",
    region: "New York City",
    short: "NYC",
    kind: "Hard Money & DSCR",
    map: "NYC",
    meta: {
      title: "Hard Money & DSCR Lenders in New York City | All 5 Boroughs | HWC",
      description:
        "Private hard money and DSCR loans across Manhattan, Brooklyn, Queens, the Bronx and Staten Island. Up to 100% of purchase and rehab, 30-year rental loans, same-day approvals.",
      keywords: ["hard money lenders new york city", "dscr loans nyc", "private money lenders new york", "hard money lenders brooklyn", "fix and flip loans queens"],
    },
    hero: {
      eyebrow: "Lending Across All Five Boroughs",
      title: "Hard Money & DSCR Lenders in",
      accent: "New York City",
      intro:
        "From brownstone gut renovations in Brooklyn to two-family rentals in the Bronx, NYC deals move fast and banks rarely do. Hedge Wealth Capital funds investors in every borough with private capital and in-house decisions.",
    },
    stats: [
      { value: "5", label: "Boroughs covered" },
      { value: "100%", label: "LTC on purchase + rehab" },
      { value: "80%", label: "Max LTV on rentals" },
      { value: "Same Day", label: "Approvals" },
    ],
    markets: {
      heading: "Financing in Every NYC Borough",
      intro: "New York City is five very different markets. Here is where our investors are buying, renovating and holding.",
      items: [
        { name: "Manhattan", pin: "Manhattan", note: "Value-add condos, mixed-use buildings and gut renovations, especially in Upper Manhattan.", spots: ["Harlem", "Washington Heights", "Inwood", "East Village", "Chelsea"] },
        { name: "Brooklyn", pin: "Brooklyn", note: "Townhouse restorations, single-to-multifamily conversions and small apartment buildings.", spots: ["Bedford-Stuyvesant", "Bushwick", "Crown Heights", "Flatbush", "Bay Ridge"] },
        { name: "Queens", pin: "Queens", note: "Diverse housing stock and steady long-term rental demand for buy-and-hold investors.", spots: ["Astoria", "Jackson Heights", "Ridgewood", "Jamaica", "Flushing"] },
        { name: "The Bronx", pin: "The Bronx", note: "Two- to four-family rentals and BRRRR projects that refinance into long-term debt.", spots: ["Mott Haven", "Kingsbridge", "Riverdale", "Pelham Bay", "Soundview"] },
        { name: "Staten Island", pin: "Staten Island", note: "Single-family and semi-detached homes for flips, additions and teardowns.", spots: ["St. George", "Great Kills", "Tottenville", "New Dorp", "West Brighton"] },
      ],
    },
    programs: {
      heading: "NYC Loan Programs",
      intro: "Match the financing to your plan for the property.",
      items: [
        { service: "hard-money-loans", text: "Buy and renovate with up to 100% of purchase and rehab, subject to an ARV cap. Ideal for brownstone and townhouse renovations." },
        { service: "dscr-loans", text: "Hold rentals in any borough on a 30-year fixed loan qualified on rent, not your tax returns." },
        { service: "bridge-loans", text: "Close quickly on mixed-use and multifamily acquisitions that need time before permanent financing." },
        { service: "cash-out-refinance", text: "Pull equity from stabilized NYC rentals to fund your next purchase." },
      ],
    },
    local: {
      heading: "What NYC Investors Should Plan For",
      paragraphs: [
        "New York is a judicial foreclosure state, and many purchases involve co-op or condo boards, landmark rules or open building violations. Build extra time into your schedule and budget for permits through the Department of Buildings.",
        "Every loan we make is business-purpose and closes in an entity such as an LLC. If you are refinancing, ask your closing attorney whether a CEMA (Consolidation, Extension and Modification Agreement) could reduce New York mortgage recording tax on the existing balance.",
      ],
      notes: [
        { title: "Short-term rental rules", text: "NYC's Local Law 18 restricts unhosted stays under 30 days, so we underwrite rentals on long-term rents." },
        { title: "Violations and permits", text: "Open DOB or ECB violations are not automatically a deal-breaker; include their cure in your scope of work." },
        { title: "Attorney closings", text: "NYC closings run through attorneys. Bring yours in early so title and lien searches don't hold up funding." },
      ],
    },
    steps: [
      { title: "Send the deal", text: "Borough, address, price and your plan for the building." },
      { title: "Same-day approval", text: "We review the property and your experience in-house." },
      { title: "Attorney & title", text: "Your attorney clears title, liens and any violations." },
      { title: "Fund and build", text: "Close in 5 to 10 business days, then draw rehab funds as work is done." },
    ],
    faqs: [
      { q: "Do you lend in all five NYC boroughs?", a: "Yes. We finance investment properties in Manhattan, Brooklyn, Queens, the Bronx and Staten Island." },
      { q: "How fast can you close a hard money loan in New York City?", a: "Most loans close in 5 to 10 business days once title, lien searches and valuation are complete. Pre-approved borrowers can move faster." },
      { q: "Do NYC DSCR loans require tax returns?", a: "No. Our DSCR loans qualify on the property's rental income and your credit, with no tax returns, W-2s or DTI calculation." },
      { q: "Can you finance a property with open DOB violations?", a: "Often, yes. We look at the severity of the violations and how your scope of work will cure them rather than declining automatically." },
      { q: "Are short-term rentals eligible in NYC?", a: "Because Local Law 18 limits unhosted rentals under 30 days, NYC rentals are underwritten on long-term market rents." },
      { q: "What credit score do I need for an NYC DSCR loan?", a: "A minimum FICO of 680, with exceptions considered down to 660." },
      { q: "Do I need an LLC?", a: "Our loans are business-purpose loans for investment property, typically closed in an entity such as an LLC." },
      { q: "Do you lend on two- to four-family homes in Brooklyn and the Bronx?", a: "Yes. Our DSCR program covers single-family and 2–10 unit residential properties." },
    ],
    nearby: ["connecticut", "worcester-county-ma", "north-carolina-hard-money"],
  },

  {
    slug: "connecticut",
    path: "/connecticut/hard-money-dscr-lenders",
    region: "Connecticut",
    short: "CT",
    kind: "Hard Money & DSCR",
    map: "CT",
    meta: {
      title: "Connecticut Hard Money & DSCR Lenders | Bridgeport to Hartford | HWC",
      description:
        "Hard money and DSCR loans for Connecticut investors in Bridgeport, New Haven, Stamford, Hartford, Waterbury and statewide. Up to 100% of purchase and rehab and 30-year rental loans.",
      keywords: ["hard money lenders connecticut", "dscr loans ct", "private mortgage lenders connecticut", "fix and flip loans bridgeport", "hard money lenders new haven"],
    },
    hero: {
      eyebrow: "Statewide Connecticut Lending",
      title: "Connecticut Hard Money &",
      accent: "DSCR Lenders",
      intro:
        "Connecticut pairs Gold Coast resale values with cash-flowing multifamily in its central cities. Whether you flip in Fairfield County or hold three-families in Hartford, we fund the deal from our own capital.",
    },
    stats: [
      { value: "10", label: "Cities featured" },
      { value: "100%", label: "LTC on purchase + rehab" },
      { value: "30-YR", label: "Fixed rental loans" },
      { value: "Same Day", label: "Approvals" },
    ],
    markets: {
      heading: "Connecticut Markets We Finance",
      intro: "From the Long Island Sound to the Hartford area, here is where Connecticut investors are active.",
      items: [
        { name: "Bridgeport", pin: "Bridgeport", note: "Connecticut's largest city, with multifamily rehabs and single-family flips.", spots: ["Black Rock", "North End", "Brooklawn", "Mill Hill"] },
        { name: "New Haven", pin: "New Haven", note: "University and hospital demand supports long-term rentals and historic renovations.", spots: ["East Rock", "Wooster Square", "Westville", "Fair Haven"] },
        { name: "Stamford & Norwalk", pin: "Stamford", note: "Higher-value Fairfield County renovations and bridge acquisitions.", spots: ["Downtown Stamford", "Shippan", "South Norwalk", "Rowayton"] },
        { name: "Hartford & West Hartford", pin: "Hartford", note: "Cash-flowing multifamily in Hartford next to strong resale values in West Hartford.", spots: ["West End", "Asylum Hill", "Frog Hollow", "West Hartford Center"] },
        { name: "Waterbury & Danbury", pin: "Waterbury", note: "Entry-level multifamily in Waterbury and steady demand in Danbury near the New York line.", spots: ["Bunker Hill", "Town Plot", "Overlook", "Danbury West Side"] },
        { name: "New Britain & Meriden", pin: "New Britain", note: "Workforce rentals and BRRRR projects in central Connecticut.", spots: ["Belvedere", "Little Poland", "Meriden Center"] },
      ],
    },
    programs: {
      heading: "Connecticut Loan Programs",
      intro: "Financing for every stage of a Connecticut investment.",
      items: [
        { service: "hard-money-loans", text: "Fix and flip financing for up to 100% of purchase and rehab, with no prepayment penalty when you sell." },
        { service: "dscr-loans", text: "30-year fixed rental loans on single-family and 2–10 unit properties, qualified on rent." },
        { service: "rental-portfolio-loans", text: "Grow from one Connecticut rental to a portfolio with one lending partner." },
        { service: "cash-out-refinance", text: "Refinance stabilized multifamily and pull equity for the next acquisition." },
      ],
    },
    local: {
      heading: "Lending Notes for Connecticut",
      paragraphs: [
        "Connecticut closings are handled by attorneys, so line up a settlement attorney early and send us their details with your deal. Clean title and a clear scope of work are what keep a Connecticut closing on schedule.",
        "Connecticut is a judicial foreclosure state, which matters when you are buying distressed inventory: properties can take time to reach the market, and auction purchases come with court-set closing windows that pre-approved financing helps you meet.",
      ],
      notes: [
        { title: "Older housing stock", text: "Many central-city multifamily buildings are decades old; budget for systems, lead and code updates." },
        { title: "Attorney-led closings", text: "Your attorney manages title and the closing; we coordinate directly with them." },
        { title: "Business-purpose only", text: "We finance non-owner-occupied investment property held in an entity." },
      ],
    },
    steps: [
      { title: "Share the property", text: "City, purchase price and whether you plan to flip or hold." },
      { title: "Get approved", text: "Same-day approval from our in-house underwriting team." },
      { title: "Attorney closing", text: "We work with your Connecticut settlement attorney on title." },
      { title: "Renovate or rent", text: "Draw rehab funds as work is done, or close straight into a 30-year loan." },
    ],
    faqs: [
      { q: "Where in Connecticut do you lend?", a: "Statewide, including Bridgeport, New Haven, Stamford, Norwalk, Hartford, Waterbury, Danbury, New Britain, Meriden and surrounding towns." },
      { q: "How quickly can you fund a Connecticut hard money loan?", a: "Most loans close in 5 to 10 business days once title and valuation are complete." },
      { q: "Do you lend to first-time flippers in Connecticut?", a: "Yes. We look at your liquidity, your contractor and the strength of the deal, not only your track record." },
      { q: "What is required for a Connecticut DSCR loan?", a: "A minimum 680 FICO, a property worth at least $100,000, and rent that covers the payment. No tax returns or W-2s are needed." },
      { q: "Can I buy at a Connecticut foreclosure auction with your financing?", a: "Pre-approval puts financing in place before the auction so you can bid confidently and meet the court's closing deadline." },
      { q: "Is there a prepayment penalty on fix and flip loans?", a: "No. You can pay off a fix and flip loan early with no prepayment fee." },
      { q: "Do you finance three-family homes in Hartford and New Haven?", a: "Yes. Our DSCR program covers single-family and 2–10 unit residential rentals." },
      { q: "Do I need an attorney for a Connecticut closing?", a: "Connecticut closings are attorney-led, so you will work with a settlement attorney who coordinates title and closing with us." },
    ],
    nearby: ["new-york", "worcester-county-ma", "north-carolina-dscr"],
  },

  {
    slug: "worcester-county-ma",
    path: "/worcester-county-ma/hard-money-dscr-lenders",
    region: "Worcester County, MA",
    short: "Worcester",
    kind: "Hard Money & DSCR",
    map: "WOR",
    meta: {
      title: "Hard Money & DSCR Lenders in Worcester County, MA | HWC",
      description:
        "Massachusetts-based private lender funding Worcester, Leominster, Fitchburg, Gardner, Shrewsbury and all of Worcester County. Triple-decker rehabs, fix and flip and 30-year rental loans.",
      keywords: ["hard money lenders worcester ma", "dscr loans worcester county", "private money lenders central mass", "fix and flip loans leominster", "fitchburg investment property loans"],
    },
    hero: {
      eyebrow: "Central Massachusetts Lending",
      title: "Hard Money & DSCR Lenders in",
      accent: "Worcester County",
      intro:
        "Worcester County is close to home for us: our office is in Canton, Massachusetts. We finance triple-decker renovations, suburban flips and long-term rentals across the county's cities and towns.",
    },
    stats: [
      { value: "10", label: "Cities & towns featured" },
      { value: "100%", label: "LTC on purchase + rehab" },
      { value: "2–10", label: "Unit rentals financed" },
      { value: "MA", label: "Based lender" },
    ],
    markets: {
      heading: "Worcester County Cities & Towns",
      intro: "Central Massachusetts offers lower entry prices than Greater Boston with strong rental demand.",
      items: [
        { name: "City of Worcester", pin: "Worcester", note: "Triple-deckers, student housing and hospital-area rentals.", spots: ["Main South", "Grafton Hill", "College Hill", "Burncoat", "Tatnuck"] },
        { name: "Leominster & Fitchburg", pin: "Fitchburg", note: "Multifamily BRRRR projects and affordable single-family flips.", spots: ["Downtown Fitchburg", "Cleghorn", "West Leominster"] },
        { name: "Shrewsbury & Westborough", pin: "Shrewsbury", note: "Suburban single-family renovations along the Route 9 and I-495 corridors.", spots: ["Shrewsbury", "Westborough", "Northborough", "Southborough"] },
        { name: "Milford & Blackstone Valley", pin: "Milford", note: "Commuter-friendly flips and small multifamily rentals.", spots: ["Milford", "Grafton", "Northbridge", "Uxbridge"] },
        { name: "Gardner & Southbridge", pin: "Gardner", note: "Entry-level price points with consistent tenant demand.", spots: ["Gardner", "Southbridge", "Webster", "Spencer"] },
        { name: "Clinton & North County", pin: "Clinton", note: "Mill-village renovations and smaller-town rentals.", spots: ["Clinton", "Lunenburg", "Holden", "Sterling"] },
      ],
    },
    programs: {
      heading: "Worcester County Loan Programs",
      intro: "From triple-decker rehab to long-term hold.",
      items: [
        { service: "hard-money-loans", text: "Finance up to 100% of purchase and rehab on triple-deckers and single-family flips." },
        { service: "arv-loans", text: "Size your renovation loan on after-repair value when the rehab is substantial." },
        { service: "dscr-loans", text: "Hold two- and three-family rentals on a 30-year fixed loan qualified on rent." },
        { service: "cash-out-refinance", text: "Refinance renovated rentals and recycle the equity into the next property." },
      ],
    },
    local: {
      heading: "Massachusetts Considerations",
      paragraphs: [
        "Much of Worcester County's housing was built before 1978, so the Massachusetts Lead Law can apply when children under six will live in a rental. Plan lead inspections and abatement into both your budget and timeline.",
        "Massachusetts closings run through attorneys, who handle title, municipal lien certificates and final water and sewer readings. Most mortgages here carry a statutory power of sale, and your attorney can walk you through what that means for any distressed purchase.",
      ],
      notes: [
        { title: "Triple-decker rehabs", text: "Three-family homes are a core Worcester asset; we fund purchase and full renovation." },
        { title: "Lead and code compliance", text: "Budget for lead, smoke and CO compliance before units are re-rented." },
        { title: "Local team", text: "Our Canton, MA office is about an hour from Worcester." },
      ],
    },
    steps: [
      { title: "Send the address", text: "City or town, price and your renovation or rental plan." },
      { title: "Approval same day", text: "Decisions are made in-house by our Massachusetts team." },
      { title: "Attorney & MLC", text: "Your attorney clears title and municipal lien certificates." },
      { title: "Close and renovate", text: "Close in 5 to 10 business days, then draw rehab funds as work is done." },
    ],
    faqs: [
      { q: "Do you finance triple-deckers in Worcester?", a: "Yes. Three-family homes are one of the most common properties we finance in Worcester, Fitchburg and Leominster, for both renovation and long-term rental." },
      { q: "Do you lend in smaller towns like Webster, Spencer and Clinton?", a: "Yes. We lend throughout Worcester County as long as the property and plan support the loan." },
      { q: "How much can I borrow for a Worcester County flip?", a: "Up to 100% of the purchase price and up to 100% of the rehab budget, subject to an after-repair value cap." },
      { q: "Can I use a DSCR loan for rentals near Worcester's colleges?", a: "Yes, as long as the property is a non-owner-occupied residential rental and the rent covers the payment." },
      { q: "Do Worcester DSCR loans require pay stubs or tax returns?", a: "No. Approval is based on the property's rental income and your credit." },
      { q: "How fast can you close in Worcester County?", a: "Most loans close in 5 to 10 business days once title, municipal lien certificates and valuation are complete." },
      { q: "Do I need to budget for lead paint?", a: "If the home was built before 1978 and children under six will live there, the Massachusetts Lead Law can require inspection and abatement, so include it in your plan." },
      { q: "Where is Hedge Wealth Capital located?", a: "Our office is at 1017 Turnpike St., Suite 31, Canton, MA 02021." },
    ],
    nearby: ["connecticut", "new-york", "north-carolina-hard-money"],
  },

  {
    slug: "texas-hard-money",
    path: "/texas/hard-money-lenders",
    region: "Texas",
    short: "TX",
    kind: "Hard Money",
    map: "TX",
    meta: {
      title: "Hard Money Lenders in Texas | Fix and Flip Loans | Hedge Wealth Capital",
      description:
        "Texas hard money lenders funding fix and flip and bridge loans in Dallas-Fort Worth, Houston, Austin, San Antonio and statewide. Up to 100% of purchase and rehab, same-day approvals.",
      keywords: ["hard money lenders texas", "texas hard money lenders", "fix and flip loans texas", "bridge loans texas", "texas hard money loans"],
    },
    hero: {
      eyebrow: "Texas Fix & Flip Financing",
      title: "Hard Money Lenders in",
      accent: "Texas",
      intro:
        "Texas metros keep growing, and the best renovation deals go to investors who can close like a cash buyer. Our Texas hard money loans fund the purchase and the rehab so you can move first.",
    },
    stats: hmStats(6),
    markets: {
      heading: "Texas Renovation Markets",
      intro: "Where Texas flippers are finding value-add inventory.",
      items: [
        { name: "Dallas–Fort Worth", pin: "Dallas", note: "Older ranch homes inside established neighborhoods ripe for full renovations.", spots: ["Oak Cliff", "Garland", "Arlington", "Fort Worth Southside"] },
        { name: "Greater Houston", pin: "Houston", note: "Infill teardowns and post-storm repairs across a sprawling metro.", spots: ["Spring Branch", "Near Northside", "Pasadena", "Katy"] },
        { name: "Austin", pin: "Austin", note: "Higher price points with cosmetic and structural flips in older central neighborhoods.", spots: ["East Austin", "Round Rock", "Pflugerville", "Del Valle"] },
        { name: "San Antonio", pin: "San Antonio", note: "Historic-district renovations and affordable starter-home flips.", spots: ["Southtown", "Dignowski Hill", "New Braunfels", "Converse"] },
        { name: "El Paso", pin: "El Paso", note: "Lower entry prices for investors building volume.", spots: ["Central El Paso", "Northeast", "Lower Valley"] },
        { name: "Corpus Christi & the Valley", pin: "Corpus Christi", note: "Coastal and border markets with affordable acquisition costs.", spots: ["Corpus Christi", "McAllen", "Brownsville"] },
      ],
    },
    programs: {
      heading: "Texas Fix & Flip Programs",
      intro: "Short-term capital for Texas renovations.",
      items: [
        { service: "hard-money-loans", text: "Up to 100% of purchase and rehab, interest-only, with no prepayment penalty when the house sells." },
        { service: "arv-loans", text: "Let the after-repair value carry the loan on heavier Texas renovations." },
        { service: "bridge-loans", text: "Ground-up and multifamily projects with up to 90% loan-to-cost." },
        { service: "dscr-loans", text: "Keeping it? Refinance into a [Texas DSCR loan](/texas/dscr-loans) once it's rented." },
      ],
    },
    local: {
      heading: "Flipping in Texas: What to Know",
      paragraphs: [
        "Texas uses a non-judicial foreclosure process under deeds of trust, so foreclosure inventory reaches the courthouse steps on the first Tuesday of the month. Having financing approved before the sale is how investors compete with cash.",
        "Factor property taxes into your holding costs: Texas has no state income tax, but local property tax rates are among the higher ones in the country, and they add up over a six-month rehab.",
      ],
      notes: [
        { title: "Foundation work", text: "Expansive clay soils in parts of Texas make foundation inspections a smart early step." },
        { title: "Business-purpose only", text: "Homestead protections apply to owner-occupied homes; we finance investment property only." },
        { title: "Statewide coverage", text: "From the Panhandle to the Rio Grande Valley, we lend anywhere in Texas." },
      ],
    },
    steps: [
      { title: "Get pre-approved", text: "Have financing ready before the auction or the next listing." },
      { title: "Lock up the house", text: "Send the contract and a line-item scope of work." },
      { title: "Close fast", text: "Close in 5 to 10 business days; pre-approved borrowers can move faster." },
      { title: "Renovate & sell", text: "Draw rehab funds as work is done and pay off with no penalty." },
    ],
    faqs: [
      { q: "Where in Texas do you offer hard money loans?", a: "Statewide, including Dallas-Fort Worth, Houston, Austin, San Antonio, El Paso, Corpus Christi and the Rio Grande Valley." },
      { q: "How much will you lend on a Texas fix and flip?", a: "Up to 100% of the purchase price and up to 100% of the rehab budget, subject to an after-repair value cap." },
      { q: "Can I use your financing at a Texas foreclosure auction?", a: "Yes. Getting pre-approved before the sale puts financing in place so you can bid with confidence." },
      { q: "How fast can you close in Texas?", a: "Most loans close in 5 to 10 business days once title and valuation are complete." },
      { q: "Is there a prepayment penalty?", a: "No. Our fix and flip loans carry no prepayment penalty." },
      { q: "Do you lend on homestead or owner-occupied property?", a: "No. We only finance non-owner-occupied investment property." },
      { q: "What if I want to keep the property as a rental?", a: "Refinance into our 30-year DSCR rental loan once the property is renovated and leased." },
      { q: "Do I need perfect credit?", a: "No. We consider the reasons behind any credit challenges, though recent bankruptcies, foreclosures or judgments may affect approval." },
    ],
    nearby: ["texas-dscr", "colorado-hard-money", "georgia-hard-money"],
  },

  {
    slug: "texas-dscr",
    path: "/texas/dscr-loans",
    region: "Texas",
    short: "TX",
    kind: "DSCR",
    map: "TX",
    meta: {
      title: "Texas DSCR Loans | 30-Year Rental Property Loans | Hedge Wealth Capital",
      description:
        "Texas DSCR loans for rental property in Houston, Dallas, San Antonio, Austin and statewide. Qualify on rent with no tax returns, up to 80% LTV and 680+ FICO.",
      keywords: ["dscr loans texas", "texas dscr lenders", "dscr loan texas", "investment property loans texas", "rental property loans texas"],
    },
    hero: {
      eyebrow: "Texas Rental Property Loans",
      title: "Texas DSCR Loans for",
      accent: "Rental Investors",
      intro:
        "Population growth keeps Texas rentals full. Our DSCR loans let you grow a Texas portfolio on the strength of each property's rent, with no personal income documentation.",
    },
    stats: dscrStats(5),
    markets: {
      heading: "Texas Rental Markets",
      intro: "Where Texas buy-and-hold investors are adding doors.",
      items: [
        { name: "Houston", pin: "Houston", note: "A large, diversified job base supports steady single-family rental demand.", spots: ["Cypress", "Spring", "Pearland", "Humble"] },
        { name: "Dallas–Fort Worth", pin: "Fort Worth", note: "Suburban growth corridors with strong demand for three- and four-bedroom rentals.", spots: ["Frisco", "McKinney", "Denton", "Mesquite"] },
        { name: "San Antonio", pin: "San Antonio", note: "Affordable entry prices and military and healthcare employment.", spots: ["Converse", "Schertz", "Leon Valley", "Helotes"] },
        { name: "Austin", pin: "Austin", note: "Long-term rentals around the tech corridor north and east of the city.", spots: ["Round Rock", "Pflugerville", "Hutto", "Manor"] },
        { name: "West Texas", pin: "Midland", note: "Energy-driven rental demand in the Permian Basin.", spots: ["Midland", "Odessa", "Lubbock"] },
      ],
    },
    programs: {
      heading: "Texas Rental Financing",
      intro: "Long-term debt for Texas rentals.",
      items: [
        { service: "dscr-loans", text: "30-year fixed, up to 80% LTV on purchases, single-family through 10 units." },
        { service: "cash-out-refinance", text: "Pull up to 75% LTV from a Texas rental with typical 3-month seasoning." },
        { service: "rental-portfolio-loans", text: "Finance multiple Texas rentals with one lender." },
        { service: "hard-money-loans", text: "Buying a fixer first? Start with [Texas hard money](/texas/hard-money-lenders) and refinance later." },
      ],
    },
    local: {
      heading: "Running the Numbers on a Texas Rental",
      paragraphs: [
        "DSCR compares rent with the full monthly payment, including property taxes and insurance. In Texas those two lines can be larger than investors from other states expect, so get a current tax estimate and insurance quote before you set your offer price.",
        "Short-term rentals are eligible on our program, but cities like Austin and San Antonio regulate them. Confirm local rules before underwriting a property on nightly-rental income.",
      ],
      notes: [
        { title: "Property taxes", text: "Use the post-purchase assessed value, not the seller's current bill." },
        { title: "Insurance", text: "Wind and hail coverage can move the payment, especially near the Gulf Coast." },
        { title: "LLCs welcome", text: "Close in your own name or your entity's." },
      ],
    },
    steps: [
      { title: "Send property details", text: "Address, purchase price or value, and current or market rent." },
      { title: "Quote within 24 hours", text: "See your rate and leverage based on credit and DSCR." },
      { title: "Lease, insurance, ID", text: "A short one-page application plus a few documents." },
      { title: "Close and hold", text: "Lock in a 30-year fixed payment for the long term." },
    ],
    faqs: [
      { q: "What do I need to qualify for a Texas DSCR loan?", a: "A minimum 680 FICO (exceptions to 660), a property worth at least $100,000, and rent that covers the monthly payment. No tax returns or W-2s." },
      { q: "What is the maximum LTV on a Texas DSCR loan?", a: "Up to 80% for purchases and rate-and-term refinances, and up to 75% for cash-out refinances." },
      { q: "Are Texas short-term rentals eligible?", a: "Yes, short-term rentals are eligible, subject to local city rules." },
      { q: "Do you finance Texas duplexes and fourplexes?", a: "Yes. We finance single-family and 2–10 unit residential rentals." },
      { q: "How are Texas property taxes treated?", a: "Taxes are part of the monthly payment used in the DSCR calculation, so an accurate estimate matters." },
      { q: "Can I close in my LLC?", a: "Yes. LLCs and individuals are both eligible." },
      { q: "What prepayment options are available?", a: "Options include zero prepayment penalty, 3-2-1 and 5-4-3-2-1 declining structures." },
      { q: "How quickly can I get a quote?", a: "Most investors receive a quote within 24 hours of sending the property details." },
    ],
    nearby: ["texas-hard-money", "florida-dscr", "georgia-dscr"],
  },

  {
    slug: "florida-hard-money",
    path: "/florida/hard-money-lenders",
    region: "Florida",
    short: "FL",
    kind: "Hard Money",
    map: "FL",
    meta: {
      title: "Florida Hard Money Lenders | Fix & Flip and Bridge Loans | HWC",
      description:
        "Florida hard money loans for flips and bridge deals in Miami, Tampa, Orlando, Jacksonville and statewide. Up to 100% of purchase and rehab with same-day approvals.",
      keywords: ["hard money lenders florida", "florida hard money lenders", "fix and flip loans florida", "hard money loans florida", "bridge loans florida"],
    },
    hero: {
      eyebrow: "Florida Fix & Flip Financing",
      title: "Hard Money Lenders in",
      accent: "Florida",
      intro:
        "Florida's renovation market rewards speed. Fund the purchase and the rehab on Florida flips from Pensacola to Miami with a lender that decides in-house and closes on schedule.",
    },
    stats: hmStats(6),
    markets: {
      heading: "Florida Flip Markets",
      intro: "Where Florida investors are buying properties that need work.",
      items: [
        { name: "Tampa Bay", pin: "Tampa", note: "Older block homes and bungalows ready for full renovations.", spots: ["Seminole Heights", "Brandon", "St. Petersburg", "Clearwater"] },
        { name: "Orlando", pin: "Orlando", note: "Starter-home flips across fast-growing suburbs.", spots: ["Pine Hills", "Kissimmee", "Apopka", "Sanford"] },
        { name: "Jacksonville", pin: "Jacksonville", note: "A large city footprint with affordable distressed inventory.", spots: ["Riverside", "Arlington", "Mandarin", "Westside"] },
        { name: "South Florida", pin: "Miami", note: "Higher-value renovations and condo projects across three counties.", spots: ["Miami Gardens", "Hollywood", "Fort Lauderdale", "West Palm Beach"] },
        { name: "Southwest Florida", pin: "Fort Myers", note: "Storm-repair and renovation opportunities along the Gulf Coast.", spots: ["Fort Myers", "Cape Coral", "Lehigh Acres", "Naples"] },
        { name: "Panhandle", pin: "Pensacola", note: "Affordable entry points in northwest Florida.", spots: ["Pensacola", "Tallahassee", "Panama City"] },
      ],
    },
    programs: {
      heading: "Florida Renovation Financing",
      intro: "Short-term capital for Florida flips and value-add.",
      items: [
        { service: "hard-money-loans", text: "Up to 100% of purchase and rehab, 6–12 month interest-only terms." },
        { service: "arv-loans", text: "Let the after-repair value carry heavier Florida renovations." },
        { service: "bridge-loans", text: "Multifamily and construction projects with up to 90% loan-to-cost." },
        { service: "dscr-loans", text: "Holding it? Refinance into a [Florida DSCR loan](/florida/dscr-loans)." },
      ],
    },
    local: {
      heading: "Flipping in Florida: What to Know",
      paragraphs: [
        "Florida is a judicial foreclosure state, so distressed homes can take longer to reach the market and county clerk auctions follow court timelines. Pre-approval lets you act when a property finally comes up.",
        "Insurance shapes Florida renovation budgets. Roof age, wind mitigation features and flood zone all affect what a buyer will pay, so many investors include a new roof or impact windows in the scope of work.",
      ],
      notes: [
        { title: "Roof and windows", text: "Updates that improve insurability often improve resale value too." },
        { title: "Condo projects", text: "Florida condo safety rules require milestone inspections on many older buildings; check association reserves." },
        { title: "Permits", text: "Permit timelines vary by county; build them into your 6–12 month term." },
      ],
    },
    steps: [
      { title: "Pre-approval", text: "Get financing in place before auctions and listings." },
      { title: "Scope the rehab", text: "Include roof, windows and other insurance-driven updates." },
      { title: "Close", text: "Close in 5 to 10 business days." },
      { title: "Renovate & exit", text: "Sell with no prepayment penalty or refinance into a rental loan." },
    ],
    faqs: [
      { q: "Where do you make hard money loans in Florida?", a: "Statewide, including Miami, Fort Lauderdale, West Palm Beach, Tampa, St. Petersburg, Orlando, Jacksonville, Fort Myers, Tallahassee and Pensacola." },
      { q: "How much can I borrow on a Florida flip?", a: "Up to 100% of the purchase price and up to 100% of the rehab, subject to an after-repair value cap." },
      { q: "Do you finance condo renovations in Florida?", a: "We review condos case by case, including the building's inspections, reserves and any special assessments." },
      { q: "How long are your Florida hard money loans?", a: "Terms run 6 to 12 months, interest-only, with extensions available if a project runs long." },
      { q: "Can I buy at a Florida foreclosure auction?", a: "Yes. Pre-approval gives you financing before the auction so you can bid and close on time." },
      { q: "Is there a prepayment penalty?", a: "No. Pay off your fix and flip loan whenever the property sells." },
      { q: "Do you lend on owner-occupied homes?", a: "No. We only finance investment property." },
      { q: "Can I refinance into a rental loan afterward?", a: "Yes. Many Florida investors refinance into our 30-year DSCR loan once the home is leased." },
    ],
    nearby: ["florida-dscr", "georgia-hard-money", "north-carolina-hard-money"],
  },

  {
    slug: "florida-dscr",
    path: "/florida/dscr-loans",
    region: "Florida",
    short: "FL",
    kind: "DSCR",
    map: "FL",
    meta: {
      title: "Florida DSCR Loans | Long-Term Rental Financing | Hedge Wealth Capital",
      description:
        "Florida DSCR loans for long-term and short-term rentals in Orlando, Tampa, Jacksonville, Miami and statewide. No tax returns, up to 80% LTV, 30-year fixed.",
      keywords: ["dscr loans florida", "florida dscr lenders", "dscr loan florida", "florida investment property loans", "short term rental dscr florida"],
    },
    hero: {
      eyebrow: "Florida Rental Property Loans",
      title: "Florida DSCR Loans for",
      accent: "Rental Property",
      intro:
        "Florida's population keeps growing, and so does demand for rentals. Qualify on each property's rent and build a Florida portfolio without handing over your tax returns.",
    },
    stats: dscrStats(5),
    markets: {
      heading: "Florida Rental Markets",
      intro: "Long-term and vacation rental markets across the state.",
      items: [
        { name: "Orlando", pin: "Orlando", note: "Long-term rentals plus vacation homes near the attractions corridor.", spots: ["Kissimmee", "Clermont", "Davenport", "Winter Garden"] },
        { name: "Tampa Bay", pin: "St. Petersburg", note: "Strong household growth and single-family rental demand.", spots: ["Riverview", "Wesley Chapel", "Largo", "Lakeland"] },
        { name: "Jacksonville", pin: "Jacksonville", note: "Affordable prices relative to rents in a large metro.", spots: ["Orange Park", "Fleming Island", "Arlington", "Southside"] },
        { name: "South Florida", pin: "Fort Lauderdale", note: "High rents and steady demand across Miami-Dade, Broward and Palm Beach.", spots: ["Pembroke Pines", "Miramar", "Boynton Beach", "Homestead"] },
        { name: "Gulf Coast", pin: "Fort Myers", note: "Long-term and seasonal rentals along Southwest Florida.", spots: ["Cape Coral", "Fort Myers", "Port Charlotte", "Naples"] },
      ],
    },
    programs: {
      heading: "Florida Rental Financing",
      intro: "Built for Florida buy-and-hold investors.",
      items: [
        { service: "dscr-loans", text: "30-year fixed, up to 80% LTV, including eligible short-term rentals." },
        { service: "cash-out-refinance", text: "Turn Florida rental equity into capital, up to 75% LTV." },
        { service: "rental-portfolio-loans", text: "Scale from one Florida rental to many with one lender." },
        { service: "hard-money-loans", text: "Renovating first? Start with [Florida hard money](/florida/hard-money-lenders)." },
      ],
    },
    local: {
      heading: "Underwriting a Florida Rental",
      paragraphs: [
        "Insurance is often the swing factor in Florida DSCR math. Because the ratio compares rent with principal, interest, taxes, insurance and association dues, get a current wind and flood quote before you commit to a price.",
        "Short-term rentals are eligible, but many Florida cities and HOAs restrict them. Confirm the property can legally operate as a vacation rental before relying on nightly income.",
      ],
      notes: [
        { title: "Wind & flood", text: "Insurance quotes can vary widely by roof age, construction and flood zone." },
        { title: "HOA and condo dues", text: "Association dues and special assessments are part of the DSCR calculation." },
        { title: "No state income tax", text: "Florida's tax structure appeals to many investors and residents." },
      ],
    },
    steps: [
      { title: "Property details", text: "Address, price or value, and long-term or short-term rent." },
      { title: "Insurance quote", text: "Get wind and flood quotes early; they drive the payment." },
      { title: "24-hour quote", text: "We quote rate and leverage based on credit and DSCR." },
      { title: "Close & hold", text: "Close on a 30-year fixed loan in your name or your LLC's." },
    ],
    faqs: [
      { q: "Can I get a DSCR loan for a Florida vacation rental?", a: "Yes. Short-term rentals are eligible, provided local rules and any HOA allow them." },
      { q: "What credit score do Florida DSCR loans require?", a: "A minimum FICO of 680, with exceptions considered as low as 660." },
      { q: "What is the maximum LTV?", a: "Up to 80% for purchases and rate-and-term refinances, and up to 75% for cash-out." },
      { q: "How does Florida insurance affect my DSCR?", a: "Insurance is part of the monthly payment in the DSCR calculation, so higher premiums lower the ratio." },
      { q: "Do you finance Florida condos?", a: "We review condos case by case, including association dues, reserves and building inspections." },
      { q: "Do I need tax returns?", a: "No. Florida DSCR loans qualify on the property's rental income and your credit." },
      { q: "Can I hold properties in an LLC?", a: "Yes. LLCs and individuals are both eligible." },
      { q: "Do you finance Florida multifamily?", a: "Yes, single-family and 2–10 unit residential rentals." },
    ],
    nearby: ["florida-hard-money", "georgia-dscr", "texas-dscr"],
  },

  {
    slug: "georgia-hard-money",
    path: "/georgia/hard-money-lenders",
    region: "Georgia",
    short: "GA",
    kind: "Hard Money",
    map: "GA",
    meta: {
      title: "Hard Money Lenders in Georgia | Atlanta Fix & Flip Loans | HWC",
      description:
        "Georgia hard money loans for fix and flip investors in Atlanta, Savannah, Augusta, Macon and statewide. Up to 100% of purchase and rehab, same-day approvals.",
      keywords: ["hard money lenders georgia", "hard money lenders atlanta", "fix and flip loans georgia", "georgia hard money loans", "atlanta fix and flip lenders"],
    },
    hero: {
      eyebrow: "Georgia Fix & Flip Financing",
      title: "Hard Money Lenders in",
      accent: "Georgia",
      intro:
        "Metro Atlanta is one of the country's busiest renovation markets, and Georgia's smaller cities offer value too. Fund the purchase and rehab with a direct lender that approves the same day.",
    },
    stats: hmStats(5),
    markets: {
      heading: "Georgia Renovation Markets",
      intro: "Where Georgia investors are buying homes that need work.",
      items: [
        { name: "Metro Atlanta", pin: "Atlanta", note: "Intown bungalows and suburban ranch homes across a deep, active market.", spots: ["West End", "East Point", "Decatur", "Marietta", "Stone Mountain"] },
        { name: "Savannah", pin: "Savannah", note: "Historic renovations and coastal-area flips.", spots: ["Thomas Square", "Pooler", "Garden City", "Midtown"] },
        { name: "Augusta", pin: "Augusta", note: "Affordable inventory with medical and military employment.", spots: ["Summerville", "Martinez", "Evans", "Hephzibah"] },
        { name: "Macon", pin: "Macon", note: "Low entry prices for investors building volume.", spots: ["Ingleside", "Vineville", "Warner Robins"] },
        { name: "Columbus & Athens", pin: "Athens", note: "University and military towns with steady resale demand.", spots: ["Athens", "Columbus", "Phenix City area"] },
      ],
    },
    programs: {
      heading: "Georgia Renovation Financing",
      intro: "Capital for flips and value-add projects across Georgia.",
      items: [
        { service: "hard-money-loans", text: "Up to 100% of purchase and rehab with no prepayment penalty." },
        { service: "arv-loans", text: "Size heavier rehabs on the after-repair value." },
        { service: "bridge-loans", text: "Ground-up and multifamily projects with up to 90% LTC." },
        { service: "dscr-loans", text: "Keeping the house? Refinance into a [Georgia DSCR loan](/georgia/dscr-loans)." },
      ],
    },
    local: {
      heading: "Flipping in Georgia: What to Know",
      paragraphs: [
        "Georgia uses non-judicial foreclosure under security deeds, and foreclosure sales are held on the first Tuesday of each month at the county courthouse. Pre-approved financing lets you bid without scrambling.",
        "Georgia real estate closings are conducted by attorneys. Choose an investor-friendly closing attorney early so title review doesn't slow a fast purchase.",
      ],
      notes: [
        { title: "Attorney closings", text: "Your Georgia closing attorney coordinates title and funding with us." },
        { title: "Older intown homes", text: "Budget for electrical, plumbing and foundation work on early 1900s bungalows." },
        { title: "Statewide", text: "From Atlanta to Savannah, we lend anywhere in Georgia." },
      ],
    },
    steps: [
      { title: "Pre-approval", text: "Financing ready before the first-Tuesday sale or next listing." },
      { title: "Contract & scope", text: "Send the contract and a line-item rehab budget." },
      { title: "Attorney closing", text: "Close in 5 to 10 business days through your closing attorney." },
      { title: "Renovate & sell", text: "Draw funds as work is done; no prepayment penalty." },
    ],
    faqs: [
      { q: "Do you make hard money loans in Atlanta?", a: "Yes, across metro Atlanta and statewide, including Savannah, Augusta, Macon, Columbus and Athens." },
      { q: "How much can I borrow on a Georgia flip?", a: "Up to 100% of the purchase price and up to 100% of the rehab, subject to an after-repair value cap." },
      { q: "Can I use your loan at a Georgia foreclosure sale?", a: "Yes. Pre-approval gives you financing in place before the first-Tuesday courthouse sale." },
      { q: "Who handles the closing in Georgia?", a: "Georgia closings are conducted by attorneys, who coordinate title and funding with us." },
      { q: "How fast can you close?", a: "Most loans close in 5 to 10 business days once title and valuation are complete." },
      { q: "Is there a prepayment penalty?", a: "No. Repay early whenever the property sells." },
      { q: "Do first-time flippers qualify?", a: "Yes, with adequate reserves, a realistic scope of work and a capable contractor." },
      { q: "Do you lend on owner-occupied homes?", a: "No. Our loans are for investment property only." },
    ],
    nearby: ["georgia-dscr", "north-carolina-hard-money", "florida-hard-money"],
  },

  {
    slug: "georgia-dscr",
    path: "/georgia/dscr-loans",
    region: "Georgia",
    short: "GA",
    kind: "DSCR",
    map: "GA",
    meta: {
      title: "Georgia DSCR Loans | Atlanta Rental Property Loans | Hedge Wealth Capital",
      description:
        "Georgia DSCR loans for rental investors in metro Atlanta, Savannah, Augusta and statewide. Qualify on rent, no tax returns, up to 80% LTV and 30-year fixed.",
      keywords: ["dscr loans georgia", "georgia dscr lenders", "dscr loan atlanta", "rental property loans georgia", "atlanta investment property loans"],
    },
    hero: {
      eyebrow: "Georgia Rental Property Loans",
      title: "Georgia DSCR Loans for",
      accent: "Rental Investors",
      intro:
        "Metro Atlanta has long been one of the country's leading single-family rental markets. Finance Georgia rentals on their cash flow with a 30-year fixed loan and no personal income documentation.",
    },
    stats: dscrStats(4),
    markets: {
      heading: "Georgia Rental Markets",
      intro: "Where Georgia buy-and-hold investors are adding doors.",
      items: [
        { name: "Metro Atlanta suburbs", pin: "Atlanta", note: "Single-family rental demand across fast-growing suburban counties.", spots: ["Gwinnett", "Henry County", "Douglasville", "Kennesaw"] },
        { name: "Savannah", pin: "Savannah", note: "Port and logistics growth supporting workforce rentals.", spots: ["Pooler", "Richmond Hill", "Rincon"] },
        { name: "Augusta", pin: "Augusta", note: "Healthcare and military employment drive steady tenant demand.", spots: ["Grovetown", "Martinez", "Evans"] },
        { name: "Middle & South Georgia", pin: "Macon", note: "Affordable rentals in smaller cities.", spots: ["Macon", "Warner Robins", "Albany", "Valdosta"] },
      ],
    },
    programs: {
      heading: "Georgia Rental Financing",
      intro: "Long-term debt for Georgia rentals.",
      items: [
        { service: "dscr-loans", text: "30-year fixed, no call, up to 80% LTV on purchases." },
        { service: "cash-out-refinance", text: "Refinance Atlanta rentals and pull up to 75% LTV." },
        { service: "rental-portfolio-loans", text: "One lending partner as your Georgia portfolio grows." },
        { service: "hard-money-loans", text: "Need to renovate first? Start with [Georgia hard money](/georgia/hard-money-lenders)." },
      ],
    },
    local: {
      heading: "Holding Rentals in Georgia",
      paragraphs: [
        "Georgia's large single-family rental market means plenty of comparable rents for underwriting. Use realistic market rent, current property taxes and an insurance quote to estimate your DSCR before you offer.",
        "Closings in Georgia are attorney-led, and many investors hold rentals in an LLC. Both individuals and entities are eligible on our program.",
      ],
      notes: [
        { title: "Comparable rents", text: "Strong rental data helps support your DSCR." },
        { title: "HOA communities", text: "Some subdivisions restrict leasing; check covenants first." },
        { title: "LLCs welcome", text: "Close in your name or your entity's." },
      ],
    },
    steps: [
      { title: "Send the rental", text: "Address, price or value, lease or market rent." },
      { title: "Quote in 24 hours", text: "Rate and leverage based on credit and DSCR." },
      { title: "Short application", text: "One page, plus lease, insurance and bank statements." },
      { title: "Attorney closing", text: "Close through your Georgia closing attorney." },
    ],
    faqs: [
      { q: "Do you offer DSCR loans in Atlanta?", a: "Yes, across metro Atlanta and statewide in Georgia." },
      { q: "What is the minimum credit score?", a: "680 FICO, with exceptions considered down to 660." },
      { q: "Do Georgia DSCR loans require income verification?", a: "No. Approval is based on the property's rent and your credit, with no tax returns or W-2s." },
      { q: "What LTV is available?", a: "Up to 80% on purchases and rate-and-term refinances, and up to 75% on cash-out." },
      { q: "Are short-term rentals eligible in Georgia?", a: "Yes, subject to city rules and any HOA covenants." },
      { q: "What property types qualify?", a: "Single-family and 2–10 unit residential rentals worth at least $100,000." },
      { q: "Can I refinance several Atlanta rentals?", a: "Yes. Ask about our rental portfolio loans for multiple properties." },
      { q: "What prepayment options do you offer?", a: "Zero-penalty, 3-2-1 and 5-4-3-2-1 declining structures." },
    ],
    nearby: ["georgia-hard-money", "florida-dscr", "north-carolina-dscr"],
  },

  {
    slug: "north-carolina-hard-money",
    path: "/north-carolina/hard-money-lenders",
    region: "North Carolina",
    short: "NC",
    kind: "Hard Money",
    map: "NC",
    meta: {
      title: "North Carolina Hard Money Lenders | Fix & Flip Loans | HWC",
      description:
        "North Carolina hard money loans for flips in Charlotte, Raleigh-Durham, Greensboro, Winston-Salem and statewide. Up to 100% of purchase and rehab, same-day approvals.",
      keywords: ["hard money lenders north carolina", "hard money lenders charlotte nc", "fix and flip loans north carolina", "raleigh hard money lenders", "nc hard money loans"],
    },
    hero: {
      eyebrow: "North Carolina Fix & Flip Financing",
      title: "Hard Money Lenders in",
      accent: "North Carolina",
      intro:
        "From Charlotte to the Triangle, North Carolina's growth keeps renovated homes in demand. Fund purchase and rehab with a direct lender that approves the same day.",
    },
    stats: hmStats(6),
    markets: {
      heading: "North Carolina Renovation Markets",
      intro: "Where North Carolina investors are renovating and reselling.",
      items: [
        { name: "Charlotte", pin: "Charlotte", note: "Older homes near Uptown and growing suburbs on every side.", spots: ["West End", "Plaza Midwood", "Gastonia", "Concord"] },
        { name: "Raleigh–Durham", pin: "Raleigh", note: "Research Triangle demand supports full renovations.", spots: ["Southeast Raleigh", "East Durham", "Garner", "Fuquay-Varina"] },
        { name: "Greensboro", pin: "Greensboro", note: "Affordable Piedmont Triad inventory.", spots: ["Glenwood", "High Point", "Burlington"] },
        { name: "Winston-Salem", pin: "Winston-Salem", note: "Mid-century homes with value-add potential.", spots: ["Ardmore", "Kernersville", "Clemmons"] },
        { name: "Fayetteville", pin: "Fayetteville", note: "Military-driven resale and rental demand.", spots: ["Hope Mills", "Spring Lake", "Haymount"] },
        { name: "Wilmington & Asheville", pin: "Asheville", note: "Coastal and mountain markets with higher resale values.", spots: ["Wilmington", "Leland", "Asheville", "Hendersonville"] },
      ],
    },
    programs: {
      heading: "North Carolina Renovation Financing",
      intro: "Short-term capital for North Carolina projects.",
      items: [
        { service: "hard-money-loans", text: "Up to 100% of purchase and rehab with 6–12 month terms." },
        { service: "arv-loans", text: "Let the after-repair value carry the loan on heavier rehabs." },
        { service: "bridge-loans", text: "New construction and multifamily with up to 90% LTC." },
        { service: "dscr-loans", text: "Holding it? Refinance into a [North Carolina DSCR loan](/north-carolina/dscr-loans)." },
      ],
    },
    local: {
      heading: "Flipping in North Carolina: What to Know",
      paragraphs: [
        "North Carolina forecloses through a power-of-sale process that includes a hearing before the clerk of superior court, and upset bids can reopen a sale for a short period afterward. Factor that timing into auction purchases.",
        "Attorneys play a central role in North Carolina closings. Bring an investor-friendly closing attorney in early to keep a fast purchase on track.",
      ],
      notes: [
        { title: "Upset bid period", text: "Foreclosure sales can be reopened by higher bids for a short window." },
        { title: "Attorney closings", text: "Your NC closing attorney coordinates title and funding." },
        { title: "Mountains to coast", text: "We lend anywhere in North Carolina." },
      ],
    },
    steps: [
      { title: "Pre-approval", text: "Financing ready before auctions and listings." },
      { title: "Contract & scope", text: "Send the contract and line-item rehab budget." },
      { title: "Attorney closing", text: "Close in 5 to 10 business days." },
      { title: "Renovate & exit", text: "Sell with no penalty or refinance into a rental loan." },
    ],
    faqs: [
      { q: "Do you make hard money loans in Charlotte and Raleigh?", a: "Yes, and statewide across North Carolina." },
      { q: "How much can I borrow on an NC flip?", a: "Up to 100% of purchase and rehab, subject to an after-repair value cap." },
      { q: "How does the upset bid period affect auction purchases?", a: "After a North Carolina foreclosure sale, higher bids can reopen the sale for a short period, so plan your timeline and financing accordingly." },
      { q: "Who handles NC closings?", a: "Attorneys play a central role in North Carolina closings and coordinate title and funding with us." },
      { q: "How quickly can you close?", a: "Most loans close in 5 to 10 business days once title and valuation are complete." },
      { q: "Is there a prepayment penalty?", a: "No. Repay whenever the property sells." },
      { q: "Do you lend on owner-occupied homes?", a: "No. We only finance investment property." },
      { q: "Can I keep the house as a rental?", a: "Yes. Refinance into our 30-year DSCR loan once it's leased." },
    ],
    nearby: ["north-carolina-dscr", "georgia-hard-money", "new-york"],
  },

  {
    slug: "north-carolina-dscr",
    path: "/north-carolina/dscr-loans",
    region: "North Carolina",
    short: "NC",
    kind: "DSCR",
    map: "NC",
    meta: {
      title: "North Carolina DSCR Loans | Rental Property Financing | HWC",
      description:
        "North Carolina DSCR loans for rentals in Charlotte, Raleigh-Durham, Greensboro, Fayetteville and statewide. No tax returns, up to 80% LTV, 30-year fixed.",
      keywords: ["dscr loans north carolina", "nc dscr lenders", "dscr loan charlotte", "raleigh rental property loans", "north carolina investment property loans"],
    },
    hero: {
      eyebrow: "North Carolina Rental Loans",
      title: "North Carolina DSCR Loans for",
      accent: "Rental Property",
      intro:
        "Job growth across Charlotte and the Research Triangle keeps North Carolina rentals in demand. Qualify on each property's rent and hold it on a 30-year fixed loan.",
    },
    stats: dscrStats(5),
    markets: {
      heading: "North Carolina Rental Markets",
      intro: "Where North Carolina landlords are growing portfolios.",
      items: [
        { name: "Charlotte metro", pin: "Charlotte", note: "Financial-sector employment and suburban growth.", spots: ["Matthews", "Huntersville", "Gastonia", "Rock Hill area"] },
        { name: "Research Triangle", pin: "Durham", note: "Universities, healthcare and tech support long-term demand.", spots: ["Cary", "Durham", "Wake Forest", "Clayton"] },
        { name: "Piedmont Triad", pin: "Greensboro", note: "Affordable rentals between Greensboro and Winston-Salem.", spots: ["High Point", "Kernersville", "Burlington"] },
        { name: "Fayetteville", pin: "Fayetteville", note: "Military housing demand from a large nearby installation.", spots: ["Hope Mills", "Spring Lake", "Raeford"] },
        { name: "Coastal & Mountain", pin: "Wilmington", note: "Long-term and vacation rentals at the coast and in the mountains.", spots: ["Wilmington", "Jacksonville NC", "Asheville"] },
      ],
    },
    programs: {
      heading: "North Carolina Rental Financing",
      intro: "Long-term debt for NC rentals.",
      items: [
        { service: "dscr-loans", text: "30-year fixed, no call, up to 80% LTV on purchases." },
        { service: "cash-out-refinance", text: "Pull up to 75% LTV from NC rentals to fund the next deal." },
        { service: "rental-portfolio-loans", text: "Grow a North Carolina portfolio with one lender." },
        { service: "hard-money-loans", text: "Renovating first? Start with [NC hard money](/north-carolina/hard-money-lenders)." },
      ],
    },
    local: {
      heading: "Holding Rentals in North Carolina",
      paragraphs: [
        "North Carolina rentals near military bases, universities and hospitals tend to see steady demand. Underwrite with realistic market rent, current county property taxes and an insurance quote, especially near the coast where wind coverage matters.",
        "Mountain and coastal vacation rentals are eligible on our program, subject to local rules and any HOA restrictions.",
      ],
      notes: [
        { title: "Coastal insurance", text: "Wind and flood coverage can change the payment near the shore." },
        { title: "Vacation rentals", text: "Eligible where local rules allow them." },
        { title: "LLCs welcome", text: "Individuals and entities are both eligible." },
      ],
    },
    steps: [
      { title: "Send the rental", text: "Address, value and lease or market rent." },
      { title: "Quote in 24 hours", text: "Rate and leverage based on credit and DSCR." },
      { title: "Short application", text: "Lease, insurance, ID and two months of bank statements." },
      { title: "Close & hold", text: "Lock a 30-year fixed payment." },
    ],
    faqs: [
      { q: "Do you offer DSCR loans in Charlotte and Raleigh?", a: "Yes, and across North Carolina." },
      { q: "What credit score is required?", a: "A minimum 680 FICO, with exceptions down to 660." },
      { q: "What is the maximum LTV?", a: "80% on purchases and rate-and-term, 75% on cash-out refinances." },
      { q: "Do I need tax returns?", a: "No. NC DSCR loans qualify on rental income and credit." },
      { q: "Are vacation rentals in Asheville or Wilmington eligible?", a: "Yes, short-term rentals are eligible where local rules and HOAs allow them." },
      { q: "What properties qualify?", a: "Single-family and 2–10 unit residential rentals worth at least $100,000." },
      { q: "Can I close in an LLC?", a: "Yes. LLCs and individuals are both eligible." },
      { q: "What prepayment options are available?", a: "Zero-penalty, 3-2-1 and 5-4-3-2-1 declining structures." },
    ],
    nearby: ["north-carolina-hard-money", "georgia-dscr", "florida-dscr"],
  },

  {
    slug: "colorado-hard-money",
    path: "/colorado/hard-money-lenders",
    region: "Colorado",
    short: "CO",
    kind: "Hard Money",
    map: "CO",
    meta: {
      title: "Colorado Hard Money Lenders | Denver Fix & Flip Loans | HWC",
      description:
        "Colorado hard money loans for flips and bridge deals in Denver, Colorado Springs, Aurora, Fort Collins and statewide. Up to 100% of purchase and rehab, same-day approvals.",
      keywords: ["hard money lenders colorado", "hard money lenders denver", "fix and flip loans colorado", "colorado hard money loans", "colorado springs hard money"],
    },
    hero: {
      eyebrow: "Colorado Fix & Flip Financing",
      title: "Hard Money Lenders in",
      accent: "Colorado",
      intro:
        "Colorado's Front Range has some of the highest resale values in the Mountain West, which makes well-funded renovations worth it. Finance the purchase and rehab with a lender that decides the same day.",
    },
    stats: hmStats(6),
    markets: {
      heading: "Colorado Renovation Markets",
      intro: "Front Range and beyond.",
      items: [
        { name: "Denver", pin: "Denver", note: "Mid-century ranches and older bungalows in established neighborhoods.", spots: ["Montbello", "Westwood", "Lakewood", "Englewood"] },
        { name: "Aurora", pin: "Aurora", note: "Affordable east-metro inventory for volume flippers.", spots: ["Original Aurora", "Saddle Rock", "Parker"] },
        { name: "Colorado Springs", pin: "Colorado Springs", note: "Military and tech employment support resale demand.", spots: ["Security-Widefield", "Fountain", "Old Colorado City"] },
        { name: "Northern Colorado", pin: "Fort Collins", note: "College and agricultural hubs with steady buyers.", spots: ["Fort Collins", "Loveland", "Greeley"] },
        { name: "Boulder", pin: "Boulder", note: "High-value renovations with strong resale.", spots: ["Boulder", "Longmont", "Lafayette"] },
        { name: "Pueblo & Western Slope", pin: "Grand Junction", note: "Lower entry prices outside the metro core.", spots: ["Pueblo", "Grand Junction", "Montrose"] },
      ],
    },
    programs: {
      heading: "Colorado Renovation Financing",
      intro: "Short-term capital for Colorado projects.",
      items: [
        { service: "hard-money-loans", text: "Up to 100% of purchase and rehab with no prepayment penalty." },
        { service: "arv-loans", text: "Size heavier rehabs on the after-repair value." },
        { service: "bridge-loans", text: "Ground-up and multifamily projects with up to 90% LTC." },
        { service: "dscr-loans", text: "Keeping it? Refinance into a 30-year [DSCR loan](/dscr-loans)." },
      ],
    },
    local: {
      heading: "Flipping in Colorado: What to Know",
      paragraphs: [
        "Colorado foreclosures are handled through each county's public trustee, and sales follow published schedules. Pre-approved financing lets you bid without delay when the right property comes up.",
        "Winter weather can slow exterior work along the Front Range and in the mountains. Build seasonal timing into your 6 to 12 month term, and ask about extensions before closing if your project needs them.",
      ],
      notes: [
        { title: "Public trustee sales", text: "County public trustees run Colorado foreclosure sales." },
        { title: "Seasonal timing", text: "Plan roofing and exterior work around snow." },
        { title: "Radon testing", text: "Many buyers request radon tests; mitigation is common in Colorado." },
      ],
    },
    steps: [
      { title: "Pre-approval", text: "Financing ready before trustee sales and listings." },
      { title: "Contract & scope", text: "Send the contract and a line-item rehab budget." },
      { title: "Close fast", text: "Close in 5 to 10 business days." },
      { title: "Renovate & sell", text: "Draw rehab funds; pay off with no penalty." },
    ],
    faqs: [
      { q: "Do you make hard money loans in Denver?", a: "Yes, across the Denver metro and statewide in Colorado." },
      { q: "How much can I borrow on a Colorado flip?", a: "Up to 100% of purchase and rehab, subject to an after-repair value cap." },
      { q: "Can I buy at a public trustee sale with your financing?", a: "Yes. Pre-approval puts financing in place before the sale." },
      { q: "How fast can you close in Colorado?", a: "Most loans close in 5 to 10 business days once title and valuation are complete." },
      { q: "What if winter delays my project?", a: "Extensions are available; review the extension terms with your loan officer before closing." },
      { q: "Is there a prepayment penalty?", a: "No. Pay off whenever the home sells." },
      { q: "Do you lend on owner-occupied homes?", a: "No. Investment property only." },
      { q: "Can I refinance into a rental loan?", a: "Yes. Move into our 30-year DSCR loan once the home is leased." },
    ],
    nearby: ["texas-hard-money", "texas-dscr", "georgia-hard-money"],
  },
];

export const getArea = (slug: AreaSlug) => areas.find((a) => a.slug === slug)!;
