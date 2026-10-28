"use client";

import React, { useActionState, useEffect } from "react";
import { placeOrder } from "../actions/orderActions";
import { useCart } from "../context/CartContext";

const initialState = {
  success: false,
  message: "",
  fieldErrors: {},
  order: null,
};

/**
 * CheckoutForm Client Component
 * useActionState drives the pending flag and replaces the old fetch() call.
 * placeOrder is a Server Action — no client-side fetch needed.
 */
export default function CheckoutForm() {
  const { cart, clearCart, totalPrice } = useCart();
  const [state, formAction, isPending] = useActionState(placeOrder, initialState);

  useEffect(() => {
    if (state.success) {
      clearCart();
    }
  }, [state.success]);

  if (cart.length === 0 && !state.success) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty!</h2>
        <p>Add some dishes from our <a href="/menu">menu</a> before checking out.</p>
      </div>
    );
  }

  if (state.success) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✅</div>
        <h2>Order Confirmed!</h2>
        <p>{state.message}</p>
        {state.order && (
          <div className="order-summary-box">
            <p><strong>Order ID:</strong> #{state.order.id}</p>
            <p><strong>Total:</strong> ${state.order.totalPrice?.toFixed(2)}</p>
            <p><strong>Status:</strong> {state.order.status}</p>
          </div>
        )}
        <a href="/menu" className="back-to-menu-btn">Continue Browsing</a>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Complete Your Order</h1>

      <div className="cart-preview">
        <h3>Order Summary ({cart.length} items)</h3>
        {cart.map((item) => (
          <div key={item.id} className="cart-row">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="cart-total-row">
          <strong>Total</strong>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>
      </div>

      {state.message && !state.success && (
        <div className="form-error-banner">{state.message}</div>
      )}

      <form action={formAction} className="checkout-form">
        {/* Hidden: pass cart items to the server action */}
        <input type="hidden" name="items" value={JSON.stringify(cart)} />

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" placeholder="Tigist Haile" />
          {state.fieldErrors?.name && (
            <span className="field-error">{state.fieldErrors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="+251912345678" />
          {state.fieldErrors?.phone && (
            <span className="field-error">{state.fieldErrors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            name="address"
            placeholder="Bole Sub-City, Near Atlas Hotel, Addis Ababa"
            rows={3}
          />
          {state.fieldErrors?.address && (
            <span className="field-error">{state.fieldErrors.address}</span>
          )}
        </div>

        <button
          type="submit"
          className="place-order-btn"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
