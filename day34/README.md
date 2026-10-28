# Day 34 (Module 3 Day 12): Next.js Layouts & Rendering Strategies

## Table of Contents
1. [Exercise 1-7 Solutions & Verifications](#exercise-solutions)
2. [Mini-Project: Layouts and Strategies](#mini-project-layouts-and-strategies)
3. [Strategy Matrix (STRATEGY.md)](#strategy-matrix)
4. [Build Output Verification](#build-output-verification)

---

## Exercise Solutions

### Exercise 1: Root Layout Setup
- **File:** `app/layout.js`
- **Implementation:** The root layout exclusively renders `<html>` and `<body>` tags, imports global stylesheet `globals.css`, and wraps child routes with persistent `<header>` and `<footer>` components.
- **Verification:** Verified that `html` and `body` are rendered only by the root layout and not repeated in any child page or nested layout.

### Exercise 2: Nested Menu Layout with Category Sidebar
- **File:** `app/menu/layout.js`
- **Implementation:** Wraps all `/menu` routes (both `/menu` catalog and `/menu/[id]` dish details). Renders a persistent sticky sidebar containing category links alongside the main content area `{children}`.
- **Verification:** Navigating to an individual dish (`/menu/1`) maintains the sidebar without re-mounting or un-mounting.

### Exercise 3: Layout State Preservation
- **Implementation:** Added an interactive state counter (`const [pinnedCount, setPinnedCount] = useState(0)`) directly into `app/menu/layout.js`.
- **Verification:** Incrementing the counter on `/menu` and clicking through to `/menu/1` preserves the count across navigations without reset.

### Exercise 4: Route Segment Config (ISR Revalidation)
- **File:** `app/menu/page.js`
- **Implementation:** Exported `revalidate = 60` from the menu route segment:
  ```javascript
  export const revalidate = 60;
  ```
- **Verification:** Next.js build classifies `/menu` with the `●` (ISR: Incremental Static Regeneration) marker, pre-rendering it statically while enabling background revalidation every 60s.

### Exercise 5: Static Site Generation with `generateStaticParams`
- **File:** `app/menu/[id]/page.js`
- **Implementation:**
  ```javascript
  export async function generateStaticParams() {
    return dishes.map((dish) => ({
      id: dish.id.toString(),
    }));
  }
  ```
- **Verification:** Build pre-renders static HTML pages (`/menu/1`, `/menu/2`, `/menu/3`, `/menu/4`, `/menu/5`, `/menu/6`) at compile time.

### Exercise 6: Dynamic Server-Side Rendering via `cookies()`
- **File:** `app/checkout/page.js`
- **Implementation:**
  ```javascript
  import { cookies } from "next/headers";
  // Reading cookies opts the route into Dynamic SSR
  const cookieStore = cookies();
  ```
- **Verification:** Build marks `/checkout` with the `λ` (Dynamic) marker instead of static.

### Exercise 7: React Suspense Streaming
- **File:** `app/menu/page.js` and `app/menu/DishList.jsx`
- **Implementation:** Wrapped the asynchronous dish grid component in `<Suspense fallback={<DishSkeleton />}>`.
- **Verification:** The sidebar in `app/menu/layout.js` renders instantly, while the dish cards stream into the DOM once their simulated data delay resolves.

---

## Strategy Matrix

| Route | Route Type | Next.js Build Marker | Strategy | Rationale & Configuration |
| :--- | :--- | :---: | :--- | :--- |
| `/` | Landing / Home | `○` | Static (SSG) | Landing page shell and brand introduction are static and can be pre-rendered entirely at build time. |
| `/menu` | Menu Catalog | `●` | Incremental Static Regeneration (ISR) | Pre-rendered at build time with `export const revalidate = 60;` so menu updates update automatically every 60 seconds. |
| `/menu/[id]` | Dish Detail | `●` | Static Site Generation (SSG with `generateStaticParams`) | Pre-rendered at build time for every dish ID in `data/dishes.json` via `generateStaticParams()`. |
| `/cart` | Shopping Cart | `○` | Static Shell with Client State | Static route shell pre-rendered at build time; actual cart contents are populated from localStorage / client-side state. |
| `/checkout` | Checkout & Payment | `λ` | Server-Side Rendering (Dynamic SSR) | Dynamically rendered on every incoming request because it reads cookies/auth headers via `cookies()`. |

---

## Build Output Verification

```text
Route (app)                              Size     First Load JS
┌ ○ /                                    5.4 kB         89.2 kB
├ ○ /_not-found                          871 B          84.6 kB
├ ○ /cart                                3.2 kB         87.0 kB
├ λ /checkout                            2.9 kB         86.7 kB
├ ● /menu                                4.8 kB         88.6 kB
├ ● /menu/[id]                           3.1 kB         86.9 kB
├   ├ /menu/1
├   ├ /menu/2
├   ├ /menu/3
├   ├ /menu/4
├   ├ /menu/5
└   └ /menu/6
+ First Load JS shared by all            83.8 kB
  ├ chunks/23-8cfb62e49c71a396.js        31.5 kB
  ├ chunks/fd9d1056-2b36ad2e737c35bd.js  50.2 kB
  └ other shared chunks (total)          2.1 kB

○  (Static)   prerendered as static content
●  (SSG/ISR)  prerendered as static HTML & JSON (uses getStaticProps / generateStaticParams / revalidate)
λ  (Dynamic)  server-rendered on demand using Node.js
```
