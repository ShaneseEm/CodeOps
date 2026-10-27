# Addis Eats — React (Module 3 · Days 26 & 27)

A **static** React front end for the Addis Eats food-ordering app, built across
Days 26 and 27 for **IBT College Canada CodeOps · Module 3 · Frontend: React & Next.js**.

## What it does

- Displays an Ethiopian restaurant menu using **React components** and **JSX**.
- **Day 26** — Vite setup, JSX, functional components, props, `map` with keys.
- **Day 27** — PropTypes, `children` prop, conditional rendering, category filtering, empty state.

## Key patterns (Day 27)

| Pattern | Where |
|---|---|
| PropTypes validation | `Dish.jsx`, `Menu.jsx`, `Card.jsx` |
| Default prop (`currency = "ETB"`) | `Dish.jsx` |
| Conditional badge (`spicy === true &&`) | `Dish.jsx` |
| `children` wrapper | `Card.jsx` |
| `filter` → empty-state early return → `map` | `Menu.jsx` |
| Stable `key={dish.id}` (not index) | `Menu.jsx` |

## Tech stack

| Tool | Purpose |
|------|---------|
| React 19 | UI library |
| Vite | Build tool & dev server |
| prop-types | Runtime prop validation |
| CSS (no framework) | Custom Ethiopian-themed styles |

## How to run

```bash
npm install      # first time only
npm run dev      # → http://localhost:5173
```

## Project structure

```
src/
├── main.jsx      # Entry point
├── App.jsx       # Root — composes Header, category nav, Menu
├── Header.jsx    # Page header
├── Menu.jsx      # Filters by category, empty state, renders list
├── Dish.jsx      # Reusable card with PropTypes + spicy badge
├── Card.jsx      # children wrapper component
├── data.js       # Menu array (id, name, price, category, spicy)
├── App.css       # All styles
└── index.css     # Global reset
```

## Day 27 checklist

- [x] `Dish` has PropTypes — `name` and `price` required, `spicy` optional
- [x] Spicy badge uses `spicy === true &&` — no stray `0` can render
- [x] `currency` defaults to `"ETB"` via destructuring default
- [x] `Card` renders any `children` passed to it
- [x] `Menu` filters by `category`, shows empty state when none match
- [x] List keyed by stable `dish.id`, not the array index
- [x] Console free of PropTypes warnings
