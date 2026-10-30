import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("new-york");

export default function Page() {
  return <AreaPageView slug="new-york" />;
}
