import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Strategies from "@/components/sections/Strategies";
import Financing from "@/components/sections/Financing";
import Process from "@/components/sections/Process";
import Compare from "@/components/sections/Compare";
import Faq from "@/components/sections/Faq";
import Prequalify from "@/components/sections/Prequalify";
import Footer from "@/components/sections/Footer";
import CallButton from "@/components/CallButton";
import PrequalifyTab from "@/components/PrequalifyTab";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Strategies />
        <Financing />
        <Process />
        <Compare />
        <Faq />
        <Prequalify />
      </main>
      <Footer />
      <PrequalifyTab />
      <CallButton />
    </>
  );
}
