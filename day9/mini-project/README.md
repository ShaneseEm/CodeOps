# Mini-Project · Resilient & Fast Addis Eats

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Day 9 Mini-Project*  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/day9/mini-project](https://github.com/ShaneseEm/CodeOps/tree/main/day9/mini-project)

---

## 🎯 Architecture & Resilience Goals

This project transforms the routed Addis Eats application into an enterprise-grade, resilient, and high-performance React application:
1. **Isolated Fault Domains (Error Boundaries):**
   - Independent `<ErrorBoundary>` wraps the Menu catalog and the Cart panel separately.
   - A catastrophic syntax, formatting, or network fault inside one dish cannot take down the shopping cart or global header navigation.
2. **On-Demand Route Code Splitting (React.lazy & Suspense):**
   - Heavy transaction screens (`Checkout` and `Receipt`) are code-split into distinct asynchronous chunks.
   - Users who only browse the menu never download payment SDKs or form validators.
3. **Data-Driven Performance Profiling (`PROFILE.md`):**
   - Recorded concrete measurements using React `<Profiler>`.
   - Identified redundant 12-card re-renders upon cart dispatches (19.12ms commit time) and optimized with `React.memo` and `useCallback` down to 1.79ms (~10.7x improvement).
4. **Accessible Dish Modal (`ui/Modal.jsx`):**
   - Rendered to `document.body` via `createPortal`.
   - 100% keyboard operable: closes on <kbd>Escape</kbd>, traps focus between modal inputs, and restores focus to the trigger button upon close.

---

## 📁 Required Submission Files

- **`ErrorBoundary.jsx`**: Reusable error boundary class component supporting render-prop fallbacks and state reset.
- **`App.jsx`**: The unified resilient application tree wiring independent boundaries, lazy routes, and modal portals.
- **`ui/Modal.jsx`**: Accessible portal modal with focus trapping, Escape dismiss, and focus restoration.
- **`PROFILE.md`**: Detailed profiling report recording baseline vs. optimized render durations with 10.7x measured speedup.

---

## ✅ "Check Yourself" Verification Answers

| Audit Question | Status | Verification Details |
|---|:---:|---|
| **Does a thrown error in one dish leave the header and cart working?** | ✅ | **Yes!** Clicking the 💥 button on any dish throws a deliberate runtime error. The Menu boundary renders a clean recovery fallback, while the Header navigation and Cart panel remain 100% interactive. |
| **Does your fallback tell the person what failed and offer them something to do?** | ✅ | **Yes!** The fallback displays the exact fault message with `role="alert"` and provides a "Recover Menu" / "Try Again" action button that clears the bad state and re-mounts the children. |
| **Open the Network tab — does the checkout chunk download only when you navigate to it?** | ✅ | **Yes!** Configured via `React.lazy(() => import("./Checkout"))`. Inspecting DevTools Network tab shows `Checkout` chunk is not fetched on initial page load; it only streams when clicking "Checkout". |
| **Does a failed chunk download show the boundary fallback rather than a blank screen?** | ✅ | **Yes!** The `<Suspense>` boundary is wrapped within an `<ErrorBoundary name="Checkout Route">`. If a dynamic chunk download fails (e.g. network offline), the boundary catches it and shows a retry button. |
| **Does PROFILE.md show a real before-and-after difference, not just a guess?** | ✅ | **Yes!** `PROFILE.md` documents exact milliseconds captured using `<Profiler>`: 19.12ms (12 redundant card re-renders) reduced to 1.79ms (0 card re-renders) — a 10.7x speedup. |
| **Can you open, use and close the modal without touching the mouse?** | ✅ | **Yes!** Focus a dish card with <kbd>Tab</kbd>, press <kbd>Enter</kbd> to open modal, <kbd>Tab</kbd> through modal buttons (focus is trapped), press <kbd>Esc</kbd> to exit, and browser focus automatically returns to the triggering card button. |
