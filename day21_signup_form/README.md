# Day 21 Mini-Project — Validated, Persistent Signup Form

**Module 2 · Frontend: HTML, CSS & JavaScript · Day 21**
IBT College Canada · CodeOps · Full Stack Software Development

---

## What the Form Does

This app is a one-page signup form that:

- Accepts a **Full Name** and an **Ethiopian phone number**
- **Validates** both fields with clear, specific error messages:
  - Name must be at least 2 characters
  - Phone must match `/^(?:\+251|0)9\d{8}$/` (e.g. `0912345678` or `+251912345678`)
- Shows errors using **`.textContent`** only — never `innerHTML` — to prevent XSS
- **Saves** valid entries to `localStorage` as JSON (`JSON.stringify`)
- **Restores** all entries on every page reload (`JSON.parse`) with `try/catch` guards for `null` and corrupt data
- Displays a **live counter** and a list of all registered users

---

## Skills Demonstrated

| Skill | Where |
|---|---|
| `localStorage.setItem / getItem` | `app.js` — `saveUsers()` / `loadUsers()` |
| `JSON.stringify / JSON.parse` | `app.js` — serialize/restore user array |
| `e.preventDefault()` | `app.js` — form submit handler |
| Trimmed input values | `app.js` — `name.trim()`, `phone.trim()` |
| Ethiopian phone regex | `app.js` — `PHONE_REGEX` constant |
| `.textContent` error reporting | `app.js` — `showError()` |
| `null` + corrupt data guard | `app.js` — `try/catch` in `loadUsers()` |

---

## How to Open It

1. Clone or download this repository
2. Open `module-2/day21_signup_form/index.html` in any modern browser

> No build step or server required — it runs entirely in the browser.

---

## Files

```
day21_signup_form/
├── index.html   — Markup: form, error area, registered-users list
├── styles.css   — Dark glassmorphic responsive design
├── app.js       — All logic: validation, storage, DOM rendering
└── README.md    — This file
```

---

## Checklist

- ✅ Form rejects empty or too-short name with a clear message
- ✅ Phone regex accepts both `09…` and `+251…`, rejects bad numbers
- ✅ Valid entries saved to `localStorage` as JSON
- ✅ Entries survive a full page reload
- ✅ User text rendered with `.textContent` (never `innerHTML`)
- ✅ `null` and corrupt storage handled with `try/catch` fallback
