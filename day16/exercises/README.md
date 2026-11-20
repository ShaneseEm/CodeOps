# Prog M3-SQ10 S26 · Day 16: Exercises (Live Data in Addis Eats)

**IBT College Canada · CodeOps Full Stack Development**  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/day16/exercises](https://github.com/ShaneseEm/CodeOps/tree/main/day16/exercises)

---

## 📝 Moodle Submission Copy-Paste Text

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/day16/exercises

### Day 16 Exercises Solutions & Implementation:

1. Shared lib/fetcher.js:
   - Configured centralized fetcher: checks `res.ok`, parses JSON payload, and throws descriptive errors with status codes for non-OK HTTP responses.

2. Convert Order-Status to useSWR:
   - Replaced boilerplate `useState` and `useEffect` with `const { data: order, error, isLoading } = useSWR(`/api/orders/${id}`, fetcher)`.
   - Deleted manual lifecycle state tracking and race-condition handling.

3. Add refreshInterval for Polling:
   - Configured `{ refreshInterval: 5000 }` in SWR options.
   - Network tab confirms periodic background polling every 5.0s without re-rendering unaffected UI.

4. Server Component with fallbackData:
   - Pre-rendered order on the server and supplied it via `fallbackData: initialOrder`.
   - First paint occurs instantly with zero loading spinners, while SWR hydrates in the background.

5. Debounced Search with null Key:
   - Debounced search input by 300ms. Typing 5 characters fires 1 network request rather than 5.
   - Conditioned SWR key: `term ? `/api/dishes?search=${term}` : null`. Empty search passes `null`, completely suspending queries.

6. keepPreviousData for Zero-Flash UI:
   - Enabled `keepPreviousData: true`.
   - SWR preserves currently displayed dish results while fetching the next query, preventing jarring layout shifts and blank-state flashes.

7. Paging via Query String & DATA.md:
   - Synchronized current page to query string (`?page=2`).
   - SWR key dynamically tracks page parameter (`/api/dishes?page=${page}&limit=4`), keeping URLs linkable and shareable.
   - Documented all queries and refresh rationales in DATA.md.
```

---

## 📂 File Index

- `lib/fetcher.js`: Shared resilient fetcher utility.
- `Exercise1_Fetcher.jsx`: Error handling verification for 200 vs 404 responses.
- `Exercise2_OrderStatusSWR.jsx`: Declarative SWR migration replacing useState/useEffect.
- `Exercise3_PollingInterval.jsx`: 5-second polling interval order tracker.
- `Exercise4_ServerFallbackData.jsx`: Zero-spinner first paint using server fallbackData.
- `Exercise5_DebouncedSearch.jsx`: 300ms debounced search with conditional null key.
- `Exercise6_KeepPreviousData.jsx`: Seamless UI transitions without empty flashing.
- `Exercise7_PagedDishList.jsx`: Shareable query-string pagination and DATA.md index.
- `ExerciseRunner.jsx`: Interactive live hub testing all 7 exercises.
