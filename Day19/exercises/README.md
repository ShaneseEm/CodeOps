# Prog M3-SQ10 S26 · Day 19: Exercises (Making Addis Eats Findable)

**IBT College Canada · CodeOps Full Stack Development**  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/Day19/exercises](https://github.com/ShaneseEm/CodeOps/tree/main/Day19/exercises)

---

## 📋 Moodle Submission Copy-Paste Text

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/Day19/exercises

Prog M3-SQ10 S26 · Day 19 Exercises (Making Addis Eats Findable: Metadata, OpenGraph & Structured Data)

1. Root Layout metadataBase & Title Template (Exercise1_MetadataBaseTitleTemplate.jsx & app/layout.js):
   - Configured `metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://addiseats.et')` in root layout.
   - Set title template to `%s | Addis Eats` with fallback default title.
   - Guaranteed automatic prefixing of relative open graph and canonical links into fully-qualified absolute URLs.

2. Static Route Metadata, Human Descriptions & Canonical Protection (Exercise2_StaticRoutesMetadata.jsx):
   - Defined human-written meta descriptions (150-165 characters) for /, /menu, /cart, and /checkout.
   - Injected `<link rel="canonical" href="https://addiseats.et/menu" />` on /menu to consolidate ranking signals when query parameters (?category=Vegan, ?spicy=true) are present.
   - Guarded private routes (/cart, /checkout) with `robots: { index: false, follow: false }`.
   - Verified that every static route renders exactly one semantic <h1> describing the page.

3. Dynamic generateMetadata for Dish Detail Routes (Exercise3_DynamicDishMetadata.jsx):
   - Implemented `generateMetadata({ params })` dynamically pulling dish records by id.
   - Extracted dish name, price in ETB, and summary into distinct human-centric descriptions.
   - Confirmed that two different dish routes (/menu/1 and /menu/2) generate completely different titles, descriptions, and OpenGraph targets.

4. Site-Wide & Per-Dish Dynamic OpenGraph Images with ImageResponse (Exercise4_OpenGraphImageGeneration.jsx):
   - Built site-wide `app/opengraph-image.jsx` rendering branded Addis Eats banner at exact 1200 x 630 dimensions.
   - Built dynamic `app/menu/[id]/opengraph-image.jsx` rendering dish name, category badge, price in ETB, and summary.
   - Verified that page source displays absolute URLs in every og:image meta tag.

5. Schema.org MenuItem JSON-LD Derived from Same Dish Record (Exercise5_MenuItemJsonLd.jsx):
   - Injected `<script type="application/ld+json">` generated from the exact dish object rendered by the server component.
   - Guaranteed 100% price parity between page text ("240 ETB") and JSON-LD (`price: 240, priceCurrency: "ETB"`).
   - Mapped vegan dishes to `https://schema.org/VeganDiet` and validated zero syntax errors via Google Rich Results simulator.

6. Dynamic app/sitemap.js Generation from Live Records (Exercise6_AppSitemapGeneration.jsx):
   - Implemented `app/sitemap.js` returning static routes (/, /menu) and all dynamic dish URLs (/menu/[id]).
   - Strictly excluded private routes (/cart, /checkout, /api/*) so crawler budget is preserved and private states are never indexed.

7. Crawler Directives with app/robots.js (Exercise7_RobotsTxtRule.jsx):
   - Implemented `app/robots.js` with `userAgent: '*'`.
   - Allowed indexing of '/', '/menu', and '/menu/*'.
   - Explicitly disallowed '/cart', '/checkout', and '/api/*'.
   - Directed all search engines to the canonical sitemap at `https://addiseats.et/sitemap.xml`.
```

---

## 📁 File Index

- `Exercise1_MetadataBaseTitleTemplate.jsx`: Root layout `metadataBase` resolution and `%s | Addis Eats` title template.
- `Exercise2_StaticRoutesMetadata.jsx`: Human-crafted descriptions, canonical tag defense for query params, and single `<h1>` audits.
- `Exercise3_DynamicDishMetadata.jsx`: Dynamic `generateMetadata` implementation and two-dish comparison benchmark.
- `Exercise4_OpenGraphImageGeneration.jsx`: Site-wide and per-dish dynamic 1200 &times; 630 OpenGraph generation via `ImageResponse`.
- `Exercise5_MenuItemJsonLd.jsx`: Schema.org `MenuItem` JSON-LD generator with exact ETB price parity.
- `Exercise6_AppSitemapGeneration.jsx`: Real data `sitemap.xml` generator with private route exclusion.
- `Exercise7_RobotsTxtRule.jsx`: Standard `robots.txt` generator and interactive bot access tester.
- `ExerciseRunner.jsx`: Multi-tabbed verification suite uniting all 7 exercises.
- `SEO.md`: Complete findability engineering audit answering all checklist and verification questions.
- `dishes.js`: Normalized Ethiopian culinary records with ETB pricing, descriptions, and dietary classifications.
