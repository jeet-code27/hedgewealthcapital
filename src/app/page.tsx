import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Strategies from "@/components/sections/Strategies";
import Financing from "@/components/sections/Financing";
import Process from "@/components/sections/Process";
import Compare from "@/components/sections/Compare";
import Faq from "@/components/sections/Faq";
import Prequalify from "@/components/sections/Prequalify";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Strategies />
      <Financing />
      <Process />
      <Compare />
      <Faq />
      <Prequalify />
    </>
  );
}
