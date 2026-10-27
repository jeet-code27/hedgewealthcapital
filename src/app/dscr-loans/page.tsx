import ServicePageView, { serviceMetadata } from "@/components/service/ServicePageView";

export const metadata = serviceMetadata("dscr-loans");

export default function Page() {
  return <ServicePageView slug="dscr-loans" />;
}
