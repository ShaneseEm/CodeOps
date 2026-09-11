# 🇪🇹 Birr Watch — Live ETB Exchange Rate Tracker

**CodeOps · Full Stack Software Development**  
*Module 2 · Day 22 JavaScript Project*

---

## 📌 Project Overview

**Birr Watch** is a single-page data-driven web application that tracks live exchange rates for the Ethiopian Birr (ETB). It retrieves real-time JSON exchange rates from a public API, converts Birr amounts into foreign currencies, allows users to manage a custom watchlist with event delegation, and persists state locally via `localStorage`.

---

## ✨ Features

- **Live Exchange Rate API**: Fetches live ETB exchange rates asynchronously with `async/await` and handling for `fetch`, loading, and error states.
- **State-Driven Architecture**: Uses a single central `state` object as the source of truth, triggering UI re-renders on data mutation (`state → render → events`).
- **Currency Converter**: Validates input amount with `Number()`, calculates conversions based on live state, and formats outputs cleanly.
- **Persistent Watchlist**: Allows adding and removing currencies from a watchlist with event delegation and duplicate prevention.
- **Browser Persistence**: Saves user watchlist and preferences into `localStorage` so choices survive page reloads.

---

## 📡 API Endpoint

The app retrieves data from the free Open Exchange Rate API:
```http
GET https://open.er-api.com/v6/latest/ETB
```

### Response Shape
```json
{
  "result": "success",
  "base_code": "ETB",
  "rates": {
    "USD": 0.0177,
    "EUR": 0.0164,
    "KES": 2.29,
    "GBP": 0.0139
  }
}
```

---

## 🚀 How to Run

1. Clone or open the repository folder.
2. Open `index.html` directly in your web browser, or launch using Live Server:
   ```bash
   npx serve .
   ```
3. Enter an amount in Birr, select a currency, convert, and add favorite currencies to your watchlist!

---

## 📋 Homework Step-by-Step Checklist

- [x] **Step 1**: Scaffold `index.html` with empty containers (`status`, convert form, `result`, currency `select`, watchlist `ul`), and declare the `state` object in `app.js`.
- [x] **Step 2**: Write `render()` and populate the currency dropdown from `state.rates`.
- [x] **Step 3**: Implement `loadRates()` with `async/await fetch`, `res.ok` check, state mutation, loading indicator, and error message handling.
- [x] **Step 4**: Wire the convert form: handle `submit`, `preventDefault()`, validate input amount with `Number()`, look up rates, and output formatted results.
- [x] **Step 5**: Build watchlist functionality with duplicate protection (`includes()`), `renderWatchlist()`, and delegated click listener (`watchUl`) for removing rows via `data-c`.
- [x] **Step 6**: Implement `save()` and `load()` with `localStorage` and `JSON.stringify`/`JSON.parse` safety, wired into `init()`.

---

## 🛠 Tech Stack

- **HTML5**: Semantic layout containers
- **CSS3**: Responsive flexbox/grid layout & dark theme styling
- **JavaScript (ES6+)**: `async/await`, Fetch API, DOM Manipulation, Event Delegation, `localStorage`
