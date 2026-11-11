# Prog M3-SQ10 S26 · Day 9: Exercises (Resilient & Fast Addis Eats)

**IBT College Canada · CodeOps Full Stack Development**  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/day9/exercises](https://github.com/ShaneseEm/CodeOps/tree/main/day9/exercises)

---

## 📝 Moodle Submission Copy-Paste Text

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/day9/exercises

### Day 9 Exercises Solutions & Implementation:

1. ErrorBoundary Class taking a Fallback Prop:
   - Built an ErrorBoundary class component implementing `static getDerivedStateFromError(error)` and `componentDidCatch(error, errorInfo)`.
   - Supports a flexible fallback prop (rendered node or render-prop function with `{ error, reset }`), and wrapped `<Menu />` inside it.

2. Deliberate Dish Throw with Isolated Failure:
   - Threw a runtime error inside a single dish card component: `if (dish.crashed) throw new Error("Price calculation failed")`.
   - Verified that the ErrorBoundary caught the crash at the Menu subtree level, leaving the Header navigation and Cart panel 100% responsive and operable.

3. Dual Independent Boundaries (Menu & Cart):
   - Added a separate `<ErrorBoundary fallback={<CartFallback />}>` wrapping the `<CartPanel />`.
   - Confirmed independent failure boundaries: a crash in the Menu does not take down the Cart, and a crash in the Cart does not take down the Menu.

4. Lazy-load Checkout & Receipt behind Suspense Skeleton:
   - Configured route-level code splitting:
     `const Checkout = lazy(() => import("./Checkout"));`
     `const Receipt = lazy(() => import("./Receipt"));`
   - Wrapped routes with `<Suspense fallback={<RouteSkeleton />}>`, deferring the download of checkout code chunks until the user actually navigates to checkout.

5. Profiler Session & Slowest Component Identification:
   - Wrapped dish list with `<Profiler id="DishListSection" onRender={onRenderCallback}>`.
   - Recorded metrics during 3 cart-addition actions. Noted that unmemoized `DishCard` re-rendered on every cart addition, taking ~18.42ms of commit duration.

6. Fix Unnecessary Re-render with React.memo & Benchmark:
   - Memoized `DishCard` with `React.memo` and stabilized `onAdd` with `useCallback`.
   - Re-profiled identical actions: render duration dropped from 18.42ms down to 1.85ms (~10x improvement), with 0 redundant dish card re-renders.

7. Dish Modal with createPortal, Esc Key, & Focus Return:
   - Rendered modal dialog directly into `document.body` via `createPortal`.
   - Added `keydown` listener to close on <kbd>Escape</kbd> and trap focus between modal elements.
   - Restored focus to the triggering "View Details" button upon unmounting using saved `triggerRef.current.focus()`.
```

---

## 📂 File Index

- `Exercise1_ErrorBoundary.jsx`: Reusable ErrorBoundary class with reset and fallback props.
- `Exercise2_DeliberateDishThrow.jsx`: Demonstrates isolated subtree crash without header/cart disruption.
- `Exercise3_DualErrorBoundaries.jsx`: Independent failure containment for Menu and Cart.
- `Exercise4_LazySuspenseRoutes.jsx`: Code-split routes with accessible loading skeleton fallback.
- `Exercise5_ProfilerSlowComponent.jsx`: Profiler instrumentation capturing render durations.
- `Exercise6_ReRenderFixComparison.jsx`: React.memo + useCallback optimization with before/after benchmarks.
- `Exercise7_PortalDishModal.jsx`: Accessible modal with createPortal, focus trapping, and Esc exit.
- `ExerciseRunner.jsx`: Interactive hub to test all 7 exercises live.
