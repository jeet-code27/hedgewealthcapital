import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import LtcPromo from "@/components/sections/LtcPromo";
import Strategies from "@/components/sections/Strategies";
import Highlights from "@/components/sections/Highlights";
import Process from "@/components/sections/Process";
import WhyHwc from "@/components/sections/WhyHwc";
import About from "@/components/sections/About";
import Broker from "@/components/sections/Broker";
import Faq from "@/components/sections/Faq";
import Prequalify from "@/components/sections/Prequalify";
import { contact, faqs } from "@/lib/content";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Organization + WebSite identify the brand to search engines; FAQPage covers the homepage FAQ.
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "FinancialService"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/hwc-logo-header.png`,
    image: `${site.url}/images/hwc-logo-header.png`,
    description:
      "Privately owned real estate lender funding fix and flip, DSCR rental, bridge, cash-out refinance and construction loans for investors in all 50 states and Washington, D.C.",
    foundingDate: "2010",
    telephone: contact.phone,
    email: contact.email,
    areaServed: { "@type": "Country", name: "United States" },
    address: { "@type": "PostalAddress", streetAddress: "1017 Turnpike St., Suite 31", addressLocality: "Canton", addressRegion: "MA", postalCode: "02021", addressCountry: "US" },
    contactPoint: { "@type": "ContactPoint", telephone: contact.phone, email: contact.email, contactType: "sales", areaServed: "US", availableLanguage: "English" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      {/* Hero + strip fill the first screen on desktop */}
      <div className="lg:flex lg:min-h-svh lg:flex-col">
        <Hero />
        <Marquee />
      </div>
      <LtcPromo />
      <Strategies />
      <Highlights />
      <Process />
      <WhyHwc />
      <About />
      <Broker />
      <Faq />
      <Prequalify />
    </>
  );
}
