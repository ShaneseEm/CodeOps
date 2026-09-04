/**
 * Exercise 3 — Signup Form (Build the form & handle submit)
 * Listen on "submit" event, call e.preventDefault(), read trimmed values.
 */

const signupForm  = document.querySelector("#signup-form");
const nameInput   = document.querySelector("#name-input");
const phoneInput  = document.querySelector("#phone-input");
const formError   = document.querySelector("#form-error");
const formSuccess = document.querySelector("#form-success");

// Exercise 3: grab the form and wire the submit listener
signupForm.addEventListener("submit", handleSignup);

function handleSignup(e) {
  e.preventDefault(); // stop page reload

  // Read and trim values (Exercise 3)
  const name  = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  // Clear previous messages
  formError.textContent   = "";
  formSuccess.textContent = "";

  // Validate (Exercise 4) — returns first error or ""
  const error = validate(name, phone);

  if (error) {
    // Exercise 5 — show error with textContent (never innerHTML)
    showError(error);
    return;
  }

  // Exercise 6 — save and update counter
  saveUser({ name, phone });

  formSuccess.textContent = `✅ Welcome, ${name}! You've been registered.`;
  signupForm.reset();
}
