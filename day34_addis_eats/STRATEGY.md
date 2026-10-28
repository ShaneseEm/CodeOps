# Addis Eats - Rendering Strategies & Layout Architecture

This document outlines the rendering strategies, layouts, and data fetching techniques employed across the Addis Eats Next.js 14 application.

---

## Strategy Matrix

| Route | Route Type | Next.js Build Marker | Strategy | Rationale & Configuration |
| :--- | :--- | :---: | :--- | :--- |
| `/` | Landing / Home | `○` | Static (SSG) | Landing page shell and brand introduction are static and can be pre-rendered entirely at build time. |
| `/menu` | Menu Catalog | `●` | Incremental Static Regeneration (ISR) | Pre-rendered at build time with `export const revalidate = 60;` so menu updates (availability, pricing) update automatically every 60 seconds without redeploying. |
| `/menu/[id]` | Dish Detail | `●` | Static Site Generation (SSG with `generateStaticParams`) | Pre-rendered at build time for every dish ID in `data/dishes.json` via `generateStaticParams()`, producing instant static HTML pages with zero server latency. |
| `/cart` | Shopping Cart | `○` | Static Shell with Client State | Static route shell pre-rendered at build time; actual cart contents are populated from localStorage / client-side state. |
| `/checkout` | Checkout & Payment | `λ` | Server-Side Rendering (Dynamic SSR) | Dynamically rendered on every incoming request because it reads cookies/auth headers via Next.js `cookies()` (`next/headers`) for security and active session verification. |

---

## Key Layouts & Streaming Architecture

### 1. Root Layout (`app/layout.js`)
- Exclusively owns the `<html>` and `<body>` tags.
- Injects global styles (`globals.css`).
- Provides a persistent sticky header with branding & navigation links, and a persistent footer across all pages.

### 2. Nested Menu Layout (`app/menu/layout.js`)
- Wraps `/menu` and all `/menu/[id]` dynamic sub-routes without re-rendering the outer layout.
- Provides a sticky category navigation sidebar.
- Includes a client-side state counter (`useState`). Navigating between the menu list and individual dish details preserves the counter value without state reset, demonstrating Next.js nested layout state preservation.

### 3. Suspense Streaming (`app/menu/page.js`)
- The dish catalog (`DishList.jsx`) is wrapped in a React `<Suspense fallback={<DishSkeleton />}>` boundary.
- Allows the category sidebar and menu shell to render instantly while the dish data streams in.
