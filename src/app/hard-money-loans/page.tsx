import ServicePageView, { serviceMetadata } from "@/components/service/ServicePageView";

export const metadata = serviceMetadata("hard-money-loans");

export default function Page() {
  return <ServicePageView slug="hard-money-loans" />;
}
