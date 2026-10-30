import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("georgia-hard-money");

export default function Page() {
  return <AreaPageView slug="georgia-hard-money" />;
}
