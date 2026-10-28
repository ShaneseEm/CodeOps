# Day 32 Mini-Project · The Cart, Moved to a Store (Zustand)

Takes the routed application from Day 31 and moves the shopping cart out of React Context and into a dedicated **Zustand store** with narrow selectors, in-store actions, and automatic `localStorage` persistence. The authentication session stays in React Context behind a guarded hook.

Built for **IBT College Canada CodeOps · Module 3 · Frontend: React & Next.js · Day 32 (Day 7) Mini-Project**.

---

## 🧠 Why Each Piece of State Lives Where It Does

### 1. Why the Cart Lives in a Zustand Store:
- **High Update Frequency & Targeted Renders**: The cart is frequently updated (adding dishes, modifying quantities, removing items). In React Context, any state change triggers re-renders across all consuming components unless cumbersome memoization layers are applied. With Zustand and **narrow selectors** (`useCartStore(s => s.items.length)`), ONLY the specific component selecting that slice (e.g. `CartBadge`) re-renders when a dish is added. The parent `Header` and `Layout` remain completely untouched.
- **Built-in Middleware (Persistence)**: Zustand provides clean, declarative persistence via the `persist` middleware. The cart automatically syncs to `localStorage` under `"addis-eats-cart"` and restores on reload without requiring manual `useEffect` synchronization.
- **No Provider Wrapper Hell**: Zustand stores exist outside the React component tree. The entire `<CartProvider>` was deleted from `App.jsx` with zero breakage.

### 2. Why the Auth Session Stays in React Context:
- **Low Update Frequency**: The authenticated user session is written once (at login) and cleared once (at logout). It rarely fluctuates during normal browsing, making React Context’s broadcast model ideal.
- **Tight Coupling to Component Lifecycle & Routing**: Authentication deeply couples with React Router navigation guards (`RequireAuth`) and location state (`state: { from: location }`). Keeping auth in Context allows React Router hooks and the auth lifecycle to remain cleanly unified.
- **Guarded Custom Hook (`useAuth`)**: Wrapped behind a strict guard that throws an actionable error if any component tries to consume auth outside of `<AuthProvider>`.

---

## 🔍 Self-Check Answers

- **Does removing the CartProvider break anything at all?**  
  **No!** `CartProvider` was deleted from `App.jsx`, and all cart operations continue to work seamlessly through `cartStore.js`.
- **Does adding a dish still re-render the header, or only the badge?**  
  **Only the badge!** `CartBadge` subscribes narrowly to `s.items.length`. When a dish is added, `CartBadge` re-renders, but `Header` and `Layout` do not.
- **Does the order survive a full page refresh?**  
  **Yes!** The Zustand `persist` middleware synchronizes state with `localStorage` (key: `"addis-eats-cart"`), restoring all items upon page reload.
- **Does every component select one value rather than the whole store?**  
  **Yes!** Every component utilizes narrow selectors (e.g. `useCartStore(s => s.addItem)` or `useCartStore(s => s.items)`). Bare `useCartStore()` calls were eliminated.
- **Does using a context hook outside its provider throw a message you can act on?**  
  **Yes!** Calling `useAuth()` or `useTheme()` outside its provider throws: `"useAuth must be used within an <AuthProvider>. Make sure <AuthProvider> is wrapped around your component tree."`
- **Can you say in one sentence why the session stayed in context?**  
  **The session changes infrequently and integrates directly with React component routing guards, making Context’s tree-based propagation the appropriate tool.**

---

## 📂 Project Structure

```
day32_addis_eats/
├── public/
│   ├── dishes.json       # Menu items
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── cartStore.js      # Zustand store with persist middleware & actions
│   ├── useAuth.js        # Guarded useAuth hook (throws error outside provider)
│   ├── AuthContext.jsx   # Auth provider managing user state
│   ├── useTheme.js       # Guarded useTheme hook
│   ├── ThemeContext.jsx  # Theme provider (dark/light)
│   ├── CartBadge.jsx     # Header badge consuming narrow selector (s => s.items.length)
│   ├── Menu.jsx          # Menu consuming addItem via narrow selector
│   ├── DishDetail.jsx    # Dynamic dish screen using narrow selector
│   ├── Cart.jsx          # Cart page reading items, total, remove, clear
│   ├── Checkout.jsx      # TeleBirr checkout consuming items and total
│   ├── Layout.jsx        # App layout (does NOT re-render on cart change)
│   ├── RequireAuth.jsx   # Route guard using useAuth()
│   ├── Home.jsx          # Landing page
│   ├── Login.jsx         # Sign-in screen
│   ├── NotFound.jsx      # 404 screen
│   ├── App.jsx           # Clean route tree (CartProvider removed!)
│   ├── App.css           # Styling
│   └── main.jsx
├── package.json          # Dependencies including zustand & react-router-dom
└── vite.config.js
```

---

## 🛠 How to Run

```bash
cd day32_addis_eats
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.
