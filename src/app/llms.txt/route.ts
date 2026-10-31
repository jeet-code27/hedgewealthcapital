import { areas } from "@/lib/areas";
import { getPublishedPosts } from "@/lib/posts";
import { contact } from "@/lib/content";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * llms.txt (https://llmstxt.org): a plain-markdown map of the site for AI assistants.
 * Built from the same content files as the pages, so it stays in sync.
 */
export async function GET() {
  const posts = await getPublishedPosts();
  const url = (path: string) => `${site.url}${path}`;
  const body = `# ${site.name}

> Hedge Wealth Capital is a privately owned real estate lender founded in 2010 that funds investors with its own capital in all 50 states and Washington, D.C. Programs include fix and flip (hard money) loans up to 100% of purchase and rehab, 30-year fixed DSCR rental loans, cash-out refinances, rental portfolio loans, bridge loans and ground-up construction financing.

Loans are business-purpose only (non-owner-occupied investment property). Approvals are made in-house, typically the same day, and most loans close in 5 to 10 business days. Financing is subject to underwriting, property eligibility, program availability and final loan terms.

Contact: ${contact.phone} · ${contact.email} · ${contact.address}

## Core pages

- [Home](${url("/")}): Overview of programs, highlights and prequalification
- [About Hedge Wealth Capital](${url("/about-hedge-wealth-capital")}): Company history, the Hedge Wealth Group and lending footprint
- [Contact](${url("/contact-us")}): Phone, email, office and deal inquiry form
- [Compare Loan Programs](${url("/loan-programs")}): Side-by-side comparison of every loan program
- [Areas We Serve](${url("/areas-we-serve")}): Local lending pages by market
- [Brokers](${url("/brokers")}): Broker partner program and application
- [Blog](${url("/blog")}): Company news and product updates

## Loan programs

${services.map((s) => `- [${s.name}](${url(s.path)}): ${s.meta.description}`).join("\n")}

## Local lending pages

${areas.map((a) => `- [${a.kind} Loans in ${a.region}](${url(a.path)}): ${a.meta.description}`).join("\n")}

## Blog

${posts.map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.excerpt}`).join("\n")}

## Optional

- [Sitemap](${url("/sitemap.xml")})
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
