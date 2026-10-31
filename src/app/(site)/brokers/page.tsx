import type { Metadata } from "next";
import AboutStats from "@/components/about/AboutStats";
import BrokerHero from "@/components/broker/BrokerHero";
import BrokerApply from "@/components/broker/BrokerApply";
import { BrokerDscr, BrokerPerks, BrokerPillars, BrokerSubmission } from "@/components/broker/BrokerSections";
import Faq from "@/components/sections/Faq";
import { brokerFaqs, brokerMeta } from "@/lib/broker-content";
import { schemaPublisher, site } from "@/lib/site";

export const metadata: Metadata = {
  title: brokerMeta.title,
  description: brokerMeta.description,
  alternates: { canonical: "/brokers" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: brokerMeta.title,
    url: `${site.url}/brokers`,
    description: brokerMeta.description,
    publisher: schemaPublisher,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Brokers", item: `${site.url}/brokers` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brokerFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function BrokersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <BrokerHero />
      <AboutStats />
      <BrokerPerks />
      <BrokerPillars />
      <BrokerDscr />
      <BrokerSubmission />
      <BrokerApply />
      <Faq items={brokerFaqs} />
    </>
  );
}
