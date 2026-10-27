import type { Metadata } from "next";
import AboutCta from "@/components/about/AboutCta";
import Faq from "@/components/sections/Faq";
import { contact } from "@/lib/content";
import { getService, type ServiceSlug } from "@/lib/services";
import { site } from "@/lib/site";
import RelatedServices from "./RelatedServices";
import ServiceCompare from "./ServiceCompare";
import ServiceHero from "./ServiceHero";
import ServiceSections from "./ServiceSections";
import ServiceSteps from "./ServiceSteps";

export function serviceMetadata(slug: ServiceSlug): Metadata {
  const page = getService(slug);
  return {
    title: page.meta.title,
    description: page.meta.description,
    keywords: page.meta.keywords,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: page.path,
      type: "website",
      images: [{ url: page.hero.image.src, alt: page.hero.image.alt }],
    },
  };
}

function JsonLd({ slug }: { slug: ServiceSlug }) {
  const page = getService(slug);
  const url = `${site.url}${page.path}`;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: page.name,
      description: page.meta.description,
      url,
      category: "Real estate investment loan",
      areaServed: "United States",
      provider: {
        "@type": "FinancialService",
        name: site.name,
        url: site.url,
        telephone: contact.phone,
        address: { "@type": "PostalAddress", streetAddress: "1017 Turnpike St., Suite 31", addressLocality: "Canton", addressRegion: "MA", postalCode: "02021", addressCountry: "US" },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Loan Programs", item: `${site.url}/#loan-programs` },
        { "@type": "ListItem", position: 3, name: page.name, item: url },
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

/** Shared layout for every service page; all copy comes from src/lib/services.ts. */
export default function ServicePageView({ slug }: { slug: ServiceSlug }) {
  const page = getService(slug);
  return (
    <>
      <JsonLd slug={slug} />
      <ServiceHero page={page} />
      <ServiceSections page={page} />
      <ServiceSteps page={page} />
      {page.compare && <ServiceCompare compare={page.compare} />}
      <div id="faq" className="scroll-mt-20">
        <Faq items={page.faqs} />
      </div>
      <RelatedServices page={page} />
      <div className="pt-24">
        <AboutCta />
      </div>
    </>
  );
}
