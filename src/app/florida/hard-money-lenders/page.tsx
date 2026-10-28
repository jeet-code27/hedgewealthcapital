import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("florida-hard-money");

export default function Page() {
  return <AreaPageView slug="florida-hard-money" />;
}
