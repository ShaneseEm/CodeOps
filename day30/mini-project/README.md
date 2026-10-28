# Week 1 Project · Addis Eats, Assembled (Day 30)

One React application that brings together everything from Days 26 to 30: components and props, state and events, an API-driven menu with loading and error states, a category filter, a cart shared across the whole screen through context, a reducer that owns every cart transition, and a custom `useFetch` hook.

Built for **IBT College Canada CodeOps · Module 3 · Frontend: React & Next.js · Day 30 Mini-Project**.

---

## 🪝 What Each Hook Contributes

1. **`useFetch` (Custom Hook)**:
   - Encapsulates asynchronous data fetching for `/dishes.json`.
   - Returns `{ data, loading, error }`.
   - Manages an `AbortController` in its cleanup function to cancel in-flight network requests whenever the URL or category changes, eliminating race conditions.

2. **`useReducer` (in `CartProvider.jsx`)**:
   - Manages complex cart transitions (`add`, `remove`, `clear`) with an external, pure `cartReducer`.
   - Ensures predictable, immutable state management that can be tested independently outside React.

3. **`useContext` (`CartContext` & `ThemeContext`)**:
   - Broadcasts cart items, dispatch methods, derived totals, and theme state globally.
   - Eliminates prop drilling: `CartBadge` and `CheckoutPanel` read directly from `useCart()` anywhere in the component hierarchy.

4. **`useMemo`**:
   - **`CartProvider` Value Memoization**: Memoizes `{ items, dispatch, total, itemCount }` based on `[state.items, total, itemCount]`. Prevents unnecessary consumer re-renders caused by new object references when un-related parent state (such as theme toggle) updates.
   - **`ThemeProvider` Value Memoization**: Keeps theme context reference stable.

5. **`useCallback`**:
   - **`handleAddDish` (in `Menu.jsx`)**: Memoizes the add-to-cart callback passed down to dish cards. Guarantees referential stability so `React.memo(Dish)`'s shallow prop comparison does not falsely invalidate on parent re-renders.

6. **`useRef`**:
   - References the menu search `<input>` element to trigger imperative `.focus()` automatically on component mount inside an effect.

7. **`useEffect`**:
   - Synchronizes `document.title` with the active count of displayed dishes: `Addis Eats (X dishes)`.
   - Runs side effects like network requests (inside `useFetch`) and DOM focus safely after render.

---

## 🔍 Self-Check Answers

- **Can the header badge read the cart without a single cart prop being passed to it?**  
  **Yes!** `CartBadge.jsx` calls `useCart()` directly via `useContext(CartContext)` without receiving any cart props from `Header` or `App`.

- **Does the reducer work correctly when called directly, outside React?**  
  **Yes!** `cartReducer` is a pure JavaScript function that takes `(state, action)` and returns a new state object. It has no React dependencies and can be invoked directly in standard JavaScript or unit tests.

- **Is the total derived on every render rather than stored in the reducer?**  
  **Yes!** `total = state.items.reduce((sum, item) => sum + item.price, 0)` is calculated live on each render inside `CartProvider.jsx`, preventing state synchronization bugs.

- **Does adding a dish update the badge, the checkout panel and the total together?**  
  **Yes!** When `dispatch({ type: "add", dish })` runs, the shared `items` array updates, causing `CartBadge`, `CheckoutPanel`, and the derived `total` to re-render in unison.

- **Is the provider value memoised — and can you explain what that prevents?**  
  **Yes!** `useMemo(() => ({ items, dispatch, total, ... }), [items, total])` prevents all context consumers from re-rendering when the provider’s parent re-renders (e.g. on theme toggles). Without `useMemo`, an inline object literal generates a new reference on every tick, forcing all consumers to re-render.

- **Does useFetch cancel its previous request when the category changes?**  
  **Yes!** `useFetch` creates an `AbortController` and calls `controller.abort()` in its cleanup return function. In DevTools Network tab, quick category switching marks earlier requests as `(canceled)`.

- **Can you justify every useMemo and useCallback you added?**  
  **Yes!** 
  - `useMemo` in `CartProvider`: Prevents consumer churn from context object identity changes.
  - `useCallback` in `Menu.jsx`: Preserves `handleAddDish` reference identity to unlock `React.memo` optimization on the `Dish` component grid.

---

## 📂 Project Structure

```
day30_addis_eats/
├── public/
│   ├── dishes.json       # Backend menu endpoint
│   ├── favicon.svg       # Brand icon
│   └── icons.svg         # SVG sprite icons
├── src/
│   ├── useFetch.js       # Custom data-fetching hook with AbortController
│   ├── cartReducer.js    # Pure reducer for cart transitions (add/remove/clear)
│   ├── CartProvider.jsx  # Cart context provider with derived total and useMemo
│   ├── CartBadge.jsx     # Header cart badge consuming CartContext
│   ├── CheckoutPanel.jsx # Cart itemized list & checkout form consuming CartContext
│   ├── ThemeContext.jsx  # Light/dark theme context
│   ├── Menu.jsx          # Category filter, search ref, and useFetch
│   ├── DishList.jsx      # Early returns for loading/error/empty and dish grid
│   ├── Dish.jsx          # React.memo optimized dish card
│   ├── CategoryBar.jsx   # Category buttons
│   ├── Card.jsx          # Card container wrapper
│   ├── Header.jsx        # App header with Theme toggle & CartBadge
│   ├── App.jsx           # Root layout wrapped in ThemeProvider & CartProvider
│   ├── App.css           # Theme variables & responsive styling
│   ├── index.css         # Reset styles
│   └── main.jsx          # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠 How to Run

```bash
cd day30_addis_eats
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.
