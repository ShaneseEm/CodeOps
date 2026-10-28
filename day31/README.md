# Module 3 Day 31 · Client-Side Routing with React Router

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Day 6 (Day 31 overall)*

---

## 📑 Contents

1. [Part 1: Exercises 1–7 (Moodle Submission Answers)](#part-1-exercises-17-moodle-submission-answers)
   - [Exercise 1: BrowserRouter with 3 Routes](#exercise-1-browserrouter-with-3-routes)
   - [Exercise 2: Link & NavLink with Active Highlighting](#exercise-2-link--navlink-with-active-highlighting)
   - [Exercise 3: Nested Routing with Layout & Outlet](#exercise-3-nested-routing-with-layout--outlet)
   - [Exercise 4: Index Route & Wildcard (*) Catch-All](#exercise-4-index-route--wildcard--catch-all)
   - [Exercise 5: Dynamic Route Parameters with useParams (/menu/:id)](#exercise-5-dynamic-route-parameters-with-useparams-menuid)
   - [Exercise 6: Query String Category Filtering with useSearchParams](#exercise-6-query-string-category-filtering-with-usesearchparams)
   - [Exercise 7: Route Guarding with RequireAuth & Return Redirect](#exercise-7-route-guarding-with-requireauth--return-redirect)
2. [Part 2: Mini-Project · Multi-Screen Addis Eats](#part-2-mini-project--multi-screen-addis-eats)
   - [Complete Route Table](#complete-route-table)
   - [Files to Submit](#files-to-submit)
   - [Self-Check Answers](#self-check-answers)
   - [How to Run](#how-to-run)

---

# Part 1: Exercises 1–7 (Moodle Submission Answers)

> **Copy & paste this section directly into your Moodle "Online text" submission box for Day 6 Exercise!**

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/day31_addis_eats

### Exercise Solutions & Explanations:

1. BrowserRouter with Three Routes:
   Installed `react-router-dom` and wrapped the application root in `<BrowserRouter>` defining top-level screens using `<Routes>` and `<Route>`:
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/menu" element={<Menu />} />
       <Route path="/cart" element={<Cart />} />
     </Routes>
   </BrowserRouter>

2. Replacing Anchors with Link and NavLink:
   Replaced standard `<a href="...">` anchors with `<Link to="...">` to prevent full page reloads and maintain client-side React state. Used `<NavLink to="...">` for navigation bars to automatically apply active CSS classes via `({ isActive }) => isActive ? "nav-link active" : "nav-link"`.

3. Nested Routing with Layout & Outlet:
   Created a parent `Layout.jsx` containing the shared Header, Navigation bar, and Footer. Rendered `<Outlet />` as the placeholder for child route screens:
   <Route path="/" element={<Layout />}>
     <Route index element={<Home />} />
     <Route path="menu" element={<Menu />} />
   </Route>

4. Index Route & Wildcard (*) Catch-All:
   - Configured `<Route index element={<Home />} />` to render the landing page when matching the parent route directly.
   - Configured `<Route path="*" element={<NotFound />} />` to catch unmatched URLs and render a user-friendly 404 screen.

5. Dynamic Route Parameters with useParams (/menu/:id):
   Configured dynamic route `<Route path="menu/:id" element={<DishDetail />} />`. Inside `DishDetail.jsx`, extracted the parameter with `const { id } = useParams()`. Handled invalid IDs gracefully (e.g. `/menu/not-a-dish` renders a friendly "Dish Not Found" fallback instead of crashing).

6. Query String Filtering with useSearchParams:
   Extracted category filter into the URL query string: `const [searchParams, setSearchParams] = useSearchParams()`.
   Updating the category calls `setSearchParams({ category: cat })`, allowing URLs like `/menu?category=Vegan` to be bookmarked and shared across browsers.

7. Route Guarding with RequireAuth & Return Redirect:
   Built `RequireAuth.jsx` which checks authentication state. If unauthenticated, it redirects to `/login` while preserving the intended destination:
   <Navigate to="/login" state={{ from: location }} replace />
   Upon successful login, `navigate(from, { replace: true })` returns the user directly back to `/checkout`.
```

---

# Part 2: Mini-Project · Multi-Screen Addis Eats

Splits the week 1 application across real screens: a landing page, a menu with a shareable filter, a page for every dish, a cart that survives navigation, and a checkout guarded by authentication.

### Complete Route Table:
- `/` — Landing page (`Home.jsx`) rendered as index route
- `/menu` — Menu list with shareable query parameters (`/menu?category=Vegan`)
- `/menu/:id` — Dynamic dish detail screen with `useParams`
- `/cart` — Shopping cart overview screen
- `/checkout` — Protected checkout screen guarded by `<RequireAuth>`
- `/login` — Authentication screen redirecting to destination
- `*` — Wildcard 404 catch-all screen (`NotFound.jsx`)

### Required Files to Submit:
1. `src/App.jsx`
2. `src/Layout.jsx`
3. `src/DishDetail.jsx`
4. `src/RequireAuth.jsx`

---

### ✅ Self-Check Answers

| Question | Status | Verification Details |
|---|:---:|---|
| **Does adding a dish to the cart, then visiting /cart, still show the order?** | ✅ | Yes! `CartProvider` is mounted above `BrowserRouter` in `App.jsx`, ensuring cart state is preserved across navigations. |
| **Does the header keep its state when you navigate between screens?** | ✅ | Yes! `Layout.jsx` remains continuously mounted while nested views swap inside `<Outlet />`. |
| **Does /menu?category=Vegan show the filtered menu when opened in a new tab?** | ✅ | Yes! `useSearchParams()` initializes category filter directly from the URL. |
| **Does /menu/not-a-dish say the dish was not found rather than crashing?** | ✅ | Yes! `DishDetail.jsx` checks the dish ID and safely renders a friendly "Dish Not Found" message. |
| **Does opening /checkout while signed out send you to login, then back afterwards?** | ✅ | Yes! `RequireAuth` passes `state: { from: location }`, and `Login` navigates back to `from.pathname`. |
| **Does refreshing while signed in leave you on the page rather than at the login screen?** | ✅ | Yes! `AuthContext` restores credentials from `localStorage` on mount. |

---

## 🚀 How to Run

### Mini-Project:
```bash
cd day31_addis_eats
npm install
npm run dev
```

### Exercises Hub:
Each exercise is runnable in `day31/exercises/`:
- `Exercise1_BrowserRouter.jsx`
- `Exercise2_LinkAndNavLink.jsx`
- `Exercise3_LayoutOutlet.jsx`
- `Exercise4_IndexAndCatchAll.jsx`
- `Exercise5_DynamicUseParams.jsx`
- `Exercise6_UseSearchParams.jsx`
- `Exercise7_RequireAuth.jsx`
- `ExerciseRunner.jsx`
