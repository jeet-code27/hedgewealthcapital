/**
 * /areas-we-serve copy, from the SEO team's audit (HWC_Site_Audit_Errors_Fixes.xlsx, Tab 3), corrected
 * to match the rest of the site: HWC lends in all 50 states and D.C. (the states below are the ones
 * with local pages), the office is in Canton, MA, and rentals run to 10 units.
 * Inline links use [anchor](/path).
 */
import type { AreaSlug } from "@/lib/areas";

export const areasHubMeta = {
  title: "Areas We Serve | Hard Money & DSCR Lender by State",
  description:
    "Hard money and DSCR loans by state, with local pages for MA, CT, NY, FL, GA, NC, TX and CO, from a private lender funding investors in all 50 states and D.C.",
};

export const areasHubHero = {
  title: "Where We Lend: Hard Money",
  accent: "and DSCR Loans by State",
  intro:
    "Hedge Wealth Capital funds real estate investors in all 50 states and Washington, D.C., from our office in Canton, Massachusetts. We lend on non-owner-occupied investment property, from single-family homes and 2 to 10 unit rentals to multifamily and mixed-use buildings. The markets below have their own pages; pick your state to see the programs available there, or call us about a deal anywhere else.",
};

/** One entry per state; `pages` are the local pages linked from that state's card. */
export const hubRegions: { title: string; states: { name: string; pages: AreaSlug[]; text: string }[] }[] = [
  {
    title: "New England and New York",
    states: [
      {
        name: "Massachusetts",
        pages: ["massachusetts"],
        text: "Massachusetts is our home market. We fund fix-and-flip, bridge, ground-up construction and DSCR rental loans across the state, from Boston's inner suburbs to the Pioneer Valley. Investors here often deal with older housing stock and tight timelines, so we size renovation loans on after-repair value and set up draw schedules that match real renovation work.",
      },
      {
        name: "Worcester County, MA",
        pages: ["worcester-county-ma"],
        text: "We lend throughout Worcester, Fitchburg, Leominster and the surrounding towns. Two- and three-family properties are common here, and many investors buy, renovate, rent and refinance in the same neighborhood.",
      },
      {
        name: "Connecticut",
        pages: ["connecticut"],
        text: "We lend on investment properties statewide, including Hartford, New Haven and Fairfield counties, where multifamily rentals and value-add renovations are common.",
      },
      {
        name: "New York",
        pages: ["new-york"],
        text: "We fund short-term and rental loans for investors working across New York City's five boroughs.",
      },
    ],
  },
  {
    title: "Southeast",
    states: [
      {
        name: "Florida",
        pages: ["florida-hard-money", "florida-dscr"],
        text: "Florida draws investors for both flips and long-term rentals. We offer short-term hard money for acquisitions and renovations, and DSCR loans for buy-and-hold investors who want to qualify on the property's rent instead of personal income.",
      },
      {
        name: "Georgia",
        pages: ["georgia-hard-money", "georgia-dscr"],
        text: "Atlanta and its suburbs remain active markets for single-family rentals and renovation projects.",
      },
      {
        name: "North Carolina",
        pages: ["north-carolina-hard-money", "north-carolina-dscr"],
        text: "We fund investors in Charlotte, Raleigh-Durham, Greensboro and smaller markets across the state.",
      },
    ],
  },
  {
    title: "Texas and the Mountain West",
    states: [
      {
        name: "Texas",
        pages: ["texas-hard-money", "texas-dscr"],
        text: "From Dallas-Fort Worth to Houston, San Antonio and Austin, Texas investors use our short-term loans to buy and renovate and our DSCR loans to hold.",
      },
      {
        name: "Colorado",
        pages: ["colorado-hard-money"],
        text: "We lend on investment properties along the Front Range, including Denver, Colorado Springs and surrounding markets.",
      },
    ],
  },
];

export const hubPrograms = [
  { label: "Hard money loans", note: "for fast acquisitions", href: "/hard-money-loans" },
  { label: "ARV loans", note: "for fix-and-flip projects, sized to after-repair value", href: "/arv-loans" },
  { label: "Bridge loans", note: "to close before permanent financing is ready", href: "/bridge-loans" },
  { label: "Ground-up construction loans", note: "for shovel-ready projects", href: "/loan-programs/ground-up-construction" },
  { label: "Multifamily bridge loans", note: "for value-add 5 to 10 unit buildings", href: "/loan-programs/multifamily-bridge" },
  { label: "DSCR loans", note: "that qualify on rental income", href: "/dscr-loans" },
  { label: "Cash-out refinance", note: "on stabilized rentals", href: "/rental-loans/cash-out-refinance" },
  { label: "Rental portfolio loans", note: "to finance several properties together", href: "/rental-portfolio-loans" },
];

export const hubWho =
  "We work with first-time flippers, experienced operators, landlords building portfolios, and the mortgage brokers who bring us their deals. Borrowers close in their own name or through an LLC or other business entity. All of our loans are business-purpose loans on non-owner-occupied property. Brokers can learn about our [partner program](/brokers).";

export const hubElsewhere =
  "We lend in all 50 states and D.C., not only the markets above. Send us the property address, price and your plan, and we'll tell you what we can fund.";
