# Module 3 Day 33 · Next.js App Router Fundamentals

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Day 11 (Day 33 overall)*

---

## 📑 Contents

1. [Part 1: Exercises 1–7 (Moodle Submission Answers)](#part-1-exercises-17-moodle-submission-answers)
   - [Exercise 1: Scaffolding Next.js with App Router](#exercise-1-scaffolding-nextjs-with-app-router)
   - [Exercise 2: Folder-Based Routes with page.js](#exercise-2-folder-based-routes-with-pagejs)
   - [Exercise 3: Dynamic /menu/[id]/page.js with Params](#exercise-3-dynamic-menuidpagejs-with-params)
   - [Exercise 4: Colocating DishList and CategoryBar (Non-Routable)](#exercise-4-colocating-dishlist-and-categorybar-non-routable)
   - [Exercise 5: next/link and Client useRouter Navigation](#exercise-5-nextlink-and-client-userouter-navigation)
   - [Exercise 6: loading.js and error.js Boundaries](#exercise-6-loadingjs-and-errorjs-boundaries)
   - [Exercise 7: not-found.js and notFound() Invocations](#exercise-7-not-foundjs-and-notfound-invocations)
2. [Part 2: Mini-Project · Addis Eats on Next.js](#part-2-mini-project--addis-eats-on-nextjs)
   - [App Router Route Table](#app-router-route-table)
   - [Self-Check Answers](#self-check-answers)
   - [How to Run](#how-to-run)

---

# Part 1: Exercises 1–7 (Moodle Submission Answers)

> **Copy & paste this section directly into your Moodle "Online text" submission box for Day 11 Exercise!**

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/day33_addis_eats

### Exercise Solutions & Explanations:

1. Scaffold Next.js App Router:
   Scaffolded Next.js project with App Router directory structure (`app/`), configuring root `app/layout.js` and `app/page.js`.

2. Folder-Based Routes (home, menu, cart, checkout):
   Created four distinct folder segments each containing a default-exported `page.js`:
   - `app/page.js` -> `/`
   - `app/menu/page.js` -> `/menu`
   - `app/cart/page.js` -> `/cart`
   - `app/checkout/page.js` -> `/checkout`

3. Dynamic Route app/menu/[id]/page.js:
   Created dynamic route folder `app/menu/[id]/page.js`. In Next.js App Router, dynamic parameters are received directly via the `params` prop:
   export default function DishDetail({ params }) {
     const { id } = params;
     return <h1>Dish ID: {id}</h1>;
   }

4. Colocating Non-Routable Components:
   Placed `DishList.jsx` and `CategoryBar.jsx` directly inside the `app/menu/` directory. Next.js App Router ONLY routes files named `page.js`. Therefore, navigating to `/menu/DishList` or `/menu/CategoryBar` returns 404, proving colocation is non-routable.

5. Navigation with next/link & useRouter:
   - Used `<Link href="...">` for zero-reload client-side transitions across all navigation tabs.
   - Built a Client Component (`NavigationButton.js`) marked with `"use client"` that uses `const router = useRouter()` and navigates programmatically with `router.push('/menu')`.

6. Declarative loading.js and error.js:
   - Added `app/menu/loading.js`: Automatically displays a loading spinner during server data fetching.
   - Added `app/menu/error.js`: Must be `"use client"`. Catches runtime rendering errors inside the menu segment with an interactive `reset()` button. Forced to appear via `?simulateError=true`.

7. not-found.js and notFound():
   - Created `app/not-found.js` to render a tailored 404 screen.
   - In `app/menu/[id]/page.js`, checked dish existence; if not found, executed `notFound()`, which triggers `not-found.js`.
```

---

# Part 2: Mini-Project · Addis Eats on Next.js

Carries the entire Addis Eats application tree into Next.js App Router.

### 🗺️ Full Route Table:
- `/` -> `app/page.js` (Home landing page)
- `/menu` -> `app/menu/page.js` (Server Component menu with query params)
- `/menu/[id]` -> `app/menu/[id]/page.js` (Dynamic dish detail page)
- `/cart` -> `app/cart/page.js` (Shopping cart overview)
- `/checkout` -> `app/checkout/page.js` (Client Component checkout form)
- *(Loading)* -> `app/menu/loading.js` (Declarative loading UI)
- *(Error)* -> `app/menu/error.js` (Declarative error boundary)
- *(404)* -> `app/not-found.js` (Global not-found UI)

---

### ✅ Self-Check Answers

| Question | Status | Verification Details |
|---|:---:|---|
| **Does `npm run build` list every route you expected, and no routes you did not?** | ✅ | Yes! Routes generated: `/`, `/menu`, `/menu/[id]`, `/cart`, `/checkout`, and `/_not-found`. |
| **Is DishList.jsx unreachable as a URL even though it sits inside app/?** | ✅ | Yes! Only files named `page.js` are routable in Next.js App Router. |
| **Does the dish page work when typed directly into the address bar?** | ✅ | Yes! Server reads `params.id` directly on the initial request. |
| **Does throttling the connection reveal your loading.js?** | ✅ | Yes! `loading.js` is rendered while the server component streams. |
| **Does a deliberate throw show error.js, and an unknown dish id show not-found.js?** | ✅ | Yes! Tested with `?simulateError=true` and `/menu/unknown-id`. |

---

## 🚀 How to Run

```bash
cd day33_addis_eats
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.
