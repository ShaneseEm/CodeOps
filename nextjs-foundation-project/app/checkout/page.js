import { cookies } from "next/headers";
import CheckoutForm from "./CheckoutForm";

export const metadata = {
  title: "Secure Checkout & Payment",
  description:
    "Finalize your Addis Eats order with instant Telebirr or CBE Birr payment. Fast, reliable, and secure contactless food delivery to any sub-city in Addis Ababa.",
  robots: {
    index: false,
    follow: false,
  },
};

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
      <h1 className="checkout-heading">Complete Your Addis Eats Order</h1>
      {!sessionUserId && (
        <div className="session-notice">
          <span>🔒 Guest checkout active — encrypted server-side processing.</span>
        </div>
      )}
      <CheckoutForm />
    </div>
  );
}
