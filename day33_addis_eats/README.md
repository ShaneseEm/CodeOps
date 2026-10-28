# Mini-Project · Addis Eats on Next.js (App Router)

A Next.js project carrying the whole Addis Eats route tree, built entirely from folders using the **Next.js App Router**: home, menu, dynamic dish page, cart, and checkout, with loading, error, and not-found states declared by file.

Built for **IBT College Canada CodeOps · Module 3 · Frontend: React & Next.js · Day 33 (Day 11) Mini-Project**.

---

## 🗺️ App Router Route Tree & File Producer

| Route | File Producing Route | Type / Behavior |
|---|---|---|
| `/` | `app/page.js` | Home landing page (Server Component) with Link navigation and useRouter client button |
| `/menu` | `app/menu/page.js` | Menu listing dishes with `searchParams` filter (`/menu?category=Vegan`) |
| `/menu/[id]` | `app/menu/[id]/page.js` | Dynamic single dish route reading `params.id` from props. Calls `notFound()` if ID doesn't exist |
| `/cart` | `app/cart/page.js` | Cart review screen linking to checkout |
| `/checkout` | `app/checkout/page.js` | Client Component form with TeleBirr checkout & `useRouter` redirect |
| *(Loading)* | `app/menu/loading.js` | Declarative loading boundary with animated spinner automatically shown during server rendering |
| *(Error)* | `app/menu/error.js` | Declarative error boundary catching errors in menu segment with reset retry button |
| *(404 Not Found)* | `app/not-found.js` | Global not-found UI triggered by bad URLs or calling `notFound()` in code |

---

## 📁 Colocated Components (Non-Routable)

Next.js App Router only creates routes for folders containing a `page.js` (or `route.js`).
The following components sit inside `app/menu/` without creating extra routes:
- **`app/menu/DishList.jsx`**: Renders grid of dish cards. Navigating to `/menu/DishList` returns 404.
- **`app/menu/CategoryBar.jsx`**: Renders category filter pills. Navigating to `/menu/CategoryBar` returns 404.

---

## 🔍 Self-Check Answers

- **Does `npm run build` list every route you expected, and no routes you did not?**  
  **Yes!** Routes produced are `/`, `/menu`, `/menu/[id]`, `/cart`, `/checkout`, and `/_not-found`. No routes are produced for `DishList.jsx` or `CategoryBar.jsx`.
- **Is `DishList.jsx` unreachable as a URL even though it sits inside `app/`?**  
  **Yes!** In Next.js App Router, only files explicitly named `page.js` are routable. Colocated components are completely hidden from the URL space.
- **Does the dish page work when typed directly into the address bar?**  
  **Yes!** `/menu/1`, `/menu/2`, etc. read `params.id` on the server and render immediately without requiring client hydration to discover the parameter.
- **Does throttling the connection reveal your `loading.js`?**  
  **Yes!** When navigating to `/menu`, Next.js instantly swaps in `app/menu/loading.js` until the server component resolves.
- **Does a deliberate throw show `error.js`, and an unknown dish id show `not-found.js`?**  
  **Yes!** 
  - Visiting `/menu?simulateError=true` triggers `app/menu/error.js`.
  - Visiting `/menu/unknown-id` executes `notFound()`, rendering `app/not-found.js`.

---

## 🚀 How to Run

```bash
cd day33_addis_eats
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.
