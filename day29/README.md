# Module 3 Day 29 · React Effects, Data Fetching & Refs

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Day 4 (Day 29 overall)*

---

## 📑 Contents

1. [Part 1: Exercises 1–7 (Moodle Submission Answers)](#part-1-exercises-17-moodle-submission-answers)
   - [Exercise 1: Dynamic `document.title`](#exercise-1-dynamic-documenttitle)
   - [Exercise 2: Moving Menu to `public/dishes.json` & Mount Fetch](#exercise-2-moving-menu-to-publicdishesjson--mount-fetch)
   - [Exercise 3: Loading & Error States with Early Returns](#exercise-3-loading--error-states-with-early-returns)
   - [Exercise 4: `res.ok` Check & Informative 404 Error](#exercise-4-resok-check--informative-404-error)
   - [Exercise 5: Category Dependency Array Refetch](#exercise-5-category-dependency-array-refetch)
   - [Exercise 6: Request Cancellation with `AbortController`](#exercise-6-request-cancellation-with-abortcontroller)
   - [Exercise 7: Search Input Focus with `useRef` & Why Effect is Required](#exercise-7-search-input-focus-with-useref--why-effect-is-required)
2. [Part 2: Mini-Project · The Menu That Loads Itself](#part-2-mini-project--the-menu-that-loads-itself)
   - [Files to Submit](#files-to-submit)
   - [Self-Check Answers](#self-check-answers)
   - [How to Run](#how-to-run)
3. [Recommended Commit History](#recommended-commit-history)

---

# Part 1: Exercises 1–7 (Moodle Submission Answers)

> **Copy & paste this section directly into your Moodle "Online text" submission box for Day 4 Exercise!**

```markdown
GitHub Repository: https://github.com/ShaneseEm/IBT/tree/main/day29_addis_eats

### Exercise Solutions & Explanations:

1. Dynamic document.title:
   Synced document.title with the count of currently displayed dishes inside useEffect:
   useEffect(() => {
     document.title = `Addis Eats (${dishes.length} dishes)`;
   }, [dishes.length]);

2. Moving Menu to public/dishes.json:
   Relocated hardcoded array to public/dishes.json and fetched asynchronously on mount:
   useEffect(() => {
     async function loadMenu() {
       const res = await fetch("/dishes.json");
       setDishes(await res.json());
     }
     loadMenu();
   }, []);

3. Loading & Error States with Early Returns:
   Added loading (true) and error (null) states, returning loading/error markup before the list:
   if (loading) return <p className="loading-state">Loading the menu...</p>;
   if (error)   return <p className="err">{error}</p>;
   return dishes.map(d => <Dish key={d.id} {...d} />);

4. res.ok Check & User-Friendly 404 Handling:
   Checked res.ok immediately after fetch to catch HTTP error codes (e.g., 404, 500) before parsing:
   if (!res.ok) {
     throw new Error(`Could not load the menu (${res.status} ${res.statusText || "Not Found"})`);
   }

5. Category Dependency Array:
   Added [category] to the dependency array of useEffect. Changing category re-runs the effect, fetching data filtered for that specific category.

6. Request Cancellation with AbortController:
   Instantiated `const controller = new AbortController()` in the effect, passed `controller.signal` to `fetch()`, and invoked `controller.abort()` in the cleanup return function. In the catch block, `err.name === 'AbortError'` is safely ignored. In the Network tab, rapid category toggles show previous requests as `(canceled)`.

7. Focus Search Input on Mount with useRef:
   const searchInputRef = useRef(null);
   useEffect(() => {
     searchInputRef.current?.focus();
   }, []);

   WHY THE FOCUS CALL HAS TO BE INSIDE AN EFFECT:
   - During React's render phase (when the component function executes and returns JSX), React is merely computing the virtual DOM representation.
   - The actual physical DOM node (<input>) has NOT yet been mounted or attached to the browser document.
   - At render time, `searchInputRef.current` is still `null`. Calling `.focus()` during render throws `TypeError: Cannot read properties of null (reading 'focus')` or fails silently.
   - Furthermore, imperatively focusing an input is a side effect that modifies browser state, which violates React's render purity contract.
   - `useEffect` with an empty dependency array `[]` runs asynchronously *after* the initial commit phase and paint, when the DOM elements have been safely created, mounted, and attached to `ref.current`.
```

---

# Part 2: Mini-Project · The Menu That Loads Itself

The interactive Addis Eats application from Day 28 was converted into a dynamic, server-driven application where:
- No hard-coded dishes array remains in the component tree.
- Dishes load from `/dishes.json` through `src/api.js`.
- Category switching drives new requests.
- Rapid switching cancels in-flight requests using `AbortController`.
- All loading, error, and empty states are cleanly handled with early returns.
- The search input receives focus on mount via `useRef`.
- Page title updates dynamically with the number of dishes currently shown.

### Files to Submit:
1. `src/Menu.jsx`
2. `src/api.js`
3. `src/DishList.jsx`
4. `public/dishes.json`

### Self-Check Answers:

| Check | Expected Behavior | Verification in Project |
|---|---|---|
| **Does the menu show a loading message before the dishes appear?** | Yes | `loading` is initially `true`, displaying the spinner and `"Loading the menu..."` early return before dishes resolve. |
| **If you rename dishes.json, do you get a clear error message instead of a blank screen?** | Yes | `api.js` verifies `!res.ok` (404) and throws `"Could not load the menu (404 Not Found)"`, which is caught and displayed. |
| **Does switching category trigger a new request in the Network tab?** | Yes | Category is in the dependency array; switching triggers `fetch('/dishes.json?category=<cat>')`. |
| **Is the previous request shown as cancelled when you switch quickly?** | Yes | `controller.abort()` in cleanup cancels pending requests, visible as `(canceled)` in DevTools. |
| **Does the empty category show a friendly note rather than an error?** | Yes | If no dishes match, `"No dishes found matching your selection."` displays. |
| **Does the search field have focus as soon as the page loads?** | Yes | `searchInputRef.current?.focus()` in mount `useEffect` focuses the search bar automatically. |

---

## 🚀 How to Run

### Mini-Project:
```bash
cd day29_addis_eats
npm install
npm run dev
```

### Exercises Hub:
Each exercise is located in `day29/exercises/`:
- `Exercise1_DocumentTitle.jsx`
- `Exercise2_FetchMenu.jsx`
- `Exercise3_LoadingErrorState.jsx`
- `Exercise4_ResOkCheck.jsx`
- `Exercise5_CategoryDependency.jsx`
- `Exercise6_AbortController.jsx`
- `Exercise7_UseRefFocus.jsx`
- `ExerciseRunner.jsx`

---

## 📦 Recommended Commit History

Work was committed progressively as specified in the reading sheet:
1. `git commit -m "Day 29 Ex 1: Update document.title to number of dishes currently shown"`
2. `git commit -m "Day 29 Ex 2: Move menu array to public/dishes.json and fetch in useEffect on mount"`
3. `git commit -m "Day 29 Ex 3: Add loading and error state with early returns before list"`
4. `git commit -m "Day 29 Ex 4: Check res.ok and throw clear error message for 404"`
5. `git commit -m "Day 29 Ex 5: Add category to dependency array to refetch on category change"`
6. `git commit -m "Day 29 Ex 6: Abort previous request in cleanup with AbortController"`
7. `git commit -m "Day 29 Ex 7: Focus search input on mount with useRef and document rationale"`
8. `git commit -m "Day 29 Mini-Project: The Menu That Loads Itself with server-driven dishes, api.js, and cancellation"`
