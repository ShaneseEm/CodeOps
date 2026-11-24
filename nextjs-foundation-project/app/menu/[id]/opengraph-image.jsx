import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Exercise 4 & Mini-Project Dynamic Per-Dish OpenGraph Image
 * - Dimensions: Exactly 1200 x 630
 * - Generates high-impact social preview card with dish name, category, price in ETB, and summary
 * - Injects Addis Eats branding and Ethiopian culinary color motifs
 */
export default async function Image({ params }) {
  const filePath = path.join(process.cwd(), "public", "dishes.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const dishes = JSON.parse(rawData);
  const dish = dishes.find((d) => d.id.toString() === params.id) || {
    name: "Ethiopian Specialty Dish",
    category: "Traditional",
    price: 250,
    description: "Authentic slow-simmered Ethiopian culinary masterpiece served with warm teff injera.",
  };

  const categoryColor =
    dish.category === "Vegan" ? "#10b981" : dish.category === "Grill" ? "#f97316" : "#eab308";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#18181b",
          backgroundImage: "radial-gradient(circle at 10% 20%, #27272a 0%, #09090b 100%)",
          color: "#fafafa",
          padding: "60px 70px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Tricolor Header Accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            background: "linear-gradient(90deg, #078930 0%, #FCDD09 50%, #DA121A 100%)",
          }}
        />

        {/* Top Bar: Brand & Category Badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "30px" }}>🇪🇹</span>
            <span
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#e4e4e7",
                letterSpacing: "0.05em",
              }}
            >
              Addis Eats <span style={{ color: "#eab308" }}>Menu</span>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: `2px solid ${categoryColor}`,
                color: categoryColor,
                padding: "8px 22px",
                borderRadius: "30px",
                fontSize: "20px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {dish.category}
            </span>
            {dish.spicy && (
              <span
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "2px solid #ef4444",
                  color: "#f87171",
                  padding: "8px 20px",
                  borderRadius: "30px",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                🔥 Spicy
              </span>
            )}
          </div>
        </div>

        {/* Center: Dish Name, Price, and Summary */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              fontSize: "58px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: "1050px",
            }}
          >
            {dish.name}
          </div>

          <div
            style={{
              fontSize: "26px",
              color: "#a1a1aa",
              maxWidth: "980px",
              lineHeight: 1.45,
            }}
          >
            {dish.description}
          </div>
        </div>

        {/* Bottom Bar: Exact Price in ETB & Call to Action */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "22px", color: "#71717a", fontWeight: 500 }}>Price:</span>
            <span
              style={{
                fontSize: "52px",
                fontWeight: 900,
                color: "#facc15",
              }}
            >
              {dish.price} <span style={{ fontSize: "28px", color: "#e4e4e7" }}>ETB</span>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#22c55e",
              color: "#052e16",
              padding: "14px 32px",
              borderRadius: "14px",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            Order Hot on Addis Eats &rarr;
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
