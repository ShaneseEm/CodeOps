import { cookies } from "next/headers";
import Link from "next/link";

/**
 * Exercise 6: Add a cookies() read to the checkout and watch its marker change in the build output.
 *
 * STRATEGY: Dynamic Server-Side Rendering (SSR).
 *
 * EXACT LINE THAT FORCES DYNAMIC RENDERING:
 * const cookieStore = cookies();
 * Calling `cookies()` inspects incoming HTTP request headers at runtime, meaning
 * this page CANNOT be statically generated at build time. Next.js marks this route
 * as Dynamic (λ) in the `npm run build` output.
 */
export default function CheckoutPage() {
  // THE EXACT READ THAT FORCES DYNAMIC RENDERING:
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session_id")?.value || "guest-session-42";

  return (
    <div className="checkout-container">
      <h2>🔒 Secure Checkout (Dynamic SSR Route)</h2>

      <div className="dynamic-notice">
        <p><strong>⚡ Route Strategy: Dynamic (λ)</strong></p>
        <p>
          Forced dynamic by: <code>cookies()</code> read.
        </p>
        <p>Active Session Token: <code>{sessionId}</code></p>
      </div>

      <div className="checkout-card">
        <h3>Order Confirmation</h3>
        <p>Enter your TeleBirr payment number:</p>
        <div style={{ margin: "1rem 0" }}>
          <input
            type="tel"
            defaultValue="0911223344"
            className="form-input"
            style={{ width: "100%", maxWidth: "340px" }}
          />
        </div>
        <button type="button" className="btn-primary">
          Confirm TeleBirr Payment
        </button>
      </div>

      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/menu">← Back to Menu</Link>
      </p>
    </div>
  );
}
