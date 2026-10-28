import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("connecticut");

export default function Page() {
  return <AreaPageView slug="connecticut" />;
}
