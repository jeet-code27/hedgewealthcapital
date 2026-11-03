/** Google Analytics 4. Page views on in-site navigation come from GA's enhanced measurement. */
export const GA_ID = "G-BRL5XG8ZXS";

/** Google Tag Manager container. Every tracked event is also pushed to the dataLayer as a GTM custom event. */
export const GTM_ID = "GTM-M8QD7SSF";

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: Record<string, string | number>) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

/** Pushes a GTM custom event; use the event name as the trigger in GTM and the params as Data Layer Variables. */
export function pushDataLayer(event: string, params?: Record<string, string | number>) {
  (window.dataLayer = window.dataLayer || []).push({ event, ...params });
}

/** Sends a GA4 event and the matching GTM event. Never pass names, emails, phone numbers, credit scores or other personal data. */
export function track(name: string, params?: Record<string, string | number>) {
  window.gtag?.("event", name, params);
  pushDataLayer(name, params);
}
