# SEO.md — Findability, Metadata & Structured Data Engineering Audit

**Project:** Addis Eats Web Application  
**Module:** Prog M3-SQ10 S26 · Day 19 / Module 3  
**Institution:** IBT College Canada · CodeOps Full Stack Development  
**Audited Target:** Production Build (`npm run build && npm run start`)  
**Production URL (`metadataBase`):** `https://addiseats.et`  

---

## 📋 Comprehensive Exercises 1–7 Audit Summary

| # | Exercise & Requirement | Implementation File | Verification Method | Status |
|---|---|---|---|:---:|
| **1** | Set `metadataBase` & Title Template in Root Layout | `app/layout.js` | View Source on running page `<head>` confirms absolute `og:image` and title template `%s \| Addis Eats` | **PASS** |
| **2** | Static Route Titles, Human Descriptions & Canonical URL | `app/page.js`, `app/menu/page.js`, `app/cart/page.js`, `app/checkout/page.js` | Inspect `<title>`, `<meta name="description">`, `<link rel="canonical">`, and verify single `<h1>` per route | **PASS** |
| **3** | Dynamic `generateMetadata` on Dish Route | `app/menu/[id]/page.js` | Curl `/menu/1` vs `/menu/2`; confirm distinct titles, prices, and human summaries | **PASS** |
| **4** | Site-Wide & Per-Dish OpenGraph Image (`ImageResponse`) | `app/opengraph-image.jsx`, `app/menu/[id]/opengraph-image.jsx` | Social Preview Debugger verified at 1200 × 630 pixels with absolute URLs | **PASS** |
| **5** | `MenuItem` JSON-LD Derived from Same Dish Record | `app/menu/[id]/page.js` | Google Rich Results Test simulator; exact match of name, price, and currency in ETB | **PASS** |
| **6** | Dynamic `app/sitemap.js` Excluding Private Routes | `app/sitemap.js` | Fetch `/sitemap.xml`; verify all dish URLs present; confirm zero `/cart` or `/checkout` routes | **PASS** |
| **7** | `app/robots.js` Disallowing `/cart` & `/checkout` | `app/robots.js` | Fetch `/robots.txt`; verify `Disallow: /cart`, `Disallow: /checkout`, and sitemap pointer | **PASS** |

---

## 🔍 Detailed Exercise Breakdown & Technical Documentation

### Exercise 1: `metadataBase` and Title Template in Root Layout
- **Implementation (`app/layout.js`):**
  ```javascript
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://addiseats.et";

  export const metadata = {
    metadataBase: new URL(APP_URL),
    title: {
      default: "Addis Eats - Authentic Ethiopian Dining & Fast Delivery",
      template: "%s | Addis Eats",
    },
    description: "Experience authentic Ethiopian culinary traditions in Addis Ababa. Freshly simmered Doro Wat, sizzling clay pot Tibs, lean seasoned Kitfo, and wholesome vegan fasting Beyaynetu delivered directly to your doorstep.",
    openGraph: {
      type: "website",
      locale: "en_ET",
      url: APP_URL,
      siteName: "Addis Eats",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@AddisEatsET",
    },
  };
  ```
- **Why `metadataBase` is Mandatory:**
  Social media crawlers (WhatsApp, Telegram, Twitter/X, Facebook) do not execute JavaScript and strictly require fully-qualified absolute URLs for image assets. When `metadataBase` is defined, Next.js automatically prefixes relative paths (e.g. `/opengraph-image` or `/menu/1/opengraph-image`) with `https://addiseats.et`, eliminating build-time warnings and broken preview cards.

---

### Exercise 2: Static Route Metadata, Human Descriptions & Canonical Protection
- **Human-Written Descriptions vs Generic Boilerplate:**
  Every single static route has been crafted with a human-centric description describing real value:
  - **`/` (Home):** *"Taste traditional Ethiopian flavors in Addis Ababa. Explore our fresh breakfast, lunch, and dinner menus crafted with heritage spices, slow-simmered wots, and warm teff injera."*
  - **`/menu` (Catalog):** *"Explore our complete Addis Ababa menu of authentic slow-simmered wots, sizzling clay pot tibs, and vegan beyaynetu fasting platters. Filter by category and spice level."*
  - **`/cart` (Shopping Basket):** *"Review your selected authentic Ethiopian dishes, customize your injera portions, and review your order subtotal before heading to secure checkout."*
  - **`/checkout` (Payment):** *"Finalize your Addis Eats order with instant Telebirr or CBE Birr payment. Fast, reliable, and secure contactless food delivery to any sub-city in Addis Ababa."*
- **Canonical URL Defense on Parameterized Routes:**
  Visitors filtering the menu (e.g. `/menu?category=Vegan&spicy=true`) receive the canonical tag:
  ```html
  <link rel="canonical" href="https://addiseats.et/menu" />
  ```
  This signals to Googlebot that filtered queries are facets of the master menu page, consolidating page rank and preventing duplicate content penalties.
- **Private Route Protection:**
  Both `/cart` and `/checkout` explicitly specify `robots: { index: false, follow: false }`, ensuring crawl budget is focused on discoverable catalog routes.

---

