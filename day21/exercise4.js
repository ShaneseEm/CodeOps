/**
 * Exercise 4 — Validation with Ethiopian Regex
 * Name must be at least 2 characters.
 * Phone must match the Ethiopian mobile pattern.
 */

// Ethiopian mobile: 09XXXXXXXX or +2519XXXXXXXX
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

/**
 * Validate name and phone.
 * Returns the first problem found as a string,
 * or an empty string "" when all fields are valid.
 */
function validate(name, phone) {
  if (!name)            return "Please enter your name.";
  if (name.length < 2)  return "Name must be at least 2 characters.";
  if (!phone)           return "Phone number is required.";
  if (!PHONE_REGEX.test(phone))
    return "Enter a valid Ethiopian phone (09XXXXXXXX or +251 9XXXXXXXX).";
  return ""; // "" means all good
}
