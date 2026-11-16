import LegalPage, { legalMetadata } from "@/components/legal/LegalPage";
import { termsOfUse } from "@/lib/legal-content";

export const metadata = legalMetadata(termsOfUse);

export default function Page() {
  return <LegalPage doc={termsOfUse} />;
}
