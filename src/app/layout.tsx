import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
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
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  // Explicit crawl rules; the admin panel and any post marked noindex override these.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  title: "Private Money Loans for Real Estate Investors | HWC",
  description:
    "Explore private money loans for real estate investors with flexible financing for property purchases, renovations and investment opportunities. Apply now.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${serifDisplay.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
