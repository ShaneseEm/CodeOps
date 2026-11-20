/**
 * Exercise 4: Render the order in a server component
 * and pass it in as fallbackData.
 *
 * Architecture:
 * 1. Server Component (app/orders/[id]/page.js):
 *    - Reads initial order server-side directly from DB/store.
 *    - Renders HTML instantly without client spinners.
 *    - Passes initial data to client tracker: <OrderTracker initialOrder={order} />
 *
 * 2. Client Component (OrderTracker.jsx):
 *    - const { data: order } = useSWR(`/api/orders/${id}`, fetcher, {
 *        fallbackData: initialOrder,
 *        refreshInterval: 5000,
 *      });
 *    - Zero loading skeleton/spinner on initial paint!
 */
export default function Exercise4_ServerFallbackData() {
  // Simulated server-rendered initial payload
  const serverRenderedOrder = {
    id: "AE-9204",
    customer: "Bethelhem Alemayehu",
    status: "Kitchen Preparing",
    total: 600,
    items: ["Kitfo Special", "Mango Spris"],
    renderedOnServerAt: new Date().toLocaleTimeString(),
  };

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 4: Server Rendering with SWR fallbackData</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Initial order HTML is painted immediately by the server. SWR takes over on hydration with <code>fallbackData</code> without showing any loading spinner.
      </p>

      <div style={{ background: "#f0fdf4", border: "2px solid #16a34a", borderRadius: "8px", padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h4 style={{ margin: 0, color: "#14532d" }}>Order #{serverRenderedOrder.id}</h4>
          <span style={{ fontSize: "0.75rem", background: "#dcfce7", color: "#15803d", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 700 }}>
            Instant First Paint (0ms delay)
          </span>
        </div>

        <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "#166534" }}>
          Server Prerender Timestamp: <strong>{serverRenderedOrder.renderedOnServerAt}</strong>
        </p>
        <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "#166534" }}>
          Status: <strong>{serverRenderedOrder.status}</strong> | Total: <strong>{serverRenderedOrder.total} ETB</strong>
        </p>

        <div style={{ marginTop: "0.75rem", padding: "0.5rem", background: "#ffffff", borderRadius: "4px", fontSize: "0.78rem", border: "1px dashed #86efac" }}>
          <code>
            {`useSWR('/api/orders/AE-9204', fetcher, {\n  fallbackData: serverRenderedOrder,\n  refreshInterval: 5000\n});`}
          </code>
        </div>
      </div>
    </div>
  );
}
