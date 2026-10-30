import ServicePageView, { serviceMetadata } from "@/components/service/ServicePageView";

export const metadata = serviceMetadata("arv-loans");

export default function Page() {
  return <ServicePageView slug="arv-loans" />;
}
