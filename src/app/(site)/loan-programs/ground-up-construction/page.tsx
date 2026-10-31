import ServicePageView, { serviceMetadata } from "@/components/service/ServicePageView";

export const metadata = serviceMetadata("ground-up-construction");

export default function Page() {
  return <ServicePageView slug="ground-up-construction" />;
}
