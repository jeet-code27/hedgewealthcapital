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

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
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
