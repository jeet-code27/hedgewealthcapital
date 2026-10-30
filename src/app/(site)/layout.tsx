import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PrequalifyTab from "@/components/layout/PrequalifyTab";
import CallButton from "@/components/layout/CallButton";

/** Public website chrome. The admin panel lives outside this group with its own layout. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <PrequalifyTab />
      <CallButton />
    </SmoothScroll>
  );
}
