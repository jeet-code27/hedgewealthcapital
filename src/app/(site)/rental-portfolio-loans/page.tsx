import ServicePageView, { serviceMetadata } from "@/components/service/ServicePageView";

export const metadata = serviceMetadata("rental-portfolio-loans");

export default function Page() {
  return <ServicePageView slug="rental-portfolio-loans" />;
}
