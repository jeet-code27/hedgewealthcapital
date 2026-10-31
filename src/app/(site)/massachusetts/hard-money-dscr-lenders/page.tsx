import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("massachusetts");

export default function Page() {
  return <AreaPageView slug="massachusetts" />;
}
