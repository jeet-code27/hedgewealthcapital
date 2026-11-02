/** Google Analytics 4. Page views on in-site navigation come from GA's enhanced measurement. */
export const GA_ID = "G-BRL5XG8ZXS";

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: Record<string, string | number>) => void;
  }
}

/** Sends a GA4 event. Never pass names, emails, phone numbers, credit scores or other personal data. */
export function track(name: string, params?: Record<string, string | number>) {
  window.gtag?.("event", name, params);
}
