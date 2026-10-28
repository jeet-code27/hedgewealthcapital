import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Hedge Wealth Capital – Private money loans for real estate investors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Cached so the share card can be prerendered at build time.
async function logoDataUri() {
  "use cache";
  const logo = await readFile(join(process.cwd(), "public/images/hwc-logo-header.png"));
  return `data:image/png;base64,${logo.toString("base64")}`;
}

/** Default social share card for every page without its own image. */
export default async function Image() {
  const logoSrc = await logoDataUri();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", fontFamily: "sans-serif" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px 56px 72px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={262} height={119} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 60, fontWeight: 800, color: "#192861", lineHeight: 1.05, letterSpacing: -2 }}>Private Money Loans</div>
            <div style={{ fontSize: 60, fontWeight: 800, color: "#5fa82d", lineHeight: 1.05, letterSpacing: -2 }}>for Real Estate Investors</div>
            <div style={{ marginTop: 22, fontSize: 26, color: "#5b6380" }}>Fix & flip · DSCR rentals · Bridge · Construction</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", background: "#7AC644", color: "#192861", fontSize: 24, fontWeight: 800, padding: "12px 22px", borderRadius: 14 }}>1-800-674-3804</div>
            <div style={{ fontSize: 22, color: "#5b6380" }}>hedgewealthcapital.com</div>
          </div>
        </div>
        <div style={{ width: 380, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18, background: "#192861", padding: "0 44px" }}>
          {[
            ["100%", "LTC on purchase + rehab"],
            ["Same Day", "Approvals"],
            ["50 + DC", "States we lend in"],
          ].map(([v, l]) => (
            <div key={v} style={{ display: "flex", flexDirection: "column", borderLeft: "6px solid #7AC644", paddingLeft: 20 }}>
              <div style={{ fontSize: 52, fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 20, color: "#7AC644", marginTop: 6, textTransform: "uppercase", letterSpacing: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
