import { ImageResponse } from "next/og";
import { DELIVERY_HOURS, PRICE_LABEL } from "@/lib/config";

export const alt = `SEOPage — done-for-you SEO pages. ${PRICE_LABEL} per page, delivered within ${DELIVERY_HOURS} hours.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* subtle grid backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#e6e8ec 1px, transparent 1px), linear-gradient(90deg, #e6e8ec 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.5,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "#1b46d4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#0a0c11" }}>
            SEO<span style={{ color: "#1b46d4" }}>Page</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 800,
              color: "#0a0c11",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Customers are asking AI who to hire.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 800,
              color: "#1b46d4",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Make it recommend you.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
            color: "#353a44",
          }}
        >
          <span
            style={{
              display: "flex",
              background: "#eef1fc",
              color: "#1b46d4",
              borderRadius: 999,
              padding: "10px 26px",
              fontWeight: 700,
            }}
          >
            {PRICE_LABEL} per page
          </span>
          <span style={{ display: "flex" }}>
            Researched · human-reviewed · delivered within {DELIVERY_HOURS} hours
          </span>
        </div>
      </div>
    ),
    size,
  );
}
