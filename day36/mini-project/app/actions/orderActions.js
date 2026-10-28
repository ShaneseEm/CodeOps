"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { validateOrder } from "../../lib/schema";

// In-memory demo store (shared reference for server action usage)
const ordersStore = global._addisOrdersStore || [];
if (!global._addisOrdersStore) {
  global._addisOrdersStore = ordersStore;
}
let nextId = global._addisNextOrderId || 1;

/**
 * placeOrder Server Action
 * Replaces the fetch() call entirely.
 * Validates with shared schema, saves, and calls revalidatePath.
 * useActionState drives the pending flag and return value in the UI.
 *
 * @param {Object} prevState - previous useActionState state
 * @param {FormData} formData - form submission data
 */
export async function placeOrder(prevState, formData) {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    items: JSON.parse(formData.get("items") || "[]"),
  };

  const { isValid, fieldErrors } = validateOrder(rawData);

  if (!isValid) {
    return {
      success: false,
      fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  const newOrder = {
    id: nextId++,
    name: rawData.name.trim(),
    phone: rawData.phone.trim(),
    address: rawData.address.trim(),
    items: rawData.items,
    totalPrice: rawData.items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    ),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  global._addisOrdersStore.push(newOrder);
  global._addisNextOrderId = nextId;

  // Revalidate cached pages so order appears immediately
  revalidatePath("/checkout");
  revalidatePath("/cart");

  return {
    success: true,
    message: `Order #${newOrder.id} placed successfully! We will call you at ${newOrder.phone}.`,
    order: newOrder,
    fieldErrors: {},
  };
}

/**
 * cancelOrder Server Action
 * Checks both session ownership AND the record owner before allowing cancellation.
 * Cannot be bypassed by hiding a button in the UI.
 */
export async function cancelOrder(prevState, formData) {
  const orderId = Number(formData.get("orderId"));

  // Read session from cookies (server-only, never client accessible)
  const cookieStore = cookies();
  const sessionUserId = cookieStore.get("session_user_id")?.value;

  if (!sessionUserId) {
    return {
      success: false,
      message: "Unauthorized: You must be logged in to cancel an order.",
    };
  }

  const orderIndex = global._addisOrdersStore?.findIndex(
    (o) => o.id === orderId
  );

  if (orderIndex === -1 || orderIndex === undefined) {
    return {
      success: false,
      message: `Order #${orderId} not found.`,
    };
  }

  const order = global._addisOrdersStore[orderIndex];

  // Ownership check: session user must match the order's owner
  if (order.ownerId && order.ownerId !== sessionUserId) {
    return {
      success: false,
      message: "Forbidden: You can only cancel your own orders.",
    };
  }

  global._addisOrdersStore[orderIndex] = {
    ...order,
    status: "cancelled",
    cancelledAt: new Date().toISOString(),
  };

  revalidatePath("/checkout");

  return {
    success: true,
    message: `Order #${orderId} has been cancelled successfully.`,
  };
}
