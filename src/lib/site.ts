export const site = {
  name: "Hedge Wealth Capital",
  url: "https://www.hedgewealthcapital.com",
};

/** Full publisher node for schema; pages other than home don't carry the Organization block it would otherwise point to. */
export const schemaPublisher = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: { "@type": "ImageObject", url: `${site.url}/images/hwc-logo-header.png` },
};
