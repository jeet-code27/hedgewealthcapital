/** Short names for each website form (matches the `source` passed to deliverInquiry). */
export const formNames: Record<string, string> = {
  "homepage-prequalify": "Prequalify",
  "contact-page": "Deal Inquiry",
  "broker-application": "Broker Application",
};

export const submissionStatuses = ["New", "Contacted", "In Progress", "Closed", "Spam"] as const;
