"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA_ID, track } from "@/lib/analytics";

/** Loads the Google tag in production and tracks calls, emails and "get started" clicks across the site. */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.("a");
      const href = link?.getAttribute("href");
      if (!link || !href) return;
      const location = link.closest("header") ? "header" : link.closest("footer") ? "footer" : "page";
      if (href.startsWith("tel:")) track("phone_click", { link_location: location });
      else if (href.startsWith("mailto:")) track("email_click", { link_location: location });
      else if (href.endsWith("#prequalify")) track("cta_click", { cta_text: link.textContent?.trim().slice(0, 60) ?? "", link_location: location });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
