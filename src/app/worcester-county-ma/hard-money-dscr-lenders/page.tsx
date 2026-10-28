import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("worcester-county-ma");

export default function Page() {
  return <AreaPageView slug="worcester-county-ma" />;
}
