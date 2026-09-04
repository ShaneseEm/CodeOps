/**
 * Exercise 6 — Persistent Signup Count
 * Save valid entries as JSON to localStorage.
 * Restore the count and list on every page load.
 */

const USERS_KEY = "day21_users";
const userCount = document.querySelector("#user-count");
const userList  = document.querySelector("#user-list");

// ── Load users safely on start ──
let users = loadUsers();
renderUserList();

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : []; // null → fresh array
  } catch (err) {
    console.warn("Corrupt user data in storage — resetting.", err);
    return []; // corrupt JSON → safe fallback
  }
}

function saveUsers() {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Called from exercise3.js handleSignup() on success.
 * Saves the new entry and updates the DOM counter.
 */
function saveUser(entry) {
  users.push({ ...entry, timestamp: new Date().toISOString() });
  saveUsers();
  renderUserList();
}

function renderUserList() {
  // Update counter
  userCount.textContent = users.length;

  // Rebuild list
  userList.innerHTML = "";
  users.forEach(({ name, phone, timestamp }) => {
    const li = document.createElement("li");

    const nameSpan  = document.createElement("span");
    nameSpan.className    = "user-name";
    nameSpan.textContent  = name; // textContent — safe

    const phoneSpan = document.createElement("span");
    phoneSpan.className   = "user-phone";
    phoneSpan.textContent = phone; // textContent — safe

    const dateSpan  = document.createElement("span");
    dateSpan.className    = "user-phone";
    dateSpan.textContent  = new Date(timestamp).toLocaleDateString();

    li.appendChild(nameSpan);
    li.appendChild(phoneSpan);
    li.appendChild(dateSpan);
    userList.appendChild(li);
  });
}

// ── Clear all users ──
document.querySelector("#clear-users").addEventListener("click", () => {
  if (!confirm("Delete all registered users?")) return;
  users = [];
  saveUsers();
  renderUserList();
});
