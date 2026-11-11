import { cookies } from "next/headers";
import CheckoutForm from "./CheckoutForm";

/**
 * Checkout Page - Dynamic Server Component
 * Reads cookies (forces dynamic SSR) for session verification.
 * The actual form logic runs via Server Action (placeOrder),
 * so no client-side fetch is needed.
 */
export default function CheckoutPage() {
  const cookieStore = cookies();
  const sessionUserId = cookieStore.get("session_user_id")?.value;

  return (
    <div className="checkout-wrapper">
      {!sessionUserId && (
        <div className="session-notice">
          <span>⚡ Dynamic SSR active — reading session cookies server-side.</span>
        </div>
      )}
      <CheckoutForm />
    </div>
  );
}
