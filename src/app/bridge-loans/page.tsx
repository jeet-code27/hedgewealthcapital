import ServicePageView, { serviceMetadata } from "@/components/service/ServicePageView";

export const metadata = serviceMetadata("bridge-loans");

export default function Page() {
  return <ServicePageView slug="bridge-loans" />;
}
