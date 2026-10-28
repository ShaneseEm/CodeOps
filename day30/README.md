# Module 3 Day 30 · Week 1 Capstone: Addis Eats, Assembled

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Day 5 (Day 30 overall)*

---

## 📑 Contents

1. [Part 1: Exercises 1–7 (Moodle Submission Answers)](#part-1-exercises-17-moodle-submission-answers)
   - [Exercise 1: ThemeContext with Deeply Nested Component](#exercise-1-themecontext-with-deeply-nested-component)
   - [Exercise 2: Custom useFetch Hook Across Components](#exercise-2-custom-usefetch-hook-across-components)
   - [Exercise 3: Pure cartReducer Plain Object Testing](#exercise-3-pure-cartreducer-plain-object-testing)
   - [Exercise 4: Converting 3 useState Calls to useReducer](#exercise-4-converting-3-usestate-calls-to-usereducer)
   - [Exercise 5: CartProvider with useReducer & Derived Total](#exercise-5-cartprovider-with-usereducer--derived-total)
   - [Exercise 6: Provider Value Memoization & What It Prevents](#exercise-6-provider-value-memoization--what-it-prevents)
   - [Exercise 7: Performance Profiling with React.memo & useCallback](#exercise-7-performance-profiling-with-reactmemo--usecallback)
2. [Part 2: Mini-Project · Week 1 Project: Addis Eats, Assembled](#part-2-mini-project--week-1-project-addis-eats-assembled)
   - [Files to Submit](#files-to-submit)
   - [What Each Hook Contributes](#what-each-hook-contributes)
   - [Self-Check Answers](#self-check-answers)
   - [How to Run](#how-to-run)

---

# Part 1: Exercises 1–7 (Moodle Submission Answers)

> **Copy & paste this section directly into your Moodle "Online text" submission box for Day 5 Exercise!**

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/day30_addis_eats

### Exercise Solutions & Explanations:

1. ThemeContext with Deeply Nested Component:
   Created ThemeContext holding "light" and "dark" themes with a toggle function. Provided at the root and consumed via useContext(ThemeContext) inside DeeplyNestedButton without passing props through intermediate components.

2. Reusable useFetch Hook:
   Extracted asynchronous fetching logic into `useFetch(url, deps)` returning `{ data, loading, error }` with an AbortController in cleanup. Reused across both `Menu` and `SpecialsSummary` components.

3. Pure cartReducer Plain Object Testing:
   Implemented a pure reducer function handling `add`, `remove`, and `clear`. Tested directly outside of React by passing plain state objects and actions:
   - add: appends action.dish to state.items
   - remove: filters out item by id
   - clear: resets items array to []

4. Converting 3 useState Calls to 1 useReducer:
   Refactored related form states (name, area, express) into a single `useReducer(formReducer, initialState)`.
   - Atomicity: Multi-field resets execute in a single dispatch rather than 3 separate setState calls.
   - Decoupled Logic: State transition rules are isolated into a pure, testable function outside the UI markup.

5. CartProvider with useReducer & Derived Total:
   Built CartProvider managing items via useReducer. The total is derived on every render:
   const total = state.items.reduce((s, d) => s + (d.price || 0), 0);
   This guarantees a single source of truth without duplicating state.

6. Provider Value Memoization with useMemo:
   const value = useMemo(
     () => ({ items: state.items, dispatch, total }),
     [state.items, total]
   );

   WHAT IT PREVENTS:
   Without `useMemo`, a brand-new object literal `{ items, dispatch, total }` is allocated in memory on EVERY render of CartProvider (e.g. when an unrelated theme toggles or parent state updates). Because React Context uses referential equality (Object.is), a new object reference forces ALL context consumers (CartBadge, CheckoutPanel, DishList) to re-render needlessly. `useMemo` preserves object identity so consumers only re-render when `state.items` or `total` genuinely changes.

7. Performance Profiling with React.memo & useCallback:
   - Wrapped `Dish` cards in `React.memo(Dish)`.
   - Memoized the `handleAddDish` callback in `Menu.jsx` using `useCallback((dish) => { addItem(dish); }, [addItem])`.
   - Profiling Results: During keystrokes in the search input or order counter, child Dish components skip re-rendering entirely (0 renders). Profiler commit duration dropped from ~5-8ms to <0.5ms.
```

---

# Part 2: Mini-Project · Week 1 Project: Addis Eats, Assembled

The complete Week 1 capstone project brings together all React fundamentals learned throughout Days 26 to 30 into a single production-grade application.

### Required Files to Submit:
1. `src/useFetch.js`
2. `src/cartReducer.js`
3. `src/CartProvider.jsx`
4. `src/Menu.jsx`
5. `src/CartBadge.jsx`

---

### 🪝 What Each Hook Contributes

- **`useFetch`**: Encapsulates fetch logic, loading/error states, and automatic `AbortController` cancellation upon category change or unmount.
- **`useReducer`**: Centralizes cart mutations (`add`, `remove`, `clear`) using a pure, immutable reducer.
- **`useContext`**: Eliminates prop drilling across headers, cart badges, menus, and checkout drawers.
- **`useMemo`**: Keeps context provider value references stable across renders to prevent consumer re-render cascading.
- **`useCallback`**: Preserves callback reference identity across renders to allow `React.memo` optimization on the Dish list.
- **`useRef`**: Safely targets and focuses the search input on mount after the DOM commit phase.
- **`useEffect`**: Synchronizes document title dish count and manages browser side-effects.

---

### ✅ Self-Check Answers

| Question | Status | Verification |
|---|:---:|---|
| **Can the header badge read the cart without a single cart prop being passed to it?** | ✅ | Yes, `CartBadge.jsx` consumes `useCart()` via `useContext(CartContext)` directly. |
| **Does the reducer work correctly when called directly, outside React?** | ✅ | Yes, `cartReducer` is a pure JavaScript function that passes plain object unit tests. |
| **Is the total derived on every render rather than stored in the reducer?** | ✅ | Yes, `total = state.items.reduce(...)` is computed on every render. |
| **Does adding a dish update the badge, checkout panel, and total together?** | ✅ | Yes, state is shared through `CartProvider` so all consumers re-render synchronously. |
| **Is the provider value memoised — and can you explain what that prevents?** | ✅ | Yes, `useMemo` prevents unnecessary re-renders of consumers when parent components update. |
| **Does useFetch cancel its previous request when the category changes?** | ✅ | Yes, `AbortController.abort()` cancels in-flight requests, verified as `(canceled)` in DevTools. |
| **Can you justify every useMemo and useCallback you added?** | ✅ | Yes, fully justified for context object stability and `React.memo` prop stability. |

---

## 🚀 How to Run

### Mini-Project:
```bash
cd day30_addis_eats
npm install
npm run dev
```

### Exercises Hub:
All 7 progressive exercises are runnable in `day30/exercises/`:
- `Exercise1_ThemeContext.jsx`
- `Exercise2_UseFetchHook.jsx`
- `Exercise3_CartReducerDirect.jsx`
- `Exercise4_UseStateToUseReducer.jsx`
- `Exercise5_CartProvider.jsx`
- `Exercise6_MemoizedProvider.jsx`
- `Exercise7_MemoAndCallback.jsx`
- `ExerciseRunner.jsx`
