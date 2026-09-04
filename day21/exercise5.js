/**
 * Exercise 5 — Show clear error messages with textContent
 * NEVER use innerHTML for user-supplied text (XSS risk).
 */

/**
 * Display an error message safely using .textContent.
 * @param {string} message - The error string to display.
 */
function showError(message) {
  // Safe: textContent treats input as plain text, not HTML
  formError.textContent = message;

  // Shake animation for feedback
  formError.style.animation = "none";
  // Trigger reflow so animation restarts
  void formError.offsetWidth;
  formError.style.animation = "shake 0.35s ease";
}

// Inject the shake keyframe once
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%,60%  { transform: translateX(-6px); }
    40%,80%  { transform: translateX(6px); }
  }
`;
document.head.appendChild(shakeStyle);
