import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("north-carolina-dscr");

export default function Page() {
  return <AreaPageView slug="north-carolina-dscr" />;
}
