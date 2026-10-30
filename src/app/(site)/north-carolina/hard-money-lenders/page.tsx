import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("north-carolina-hard-money");

export default function Page() {
  return <AreaPageView slug="north-carolina-hard-money" />;
}
