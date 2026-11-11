/**
 * validate.js
 *
 * Pure validation function for The Addis Eats Checkout.
 * Returns an errors object { [field]: errorMessage }.
 * Pure function: No side effects, deterministic, safe to execute on every render pass.
 */

export const VALID_DELIVERY_AREAS = [
  "Bole",
  "Kazanchis",
  "Megenagna",
  "Piassa",
];

/**
 * Validates the checkout form state.
 *
 * Rules:
 * 1. Name: Required, trimmed length >= 2 characters.
 *    Why: Couriers need a recipient identity for order hand-off.
 *
 * 2. Phone: Required, valid TeleBirr Ethiopian mobile pattern (09XXXXXXXX, 07XXXXXXXX, +2519..., +2517...).
 *    Why: TeleBirr push payments and SMS notifications require a verifiable mobile subscriber number.
 *
 * 3. Area: Required, must match designated operational zones (Bole, Kazanchis, Megenagna, Piassa).
 *    Why: Kitchen dispatch logistics are strictly bounded by fleet coverage zones in Addis Ababa.
 *
 * 4. Notes: Optional, maximum 200 characters if supplied.
 *    Why: Prevents payload overflow while ensuring concise instructions for delivery drivers.
 */
export function validate(form = {}) {
  const errors = {};

  // Rule 1: Customer Name
  const name = form.name ? form.name.trim() : "";
  if (!name) {
    errors.name = "Full name is required";
  } else if (name.length < 2) {
    errors.name = "Full name must be at least 2 characters";
  } else if (!/^[\p{L}\s'-]+$/u.test(name)) {
    errors.name = "Name must contain only letters, spaces, or hyphens";
  }

  // Rule 2: TeleBirr Phone
  const phone = form.phone ? form.phone.trim() : "";
  const telebirrPattern = /^(09\d{8}|07\d{8}|\+2519\d{8}|\+2517\d{8})$/;
  if (!phone) {
    errors.phone = "TeleBirr phone number is required";
  } else if (!telebirrPattern.test(phone)) {
    errors.phone = "Invalid format. Use 09XXXXXXXX or +2519XXXXXXXX";
  }

  // Rule 3: Delivery Area
  if (!form.area || !VALID_DELIVERY_AREAS.includes(form.area)) {
    errors.area = "Please select a supported delivery zone";
  }

  // Rule 4: Delivery Notes (Optional)
  if (form.notes && form.notes.length > 200) {
    errors.notes = "Special notes must not exceed 200 characters";
  }

  return errors;
}
