# Addis Eats · Client-Side Data Architecture (`DATA.md`)

**Course:** Prog M3-SQ10 S26 · Day 16 Mini-Project  
**Topic:** SWR Query Keys, Cache Invalidation, Polling & Refresh Rules  

---

## 📊 Query Key Registry & Strategy Matrix

| Query Description | SWR Cache Key | Refresh Rule / Invalidation Strategy | One-Line Reasoning / Justification |
|---|---|---|---|
| **Live Order Lifecycle Tracker** | `['/api/orders', orderId]` | `refreshInterval: 5000`, `revalidateOnFocus: true` | Kitchen prep and courier dispatch change dynamically every 1–2 minutes, so 5-second polling provides timely status updates without overwhelming the server. |
| **Initial Order First Paint** | Server-side prop passed to SWR | `fallbackData: initialOrder` | Server pre-renders the initial order HTML at request time so users see instant order confirmation with zero loading spinner delay. |
| **Debounced Menu Search** | `term ? ['/api/dishes', { search: debouncedTerm }] : null` | Debounced by 300ms, `keepPreviousData: true`, `revalidateOnFocus: false` | Waiting for a 300ms pause prevents firing requests for intermediate keystrokes, while a `null` key halts network traffic when the search box is cleared. |
| **Paged Menu Dish Catalog** | `['/api/dishes', { page, limit: 4 }]` | `keepPreviousData: true`, `revalidateOnFocus: false`, `dedupingInterval: 60000` | Menu catalogs are largely static throughout a meal session, so keeping previous data eliminates page-switching flicker while a 60-second deduping window prevents redundant fetches. |
| **Single Dish Details Modal** | `dishId ? ['/api/dishes', dishId] : null` | `dedupingInterval: 120000` (2 minutes) | Dish recipes, allergens, and descriptions change infrequently, so aggressive 2-minute deduplication eliminates duplicate requests when reopening modals. |

---

## 🎯 Architectural Justifications

1. **Why `refreshInterval: 5000` for Order Tracking?**  
   Food preparation transitions (Order Received -> Kitchen Cooking -> Out for Delivery -> Delivered) occur over a 15–30 minute span; a 5-second polling interval captures state changes fast enough to feel real-time to the hungry user without placing excessive load on the gateway.

2. **Why `keepPreviousData: true` for Search and Pagination?**  
   Without this flag, SWR resets `data` to `undefined` during query key transitions, which flashes an empty list or loading spinner; keeping stale data visible provides smooth, native-app-like transitions.

3. **Why `null` key for empty search?**  
   SWR automatically pauses execution when given a falsy key, ensuring zero unnecessary HTTP requests are dispatched when the customer hasn't typed a search term.
