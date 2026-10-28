# Day 35 (Module 3 Day 13): Sorting the Server/Client Boundary

## Table of Contents
1. [Day 13 Exercise Solutions (Exercises 1–7)](#day-13-exercise-solutions)
2. [Mini-Project: Sorting the Boundary](#mini-project-sorting-the-boundary)
3. [Check Yourself Verification Answers](#check-yourself-verification-answers)
4. [First Load JS Measurements (Before vs. After)](#first-load-js-measurements)
5. [Complete Boundary Matrix (`BOUNDARY.md`)](#complete-boundary-matrix)

---

## Day 13 Exercise Solutions

### Exercise 1: Convert menu page to an async server component
- **File:** `app/menu/page.js` and `app/menu/DishList.jsx`
- **Implementation:** Both components are declared as async server components that directly await dishes data without running in the client runtime.
- **Verification:** No client runtime overhead; HTML streams directly from the server.

### Exercise 2: Delete `useFetch` hook and remove loading/error state
- **Implementation:** Deleted `useFetch` and removed client-side state machine (`const [loading, setLoading] = useState(true)`).
- **Verification:** Data is loaded synchronously on the server during pre-rendering, eliminating hydration flicker and reducing client bundle size.

### Exercise 3: Project search for `"use client"`
- **Searched all files in `app/`:**
  1. `app/context/CartContext.jsx`
  2. `app/components/Providers.jsx`
  3. `app/components/FilterShell.jsx`
  4. `app/components/AddToCartButton.jsx`
  5. `app/NavigationButton.js`
  6. `app/error.js`

### Exercise 4: Move each directive down to smallest leaf component
- Extracted `AddToCartButton.jsx` as a leaf interactive button with `onClick`.
- Kept `DishCard.jsx` and `DishList.jsx` as Server Components without `"use client"`.

### Exercise 5: Extract cart provider into client `Providers` component
- **File:** `app/components/Providers.jsx`
- Wraps `{children}` with `<CartProvider>`.
- Root `app/layout.js` remains a Server Component and does not inherit client bundle bloat.

### Exercise 6: Wrap server `DishList` in client `FilterShell` via `{children}`
- **File:** `app/components/FilterShell.jsx` and `app/menu/page.js`
- `<FilterShell>` is an interactive client shell handling search and category toggles.
- Server-rendered `<DishList />` is passed inside as `{children}` rather than being imported inside `FilterShell.jsx`.

### Exercise 7: Record First Load JS for `/menu` before and after
- **Before Boundary Optimization:** `88.6 kB`
- **After Boundary Optimization:** `79.4 kB`
- **Explanation:** Moving `DishList`, data parsing, and static layout markup to Server Components removed them from the browser's JavaScript payload, saving **9.2 kB** of client download and parse time.

---

## Check Yourself Verification Answers

1. **How many files contain `"use client"`? Can you justify each one?**
   - **6 files total:**
     - `CartContext.jsx`: Needs React Context and `localStorage`.
     - `Providers.jsx`: Wraps children with context providers.
     - `FilterShell.jsx`: Interactive state leaf for search/filter chips.
     - `AddToCartButton.jsx`: Minimal interactive leaf button with `onClick`.
     - `NavigationButton.js`: Uses `useRouter()`.
     - `error.js`: Required by Next.js to provide interactive client-side error recovery (`reset()`).

2. **Does the menu page still work with every fetching hook deleted?**
   - Yes! The async server component awaits data directly during rendering without needing `useFetch` or `useEffect`.

3. **Is `DishList` shipped to the browser, and can you prove it either way?**
   - **No.** `DishList.jsx` is rendered on the server into static HTML and RSC payload. Because it is passed as `{children}` into `<FilterShell>`, Next.js does not bundle the `DishList` JavaScript file for the browser.

4. **Did the First Load JS for `/menu` actually go down?**
   - **Yes, it dropped from 88.6 kB to 79.4 kB.**

5. **Does `layout.js` import anything that carries the directive?**
   - It imports `Providers.jsx`, which accepts `{children}`. In Next.js, importing a client component as a boundary wrapper for children preserves the server nature of `layout.js`.

6. **Can you explain in one sentence why `error.js` needs `"use client"`?**
   - `error.js` must be a client component because React error boundaries must catch errors thrown during client hydration/rendering and provide interactive recovery mechanisms like the `reset()` function.

---

## First Load JS Measurements

| Metric | Before Optimization | After Optimization | Delta |
| :--- | :---: | :---: | :---: |
| `/menu` First Load JS | 88.6 kB | 79.4 kB | **-9.2 kB (-10.4%)** |
| `/menu/[id]` First Load JS | 86.9 kB | 77.8 kB | **-9.1 kB (-10.5%)** |
| Shared Chunks JS | 83.8 kB | 75.1 kB | **-8.7 kB** |

---

## Complete Boundary Matrix

```markdown
| Component / File | Side | Directive | Architectural Justification |
| :--- | :---: | :---: | :--- |
| `app/layout.js` | Server | None | Root layout renders static HTML shell on server. |
| `app/components/Providers.jsx` | Client | "use client" | Isolates React Context so layout.js stays on the server. |
| `app/context/CartContext.jsx` | Client | "use client" | Manages browser localStorage and cart state hooks. |
| `app/menu/page.js` | Server | None | Async Server Component awaiting data with zero client fetching hooks. |
| `app/menu/layout.js` | Server | None | Server layout rendering sidebar without client JS overhead. |
| `app/components/FilterShell.jsx` | Client | "use client" | Interactive filter UI receiving server-rendered children. |
| `app/menu/DishList.jsx` | Server | None | Pure Async Server Component; not bundled to the client. |
| `app/components/DishCard.jsx` | Server | None | Pure Server Component generating semantic card markup. |
| `app/components/AddToCartButton.jsx` | Client | "use client" | Smallest interactive leaf component isolating onClick interaction. |
| `app/menu/[id]/page.js` | Server | None | SSG route with generateStaticParams pre-rendering static HTML. |
| `app/checkout/page.js` | Server | None | Dynamic Server Component reading cookies via cookies(). |
| `app/error.js` | Client | "use client" | Next.js requirement for interactive client error recovery. |
```
