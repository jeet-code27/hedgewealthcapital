/**
 * Blog posts migrated from hedgewealthcapital.com/news. Slugs match the old URLs so
 * next.config.ts can redirect the old root-level addresses to /blog/<slug>.
 *
 * Migration fixes: the "[Date]" placeholder left in each dateline was removed, and the
 * $2B post's body (which said "$4 billion") now matches its title and the rest of the site.
 */

export type BlogBlock = { type: "p"; text: string } | { type: "h2"; text: string } | { type: "list"; items: string[] } | { type: "quote"; text: string; by: string };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: { src: string; alt: string };
  body: BlogBlock[];
};

export const blogMeta = {
  title: "Real Estate Financing Guides & News | Hedge Wealth Capital",
  description:
    "Company news, new loan products and insights for real estate investors from Hedge Wealth Capital, a direct private lender in all 50 states.",
  intro:
    "Announcements on new loan products, company milestones and partnerships, plus insights that reflect our commitment to supporting real estate investors.",
};

export const posts: BlogPost[] = [
  {
    slug: "hedge-wealth-capital-closes-150-million-securitization-backed-by-464-residential-transition-loans",
    title: "Hedge Wealth Capital Closes $150 Million Securitization Backed by 464 Residential Transition Loans",
    date: "2025-08-27",
    category: "Company News",
    excerpt: "A $150 million securitization backed by 464 residential transition loans expands lending capacity for investors nationwide.",
    image: { src: "/images/about/keys.jpg", alt: "Keys handed over above model houses" },
    body: [
      { type: "p", text: "Baltimore, MD – Hedge Wealth Capital has announced the successful closing of a $150 million securitization, backed by 464 Residential Transition Loans originated through its lending platform." },
      { type: "h2", text: "Strengthening Access to Capital" },
      { type: "p", text: "This securitization marks a significant step in the company’s growth strategy, ensuring greater liquidity and stability to continue meeting borrower demand nationwide. By packaging high-performing residential transition loans, Hedge Wealth Capital is able to expand lending capacity and deliver more competitive financing to real estate investors." },
      { type: "quote", text: "This securitization demonstrates the strength and performance of our loan portfolio. It positions us to better serve investors with reliable, scalable funding solutions.", by: "Hedge Wealth Capital executive team" },
      { type: "h2", text: "Commitment to Investor Success" },
      { type: "p", text: "The transaction highlights Hedge Wealth Capital’s dedication to providing innovative financing products while reinforcing confidence among capital markets. Investors can expect continued access to flexible, nationwide lending programs that support long-term portfolio growth." },
    ],
  },
  {
    slug: "hedge-wealth-capital-surpasses-2-billion-in-loan-originations",
    title: "Hedge Wealth Capital Surpasses $2 Billion in Loan Originations",
    date: "2025-08-27",
    category: "Milestones",
    excerpt: "Crossing $2 billion in loan originations marks a major milestone for the firm and the investors it funds across all 50 states.",
    image: { src: "/images/cta.jpg", alt: "Aerial view of a suburban neighborhood" },
    body: [
      { type: "p", text: "Baltimore, MD – Hedge Wealth Capital has officially surpassed $2 billion in loan originations, a major milestone that highlights its rapid growth and strong position in the private lending market." },
      { type: "h2", text: "A Trusted Partner for Real Estate Investors" },
      { type: "p", text: "The firm’s lending platform has supported thousands of investors nationwide, funding projects through products such as:" },
      { type: "list", items: ["DSCR Loans for long-term rental portfolios", "Fix-and-Flip Financing for short-term investments", "Rental Property Loans tailored to cash-flowing assets"] },
      { type: "p", text: "This achievement reflects not only Hedge Wealth Capital’s scale, but also the trust it has built with borrowers across all 50 states." },
      { type: "quote", text: "Crossing the $2 billion threshold is proof of our commitment to helping real estate investors succeed. We are proud to provide fast, reliable financing solutions that fuel growth and profitability.", by: "Hedge Wealth Capital leadership team" },
    ],
  },
  {
    slug: "hedge-wealth-capital-launches-accelerated-draw-process-for-residential-transition-loans-slashing-funding-timelines-by-up-to-80",
    title: "Hedge Wealth Capital Launches Accelerated Draw Process for Residential Transition Loans, Slashing Funding Timelines by Up to 80%",
    date: "2025-08-27",
    category: "Product Update",
    excerpt: "A new Accelerated Draw Process for residential transition loans cuts draw funding timelines by up to 80%.",
    image: { src: "/images/services/bridge-framing.jpg", alt: "Construction worker framing a new home" },
    body: [
      { type: "p", text: "Baltimore, MD – Hedge Wealth Capital has rolled out a new Accelerated Draw Process for its Residential Transition Loans (RTLs), cutting funding timelines by up to 80%. This update is designed to give real estate investors faster access to capital, helping them move projects forward with greater efficiency." },
      { type: "h2", text: "Faster Access, Smoother Projects" },
      { type: "p", text: "The Accelerated Draw Process streamlines underwriting and funding through technology-driven verification and simplified procedures. Borrowers can now receive draws significantly faster, keeping renovation and construction projects on schedule without the bottlenecks of traditional lending." },
      { type: "quote", text: "Time is money in real estate. By accelerating our draw process, we’re giving investors the tools they need to finish projects faster, boost returns, and stay ahead in competitive markets.", by: "Hedge Wealth Capital spokesperson" },
      { type: "h2", text: "Available Now Nationwide" },
      { type: "p", text: "The new draw process is now available across Hedge Wealth Capital’s Residential Transition Loan programs. This launch underscores the company’s mission to innovate and deliver investor-first lending solutions." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
