# Mini-Project · The Menu That Loads Itself (Day 29)

Interactive React front-end for **Addis Eats** that dynamically fetches its own data from an endpoint with `useEffect`, loading & error states, request cancellation, search focus, and title updates.

Built for **IBT College Canada CodeOps · Module 3 · Frontend: React & Next.js · Day 29 Mini-Project**.

---

## 🚀 What Now Comes From the Server

1. **Server-Driven Dishes (`public/dishes.json` & `src/api.js`)**:
   - The hard-coded dishes array was removed from the component tree.
   - Dishes now live in `public/dishes.json` and are asynchronously loaded through the `fetchDishes(category, signal)` API function in `src/api.js`.
2. **Category-Driven Refetching (`[category]` dependency)**:
   - Selecting a category chip (`All`, `Main`, `Vegan`, `Grill`) sets the `category` state, triggering `useEffect` to fetch fresh data for that category.
3. **In-Flight Cancellation (`AbortController`)**:
   - Each effect creates an `AbortController`.
   - Switching categories quickly cancels in-flight requests in cleanup (`controller.abort()`), preventing race conditions and stale data from overriding the view.
   - Request cancellation is verified in the browser DevTools Network tab.
4. **Early Returns for UI States (`src/DishList.jsx`)**:
   - **Loading State**: Displays an animated spinner and `"Loading the menu..."` before dishes resolve.
   - **Error State**: Displays a clear user-facing error message (`!res.ok` check) if the endpoint returns a 404 or fails.
   - **Empty State**: Displays a friendly note (`"No dishes found matching your selection."`) rather than an error if no dishes match.
5. **Autofocused Search on Mount (`useRef`)**:
   - An `<input>` ref is created with `useRef(null)`.
   - On component mount, `useEffect` executes `searchInputRef.current?.focus()`.
   - *Why the focus call must be inside an effect*: During render, the virtual DOM is calculated and the actual browser DOM node has not yet been mounted or attached to the document. `useRef.current` is null until after render. `useEffect` runs asynchronously after mount and paint, guaranteeing the DOM node is ready for imperative operations like `.focus()`.
6. **Dynamic Page Title**:
   - `document.title` updates dynamically to reflect the current count of displayed dishes: `Addis Eats (X dishes)`.

---

## 📂 Project Structure

```
day29_addis_eats/
├── public/
│   ├── dishes.json       # Menu items served as JSON endpoint
│   ├── favicon.svg       # Brand favicon
│   └── icons.svg         # SVG sprite icons
├── src/
│   ├── api.js            # fetchDishes() with AbortSignal support & res.ok check
│   ├── Menu.jsx          # Category & dishes state, useEffect fetch & abort, search ref
│   ├── DishList.jsx      # Early returns for loading, error, empty, and populated grid
│   ├── Dish.jsx          # Dish card with count badge and "+ Add" button
│   ├── CategoryBar.jsx   # Stateless category chip buttons
│   ├── Card.jsx          # Reusable wrapper
│   ├── OrderForm.jsx     # Controlled form with live TeleBirr validation
│   ├── Header.jsx        # Header banner
│   ├── App.jsx           # Order total state + main layout
│   ├── App.css           # Responsive styling & spinner animations
│   ├── index.css         # Global stylesheet
│   └── main.jsx          # Application entry point
├── index.html            # HTML entry point
├── package.json          # Dependencies & npm scripts
├── vite.config.js        # Vite configuration
└── README.md
```

---

## 🔍 Self-Check Verification Checklist

- [x] **Does the menu show a loading message before the dishes appear?**  
  Yes! The loading state and spinner render via early return in `DishList.jsx` while the request is in-flight.
- [x] **If you rename `dishes.json`, do you get a clear error message instead of a blank screen?**  
  Yes! `api.js` verifies `!res.ok` (404 Not Found) and surfaces a clear message: `"Could not load the menu (404 Not Found). Please check that /dishes.json exists."`
- [x] **Does switching category trigger a new request in the Network tab?**  
  Yes! `category` is in the `useEffect` dependency array, triggering requests to `/dishes.json?category=<category>`.
- [x] **Is the previous request shown as cancelled when you switch quickly?**  
  Yes! `controller.abort()` in the cleanup function cancels previous pending requests, visible as `(canceled)` in DevTools.
- [x] **Does the empty category show a friendly note rather than an error?**  
  Yes! When no dishes match, the friendly fallback `"No dishes found matching your selection."` appears.
- [x] **Does the search field have focus as soon as the page loads?**  
  Yes! `searchInputRef.current?.focus()` in an empty-dependency `useEffect` focuses the search bar instantly on mount.

---

## 🛠 How to Run

```bash
cd day29_addis_eats
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.
