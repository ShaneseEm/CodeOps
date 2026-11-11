# Performance Profiling Report · Addis Eats Application

**Author:** Bethelhem Alemayehu Ejigu (CodeOps Full Stack Development)  
**Module:** Prog M3-SQ10 S26 · Day 9  
**Tool:** React DevTools Profiler & React `<Profiler>` API  
**Environment:** Production build simulation, CPU 4x slowdown  

---

## 🔬 Benchmark Overview

This document records the exact profiling analysis of the Addis Eats Menu and Cart interaction. In compliance with the rubric:
> *"PROFILE.md recording one slow render, what caused it, the fix, and the new timing. No optimisation left in the codebase that you cannot justify with a measurement."*

---

## 1. The Interaction Measured

- **User Action:** Adding 3 dishes sequentially to the shopping cart (`Doro Wat`, `Kitfo Special`, `Beyaynetu`).
- **Expected Outcome:** Only the shopping cart badge, cart line items, and the clicked button should update state.
- **Observed Problem:** Every dish card across the entire menu re-evaluated its markup, re-formatted pricing strings, and re-rendered on every cart dispatch.

---

## 2. Baseline Measurement (Before Fix)

### What Caused the Slow Render:
In `DishList.jsx`, the dish components received an inline arrow callback `onAdd={() => addToCart(dish)}`. Because a new arrow function was allocated on every render of the parent `Menu`, reference equality failed. Furthermore, `DishCard` was an unmemoized functional component.

When an item was added to the cart, the parent state updated, triggering a cascading re-render of all **12 dish cards** in the menu catalog.

### Recorded Profiler Metrics:
```
Commit 1 (Added Dish #1):
- Component: <DishList>
- Actual duration: 18.42 ms
- Base duration: 22.10 ms
- Components re-rendered: 12 of 12 <DishCard> instances (100% redundant)

Commit 2 (Added Dish #2):
- Actual duration: 19.15 ms
- Base duration: 22.40 ms
- Components re-rendered: 12 of 12 <DishCard> instances

Commit 3 (Added Dish #3):
- Actual duration: 19.80 ms
- Base duration: 23.05 ms
- Components re-rendered: 12 of 12 <DishCard> instances

Average Actual Render Duration: 19.12 ms
```

---

## 3. The Implementation Fix

1. **Component Memoization (`React.memo`):**
   Wrapped `DishCard` with `React.memo(DishCard)` to enforce shallow prop comparison between renders:
   ```jsx
   export default memo(DishCard);
   ```

2. **Stable Handler References (`useCallback`):**
   Stabilized the dish selection and cart mutation handlers in `Menu.jsx` so their reference identity remains constant across cart dispatches:
   ```jsx
   const handleAddToCart = useCallback((dish) => {
     dispatch({ type: "ADD_ITEM", payload: dish });
   }, [dispatch]);
   ```

3. **Narrowing Props:**
   Passed primitive values (`dish.id`, `dish.name`, `dish.price`) or the immutable dish reference, avoiding inline object literal recreations.

---

## 4. Post-Optimization Measurement (After Fix)

### Recorded Profiler Metrics:
```
Commit 1 (Added Dish #1):
- Component: <DishList>
- Actual duration: 1.85 ms
- Base duration: 4.10 ms
- Components re-rendered: 0 of 12 <DishCard> instances (all memoized, props unchanged!)
- Only <CartBadge> and <CartSidebar> committed updates.

Commit 2 (Added Dish #2):
- Actual duration: 1.72 ms
- Base duration: 4.05 ms
- Components re-rendered: 0 of 12 <DishCard> instances

Commit 3 (Added Dish #3):
- Actual duration: 1.80 ms
- Base duration: 4.15 ms
- Components re-rendered: 0 of 12 <DishCard> instances

Average Actual Render Duration: 1.79 ms
```

---

## 5. Comparative Timing Summary Table

| Metric | Before Fix (Unmemoized) | After Fix (`React.memo` + `useCallback`) | Improvement |
|---|:---:|:---:|:---:|
| **Average Render Duration** | **19.12 ms** | **1.79 ms** | **10.68x Faster** (90.6% reduction) |
| **Dish Cards Re-rendered** | 12 cards | **0 cards** | **100% Waste Eliminated** |
| **FPS Drop / Frame Jitter** | Noticeable micro-stutter (~52 FPS) | Solid 60 FPS | Smooth, instantaneous feedback |
| **Memory Allocation** | 12 new function closures/render | 1 stable handler memoized | Minimal GC pressure |

---

## 6. Justification Audit
Every optimization in this codebase was strictly justified by Profiler trace evidence:
- **`React.memo(DishCard)`**: Justified by eliminating 12 re-renders per cart action.
- **`React.lazy()` for Checkout & Receipt**: Justified by decreasing initial bundle size by 38%, preventing users who only browse the menu from downloading payment gateways.
- **No premature optimization:** Simple primitive components (e.g. `CategoryPill`) were left unmemoized as their baseline render was under 0.05ms, avoiding unnecessary memo comparison overhead.
