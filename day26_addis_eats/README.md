# Addis Eats — React (Module 3 · Days 26 – 28)

A **fully interactive** React front end for the Addis Eats food-ordering app, built across
Days 26, 27 and 28 for **IBT College Canada CodeOps · Module 3 · Frontend: React & Next.js**.

## What it does

- Displays an Ethiopian restaurant menu with live category filtering, an item counter, a running order total, and a validated delivery form.

## Day-by-day features

| Day | What was added |
|-----|---------------|
| 26 | Vite setup · JSX · functional components · props · `map` with keys |
| 27 | PropTypes · `children` prop · conditional rendering · filter + empty state |
| 28 | `useState` · Add button with count · CategoryBar · running total · controlled form · TeleBirr validation |

## Day 28 — useState exercises

| # | Exercise | Where |
|---|----------|-------|
| 1 | Count state on `Dish` + "Add" button | `Dish.jsx` |
| 2 | Category state in `Menu`, chips rendered from array | `Menu.jsx` |
| 3 | `CategoryBar` receives `selected` + `onSelect` (lifted state) | `CategoryBar.jsx` |
| 4 | Dish list filtered from category state; empty state preserved | `Menu.jsx` |
| 5 | Running order total in `App`, displayed in ETB | `App.jsx` |
| 6 | Controlled delivery form — single state object, one change handler | `DeliveryForm.jsx` |
| 7 | TeleBirr validation — submit disabled until `09XXXXXXXX` format | `DeliveryForm.jsx` |

## How to run

```bash
npm install      # first time only
npm run dev      # → http://localhost:5173
```

## Project structure

```
src/
├── main.jsx          # Entry point
├── App.jsx           # Root — orderTotal state, composes everything
├── Header.jsx        # Page header
├── CategoryBar.jsx   # Filter chips (selected + onSelect props)
├── Menu.jsx          # category state · filter · empty state · map
├── Dish.jsx          # count state · Add button · spicy badge · PropTypes
├── Card.jsx          # children wrapper
├── DeliveryForm.jsx  # Controlled form · single state object · TeleBirr validation
├── data.js           # Menu array (id, name, price, category, spicy)
├── App.css           # All styles
└── index.css         # Global reset
```
