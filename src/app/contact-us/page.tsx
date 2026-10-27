import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import DealInquiry from "@/components/contact/DealInquiry";
import ContactPrograms from "@/components/contact/ContactPrograms";
import Faq from "@/components/sections/Faq";
import { contactFaqs, contactMeta } from "@/lib/contact-content";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
  alternates: { canonical: "/contact-us" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: contactMeta.title,
  url: `${site.url}/contact-us`,
  mainEntity: {
    "@type": "FinancialService",
    name: site.name,
    url: site.url,
    telephone: contact.phone,
    email: contact.email,
    areaServed: "United States",
    address: { "@type": "PostalAddress", streetAddress: "1017 Turnpike St., Suite 31", addressLocality: "Canton", addressRegion: "MA", postalCode: "02021", addressCountry: "US" },
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ContactHero />
      <DealInquiry />
      <ContactPrograms />
      <Faq items={contactFaqs} />
    </>
  );
}
