import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("florida-dscr");

export default function Page() {
  return <AreaPageView slug="florida-dscr" />;
}
