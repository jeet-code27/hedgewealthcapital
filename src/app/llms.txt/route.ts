import { areas } from "@/lib/areas";
import { contact } from "@/lib/content";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * llms.txt (https://llmstxt.org): a plain-markdown map of the site for AI assistants.
 * Built from the same content files as the pages, so it stays in sync.
 */
export function GET() {
  const url = (path: string) => `${site.url}${path}`;
  const body = `# ${site.name}

> Hedge Wealth Capital is a privately owned real estate lender founded in 2010 that funds investors with its own capital in all 50 states and Washington, D.C. Programs include fix and flip (hard money) loans up to 100% of purchase and rehab, 30-year fixed DSCR rental loans, cash-out refinances, rental portfolio loans, bridge loans and ground-up construction financing.

Loans are business-purpose only (non-owner-occupied investment property). Approvals are made in-house, typically the same day, and most loans close in 5 to 10 business days. Financing is subject to underwriting, property eligibility, program availability and final loan terms.

Contact: ${contact.phone} · ${contact.email} · ${contact.address}

## Core pages

- [Home](${url("/")}): Overview of programs, highlights and prequalification
- [About Hedge Wealth Capital](${url("/about-hedge-wealth-capital")}): Company history, the Hedge Wealth Group and lending footprint
- [Contact](${url("/contact-us")}): Phone, email, office and deal inquiry form
- [Areas We Serve](${url("/areas-we-serve")}): Local lending pages by market

## Loan programs

${services.map((s) => `- [${s.name}](${url(s.path)}): ${s.meta.description}`).join("\n")}

## Local lending pages

${areas.map((a) => `- [${a.kind} Loans in ${a.region}](${url(a.path)}): ${a.meta.description}`).join("\n")}

## Optional

- [Sitemap](${url("/sitemap.xml")})
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
