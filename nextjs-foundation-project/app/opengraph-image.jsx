import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Addis Eats - Authentic Ethiopian Dining & Delivery";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1c1917",
          backgroundImage: "radial-gradient(circle at 25% 25%, #292524 0%, #0c0a09 100%)",
          color: "#fafaf9",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Top Gold Border Accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "12px",
            background: "linear-gradient(90deg, #078930 0%, #FCDD09 50%, #DA121A 100%)",
          }}
        />

        {/* Brand Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "rgba(245, 158, 11, 0.15)",
            border: "2px solid rgba(245, 158, 11, 0.4)",
            borderRadius: "50px",
            padding: "10px 28px",
            marginBottom: "28px",
          }}
        >
          <span style={{ fontSize: "32px" }}>🇪🇹</span>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#f59e0b",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Addis Eats · Authentic Culinary Heritage
          </span>
        </div>

        {/* Main Headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 900,
            textAlign: "center",
            maxWidth: "960px",
            lineHeight: 1.15,
            color: "#ffffff",
            marginBottom: "24px",
          }}
        >
          Addis Eats: Real Ethiopian Taste Delivered Hot
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#d6d3d1",
            textAlign: "center",
            maxWidth: "850px",
            lineHeight: 1.4,
            marginBottom: "40px",
          }}
        >
          Slow-simmered Doro Wat, spiced Kitfo, sizzling Tibs, and fasting Beyaynetu — 
          prepared fresh daily across Addis Ababa.
        </div>

        {/* Highlights Row */}
        <div
          style={{
            display: "flex",
            gap: "24px",
          }}
        >
          <div
            style={{
              background: "#292524",
              border: "1px solid #44403c",
              padding: "12px 24px",
              borderRadius: "12px",
              fontSize: "20px",
              color: "#fbbf24",
              fontWeight: 600,
            }}
          >
            ✨ Pure Teff Injera
          </div>
          <div
            style={{
              background: "#292524",
              border: "1px solid #44403c",
              padding: "12px 24px",
              borderRadius: "12px",
              fontSize: "20px",
              color: "#34d399",
              fontWeight: 600,
            }}
          >
            🌱 100% Vegan Fasting
          </div>
          <div
            style={{
              background: "#292524",
              border: "1px solid #44403c",
              padding: "12px 24px",
              borderRadius: "12px",
              fontSize: "20px",
              color: "#60a5fa",
              fontWeight: 600,
            }}
          >
            ⚡ Rapid Bole Delivery
          </div>
        </div>

        {/* Footer URL */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            fontSize: "18px",
            color: "#78716c",
            letterSpacing: "0.05em",
          }}
        >
          https://addiseats.et
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