### Exercise 3: Dynamic `generateMetadata` for Dish Routes
- **Implementation (`app/menu/[id]/page.js`):**
  ```javascript
  export async function generateMetadata({ params }) {
    const dish = await getDishById(params.id);
    if (!dish) return { title: "Dish Not Found" };

    const description = `Order freshly prepared ${dish.name} for ${dish.price} ETB at Addis Eats. ${dish.description} Served hot with fresh teff injera across Addis Ababa.`;

    return {
      title: `${dish.name} (${dish.price} ETB)`,
      description,
      alternates: { canonical: `/menu/${dish.id}` },
      openGraph: {
        title: `${dish.name} - ${dish.price} ETB | Addis Eats`,
        description,
        url: `/menu/${dish.id}`,
        type: "article",
        images: [{ url: `/menu/${dish.id}/opengraph-image`, width: 1200, height: 630 }],
      },
    };
  }
  ```
- **Verification:**
  - Dish 1 (`/menu/1` - Doro Wat): `<title>Doro Wat (240 ETB) | Addis Eats</title>`
  - Dish 2 (`/menu/2` - Shiro Mited): `<title>Shiro Mited (120 ETB) | Addis Eats</title>`
  Each dish features its own unique description, price, and dedicated OpenGraph preview.

---

### Exercise 4: OpenGraph Image Generation at 1200 × 630 with `ImageResponse`
- **Site-Wide (`app/opengraph-image.jsx`):**
  - Next.js edge/Node image generator producing a branded 1200 × 630 PNG.
  - Ethiopian flag tricolor header banner (`#078930`, `#FCDD09`, `#DA121A`).
  - Addis Eats logo badge, high-contrast headline, and value badges (*Pure Teff Injera*, *100% Vegan Fasting*, *Rapid Delivery*).
- **Per-Dish Dynamic (`app/menu/[id]/opengraph-image.jsx`):**
  - Dynamically extracts dish name, price in ETB, category tag, and summary.
  - Renders category-coded badges (e.g. Green for Vegan, Orange for Grill, Yellow for Traditional).
  - Prominent gold price callout: `${dish.price} ETB`.

---

### Exercise 5: Schema.org `MenuItem` JSON-LD Structured Data
- **DOM vs JSON-LD Parity:**
  The JSON-LD is generated directly from the same dish object passed into the server component:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    "name": "Doro Wat",
    "description": "Spicy Ethiopian chicken stew slow-simmered in rich berbere sauce and spiced butter, served with hard-boiled egg.",
    "image": "https://addiseats.et/menu/1/opengraph-image",
    "offers": {
      "@type": "Offer",
      "price": 240,
      "priceCurrency": "ETB",
      "availability": "https://schema.org/InStock",
      "url": "https://addiseats.et/menu/1",
      "seller": {
        "@type": "Restaurant",
        "name": "Addis Eats",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Addis Ababa",
          "addressCountry": "ET"
        }
      }
    }
  }
  ```
- **Price Currency:** Explicitly defined as `ETB` (Ethiopian Birr), matching the rendered `240 ETB` on screen.

---

### Exercise 6: Dynamic `app/sitemap.js`
- **Output Inspection (`https://addiseats.et/sitemap.xml`):**
  - `https://addiseats.et` (priority 1.0)
  - `https://addiseats.et/menu` (priority 0.9)
  - `https://addiseats.et/menu/1` through `https://addiseats.et/menu/8` (priority 0.8)
- **Private Route Exclusion:**
  `/cart` and `/checkout` are strictly excluded from the sitemap array, preventing indexation of ephemeral user sessions.

---

### Exercise 7: Crawler Policy (`app/robots.js`)
- **Output Inspection (`https://addiseats.et/robots.txt`):**
  ```txt
  User-Agent: *
  Allow: /
  Allow: /menu
  Allow: /menu/*
  Disallow: /cart
  Disallow: /checkout
  Disallow: /api/*

  Sitemap: https://addiseats.et/sitemap.xml
  Host: https://addiseats.et
  ```

---

## ✅ Check Yourself Verification Matrix

| Verification Question | Test Target | Verified Output / Result | Status |
|---|---|---|:---:|
| **Does the page source show absolute URLs in every `og:image` tag?** | `<meta property="og:image">` | `https://addiseats.et/menu/1/opengraph-image` (Absolute URL resolved via `metadataBase`) | **YES (PASS)** |
| **Do two different dish pages have two different descriptions?** | `/menu/1` vs `/menu/2` | Doro Wat: *"Order freshly prepared Doro Wat for 240 ETB..."* vs Shiro Mited: *"Order freshly prepared Shiro Mited for 120 ETB..."* | **YES (PASS)** |
| **Does your sitemap contain any route that requires signing in?** | `sitemap.xml` | Scanned all 10 entries; zero authentication, private, or cart routes included | **NO (PASS)** |
| **Does the JSON-LD price match the price on the page, in ETB?** | DOM vs JSON-LD | Both render `240 ETB` (`price: 240`, `priceCurrency: "ETB"`) | **YES (PASS)** |
| **Is there exactly one `<h1>` on each page, and does it describe the page?** | All 4 static routes & dish detail | Each route contains exactly one semantic `<h1>` tag describing its primary contents | **YES (PASS)** |
| **Would a link to a dish look worth opening if you saw it in a group chat?** | WhatsApp/Telegram Preview | High-resolution 1200×630 card showing dish title, category, price in ETB, and mouthwatering summary | **YES (PASS)** |
