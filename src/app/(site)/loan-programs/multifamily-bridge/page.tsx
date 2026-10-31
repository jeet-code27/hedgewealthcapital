import ServicePageView, { serviceMetadata } from "@/components/service/ServicePageView";

export const metadata = serviceMetadata("multifamily-bridge");

export default function Page() {
  return <ServicePageView slug="multifamily-bridge" />;
}
