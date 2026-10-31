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
  title: "Private Money Loans for Investors | Hedge Wealth Capital",
  description:
    "Up to 100% LTC fix & flip, ground-up construction, multifamily and 30-year DSCR rental loans. Same-day approval, close in 5–10 business days.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${serifDisplay.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
