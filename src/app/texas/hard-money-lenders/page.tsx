import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("texas-hard-money");

export default function Page() {
  return <AreaPageView slug="texas-hard-money" />;
}
