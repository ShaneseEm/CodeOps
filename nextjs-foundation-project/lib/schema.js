/**
 * Shared order validation schema matching Day 33 requirements.
 * Used identically by both POST /api/orders and the placeOrder Server Action.
 */
export function validateOrder(data) {
  const fieldErrors = {};

  // Customer Name
  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    fieldErrors.name = "Full name must be at least 2 characters long.";
  }

  // Ethiopian Phone: +251 9... or 09...
  const phoneRegex = /^(\+251\s?9\d{8}|09\d{8})$/;
  if (!data.phone || !phoneRegex.test(String(data.phone).trim())) {
    fieldErrors.phone = "Invalid phone number. Must be a valid Ethiopian phone (+2519xxxxxxxx or 09xxxxxxxx).";
  }

  // Delivery Address
  if (!data.address || typeof data.address !== "string" || data.address.trim().length < 5) {
    fieldErrors.address = "Delivery address must be at least 5 characters.";
  }

  // Order Items
  if (!Array.isArray(data.items) || data.items.length === 0) {
    fieldErrors.items = "Order must contain at least one dish item.";
  }

  return {
    isValid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
  };
}
