import fs from "fs";
import path from "path";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://addiseats.et";

/**
 * Exercise 6 & Mini-Project Dynamic Sitemap Generator
 * - Generates sitemap.xml dynamically at build/runtime from real database records
 * - Includes static public routes (/, /menu) with high indexing priority
 * - Dynamically includes all individual dish detail pages (/menu/[id])
 * - STRICTLY EXCLUDES private/transactional routes (/cart, /checkout, /admin, /api)
 *   so crawler budget is preserved and private user states are never crawled.
 */
export default async function sitemap() {
  const filePath = path.join(process.cwd(), "public", "dishes.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const dishes = JSON.parse(rawData);

  // 1. Static Public Core Routes
  const staticRoutes = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // 2. Dynamic Dish Detail Routes (derived from live dishes.json records)
  const dishRoutes = dishes.map((dish) => ({
    url: `${BASE_URL}/menu/${dish.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Note: /cart and /checkout are explicitly EXCLUDED from this sitemap array.
  return [...staticRoutes, ...dishRoutes];
}
