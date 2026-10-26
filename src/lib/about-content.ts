/**
 * About page copy, from the current hedgewealthcapital.com/about-hedge-wealth-capital page
 * and content-reference/Hedge_Wealth_Capital_Website_content.docx (section 9).
 *
 * Photos in /public/images/about are free-licence Unsplash stock placeholders; swap for client photos.
 */

export const aboutMeta = {
  title: "About Hedge Wealth Capital | Private Real Estate Lender Since 2010",
  description:
    "Hedge Wealth Capital is a privately owned real estate lender founded in 2010, funding fix & flip, ground-up construction, multifamily bridge, and rental loans in all 50 states and D.C.",
};

export const aboutHero = {
  eyebrow: "Who We Are",
  title: "We Are Hedge Wealth Capital",
  lead: "Founded in 2010, we are a privately owned real estate financing firm known for speed, reliability, and exceptional service.",
  sub: "With a dedicated team of 25 professionals, we serve investors nationwide, covering all 50 states and Washington, D.C.",
  images: [
    { src: "/images/about/modern-home.jpg", alt: "Modern white investment home" },
    { src: "/images/about/townhome.jpg", alt: "Renovated multi-level townhome" },
    { src: "/images/about/new-build.jpg", alt: "Newly constructed residential building" },
  ],
};

export const aboutStats = [
  { value: 15, prefix: "", suffix: "+", label: "Years in business" },
  { value: 2, prefix: "$", suffix: "B+", label: "In loans funded" },
  { value: 9000, prefix: "", suffix: "+", label: "Projects funded" },
  { value: 50, prefix: "", suffix: " + DC", label: "States we lend in" },
];

export const aboutStory = {
  eyebrow: "Built by Investors",
  title: "A Lender Designed by Investors, for Investors",
  paragraphs: [
    "As real estate investors ourselves, we understand the challenges you face. With a portfolio of 275 properties under management, we created a lender specifically for investors, designed by investors who know the market, the risks, and the opportunities.",
    "We offer a comprehensive suite of real estate investment financing solutions, including Ground-Up Construction, Multifamily Bridge Loans, Fix & Flip, and 15-Year Rental Loans.",
  ],
  points: [
    { title: "Start With the Property", body: "What are you acquiring, what needs to change, and how will the financing be repaid? Those questions belong at the beginning." },
    { title: "Clarity at the Points That Matter", body: "Review the proposed loan structure, ask practical questions, and understand the conditions before you commit." },
    { title: "Common-Sense Underwriting", body: "We make all underwriting decisions ourselves and look at your full financial picture, not a rigid formula." },
  ],
  image: { src: "/images/about/rowhouses.jpg", alt: "Row of renovated brick townhouses" },
  badge: { value: 275, suffix: "+", label: "Units under management" },
};

export const aboutGroup = {
  eyebrow: "The Hedge Wealth Group",
  title: "Vertically Integrated, From Acquisition to Lending",
  lead: "Hedge Wealth Capital is part of the Hedge Wealth Group of Companies, a privately held, vertically integrated residential real estate investment firm focused on revitalizing properties and creating thriving communities for investors and residents alike.",
  companies: [
    {
      key: "properties",
      name: "Hedge Wealth Properties",
      tag: "Acquire & Renovate",
      stat: { value: "~100", label: "Distressed units acquired annually" },
      body: "We acquire approximately 100 distressed units annually in the Baltimore Metro area. Each property is carefully renovated and either sold or added to our growing rental portfolio of 275+ units.",
      image: { src: "/images/about/rowhouses.jpg", alt: "Renovated rowhouses" },
    },
    {
      key: "management",
      name: "Hedge Wealth Management",
      tag: "Manage & Maintain",
      stat: { value: "275+", label: "Residential units managed" },
      body: "With a portfolio of 275+ residential units, we provide professional, high-quality property management. Our construction division handles turnovers, renovations, and new builds, so tenants enjoy safe, well-maintained, and comfortable living spaces.",
      image: { src: "/images/about/interior.jpg", alt: "Well-maintained renovated living room" },
    },
    {
      key: "capital",
      name: "Hedge Wealth Capital",
      tag: "Finance Investors",
      stat: { value: "50 + DC", label: "States we lend in" },
      body: "As a privately owned, nationwide lender, Hedge Wealth Capital offers a comprehensive suite of residential real estate financing solutions, including Fix & Flip, 15-Year Rental Loans, Ground-Up Construction, and Multifamily Bridge Loans.",
      image: { src: "/images/about/keys.jpg", alt: "Keys handed over above model houses" },
    },
  ],
};

export const aboutReach = {
  eyebrow: "Lending Across the Nation",
  title: "All 50 States and Washington, D.C.",
  body: "Wherever your next investment is, we can finance it. Share the property location and your strategy, and our team will review the program that fits.",
};

export const aboutFaqs = [
  { q: "Where does Hedge Wealth Capital lend?", a: "We lend in all 50 states and the District of Columbia." },
  {
    q: "What does HWC focus on?",
    a: "Real estate investment financing, with programs covering fix-and-flip, rental, ground-up construction, and multifamily bridge transactions.",
  },
  {
    q: "How can I verify who will originate or fund my loan?",
    a: "Ask for the legal entity names, applicable licensing information, and each party’s role in your transaction. Review those details in the proposed documents.",
  },
  {
    q: "Where can I learn about the people handling my transaction?",
    a: "Ask HWC for the name, role, and contact details of the person responsible for your inquiry.",
  },
];

export const aboutCta = {
  title: "Talk With HWC",
  body: "Have a property under contract or a project you are evaluating? Tell us where things stand and what financing questions you need to resolve.",
};
