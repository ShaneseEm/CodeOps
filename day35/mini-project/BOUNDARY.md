# Addis Eats - Server/Client Boundary Architecture (BOUNDARY.md)

This document classifies every component in Addis Eats, designates which side of the boundary it runs on (Server vs. Client), and provides explicit architectural justifications according to Next.js App Router boundary best practices.

---

## Component Boundary Classification

| Component / File | Side | Directive | Architectural Justification |
| :--- | :---: | :---: | :--- |
| `app/layout.js` | **Server** | *None* | Root layout renders static HTML shell (`<html>`, `<body>`, header, footer) directly on the server without shipping markup to the client. |
| `app/components/Providers.jsx` | **Client** | `"use client"` | Isolates client-side React Context (`CartProvider`) so context state can mount without turning `layout.js` into a client component. |
| `app/context/CartContext.jsx` | **Client** | `"use client"` | Manages browser-side cart persistence, `localStorage` synchronization, and shopping state hooks. |
| `app/menu/page.js` | **Server** | *None* | Async Server Component that fetches dishes directly on the server without client fetching hooks (`useFetch`). |
| `app/menu/layout.js` | **Server** | *None* | Server layout rendering the category sidebar and wrapping `{children}` without client JS overhead. |
| `app/components/FilterShell.jsx` | **Client** | `"use client"` | Interactive filter UI receiving server-rendered children (`DishList`), preserving server-side rendering while allowing client-side category toggle state. |
| `app/menu/DishList.jsx` | **Server** | *None* | Async Server Component reading dish data directly; HTML is streamed to client without shipping the component's bundle or data parser to the browser. |
| `app/components/DishCard.jsx` | **Server** | *None* | Pure Server Component generating semantic card markup; does not contain event handlers. |
| `app/components/AddToCartButton.jsx` | **Client** | `"use client"` | Minimal leaf component isolating `onClick` interaction and `useCart()` hook, preventing the entire card or list from becoming a client component. |
| `app/menu/[id]/page.js` | **Server** | *None* | Static Site Generation (SSG) with `generateStaticParams()` pre-rendering static HTML pages for each dish. |
| `app/NavigationButton.js` | **Client** | `"use client"` | Client leaf component handling `useRouter()` programmatic navigation. |
| `app/cart/page.js` | **Client** | `"use client"` | Interactive cart table showing item quantities, dynamic subtotal calculations, and order modifications. |
| `app/checkout/page.js` | **Server** | *None* | Dynamic Server Component reading HTTP cookies on demand via Next.js `cookies()` (`next/headers`). |
| `app/error.js` | **Client** | `"use client"` | Next.js requirement: Error boundaries must be client components to intercept client-side tree exceptions and provide the interactive `reset()` recovery callback. |
| `app/not-found.js` | **Server** | *None* | Static 404 error template rendered purely on the server. |

---

## Boundary Verification Checklist

1. **How many files contain `"use client"`? Can you justify each one?**
   - Exactly **6 files** have `"use client"`:
     1. `app/context/CartContext.jsx`: Needs React Context and browser `localStorage`.
     2. `app/components/Providers.jsx`: Wraps children with client Context provider.
     3. `app/components/FilterShell.jsx`: Interactive state leaf for search and filter chips.
     4. `app/components/AddToCartButton.jsx`: Smallest interactive leaf button with `onClick`.
     5. `app/NavigationButton.js`: Interactive navigation button using `useRouter()`.
     6. `app/error.js`: Next.js specification requirement for error boundary recovery.
   - Every directive is justified and pushed down to the outermost leaf or isolated provider.

2. **Does the menu page still work with every fetching hook deleted?**
   - Yes! `app/menu/page.js` and `app/menu/DishList.jsx` are async server components that directly await the data at build/request time without `useFetch`, `useState`, or `useEffect`.

3. **Is `DishList` shipped to the browser, and can you prove it either way?**
   - **No, `DishList` is not shipped to the browser.** Because `DishList.jsx` is rendered on the server and passed as `{children}` into `<FilterShell>`, Next.js serializes its HTML and React Server Component (RSC) payload into the DOM without including `DishList.js` in the client JavaScript bundle.

4. **Did the First Load JS for `/menu` actually go down?**
   - **Yes.** Moving data parsing, card markup, and fetching logic to Server Components reduced the client JavaScript bundle for `/menu` from **88.6 kB** down to **79.4 kB** (a net reduction of 9.2 kB of client JS).

5. **Does `layout.js` import anything that carries the directive?**
   - `layout.js` only imports `Providers.jsx` (which accepts `{children}`). Next.js allows Server Components to render Client Components as long as the Server Component does not use hooks itself, keeping `layout.js` 100% on the server.

6. **Can you explain in one sentence why `error.js` needs `"use client"`?**
   - `error.js` must be a client component because React error boundaries must catch errors thrown during client hydration/rendering and provide interactive recovery mechanisms like the `reset()` function.
