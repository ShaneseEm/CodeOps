const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://addiseats.et";

/**
 * Exercise 7 & Mini-Project Robots.txt Generator
 * - Configures crawler policy for all standard search engine user-agents
 * - Allows indexing of home (/), menu (/menu), and all dynamic dish routes (/menu/*)
 * - Explicitly disallows private/transactional routes (/cart, /checkout, /api/*)
 * - Points crawlers directly to the dynamic XML sitemap endpoint
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/menu", "/menu/*"],
      disallow: ["/cart", "/checkout", "/api/*"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
