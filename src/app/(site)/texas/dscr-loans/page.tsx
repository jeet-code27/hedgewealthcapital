import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("texas-dscr");

export default function Page() {
  return <AreaPageView slug="texas-dscr" />;
}
