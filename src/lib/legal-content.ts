/**
 * Privacy Policy, Terms of Use and Licensing Disclosures. Drafted to describe what the website
 * actually does (forms, emails, MongoDB storage, Google Analytics/Ads/Tag Manager, call tracking,
 * SMS consent). Have Hedge Wealth Capital's counsel review before relying on it.
 * Inline links use [anchor](/path).
 */
import { contact } from "@/lib/content";

export type LegalSection = { id: string; heading: string; paragraphs: string[]; list?: string[] };
export type LegalDoc = { slug: string; title: string; metaTitle: string; description: string; updated: string; intro: string; sections: LegalSection[] };

const UPDATED = "November 16, 2026";
const reach = `[${contact.email}](mailto:${contact.email}), by phone at ${contact.phone}, or by mail at Hedge Wealth Capital, ${contact.address}`;

export const privacyPolicy: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy | Hedge Wealth Capital",
  description: "How Hedge Wealth Capital collects, uses and protects information submitted through hedgewealthcapital.com, including form, text message and cookie practices.",
  updated: UPDATED,
  intro:
    "This Privacy Policy explains how Hedge Wealth Capital (\"Hedge Wealth Capital,\" \"we,\" \"us\") collects, uses and shares information when you visit www.hedgewealthcapital.com or contact us through it.",
  sections: [
    {
      id: "information-we-collect",
      heading: "Information we collect",
      paragraphs: ["We collect information you give us and information collected automatically when you use the website."],
      list: [
        "Information you submit through our forms, such as your name, email address, phone number, the loan product you are interested in, your credit score range, property details (location, address, financing amount, purpose and timing) and any description you add.",
        "Broker application details, such as your company, state, NMLS status and origination volumes.",
        "Information collected automatically, such as your IP address, browser and device type, pages viewed, the page that referred you and the dates and times of your visits, gathered through cookies and similar technologies.",
        "If you reach our website from a Google ad, call details such as the time and length of a call placed to the number shown on the site, collected through Google Ads call tracking.",
      ],
    },
    {
      id: "how-we-use-information",
      heading: "How we use information",
      paragraphs: ["We use the information we collect to:"],
      list: [
        "Respond to your inquiry and evaluate your financing request or broker application.",
        "Contact you by phone, email or text message about your inquiry, loan application or borrower account.",
        "Send you a confirmation that we received your submission.",
        "Operate, secure and improve the website, and measure how our pages and advertising perform.",
        "Comply with legal obligations and prevent fraud or misuse.",
      ],
    },
    {
      id: "text-messages",
      heading: "Text messages",
      paragraphs: [
        "When you submit a form and agree to our Loan Communications terms, you consent to receive calls and text messages from Hedge Wealth Capital related to your loan application and borrower account. Message and data rates may apply, and message frequency varies. Reply HELP for help or STOP to opt out at any time.",
        "Mobile information, including your phone number and text messaging consent, will not be shared with third parties or affiliates for marketing or promotional purposes.",
      ],
    },
    {
      id: "how-we-share-information",
      heading: "How we share information",
      paragraphs: ["We do not sell your personal information. We share it only as needed to run our business:"],
      list: [
        "With service providers that host the website, store form submissions, send email and provide analytics and advertising measurement, under obligations to use it only to provide their services to us.",
        "With professional advisers such as attorneys and accountants.",
        "When required by law, regulation, subpoena or court order, or to protect our rights, customers or others.",
        "As part of a merger, acquisition or sale of all or part of our business.",
      ],
    },
    {
      id: "cookies-and-analytics",
      heading: "Cookies, analytics and advertising",
      paragraphs: [
        "We use Google Analytics, Google Tag Manager and Google Ads to understand how visitors use the website and to measure the results of our advertising. These services use cookies and similar technologies and may collect information about your visits to this and other websites.",
        "You can block or delete cookies in your browser settings, manage Google ad personalization at [Google Ads Settings](https://adssettings.google.com), and opt out of Google Analytics with the [Google Analytics opt-out add-on](https://tools.google.com/dlpage/gaoptout). Some parts of the website may not work as intended without cookies.",
      ],
    },
    {
      id: "security-and-retention",
      heading: "Security and retention",
      paragraphs: [
        "We use reasonable administrative, technical and physical safeguards to protect the information we hold. No website or transmission is completely secure, so please do not send Social Security numbers, bank account numbers or identification documents through our website forms.",
        "We keep information for as long as needed for the purposes described in this policy, unless a longer period is required or permitted by law.",
      ],
    },
    {
      id: "your-choices",
      heading: "Your choices and rights",
      paragraphs: [
        `You can ask us to access, correct or delete the personal information you have submitted, or to stop contacting you, by emailing ${reach.split(", by phone")[0]}. Residents of some states may have additional rights under state law, and we will respond to requests as those laws require.`,
      ],
    },
    {
      id: "children",
      heading: "Children's privacy",
      paragraphs: ["The website is intended for adults and businesses. We do not knowingly collect personal information from anyone under 18."],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      paragraphs: ["We may update this Privacy Policy from time to time. The \"Last updated\" date at the top of this page shows when it was last changed."],
    },
    {
      id: "contact",
      heading: "Contact us",
      paragraphs: [`Questions about this policy can be sent to ${reach}.`],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  slug: "terms-of-use",
  title: "Terms of Use",
  metaTitle: "Terms of Use | Hedge Wealth Capital",
  description: "The terms that apply to your use of hedgewealthcapital.com, including business-purpose lending, website content and limits on liability.",
  updated: UPDATED,
  intro:
    "These Terms of Use govern your use of www.hedgewealthcapital.com, operated by Hedge Wealth Capital. By using the website, you agree to these terms. If you do not agree, please do not use the website.",
  sections: [
    {
      id: "business-purpose-lending",
      heading: "Business-purpose lending only",
      paragraphs: [
        "Hedge Wealth Capital makes business-purpose loans secured by non-owner-occupied investment real estate. We do not make loans for personal, family or household purposes, or loans on a home you live in or plan to live in.",
      ],
    },
    {
      id: "no-commitment-to-lend",
      heading: "No offer or commitment to lend",
      paragraphs: [
        "Information on this website, including program descriptions, rates, leverage, terms, examples and calculators, is general information only. It is not an offer, approval or commitment to lend. All financing is subject to underwriting, property eligibility, program availability and final loan documentation, and terms can change without notice. Examples and calculations are illustrative.",
      ],
    },
    {
      id: "no-advice",
      heading: "No professional advice",
      paragraphs: ["Content on this website is not legal, tax, accounting or investment advice. Speak with your own advisers before making financial decisions."],
    },
    {
      id: "your-submissions",
      heading: "Information you submit",
      paragraphs: [
        "You agree that information you submit through the website is accurate and that you are authorized to submit it. By submitting a form, you agree that we may contact you as described in our [Privacy Policy](/privacy-policy).",
      ],
    },
    {
      id: "acceptable-use",
      heading: "Acceptable use",
      paragraphs: ["You agree not to:"],
      list: [
        "Use the website for any unlawful or fraudulent purpose.",
        "Submit false information or information about another person without authorization.",
        "Attempt to access non-public areas of the website, interfere with its operation or introduce malicious code.",
        "Scrape, copy or republish website content for commercial use without our written permission.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      paragraphs: [
        "The website and its content, including text, graphics, logos and design, are owned by Hedge Wealth Capital or its licensors and are protected by intellectual property laws. You may view and print pages for your personal, non-commercial use.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party links",
      paragraphs: ["The website may link to third-party websites. We are not responsible for their content, policies or practices."],
    },
    {
      id: "disclaimer",
      heading: "Disclaimer of warranties",
      paragraphs: [
        "The website is provided \"as is\" and \"as available,\" without warranties of any kind, express or implied, including warranties of accuracy, completeness, merchantability, fitness for a particular purpose or non-infringement.",
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, Hedge Wealth Capital will not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or data, arising from your use of or inability to use the website.",
      ],
    },
    {
      id: "indemnification",
      heading: "Indemnification",
      paragraphs: ["You agree to indemnify and hold Hedge Wealth Capital harmless from claims arising out of your misuse of the website or your violation of these terms."],
    },
    {
      id: "governing-law",
      heading: "Governing law",
      paragraphs: ["These terms are governed by the laws of the Commonwealth of Massachusetts, without regard to its conflict of law rules."],
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      paragraphs: ["We may update these Terms of Use at any time. Continued use of the website after changes are posted means you accept the updated terms."],
    },
    {
      id: "contact",
      heading: "Contact us",
      paragraphs: [`Questions about these terms can be sent to ${reach}.`],
    },
  ],
};

export const licensingDisclosures: LegalDoc = {
  slug: "licensing-disclosures",
  title: "Licensing Disclosures",
  metaTitle: "Licensing Disclosures | Hedge Wealth Capital",
  description: "Licensing and lending disclosures for Hedge Wealth Capital, a private lender making business-purpose loans on non-owner-occupied investment property.",
  updated: UPDATED,
  intro: "These disclosures describe the type of lending Hedge Wealth Capital does and how to request licensing information for your state.",
  sections: [
    {
      id: "nature-of-lending",
      heading: "Nature of our lending",
      paragraphs: [
        "Hedge Wealth Capital is a private lender that makes business-purpose loans to real estate investors. Our loans are secured by non-owner-occupied investment property and are made for business or commercial purposes.",
        "We do not make consumer loans for personal, family or household purposes, and we do not lend on a borrower's primary residence or any property the borrower or a family member will occupy.",
      ],
    },
    {
      id: "licensing",
      heading: "Licensing",
      paragraphs: [
        "Licensing requirements for business-purpose lending vary by state. For licensing information that applies to a loan in your state, contact us at " + reach + ".",
      ],
    },
    {
      id: "no-commitment",
      heading: "No commitment to lend",
      paragraphs: [
        "Nothing on this website is an offer or commitment to lend. Financing is subject to underwriting, property eligibility, program availability and final loan documentation. Rates, fees, leverage, terms and conditions vary by transaction and can change without notice.",
      ],
    },
    {
      id: "brokers",
      heading: "Brokers",
      paragraphs: [
        "Mortgage brokers who refer loans to Hedge Wealth Capital act independently and are not employees or agents of Hedge Wealth Capital. Brokers are responsible for holding any licenses their activities require. Learn more about our [broker program](/brokers).",
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      paragraphs: [`Questions about these disclosures can be sent to ${reach}.`],
    },
  ],
};

export const legalDocs = [privacyPolicy, termsOfUse, licensingDisclosures];
