import { useState } from "react";
import { signSession, getSession } from "./lib/auth";

/**
 * Exercise 7: Add a staff role and a /kitchen route, checked server-side rather than in the markup.
 */

// Simulated Server Component loader function for /kitchen
async function loadKitchenRouteServerSide(cookieString) {
  // 1. Authenticate session server-side
  const session = getSession(cookieString);

  if (!session) {
    return {
      status: 401,
      allowed: false,
      error: "401 Unauthorized: Session cookie missing or invalid.",
    };
  }

  // 2. Authorize role server-side (NOT just conditionally rendering links in HTML)
  if (session.user.role !== "staff") {
    return {
      status: 403,
      allowed: false,
      error: `403 Forbidden: User '${session.user.name}' has role '${session.user.role}'. Access to /kitchen requires 'staff' privileges.`,
    };
  }

  // 3. Authorized server payload
  return {
    status: 200,
    allowed: true,
    data: {
      kitchenQueue: [
        { ticket: "K-401", order: "Doro Wat (x2)", status: "Simmering", station: "Stew Prep" },
        { ticket: "K-402", order: "Kitfo Special", status: "Niter Kibbeh Warming", station: "Meat Grill" },
        { ticket: "K-403", order: "Beyaynetu", status: "Plating on Injera", station: "Vegan Line" },
      ],
    },
  };
}

export default function Exercise7_ServerSideKitchenStaff() {
  const [activeRole, setActiveRole] = useState("customer");
  const [cookieString, setCookieString] = useState(null);
  const [serverInspection, setServerInspection] = useState(null);
  const [loading, setLoading] = useState(false);

  const switchAccount = (role) => {
    setActiveRole(role);
    const user = {
      id: role === "staff" ? "staff_chef_yared" : "customer_abebe",
      name: role === "staff" ? "Chef Yared" : "Abebe Bikila",
      email: role === "staff" ? "yared@addiseats.et" : "abebe@addiseats.et",
      role: role,
    };
    const signed = signSession(user);
    setCookieString(signed);
    setServerInspection(null);
  };

  const attemptAccessKitchen = async () => {
    setLoading(true);
    const result = await loadKitchenRouteServerSide(cookieString);
    setServerInspection(result);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 7: Server-Side RBAC Guard (/kitchen)</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Role-based access control (RBAC) enforced inside server component loader rather than relying on hiding navigation links.
      </p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button
          onClick={() => switchAccount("customer")}
          style={{
            flex: 1,
            padding: "0.5rem",
            background: activeRole === "customer" ? "#3b82f6" : "#f1f5f9",
            color: activeRole === "customer" ? "#fff" : "#1e293b",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Customer (Abebe Bikila)
        </button>
        <button
          onClick={() => switchAccount("staff")}
          style={{
            flex: 1,
            padding: "0.5rem",
            background: activeRole === "staff" ? "#059669" : "#f1f5f9",
            color: activeRole === "staff" ? "#fff" : "#1e293b",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Kitchen Staff (Chef Yared)
        </button>
        <button
          onClick={() => {
            setCookieString(null);
            setActiveRole("guest");
            setServerInspection(null);
          }}
          style={{
            padding: "0.5rem",
            background: activeRole === "guest" ? "#dc2626" : "#f1f5f9",
            color: activeRole === "guest" ? "#fff" : "#1e293b",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Signed Out
        </button>
      </div>

      <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong>Current Role:</strong>{" "}
            <span style={{ textTransform: "uppercase", color: activeRole === "staff" ? "#059669" : "#d97706", fontWeight: "bold" }}>
              {activeRole}
            </span>
          </div>
          <button
            onClick={attemptAccessKitchen}
            style={{ padding: "0.45rem 1rem", background: "#0f766e", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            {loading ? "Checking Server..." : "Navigate to /kitchen"}
          </button>
        </div>
      </div>

      {serverInspection && (
        <div
          style={{
            padding: "0.85rem",
            borderRadius: "6px",
            background: serverInspection.allowed ? "#ecfdf5" : "#fef2f2",
            border: `1px solid ${serverInspection.allowed ? "#10b981" : "#ef4444"}`,
          }}
        >
          <strong style={{ color: serverInspection.allowed ? "#065f46" : "#991b1b" }}>
            HTTP {serverInspection.status}: {serverInspection.allowed ? "ACCESS GRANTED (Staff Role)" : "ACCESS REFUSED"}
          </strong>

          {serverInspection.error && (
            <p style={{ margin: "0.4rem 0 0 0", fontSize: "0.85rem", color: "#b91c1c" }}>{serverInspection.error}</p>
          )}

          {serverInspection.data && (
            <div style={{ marginTop: "0.5rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#065f46" }}>Live Kitchen Ticket Display:</div>
              <ul style={{ margin: "0.3rem 0 0 1rem", padding: 0, fontSize: "0.8rem" }}>
                {serverInspection.data.kitchenQueue.map((item) => (
                  <li key={item.ticket}>
                    <strong>{item.ticket}:</strong> {item.order} &mdash; <em>{item.status} ({item.station})</em>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
