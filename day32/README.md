# Module 3 Day 32 · Moving State to a Zustand Store

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Day 7 (Day 32 overall)*

---

## 📑 Contents

1. [Part 1: Exercises 1–7 (Moodle Submission Answers)](#part-1-exercises-17-moodle-submission-answers)
   - [Exercise 1: Guarded Hook with Actionable Error](#exercise-1-guarded-hook-with-actionable-error)
   - [Exercise 2: Splitting Auth and Theme Providers](#exercise-2-splitting-auth-and-theme-providers)
   - [Exercise 3: React DevTools Render Recording](#exercise-3-react-devtools-render-recording)
   - [Exercise 4: Zustand Cart Store with Actions](#exercise-4-zustand-cart-store-with-actions)
   - [Exercise 5: Replacing useCart with Narrow Selectors](#exercise-5-replacing-usecart-with-narrow-selectors)
   - [Exercise 6: Persist Middleware & Refresh Surviving](#exercise-6-persist-middleware--refresh-surviving)
   - [Exercise 7: Redux Toolkit Slice Comparison](#exercise-7-redux-toolkit-slice-comparison)
2. [Part 2: Mini-Project · The Cart, Moved to a Store](#part-2-mini-project--the-cart-moved-to-a-store)
   - [Why the Cart is in a Store and the Session is Not](#why-the-cart-is-in-a-store-and-the-session-is-not)
   - [Files to Submit](#files-to-submit)
   - [Self-Check Answers](#self-check-answers)
   - [How to Run](#how-to-run)

---

# Part 1: Exercises 1–7 (Moodle Submission Answers)

> **Copy & paste this section directly into your Moodle "Online text" submission box for Day 7 Exercise!**

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/day32_addis_eats

### Exercise Solutions & Explanations:

1. Guarded Context Hook:
   Wrapped CartContext in a custom `useCart` hook that performs a guard check. If context is null, it throws an actionable error message instructing the developer to ensure `<CartProvider>` is wrapped around the tree.

2. Split Auth and Theme Providers:
   Separated theme state and user auth session into independent `<ThemeProvider>` and `<AuthProvider>` components with dedicated `useTheme()` and `useAuth()` guarded hooks, preventing unrelated theme toggles from propagating through authentication consumers.

3. React DevTools "Highlight Updates" Observation:
   - In Day 30 React Context: Adding a dish to the cart caused the entire Header, Navigation, and all consuming subtrees to flash green (re-render) because the context value object identity changed.
   - In Day 32 Zustand with Narrow Selectors: Adding a dish only re-renders the CartBadge pill (`s => s.items.length`). The parent Header and Layout do NOT re-render (zero green flash), confirming targeted renders.

4. Zustand Cart Store:
   Created `cartStore.js` using Zustand `create()`. Configured state containing `items: []`, `addItem: (dish) => set(...)`, `remove: (id) => set(...)`, and `clear: () => set(...)`.

5. Narrow Selectors Adoption:
   Replaced generic `useCart()` calls across the entire application with narrow slice subscriptions:
   - CartBadge: `useCartStore(s => s.items.length)`
   - Menu: `useCartStore(s => s.addItem)` (stable reference that never causes re-renders)
   - Cart & Checkout: `useCartStore(s => s.items)` and `useCartStore(s => s.remove)`
   Eliminated bare `useCartStore()` calls.

6. Persist Middleware:
   Wrapped the Zustand store with `persist` middleware configured with `{ name: "addis-eats-cart" }`. Validated that cart items persist in browser `localStorage` and successfully restore across full page reloads.

7. Redux Toolkit Slice Comparison:
   Drafted a comparable `cartSlice.js` using `@reduxjs/toolkit` with `createSlice`.
   - Boilerplate: Zustand requires ~15 lines in a single file without providers. Redux Toolkit requires slice definitions, store configuration, a top-level `<Provider>`, and typed dispatch hooks.
   - Selectors: Zustand has selector support built-in (`useCartStore(s => s.prop)`), while Redux requires `useSelector` and optional memoized selectors (`createSelector`).
   - Verdict: Zustand provides identical performance optimization and narrow subscriptions with a fraction of the setup overhead.
```

---

# Part 2: Mini-Project · The Cart, Moved to a Store

### 🧠 Why the Cart is in a Store and the Session is Not:

- **The Cart in Zustand**: The cart updates frequently during browsing (adding items, incrementing counts, removing items). Context triggers top-down re-renders across all consumers unless cumbersome boilerplate is added. Zustand’s **narrow selectors** allow targeted components (like `CartBadge`) to re-render without affecting parent headers or screens. Additionally, the built-in `persist` middleware effortlessly saves orders to `localStorage`.
- **The Session in Context**: The authentication session is written once on login and cleared on logout. Because it rarely changes, Context's tree-wide broadcast model is appropriate. Furthermore, auth state is tightly bound to the React component lifecycle and React Router’s `<RequireAuth>` guard.
- **One-Sentence Summary**: *The cart belongs in a Zustand store for high-frequency updates, narrow selector performance, and seamless persistence, while the user session stays in Context because it changes infrequently and couples directly to React Router's component navigation lifecycle.*

---

### Required Files to Submit:
1. `src/cartStore.js`
2. `src/useAuth.js`
3. Updated screens (`Menu.jsx`, `DishDetail.jsx`, `Cart.jsx`, `Checkout.jsx`, `Layout.jsx`)

---

### ✅ Self-Check Answers

| Question | Status | Verification Details |
|---|:---:|---|
| **Does removing the CartProvider break anything at all?** | ✅ | No! `CartProvider` was deleted from `App.jsx`, and all cart operations continue to work seamlessly through `cartStore.js`. |
| **Does adding a dish still re-render the header, or only the badge?** | ✅ | Only the badge! `CartBadge` subscribes narrowly to `s.items.length`. When a dish is added, `CartBadge` re-renders, but `Header` and `Layout` do not. |
| **Does the order survive a full page refresh?** | ✅ | Yes! The Zustand `persist` middleware synchronizes state with `localStorage` (key: `"addis-eats-cart"`), restoring all items upon page reload. |
| **Does every component select one value rather than the whole store?** | ✅ | Yes! Every component utilizes narrow selectors (e.g. `useCartStore(s => s.addItem)` or `useCartStore(s => s.items)`). Bare `useCartStore()` calls were eliminated. |
| **Does using a context hook outside its provider throw a message you can act on?** | ✅ | Yes! Calling `useAuth()` or `useTheme()` outside its provider throws: `"useAuth must be used within an <AuthProvider>. Make sure <AuthProvider> is wrapped around your component tree."` |
| **Can you say in one sentence why the session stayed in context?** | ✅ | The session changes infrequently and integrates directly with React component routing guards, making Context’s tree-based propagation the appropriate tool. |

---

## 🚀 How to Run

### Mini-Project:
```bash
cd day32_addis_eats
npm install
npm run dev
```

### Exercises Hub:
Each exercise is runnable in `day32/exercises/`:
- `Exercise1_GuardedCartHook.jsx`
- `Exercise2_SplitProviders.jsx`
- `Exercise3_DevToolsRenderRecording.jsx`
- `Exercise4_ZustandCartStore.jsx`
- `Exercise5_NarrowSelectors.jsx`
- `Exercise6_PersistMiddleware.jsx`
- `Exercise7_ReduxToolkitSlice.jsx`
- `ExerciseRunner.jsx`
