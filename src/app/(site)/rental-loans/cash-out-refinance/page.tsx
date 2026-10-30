import ServicePageView, { serviceMetadata } from "@/components/service/ServicePageView";

export const metadata = serviceMetadata("cash-out-refinance");

export default function Page() {
  return <ServicePageView slug="cash-out-refinance" />;
}
