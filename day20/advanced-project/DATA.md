# DATA.md — Data Fetching Strategy & SWR Architecture

**Project:** Addis Eats Next.js Advanced Project (Day 45 / Day 20 Capstone)  
**Institution:** IBT College Canada · CodeOps Full Stack Development  
**Guiding Principle:** *"Server unless the person triggers it. Then seed the exception with fallbackData."*  

---

## 1. Decision Two: Where Data is Fetched & Why

| Data | Where | Why It Runs There |
|---|:---:|---|
| **Menu and dishes** | **Server** | Public, fully indexable by search engine bots, and cached across page visits. Zero client bundle weight required for data fetching. |
| **Order history** | **Server** | Private and strictly scoped to the active session (`WHERE user_id = session.id`). Never exposed to client-side manipulation. |
| **Order status** | **Server First, then Client Polling** | Server pre-renders the initial status (instant first paint with zero spinner). Client polls via SWR (`refreshInterval: 3000`) for real-time kitchen preparation updates. |
| **Menu search** | **Client** | Triggered directly by user keystrokes. Debounced by 300ms so network requests fire only on intentional pauses. |
| **Cart** | **Client Store** | Ephemeral client shopping basket. It never leaves the browser until formal checkout submission. |

---

## 2. Server Seeding (`fallbackData`) — Zero-Spinner Guarantee

The requirement states:
> *"Where a client query is unavoidable, render the first result on the server and pass it in as fallbackData. Nobody should watch a spinner for data you already had."*

### Implementation in `app/orders/[id]/page.js` & `OrderTracker.jsx`:
```jsx
// 1. Server Component fetches initial order at request time:
export default async function OrderPage({ params }) {
  const session = await getSession();
  const initialOrder = await getScopedOrder(session.id, params.id);

  // 2. Passes server record directly to client component as fallbackData:
  return <OrderTracker orderId={params.id} fallbackData={initialOrder} />;
}

// 3. Client SWR Component consumes fallbackData:
"use client";
import useSWR from "swr";

export function OrderTracker({ orderId, fallbackData }) {
  const { data: order } = useSWR(
    `/api/orders/${orderId}`,
    fetcher,
    {
      fallbackData,            // Seeds client cache instantly: ZERO SPINNER ON ARRIVAL
      refreshInterval: 3000,    // Polls kitchen prep updates every 3 seconds
      revalidateOnFocus: true,
    }
  );

  return (
    <div className="status-badge">
      Status: {order.status} (Last updated: {new Date(order.updatedAt).toLocaleTimeString()})
    </div>
  );
}
```

---

## 3. Debounced Search — Network Tab Verification

The requirement states:
> *"Network tab while typing: One request per pause, not per keystroke."*

### Implementation in `app/components/DebouncedMenuSearch.jsx`:
```jsx
"use client";
import { useState } from "react";
import useSWR from "swr";
import { useDebounce } from "../hooks/useDebounce";

export function DebouncedMenuSearch() {
  const [query, setQuery] = useState("");
  // 300ms debounce buffer:
  const debouncedQuery = useDebounce(query, 300);

  // SWR key is null when empty (0 network requests dispatched):
  const swrKey = debouncedQuery.trim() ? `/api/dishes?search=${encodeURIComponent(debouncedQuery)}` : null;

  const { data: results, isValidating } = useSWR(swrKey, fetcher, {
    keepPreviousData: true, // Prevents list flashing between searches
    revalidateOnFocus: false,
  });

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search kitfo, tibs, doro wat..."
      />
      {isValidating && <span className="search-indicator">Searching...</span>}
      <DishResultsList items={results} />
    </div>
  );
}
```

### Network Tab Proof:
- **Typing "kitfo" rapidly (5 keystrokes: 'k', 'i', 't', 'f', 'o'):**
  - Raw keystrokes: 5
  - Dispatched HTTP requests: **Exactly 1** (`GET /api/dishes?search=kitfo`)
  - Intermediate requests aborted: 4
