import type { Metadata } from "next";
import AboutCta from "@/components/about/AboutCta";
import Faq from "@/components/sections/Faq";
import { contact } from "@/lib/content";
import { getArea, type AreaSlug } from "@/lib/areas";
import { site } from "@/lib/site";
import AreaHero from "./AreaHero";
import { AreaLocal, AreaMarkets, AreaPrograms, AreaRoad, NearbyAreas } from "./AreaSections";

export function areaMetadata(slug: AreaSlug): Metadata {
  const page = getArea(slug);
  return {
    title: page.meta.title,
    description: page.meta.description,
    keywords: page.meta.keywords,
    alternates: { canonical: page.path },
    // Setting openGraph here replaces the inherited share image, so point back to the site default.
    openGraph: { title: page.meta.title, description: page.meta.description, url: page.path, type: "website", images: ["/opengraph-image"] },
  };
}

function JsonLd({ slug }: { slug: AreaSlug }) {
  const page = getArea(slug);
  const url = `${site.url}${page.path}`;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      name: `${site.name} – ${page.kind} Loans in ${page.region}`,
      description: page.meta.description,
      url,
      telephone: contact.phone,
      areaServed: { "@type": "Place", name: page.region },
      address: { "@type": "PostalAddress", streetAddress: "1017 Turnpike St., Suite 31", addressLocality: "Canton", addressRegion: "MA", postalCode: "02021", addressCountry: "US" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${site.url}/areas-we-serve` },
        { "@type": "ListItem", position: 3, name: page.region, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Shared layout for local area pages; copy lives in src/lib/areas.ts. */
export default function AreaPageView({ slug }: { slug: AreaSlug }) {
  const page = getArea(slug);
  return (
    <>
      <JsonLd slug={slug} />
      <AreaHero page={page} />
      <AreaMarkets page={page} />
      <AreaPrograms page={page} />
      <AreaLocal page={page} />
      <AreaRoad page={page} />
      <Faq items={page.faqs} />
      <NearbyAreas page={page} />
      <div className="pt-8">
        <AboutCta />
      </div>
    </>
  );
}
