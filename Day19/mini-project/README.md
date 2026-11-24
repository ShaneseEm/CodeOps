# Mini-Project · Making Addis Eats Findable

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Day 19 Mini-Project / Module 3*  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/Day19/mini-project](https://github.com/ShaneseEm/CodeOps/tree/main/Day19/mini-project)

---

## 📋 Moodle Submission Copy-Paste Text

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/Day19/mini-project

Mini-Project · Making Addis Eats Findable (SEO, OpenGraph, JSON-LD & Dynamic Sitemaps)

1. Root Layout metadataBase & Title Template (app/layout.js):
   - Configured `metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://addiseats.et')` in the root layout.
   - Defined title template: `template: '%s | Addis Eats'` with fallback default title.
   - Resolves all relative OpenGraph image URLs and canonical links to fully qualified absolute paths.

2. Distinct Human-Readable Descriptions & Single <h1> Audit:
   - Written bespoke descriptions (150-165 characters) for /, /menu, /cart, and /checkout.
   - Audited every static and dynamic route: exactly one descriptive <h1> tag is present per page.
   - Protected private routes (/cart, /checkout) with `robots: { index: false, follow: false }`.

3. Dynamic generateMetadata for Dish Detail Routes (app/menu/[id]/page.js):
   - Dynamically derived metadata from live dish records using name, price in ETB, and summary.
   - Verified that different dish routes (/menu/1 and /menu/2) generate completely distinct titles and descriptions.

4. 1200 x 630 OpenGraph Images via ImageResponse (app/opengraph-image.jsx & app/menu/[id]/opengraph-image.jsx):
   - Built branded site-wide OpenGraph image at 1200 x 630 px.
   - Built dynamic per-dish OpenGraph image with dish name, category badge, price in ETB, and summary.
   - Verified that every og:image tag in the page source uses absolute URLs.

5. Schema.org MenuItem JSON-LD Structured Data:
   - Generated `<script type="application/ld+json">` from the identical dish record rendered on the page.
   - Guaranteed exact price and currency parity between page DOM ("240 ETB") and JSON-LD (`offers.price = 240, priceCurrency = "ETB"`).
   - Validated zero errors or warnings in Google Rich Results simulator.

6. Dynamic app/sitemap.js from Real Dish Data:
   - Built dynamic sitemap pulling all live dish routes with priority 0.8 and daily core routes with priority 1.0.
   - Strictly excluded private/auth-required routes (/cart, /checkout, /api/*).

7. Crawler Directives with app/robots.js & Canonical URLs:
   - Allowed /, /menu, /menu/* and explicitly disallowed /cart, /checkout, and /api/*.
   - Linked search crawlers directly to `https://addiseats.et/sitemap.xml`.
   - Injected `<link rel="canonical" href="https://addiseats.et/menu" />` on /menu to consolidate ranking signals when query parameters are present.
```

---

## 🚀 What We Built

1. **Interactive Findability Application (`App.jsx`):** Allows reviewers to navigate routes, switch dishes, filter categories, view generated `<head>` page source, simulate social share previews at 1200 × 630 px, and validate JSON-LD structured data in real-time.
2. **Comprehensive Findability Audit (`SEO.md`):** Thoroughly documents technical implementations and answers every question from the "Check yourself" list.
3. **App Router Implementation Files:** Live implementations ready for Next.js App Router:
   - `app/layout.js`: `metadataBase`, title template, human-written default description.
   - `app/opengraph-image.jsx`: Site-wide 1200 × 630 branded banner.
   - `app/menu/[id]/opengraph-image.jsx`: Dynamic 1200 × 630 dish social card.
   - `app/menu/[id]/page.js`: `generateMetadata` and Schema.org `MenuItem` JSON-LD.
   - `app/sitemap.js`: Dynamic XML sitemap from real dish data.
   - `app/robots.js`: Crawler directives disallowing private routes.

---

## 📁 Files Included

- `App.jsx`: Complete interactive Addis Eats findability application and live diagnostic inspector.
- `SEO.md`: Master findability and structured data audit report answering all checklist questions.
- `dishes.js`: Canonical Ethiopian menu records with ETB pricing, descriptions, and dietary classifications.
- `README.md`: Mini-project documentation and copy-paste Moodle submission text.
