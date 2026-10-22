import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PrequalifyTab from "@/components/layout/PrequalifyTab";
import CallButton from "@/components/layout/CallButton";
import "./globals.css";

// Manrope matches the client's reference (lendingone.com). Instrument Serif stands in
// for their licensed serif (Freight Display) on accent words.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const serifDisplay = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Real Estate Investment Loans | Hedge Wealth Capital",
  description:
    "Explore fix-and-flip, DSCR rental, construction and multifamily bridge financing with Hedge Wealth Capital. Discuss your property and funding goals.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${serifDisplay.variable} antialiased`}>
      <body className="min-h-full">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <PrequalifyTab />
          <CallButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
