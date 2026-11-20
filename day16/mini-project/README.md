# Mini-Project · Live Data in Addis Eats

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Day 16 Mini-Project*  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/day16/mini-project](https://github.com/ShaneseEm/CodeOps/tree/main/day16/mini-project)

---

## 🎯 What We Built

Solves the three core client-side data problems with precision:
1. **Live Order Status Screen:** Server-rendered initial state passed into SWR via `fallbackData` (zero initial loading spinner) and then automatically polled every 5 seconds (`refreshInterval: 5000`).
2. **Debounced Menu Search:** 300ms debounce window that stops rapid keystroke request spamming, uses a `null` key for empty terms to suspend queries, and leverages `keepPreviousData: true` to prevent layout flashing.
3. **Shareable Paged Dish Catalog:** Page numbers encoded directly into the URL query string (`?page=1`, `?page=2`), fully linkable and bookmarkable, with flicker-free pagination.

---

## 📡 What the Network Tab Shows While Typing

When typing a 5-character dish name like **`"Kitfo"`** into the search input:

| Keystroke Event | Time | Input Value | Debounce Status | Network Tab Request Fired |
|---|---|---|---|---|
| Key 1: `K` | 0 ms | `"K"` | Timer started (300ms) | ❌ *None (held in buffer)* |
| Key 2: `i` | 95 ms | `"Ki"` | Timer reset (300ms) | ❌ *None (held in buffer)* |
| Key 3: `t` | 180 ms | `"Kit"` | Timer reset (300ms) | ❌ *None (held in buffer)* |
| Key 4: `f` | 270 ms | `"Kitf"` | Timer reset (300ms) | ❌ *None (held in buffer)* |
| Key 5: `o` | 360 ms | `"Kitfo"` | Timer reset (300ms) | ❌ *None (held in buffer)* |
| **Debounce Settles** | **660 ms** | `"Kitfo"` | **Timer expires (300ms idle)** | 🚀 **Exactly 1 GET Request Fired:** `GET /api/dishes?search=Kitfo` |

### Key Observations:
- **Typing five characters fires exactly ONE network request**, not five.
- When deleting all characters back to empty (`""`), the SWR key evaluates to `null`, completely halting network dispatch.
- While the `"Kitfo"` search query is in-flight, the previously displayed dish results remain visible on screen at reduced opacity rather than flashing empty (`keepPreviousData: true`).

---

## ✅ "Check Yourself" Verification Answers

| Audit Question | Status | Verification Details |
|---|:---:|---|
| **Does typing five characters fire one request or five?** | ✅ | **Exactly one!** A 300ms debounce gate delays execution until the user pauses, collapsing 5 keystrokes into a single HTTP query. |
| **Does the order page show data immediately, with no spinner?** | ✅ | **Yes!** The server component passes initial data through `fallbackData`. The browser paints the order immediately on first frame, with zero spinners or skeletons. |
| **Do two components asking for the same key produce one network call?** | ✅ | **Yes!** SWR automatically deduplicates concurrent requests sharing identical keys within a deduping interval (default 2000ms). |
| **Does the list keep previous results visible while the next load runs?** | ✅ | **Yes!** With `keepPreviousData: true`, SWR maintains the active list while fetching the new page or filter in the background. |
| **Can you justify every refreshInterval and staleTime in one sentence?** | ✅ | **Yes!** See `DATA.md` for the line-by-line justification matrix of every query key and interval across the platform. |

---

## 📁 Files Included

- `lib/fetcher.js`: Shared resilient fetcher throwing detailed HTTP error objects.
- `App.jsx`: Full interactive application demonstrating order polling, debounced search, and pagination.
- `DATA.md`: Registry of every query key, invalidation strategy, and performance justification.
- `README.md`: Architectural documentation and Network Tab audit trace.
