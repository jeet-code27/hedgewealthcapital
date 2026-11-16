import LegalPage, { legalMetadata } from "@/components/legal/LegalPage";
import { licensingDisclosures } from "@/lib/legal-content";

export const metadata = legalMetadata(licensingDisclosures);

export default function Page() {
  return <LegalPage doc={licensingDisclosures} />;
}
