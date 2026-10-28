# Day 31 Mini-Project · Multi-Screen Addis Eats with React Router

A complete multi-screen client-side routed application for **Addis Eats**, built using React Router. Features a nested layout, shareable query-string filtering, dynamic parameter routes, persistent cart and authentication state, and protected route guarding.

Built for **IBT College Canada CodeOps · Module 3 · Frontend: React & Next.js · Day 31 (Day 6) Mini-Project**.

---

## 🗺️ Complete Route Table

| Route Path | Component / Guard | Purpose & Behavior |
|---|---|---|
| `/` | `Layout` → `Home` | Landing page (index route) with hero banner and quick navigation |
| `/menu` | `Layout` → `Menu` | Full menu with shareable category filter in query string (`/menu?category=Vegan`) |
| `/menu/:id` | `Layout` → `DishDetail` | Dynamic dish screen reading `:id` with `useParams` (handles not-found gracefully) |
| `/cart` | `Layout` → `Cart` | Shopping cart overview with itemized list and order total |
| `/checkout` | `Layout` → `<RequireAuth><Checkout /></RequireAuth>` | Protected route; prompts sign-in if unauthenticated, remembers return path |
| `/login` | `Layout` → `Login` | Authentication screen; returns user to their original destination after login |
| `*` | `Layout` → `NotFound` | Catch-all 404 route rendering user-friendly error page |

---

## 🔍 Self-Check Answers

- **Does adding a dish to the cart, then visiting /cart, still show the order?**  
  **Yes!** `CartProvider` is placed *above* `BrowserRouter` in `App.jsx`, ensuring cart state is never unmounted during route transitions.
- **Does the header keep its state when you navigate between screens?**  
  **Yes!** The header is part of `Layout.jsx`, which remains continuously mounted while nested routes render inside `<Outlet />`.
- **Does /menu?category=Vegan show the filtered menu when opened in a new tab?**  
  **Yes!** `Menu.jsx` synchronizes its active category with `useSearchParams()`. Opening `/menu?category=Vegan` in a new tab initializes the category filter directly from the URL.
- **Does /menu/not-a-dish say the dish was not found rather than crashing?**  
  **Yes!** `DishDetail.jsx` validates the `:id` parameter and renders a friendly `"Dish Not Found"` status box with a return link if no match exists.
- **Does opening /checkout while signed out send you to login, then back afterwards?**  
  **Yes!** `RequireAuth.jsx` redirects unauthenticated users to `/login` with `state: { from: location }`. Upon login, `Login.jsx` navigates back to `from.pathname`.
- **Does refreshing while signed in leave you on the page rather than at the login screen?**  
  **Yes!** `AuthContext.jsx` persists authentication state in `localStorage` and restores it on mount before `RequireAuth` completes its initial check.

---

## 📂 Project Structure

```
day31_addis_eats/
├── public/
│   ├── dishes.json       # Menu data
│   ├── favicon.svg       # Brand icon
│   └── icons.svg
├── src/
│   ├── App.jsx           # Root route table with BrowserRouter, CartProvider, AuthProvider
│   ├── Layout.jsx        # Root Layout with NavLinks, Cart badge, and <Outlet />
│   ├── Home.jsx          # Index landing screen
│   ├── Menu.jsx          # Menu screen with useSearchParams query string filtering
│   ├── DishDetail.jsx    # Dynamic screen (/menu/:id) with useParams
│   ├── Cart.jsx          # Shopping cart screen (/cart)
│   ├── Checkout.jsx      # TeleBirr checkout screen (/checkout)
│   ├── Login.jsx         # Authentication screen (/login) with state.from redirect
│   ├── RequireAuth.jsx   # Route guard protecting /checkout
│   ├── NotFound.jsx      # 404 catch-all screen
│   ├── AuthContext.jsx   # Authentication context with localStorage persistence
│   ├── CartProvider.jsx  # Cart context with derived total
│   ├── cartReducer.js    # Pure reducer for cart actions
│   ├── ThemeContext.jsx  # Dark/light theme context
│   ├── App.css           # Responsive styling & theme variables
│   └── main.jsx          # App entry point
├── package.json          # Dependencies (including react-router-dom)
└── vite.config.js
```

---

## 🛠 How to Run

```bash
cd day31_addis_eats
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.
