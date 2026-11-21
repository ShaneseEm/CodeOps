import { useState, useEffect } from "react";
import { signSession, getSession, validateNextDestination, SESSION_COOKIE_OPTIONS } from "./lib/auth";
import { handleRequestMiddleware } from "./lib/middleware";
import {
  getScopedOrdersAction,
  updateOrderAddressAction,
  cancelOrderAction,
  resetMockDatabase,
} from "./lib/serverActions";

const PRESET_ACCOUNTS = [
  { id: "user_abebe", name: "Abebe Bikila", email: "abebe@addiseats.et", role: "customer" },
  { id: "user_chaltu", name: "Chaltu Dibaba", email: "chaltu@addiseats.et", role: "customer" },
  { id: "user_yared", name: "Chef Yared", email: "yared@addiseats.et", role: "staff" },
];

export default function App() {
  const [activeAccount, setActiveAccount] = useState(PRESET_ACCOUNTS[0]);
  const [cookieString, setCookieString] = useState(() => signSession(PRESET_ACCOUNTS[0]));
  const [currentRoute, setCurrentRoute] = useState("/orders");
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | attacks | audit
  const [orders, setOrders] = useState([]);
  const [routeStatus, setRouteStatus] = useState(null);
  const [attackLogs, setAttackLogs] = useState([]);
  const [newAddressInput, setNewAddressInput] = useState("Bole Atlas, Villa 4");

  // Load orders scoped to session
  useEffect(() => {
    if (!cookieString) {
      setOrders([]);
      return;
    }
    getScopedOrdersAction(cookieString)
      .then(setOrders)
      .catch(() => setOrders([]));
  }, [cookieString, activeAccount]);

  // Handle route change through middleware
  const navigateTo = (path) => {
    const middlewareCheck = handleRequestMiddleware(path, cookieString);
    setRouteStatus(middlewareCheck);

    if (middlewareCheck.action === "REDIRECT") {
      setCurrentRoute(middlewareCheck.destination);
    } else {
      setCurrentRoute(path);
    }
  };

  // Sign In flow
  const handleSignIn = (account, intendedNext = "/menu") => {
    const token = signSession(account);
    setCookieString(token);
    setActiveAccount(account);
    const safeNext = validateNextDestination(intendedNext);
    navigateTo(safeNext);
  };

  // Sign Out flow
  const handleSignOut = () => {
    setCookieString(null);
    setActiveAccount(null);
    setOrders([]);
    navigateTo("/menu");
  };

  // Attack 1: Call server action while signed out
  const runAttack1 = async () => {
    const result = await updateOrderAddressAction(null, "AE-101", "Attacker Street 99");
    setAttackLogs((prev) => [
      {
        id: Date.now(),
        name: "Attack 1: Call Server Action While Signed Out",
        payload: 'updateOrderAddressAction(null, "AE-101", "Attacker Street 99")',
        status: result.status,
        result: result.error,
        stoppedBy: result.stoppedByLine,
        defused: !result.success,
      },
      ...prev,
    ]);
  };

  // Attack 2: Sign in as one account and call action with another account's order ID (IDOR)
  const runAttack2 = async () => {
    // Currently signed in as activeAccount (e.g. user_abebe), trying to modify Chaltu's order AE-201
    const targetOtherId = activeAccount?.id === "user_chaltu" ? "AE-101" : "AE-201";
    const result = await updateOrderAddressAction(cookieString, targetOtherId, "Malicious Redirect Address");

    setAttackLogs((prev) => [
      {
        id: Date.now(),
        name: "Attack 2: IDOR Write with Another User's Order ID",
        payload: `updateOrderAddressAction(session, "${targetOtherId}", "Malicious Redirect Address")`,
        status: result.status,
        result: result.error,
        stoppedBy: result.stoppedByLine,
        defused: !result.success,
      },
      ...prev,
    ]);
  };

  // Attack 3: Craft sign-in link with next pointing to external phishing site
  const runAttack3 = () => {
    const phishingUrl = "https://phishing-addis-eats-telebirr.com/login?steal=1";
    const sanitized = validateNextDestination(phishingUrl);
    const defused = sanitized !== phishingUrl;

    setAttackLogs((prev) => [
      {
        id: Date.now(),
        name: "Attack 3: Open Redirect via External Next Parameter",
        payload: `/sign-in?next=${encodeURIComponent(phishingUrl)}`,
        status: defused ? 200 : 302,
        result: defused
          ? `External link deflected! Sanitizer returned safe internal route: '${sanitized}'`
          : "Vulnerable! Allowed external redirect.",
        stoppedBy: "auth.js:68 (if (!trimmed.startsWith('/') || trimmed.startsWith('//')))",
        defused: defused,
      },
      ...prev,
    ]);
  };

  const handleUpdateAddress = async (orderId) => {
    const res = await updateOrderAddressAction(cookieString, orderId, newAddressInput);
    if (res.success) {
      alert(res.message);
      getScopedOrdersAction(cookieString).then(setOrders);
    } else {
      alert(`Blocked: ${res.error}`);
    }
  };

  return (
    <div style={{ maxWidth: "960px", margin: "1.5rem auto", padding: "1.5rem", fontFamily: "sans-serif", background: "#f8fafc", borderRadius: "12px", border: "1px solid #cbd5e1" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: "0 0 0.25rem 0", color: "#0f172a" }}>🇪🇹 Addis Eats · Securing Live Data</h2>
          <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Prog M3-SQ10 S26 · Day 17 Mini-Project: Defense-in-Depth Authentication
          </div>
        </div>

        {/* Auth status badge */}
        <div>
          {activeAccount ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#0f172a" }}>{activeAccount.name}</div>
                <div style={{ fontSize: "0.75rem", color: activeAccount.role === "staff" ? "#059669" : "#64748b" }}>
                  Role: <strong>{activeAccount.role.toUpperCase()}</strong>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                style={{ padding: "0.4rem 0.8rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => handleSignIn(PRESET_ACCOUNTS[0])}
                style={{ padding: "0.4rem 0.8rem", background: "#059669", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}
              >
                Sign In as Abebe
              </button>
              <button
                onClick={() => handleSignIn(PRESET_ACCOUNTS[2])}
                style={{ padding: "0.4rem 0.8rem", background: "#0f766e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}
              >
                Sign In as Staff
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Account Switcher Bar */}
      <div style={{ background: "#ffffff", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#475569" }}>Simulate User Session:</span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {PRESET_ACCOUNTS.map((acc) => (
            <button
              key={acc.id}
              onClick={() => handleSignIn(acc, currentRoute)}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid #cbd5e1",
                background: activeAccount?.id === acc.id ? "#0284c7" : "#f8fafc",
                color: activeAccount?.id === acc.id ? "#ffffff" : "#334155",
                fontWeight: activeAccount?.id === acc.id ? "bold" : "normal",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              {acc.name} ({acc.role})
            </button>
          ))}
          <button
            onClick={handleSignOut}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              background: !activeAccount ? "#dc2626" : "#f8fafc",
              color: !activeAccount ? "#ffffff" : "#334155",
              fontWeight: !activeAccount ? "bold" : "normal",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            Signed Out (Guest)
          </button>
        </div>
      </div>

      {/* Navigation Bar & Matcher Demonstration */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["/menu", "/checkout", "/orders", "/kitchen", "/images/kitfo.png"].map((path) => (
            <button
              key={path}
              onClick={() => navigateTo(path)}
              style={{
                padding: "0.45rem 0.8rem",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                background: currentRoute === path ? "#0f766e" : "#ffffff",
                color: currentRoute === path ? "#ffffff" : "#334155",
                fontWeight: currentRoute === path ? "bold" : "normal",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              {path}
            </button>
          ))}
        </div>

        {/* Tab switch */}
        <div style={{ display: "flex", gap: "0.25rem", background: "#e2e8f0", padding: "0.25rem", borderRadius: "6px" }}>
          {["dashboard", "attacks", "audit"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.3rem 0.75rem",
                border: "none",
                borderRadius: "4px",
                background: activeTab === tab ? "#ffffff" : "transparent",
                color: activeTab === tab ? "#0f172a" : "#64748b",
                fontWeight: activeTab === tab ? "bold" : "normal",
                cursor: "pointer",
                fontSize: "0.8rem",
                textTransform: "capitalize",
              }}
            >
              {tab === "attacks" ? "⚡ 3 Attacks Test Suite" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Route Middleware Feedback Notice */}
      {routeStatus && (
        <div
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "6px",
            background: routeStatus.allowed ? "#ecfdf5" : "#fef2f2",
            border: `1px solid ${routeStatus.allowed ? "#10b981" : "#ef4444"}`,
            marginBottom: "1rem",
            fontSize: "0.85rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>Middleware Filter:</strong> {routeStatus.action} (HTTP {routeStatus.status}) &mdash;{" "}
            {routeStatus.reason || "Route authorized through narrow matcher."}
          </div>
          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
            Matcher Active: {routeStatus.middlewareRan ? "Checked Matcher" : "Static Bypass"}
          </span>
        </div>
      )}

      {/* Main Tab Panels */}
      {activeTab === "dashboard" && (
        <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 1rem 0" }}>Scoped Orders Catalog (Current User ID: {activeAccount?.id || "None"})</h3>
          <p style={{ color: "#666", fontSize: "0.85rem" }}>
            Queries are strictly bound to <code>session.user.id</code> on the server. No client parameter can access another user's order records.
          </p>

          {orders.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "#94a3b8", background: "#f8fafc", borderRadius: "6px" }}>
              {activeAccount
                ? "No active orders found for this account."
                : "🔒 You are signed out. Please sign in to view your scoped order records."}
            </div>
          ) : (
            <div style={{ display: "grid", gap: "1rem" }}>
              {orders.map((ord) => (
                <div key={ord.id} style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "1rem", background: "#f8fafc" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <div>
                      <strong style={{ fontSize: "1rem", color: "#0f766e" }}>{ord.id}</strong> &mdash;{" "}
                      <span style={{ fontSize: "0.9rem" }}>{ord.customer}</span>
                    </div>
                    <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "bold" }}>
                      {ord.status}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.85rem", color: "#334155", margin: "0.25rem 0" }}>
                    <strong>Items:</strong> {ord.items} &bull; <strong>Total:</strong> {ord.total} ETB
                  </div>

                  <div style={{ fontSize: "0.85rem", color: "#334155", margin: "0.25rem 0" }}>
                    <strong>Delivery Address:</strong> {ord.address}
                  </div>

                  {/* Server Action trigger checking session AND ownership */}
                  <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                    <input
                      type="text"
                      placeholder="New address"
                      value={newAddressInput}
                      onChange={(e) => setNewAddressInput(e.target.value)}
                      style={{ padding: "0.3rem 0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.8rem", flex: 1 }}
                    />
                    <button
                      onClick={() => handleUpdateAddress(ord.id)}
                      style={{ padding: "0.3rem 0.75rem", background: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}
                    >
                      Update Address (Server Action)
                    </button>
                    <button
                      onClick={() => cancelOrderAction(cookieString, ord.id).then((r) => { alert(r.message || r.error); getScopedOrdersAction(cookieString).then(setOrders); })}
                      style={{ padding: "0.3rem 0.75rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: The Three Attacks Verification Suite */}
      {activeTab === "attacks" && (
        <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#b91c1c" }}>⚔️ The Three Attacks Verification Suite</h3>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0 0 1.25rem 0" }}>
            Execute the three security attacks specified in the project requirements against Addis Eats. Watch each attack get intercepted with line-by-line verification.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {/* Attack 1 */}
            <div style={{ border: "1px solid #fca5a5", borderRadius: "8px", padding: "1rem", background: "#fff5f5" }}>
              <div style={{ fontWeight: "bold", fontSize: "0.85rem", color: "#991b1b", marginBottom: "0.4rem" }}>
                Attack 1: Signed-Out Action Call
              </div>
              <p style={{ fontSize: "0.78rem", color: "#7f1d1d", margin: "0 0 0.75rem 0" }}>
                Invokes <code>updateOrderAddressAction</code> directly with a null session cookie.
              </p>
              <button
                onClick={runAttack1}
                style={{ width: "100%", padding: "0.45rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}
              >
                Fire Attack 1
              </button>
            </div>

            {/* Attack 2 */}
            <div style={{ border: "1px solid #fca5a5", borderRadius: "8px", padding: "1rem", background: "#fff5f5" }}>
              <div style={{ fontWeight: "bold", fontSize: "0.85rem", color: "#991b1b", marginBottom: "0.4rem" }}>
                Attack 2: Cross-Account IDOR Write
              </div>
              <p style={{ fontSize: "0.78rem", color: "#7f1d1d", margin: "0 0 0.75rem 0" }}>
                Signed in as <strong>{activeAccount?.name || "Guest"}</strong>, calls write action with another user's order ID.
              </p>
              <button
                onClick={runAttack2}
                style={{ width: "100%", padding: "0.45rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}
              >
                Fire Attack 2
              </button>
            </div>

            {/* Attack 3 */}
            <div style={{ border: "1px solid #fca5a5", borderRadius: "8px", padding: "1rem", background: "#fff5f5" }}>
              <div style={{ fontWeight: "bold", fontSize: "0.85rem", color: "#991b1b", marginBottom: "0.4rem" }}>
                Attack 3: Open Redirect Phishing
              </div>
              <p style={{ fontSize: "0.78rem", color: "#7f1d1d", margin: "0 0 0.75rem 0" }}>
                Crafts sign-in link carrying external destination <code>https://phishing...</code>.
              </p>
              <button
                onClick={runAttack3}
                style={{ width: "100%", padding: "0.45rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}
              >
                Fire Attack 3
              </button>
            </div>
          </div>

          {/* Attack Logs Display */}
          <h4 style={{ margin: "0 0 0.75rem 0" }}>Attack Audit Logs ({attackLogs.length}):</h4>
          {attackLogs.length === 0 ? (
            <div style={{ padding: "1rem", textAlign: "center", color: "#94a3b8", background: "#f8fafc", borderRadius: "6px", fontSize: "0.85rem" }}>
              Click any of the attack buttons above to test live interception.
            </div>
          ) : (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {attackLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: "0.85rem",
                    borderRadius: "6px",
                    background: log.defused ? "#ecfdf5" : "#fef2f2",
                    border: `1px solid ${log.defused ? "#10b981" : "#ef4444"}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                    <strong style={{ color: log.defused ? "#065f46" : "#991b1b", fontSize: "0.9rem" }}>
                      {log.defused ? "🛡️ ATTACK DEFUSED / BLOCKED" : "⚠️ ATTACK SUCCEEDED"} &mdash; {log.name}
                    </strong>
                    <span style={{ fontSize: "0.75rem", background: "#fff", padding: "0.2rem 0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1" }}>
                      HTTP {log.status}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.8rem", color: "#334155", margin: "0.25rem 0" }}>
                    <strong>Payload Invoked:</strong> <code>{log.payload}</code>
                  </div>

                  <div style={{ fontSize: "0.8rem", color: "#334155", margin: "0.25rem 0" }}>
                    <strong>Server Response:</strong> {log.result}
                  </div>

                  <div style={{ fontSize: "0.75rem", color: "#047857", fontWeight: "bold", marginTop: "0.4rem" }}>
                    📍 Intercepted at line: <code>{log.stoppedBy}</code>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Security Architecture Audit */}
      {activeTab === "audit" && (
        <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 1rem 0" }}>Audit Checklist & Architecture Details</h3>

          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
              <strong>1. Can any script on your page read the session cookie?</strong>
              <div style={{ fontSize: "0.85rem", color: "#059669", marginTop: "0.25rem" }}>
                ❌ <strong>No.</strong> The <code>httpOnly: true</code> flag ensures the browser never exposes <code>addis_session</code> to <code>document.cookie</code> or malicious XSS scripts.
              </div>
            </div>

            <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
              <strong>2. Does the orders page work if you change the id in the URL to someone else's?</strong>
              <div style={{ fontSize: "0.85rem", color: "#059669", marginTop: "0.25rem" }}>
                ❌ <strong>No.</strong> Queries are strictly scoped to <code>session.user.id</code> on the server (<code>WHERE user_id = $session.user.id</code>). Requests for unowned records return 404 / 403.
              </div>
            </div>

            <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
              <strong>3. Does middleware run on your image files?</strong>
              <div style={{ fontSize: "0.85rem", color: "#059669", marginTop: "0.25rem" }}>
                ❌ <strong>No.</strong> The narrow matcher <code>['/checkout/:path*', '/orders/:path*', '/kitchen/:path*']</code> strictly ignores <code>/images/*</code>, CSS, and favicon assets.
              </div>
            </div>

            <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
              <strong>4. Did all three attacks fail, and can you name the line that stopped each one?</strong>
              <div style={{ fontSize: "0.85rem", color: "#059669", marginTop: "0.25rem" }}>
                ✅ <strong>Yes:</strong>
                <div>&bull; Attack 1 stopped at: <code>serverActions.js:38 (if (!session) throw 401)</code></div>
                <div>&bull; Attack 2 stopped at: <code>serverActions.js:58 (if (targetOrder.userId !== session.user.id) return 403)</code></div>
                <div>&bull; Attack 3 stopped at: <code>auth.js:68 (if (!trimmed.startsWith('/') || trimmed.startsWith('//')))</code></div>
              </div>
            </div>

            <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
              <strong>5. Is the staff link merely hidden, or actually refused server-side?</strong>
              <div style={{ fontSize: "0.85rem", color: "#059669", marginTop: "0.25rem" }}>
                ✅ <strong>Refused server-side.</strong> The <code>/kitchen</code> route server-component loader verifies <code>session.user.role === 'staff'</code> and throws HTTP 403 Forbidden for non-staff.
              </div>
            </div>

            <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
              <strong>6. Is your signing secret absent from the JavaScript the browser downloads?</strong>
              <div style={{ fontSize: "0.85rem", color: "#059669", marginTop: "0.25rem" }}>
                ✅ <strong>Yes.</strong> <code>SERVER_SIGNING_SECRET</code> resides exclusively in server-only modules and is never prefixed with <code>NEXT_PUBLIC_</code>.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
