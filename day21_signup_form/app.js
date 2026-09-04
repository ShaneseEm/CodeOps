/**
 * app.js — Day 21 Mini-Project
 * A Validated, Persistent Signup Form
 *
 * Skills demonstrated:
 *   1. localStorage (save / restore entries)
 *   2. JSON (stringify to store, parse to read)
 *   3. Forms (e.preventDefault, trimmed values, error area)
 *   4. Regular Expressions (Ethiopian phone regex)
 */

"use strict";

/* ══════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════ */

const USERS_KEY = "day21_signup_users";

/** Ethiopian mobile: 09XXXXXXXX or +2519XXXXXXXX */
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

/* ══════════════════════════════════════════════════
   DOM REFERENCES
══════════════════════════════════════════════════ */

const form       = document.querySelector("#signup-form");
const nameInput  = document.querySelector("#name-input");
const phoneInput = document.querySelector("#phone-input");
const errorArea  = document.querySelector("#error-area");
const userCount  = document.querySelector("#user-count");
const userList   = document.querySelector("#user-list");
const clearBtn   = document.querySelector("#clear-btn");

/* ══════════════════════════════════════════════════
   STORAGE HELPERS
   Guard against null (first visit) and corrupt JSON
══════════════════════════════════════════════════ */

/**
 * Load users from localStorage safely.
 * @returns {Array} Parsed array of user objects, or [] on failure.
 */
function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : []; // null → first visit → empty array
  } catch (err) {
    // corrupt JSON (e.g. manually edited storage, old app version)
    console.warn("[Day21] Corrupt storage — resetting user list.", err);
    return [];
  }
}

/**
 * Persist the current users array as JSON.
 * @param {Array} users
 */
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* ══════════════════════════════════════════════════
   VALIDATION
══════════════════════════════════════════════════ */

/**
 * Validate name and phone.
 * @param {string} name  - Trimmed full name.
 * @param {string} phone - Trimmed phone number.
 * @returns {string} First error message, or "" when all is valid.
 */
function validate(name, phone) {
  if (!name)           return "Please enter your full name.";
  if (name.length < 2) return "Name must be at least 2 characters.";
  if (!phone)          return "Phone number is required.";
  if (!PHONE_REGEX.test(phone))
    return "Enter a valid Ethiopian phone (09XXXXXXXX or +251 9XXXXXXXX).";
  return ""; // "" → all good
}

/* ══════════════════════════════════════════════════
   ERROR DISPLAY
   Always use .textContent — never innerHTML — for user text.
══════════════════════════════════════════════════ */

/**
 * Show an error message safely with textContent.
 * @param {string} message
 */
function showError(message) {
  errorArea.textContent = message; // plain text — XSS safe
  errorArea.classList.add("visible");
}

/** Hide the error area. */
function clearError() {
  errorArea.textContent = "";
  errorArea.classList.remove("visible");
}

/* ══════════════════════════════════════════════════
   RENDER
══════════════════════════════════════════════════ */

/**
 * Rebuild the registered-users list and update the counter.
 * Uses createElement + .textContent throughout — never innerHTML.
 * @param {Array} users
 */
function renderUsers(users) {
  // Update counter
  userCount.textContent = users.length;

  // Clear existing list
  userList.innerHTML = "";

  if (users.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-msg";
    empty.textContent = "No registrations yet. Be the first!";
    userList.appendChild(empty);
    return;
  }

  users.forEach(({ name, phone, timestamp }) => {
    // Build entry item
    const li = document.createElement("li");
    li.className = "user-entry";

    // Avatar: first letter of name
    const avatar = document.createElement("div");
    avatar.className = "user-avatar";
    avatar.textContent = name.charAt(0).toUpperCase(); // safe

    // Info block
    const info = document.createElement("div");
    info.className = "user-info";

    const nameEl = document.createElement("span");
    nameEl.className = "user-name";
    nameEl.textContent = name; // textContent — safe

    const phoneEl = document.createElement("span");
    phoneEl.className = "user-phone";
    phoneEl.textContent = phone; // textContent — safe

    info.appendChild(nameEl);
    info.appendChild(phoneEl);

    // Date
    const dateEl = document.createElement("span");
    dateEl.className = "user-date";
    dateEl.textContent = new Date(timestamp).toLocaleDateString();

    li.appendChild(avatar);
    li.appendChild(info);
    li.appendChild(dateEl);
    userList.appendChild(li);
  });
}

/* ══════════════════════════════════════════════════
   FORM SUBMIT HANDLER
══════════════════════════════════════════════════ */

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page reload

  // Read and trim values
  const name  = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  // Validate
  const error = validate(name, phone);

  if (error) {
    showError(error); // display first problem using textContent
    return;
  }

  // All valid — clear any previous error
  clearError();

  // Build new user entry
  const newUser = {
    name,
    phone,
    timestamp: new Date().toISOString(),
  };

  // Load current list, append, save back
  const users = loadUsers();
  users.push(newUser);
  saveUsers(users);   // stringify → localStorage

  // Update UI
  renderUsers(users);

  // Clear the form inputs
  form.reset();

  // Brief success message via a dynamic element (textContent)
  const successMsg = document.createElement("p");
  successMsg.className = "success-flash";
  successMsg.textContent = `✅ Welcome, ${name}! You're registered.`;
  successMsg.style.cssText =
    "color:#4ade80;font-size:.85rem;font-weight:600;margin-top:.6rem;animation:fadeOut 3s forwards;";
  form.appendChild(successMsg);
  setTimeout(() => successMsg.remove(), 3000);
});

/* ══════════════════════════════════════════════════
   CLEAR ALL USERS
══════════════════════════════════════════════════ */

clearBtn.addEventListener("click", () => {
  if (!confirm("Delete all registered users from localStorage?")) return;
  localStorage.removeItem(USERS_KEY);
  renderUsers([]);
});

/* ══════════════════════════════════════════════════
   INIT — restore on load
══════════════════════════════════════════════════ */

(function init() {
  const users = loadUsers(); // parse from localStorage, guard null + corrupt
  renderUsers(users);

  // Inject success fade animation
  const style = document.createElement("style");
  style.textContent = "@keyframes fadeOut { 0%{opacity:1} 70%{opacity:1} 100%{opacity:0} }";
  document.head.appendChild(style);
})();
