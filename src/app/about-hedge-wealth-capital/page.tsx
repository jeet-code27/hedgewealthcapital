import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutStory from "@/components/about/AboutStory";
import GroupExplorer from "@/components/about/GroupExplorer";
import AboutReach from "@/components/about/AboutReach";
import AboutCta from "@/components/about/AboutCta";
import Strategies from "@/components/sections/Strategies";
import Faq from "@/components/sections/Faq";
import { aboutFaqs, aboutMeta } from "@/lib/about-content";

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
  alternates: { canonical: "/about-hedge-wealth-capital" },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <GroupExplorer />
      <AboutReach />
      <Strategies />
      <Faq items={aboutFaqs} />
      <AboutCta />
    </>
  );
}
