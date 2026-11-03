"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { ADS_ID, GA_ID, GTM_ID, pushDataLayer, track } from "@/lib/analytics";

/** Loads Google Tag Manager and the Google tag (GA4 + Google Ads) in production and tracks calls, emails and "get started" clicks across the site. */
export default function Analytics() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  // GTM's own Page View trigger covers the first load; client-side navigations come through as virtual_page_view.
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    pushDataLayer("virtual_page_view", { page_path: pathname, page_location: window.location.href, page_title: document.title });
  }, [pathname]);

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
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <noscript>
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
      </noscript>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');
gtag('config', '${ADS_ID}');`}
      </Script>
    </>
  );
}
