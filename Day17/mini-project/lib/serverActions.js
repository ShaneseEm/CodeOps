/**
 * Addis Eats · Server Actions & Scoped Database Layer
 * Mini-Project · Day 17
 */

import { getSession } from "./auth";

// Shared database state
export const INITIAL_ORDERS = [
  { id: "AE-101", userId: "user_abebe", customer: "Abebe Bikila", items: "Doro Wat (x1), Injera", total: 380, address: "Bole Medhanialem", status: "In Kitchen" },
  { id: "AE-102", userId: "user_abebe", customer: "Abebe Bikila", items: "Kitfo Special, Mango Spris", total: 530, address: "Bole Medhanialem", status: "Delivered" },
  { id: "AE-201", userId: "user_chaltu", customer: "Chaltu Dibaba", items: "Beyaynetu (Vegan Platter)", total: 290, address: "Kazanchis", status: "Order Received" },
  { id: "AE-202", userId: "user_chaltu", customer: "Chaltu Dibaba", items: "Shiro Mitten Tegabino", total: 220, address: "Kazanchis", status: "Delivered" },
  { id: "AE-301", userId: "user_yared", customer: "Chef Yared (Staff)", items: "Staff Shift Meal", total: 0, address: "Addis Eats HQ Kitchen", status: "Preparing" },
];

let ordersDatabase = [...INITIAL_ORDERS];

/**
 * Requirement: Scoped Database Query
 * Queries scoped strictly to session.user.id rather than request parameters.
 */
export async function getScopedOrdersAction(cookieValue) {
  // Layer 1: Authenticate caller session
  const session = getSession(cookieValue);
  if (!session) {
    throw new Error("401 Unauthorized: Valid session required to view orders.");
  }

  // Layer 2: Scope query strictly to the session id (prevents IDOR)
  return ordersDatabase.filter((order) => order.userId === session.user.id);
}

/**
 * Server Action: Update Order Delivery Address
 * Requirement: Session AND Ownership both checked inside every action that writes.
 */
export async function updateOrderAddressAction(cookieValue, orderId, newAddress) {
  // Layer 1: Session Verification
  // [Line that stops Attack 1: Unauthenticated console invocation]
  const session = getSession(cookieValue);
  if (!session) {
    return {
      success: false,
      status: 401,
      error: "401 Unauthorized: Calling this action requires an active session cookie.",
      stoppedByLine: "serverActions.js:38 (if (!session) throw 401)",
    };
  }

  // Layer 2: Find target order in database
  const targetOrder = ordersDatabase.find((o) => o.id === orderId);
  if (!targetOrder) {
    return {
      success: false,
      status: 404,
      error: `404 Not Found: Order '${orderId}' does not exist.`,
      stoppedByLine: "serverActions.js:48 (if (!targetOrder) return 404)",
    };
  }

  // Layer 3: Ownership Check
  // [Line that stops Attack 2: IDOR / Calling action with another account's order id]
  if (targetOrder.userId !== session.user.id) {
    return {
      success: false,
      status: 403,
      error: `403 Forbidden: Ownership violation. Order '${orderId}' belongs to '${targetOrder.userId}', but caller is authenticated as '${session.user.id}'.`,
      stoppedByLine: "serverActions.js:58 (if (targetOrder.userId !== session.user.id) return 403)",
    };
  }

  // Layer 4: Mutation execution
  targetOrder.address = newAddress;
  return {
    success: true,
    status: 200,
    message: `Delivery address for Order '${orderId}' successfully updated to: ${newAddress}`,
    updatedOrder: { ...targetOrder },
  };
}

/**
 * Server Action: Cancel Order
 * Requirement: Ownership check on write
 */
export async function cancelOrderAction(cookieValue, orderId) {
  const session = getSession(cookieValue);
  if (!session) {
    return {
      success: false,
      status: 401,
      error: "401 Unauthorized: Session required to cancel orders.",
      stoppedByLine: "serverActions.js:80 (if (!session) return 401)",
    };
  }

  const targetOrder = ordersDatabase.find((o) => o.id === orderId);
  if (!targetOrder) {
    return { success: false, status: 404, error: "404 Not Found" };
  }

  if (targetOrder.userId !== session.user.id) {
    return {
      success: false,
      status: 403,
      error: `403 Forbidden: Cannot cancel order '${orderId}' owned by another user.`,
      stoppedByLine: "serverActions.js:93 (if (targetOrder.userId !== session.user.id) return 403)",
    };
  }

  targetOrder.status = "Cancelled";
  return {
    success: true,
    status: 200,
    message: `Order '${orderId}' cancelled successfully.`,
    updatedOrder: { ...targetOrder },
  };
}

/**
 * Reset mock database to clean initial state
 */
export function resetMockDatabase() {
  ordersDatabase = [...INITIAL_ORDERS];
}
