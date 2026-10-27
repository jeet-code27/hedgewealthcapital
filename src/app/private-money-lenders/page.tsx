import ServicePageView, { serviceMetadata } from "@/components/service/ServicePageView";

export const metadata = serviceMetadata("private-money-lenders");

export default function Page() {
  return <ServicePageView slug="private-money-lenders" />;
}
