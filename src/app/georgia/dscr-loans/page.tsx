import AreaPageView, { areaMetadata } from "@/components/area/AreaPageView";

export const metadata = areaMetadata("georgia-dscr");

export default function Page() {
  return <AreaPageView slug="georgia-dscr" />;
}
