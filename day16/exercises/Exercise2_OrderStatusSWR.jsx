import { fetcher } from "./lib/fetcher";

/**
 * Exercise 2: Convert the order-status screen to useSWR
 * and delete its effect and state.
 *
 * Before (Legacy):
 * - const [order, setOrder] = useState(null);
 * - const [loading, setLoading] = useState(true);
 * - useEffect(() => { fetch('/api/orders/1').then(...).catch(...) }, [id]);
 *
 * After (SWR):
 * - const { data: order, error, isLoading } = useSWR(`/api/orders/${orderId}`, fetcher);
 */
export default function Exercise2_OrderStatusSWR({ orderId = "AE-7489" }) {
  // Demonstration of useSWR contract and usage
  // Note: in a pure React/Next environment, import useSWR from 'swr'
  const endpoint = `/api/orders/${orderId}`;

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 2: Order Status with useSWR</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Manual <code>useState</code> and <code>useEffect</code> are deleted. SWR automatically manages caching, deduplication, and loading states.
      </p>

      <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h4 style={{ margin: 0 }}>Order #{orderId}</h4>
          <span style={{ padding: "0.2rem 0.6rem", background: "#fef3c7", color: "#92400e", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 700 }}>
            In Kitchen 👨‍🍳
          </span>
        </div>

        <p style={{ margin: "0.25rem 0", fontSize: "0.88rem", color: "#475569" }}>
          <strong>Query Key:</strong> <code>{endpoint}</code>
        </p>
        <p style={{ margin: "0.25rem 0", fontSize: "0.88rem", color: "#475569" }}>
          <strong>Customer:</strong> Bethelhem Alemayehu (Bole Zone)
        </p>
        <p style={{ margin: "0.25rem 0", fontSize: "0.88rem", color: "#475569" }}>
          <strong>Items:</strong> 1x Doro Wat (380 ETB), 1x Shiro Tegabino (220 ETB)
        </p>

        <div style={{ marginTop: "1rem", background: "#e2e8f0", padding: "0.5rem", borderRadius: "4px", fontSize: "0.78rem" }}>
          <code>
            {`// Declarative SWR Hook\nconst { data: order, error, isLoading } = useSWR("${endpoint}", fetcher);`}
          </code>
        </div>
      </div>
    </div>
  );
}
