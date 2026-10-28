import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PrequalifyTab from "@/components/layout/PrequalifyTab";
import CallButton from "@/components/layout/CallButton";
import { site } from "@/lib/site";
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
  metadataBase: new URL(site.url),
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  title: "Private Money Loans for Real Estate Investors | Hedge Wealth Capital",
  description:
    "Private money loans for real estate investors: up to 100% LTC fix & flip, ground-up construction, multifamily, and 30-year DSCR rental loans. Same-day approval, close in 5–10 business days.",
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
