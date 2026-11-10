import type { Metadata } from "next";
import Link from "next/link";
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
        { "@type": "ListItem", position: 2, name: "Loan Programs", item: `${site.url}/loan-programs` },
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
      <div className="px-5 pt-16 sm:px-8">
        <Link
          href="/mortgage-loan-types"
          className="group mx-auto flex max-w-5xl flex-col gap-3 rounded-[24px] border border-navy/10 bg-white p-6 shadow-[0_24px_50px_-40px_rgb(25_40_97/0.7)] transition hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between sm:p-7"
        >
          <span>
            <span className="block text-xs font-extrabold tracking-[0.16em] text-leaf-600 uppercase">Free guide</span>
            <span className="mt-1 block text-lg font-extrabold text-navy">Mortgage and Loan Types Explained: 31 types compared</span>
          </span>
          <span className="inline-flex items-center gap-2 font-bold text-navy">
            <span className="border-b-2 border-leaf pb-0.5">Read the guide</span>
            <svg className="size-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
      <div className="pt-24">
        <AboutCta />
      </div>
    </>
  );
}
