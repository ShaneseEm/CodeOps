/**
 * Addis Eats - Single Page Application Core Logic
 * Module 2 Capstone Project
 * Architecture: fetch -> state -> render loop with LocalStorage persistence
 */

// Global Application State
const state = {
  dishes: [],       // Raw menu data fetched from JSON
  cart: [],         // Active cart items: { id, name, price, qty, icon }
  search: "",       // Active search term
  category: "All",  // Active category filter
  isLoading: true,  // Data fetching status
  error: null       // Error message if fetch fails
};

// Storage Key constant
const STORAGE_KEY = "addis_eats_cart";

// DOM Elements Cache
const DOM = {
  searchInput: document.getElementById("search"),
  clearSearchBtn: document.getElementById("clear-search"),
  categoryPills: document.getElementById("category-pills"),
  menuGrid: document.getElementById("menu"),
  resultsCount: document.getElementById("results-count"),
  cartItems: document.getElementById("cart-items"),
  cartSubtotal: document.getElementById("cart-subtotal"),
  cartTotal: document.getElementById("cart-total"),
  clearCartBtn: document.getElementById("clear-cart-btn"),
  checkoutBtn: document.getElementById("checkout-btn"),
  mobileCartBtn: document.getElementById("mobile-cart-toggle"),
  mobileCartCount: document.getElementById("mobile-cart-count"),
  cartAside: document.getElementById("cart"),
  // Modal Elements
  checkoutModal: document.getElementById("checkout-modal"),
  closeModalBtn: document.getElementById("close-modal-btn"),
  cancelCheckoutBtn: document.getElementById("cancel-checkout-btn"),
  checkoutForm: document.getElementById("checkout-form"),
  modalOrderSummary: document.getElementById("modal-order-summary"),
  modalTotalBtn: document.getElementById("modal-total-btn"),
  successModal: document.getElementById("success-modal"),
  closeSuccessBtn: document.getElementById("close-success-btn"),
  receiptDetails: document.getElementById("receipt-details")
};

// ==========================================================================
// 1. Data Fetching Pipeline
// ==========================================================================

/**
 * Loads menu items from data/menu.json asynchronously with loading & error handling
 */
async function loadMenu() {
  state.isLoading = true;
  state.error = null;
  render(); // Display loading state

  try {
    const res = await fetch("data/menu.json");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    state.dishes = data;
    state.isLoading = false;
  } catch (err) {
    console.error("Failed to load menu data:", err);
    state.isLoading = false;
    state.error = "Could not load the menu. Please verify your connection or refresh the page.";
  }

  render();
}

// ==========================================================================
// 2. Rendering Pipeline (State -> DOM)
// ==========================================================================

/**
 * Main render function - draws the entire UI based on current state
 */
function render() {
  renderMenu();
  renderCart();
}

/**
 * Filters dishes and renders menu cards into #menu container
 */
function renderMenu() {
  // 1. Handle Loading State
  if (state.isLoading) {
    DOM.menuGrid.innerHTML = `
      <div class="loading-state">
        <div class="spinner" aria-hidden="true"></div>
        <p>Loading fresh Addis Eats menu...</p>
      </div>
    `;
    DOM.resultsCount.textContent = "Loading...";
    return;
  }

  // 2. Handle Error State
  if (state.error) {
    DOM.menuGrid.innerHTML = `
      <div class="error-state">
        <span class="error-icon">⚠️</span>
        <p>${state.error}</p>
        <button onclick="loadMenu()" class="btn primary-btn" style="margin-top: 1rem;">Retry Loading</button>
      </div>
    `;
    DOM.resultsCount.textContent = "Error loading data";
    return;
  }

  // 3. Filter Dishes based on search term & selected category
  const term = state.search.trim().toLowerCase();
  const filteredDishes = state.dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(term) || 
                          dish.description.toLowerCase().includes(term) ||
                          dish.category.toLowerCase().includes(term);
    const matchesCategory = state.category === "All" || dish.category === state.category;
    return matchesSearch && matchesCategory;
  });

  // Update results count indicator
  DOM.resultsCount.textContent = `Showing ${filteredDishes.length} of ${state.dishes.length} items`;

  // 4. Handle Empty Search State
  if (filteredDishes.length === 0) {
    DOM.menuGrid.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🔍</span>
        <h3>No dishes found</h3>
        <p>We couldn't find any dishes matching "${state.search}". Try searching for another term or selecting a different category.</p>
      </div>
    `;
    return;
  }

  // 5. Render Dish Cards HTML
  DOM.menuGrid.innerHTML = filteredDishes.map(dish => `
    <article class="dish-card" data-id="${dish.id}">
      <div class="dish-card-header">
        <div class="dish-icon" aria-hidden="true">${dish.icon || "🍲"}</div>
        <div class="dish-badges">
          ${dish.spicy ? '<span class="badge badge-spicy">🌶️ Spicy</span>' : ''}
          <span class="badge badge-category">${dish.category}</span>
        </div>
      </div>

      <div class="dish-body">
        <h3 class="dish-title">${dish.name}</h3>
        <p class="dish-description">${dish.description}</p>
        <div class="dish-meta">
          <span>⏱️ ${dish.prepTime}</span>
          <span>⭐ ${dish.rating}</span>
        </div>
      </div>

      <div class="dish-footer">
        <div class="dish-price">${dish.price} <span>ETB</span></div>
        <button type="button" class="add-to-cart-btn" data-id="${dish.id}">
          <span>+ Add</span>
        </button>
      </div>
    </article>
  `).join("");
}

/**
 * Calculates live totals using Array.prototype.reduce and updates Cart UI
 */
function renderCart() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const totalETB = computeCartTotal();

  // Update Badge Counters
  DOM.mobileCartCount.textContent = totalItems;

  // Render Cart Item Lines
  if (state.cart.length === 0) {
    DOM.cartItems.innerHTML = `
      <div class="empty-cart-state">
        <span class="empty-icon" aria-hidden="true">🛒</span>
        <p>Your cart is empty</p>
        <small>Select dishes from the menu to build your order.</small>
      </div>
    `;
    DOM.clearCartBtn.classList.add("hidden");
    DOM.checkoutBtn.disabled = true;
  } else {
    DOM.clearCartBtn.classList.remove("hidden");
    DOM.checkoutBtn.disabled = false;

    DOM.cartItems.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.icon || "🍲"} ${item.name}</div>
          <div class="cart-item-price">${item.price} ETB × ${item.qty} = <strong>${item.price * item.qty} ETB</strong></div>
        </div>

        <div class="cart-item-actions">
          <button type="button" class="qty-btn dec-qty-btn" data-id="${item.id}" aria-label="Decrease quantity">-</button>
          <span class="qty-value">${item.qty}</span>
          <button type="button" class="qty-btn inc-qty-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
          <button type="button" class="remove-btn" data-id="${item.id}" aria-label="Remove item">✕</button>
        </div>
      </div>
    `).join("");
  }

  // Update Summary ETB totals
  DOM.cartSubtotal.textContent = `${totalETB} ETB`;
  DOM.cartTotal.textContent = `${totalETB} ETB`;
  DOM.modalTotalBtn.textContent = `${totalETB} ETB`;
}

/**
 * Computes the total ETB sum using reduce
 * Requirement: A computed total or summary (reduce)
 */
function computeCartTotal() {
  return state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

// ==========================================================================
// 3. Cart State Modifications
// ==========================================================================

function addToCart(dishId) {
  const dish = state.dishes.find(d => d.id === dishId);
  if (!dish) return;

  const existingLine = state.cart.find(item => item.id === dishId);
  if (existingLine) {
    existingLine.qty++;
  } else {
    state.cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      icon: dish.icon,
      qty: 1
    });
  }

  saveCart();
  renderCart();
}

function updateQuantity(dishId, change) {
  const lineIndex = state.cart.findIndex(item => item.id === dishId);
  if (lineIndex === -1) return;

  state.cart[lineIndex].qty += change;

  if (state.cart[lineIndex].qty <= 0) {
    state.cart.splice(lineIndex, 1);
  }

  saveCart();
  renderCart();
}

function removeFromCart(dishId) {
  state.cart = state.cart.filter(item => item.id !== dishId);
  saveCart();
  renderCart();
}

function clearCart() {
  state.cart = [];
  saveCart();
  renderCart();
}

// ==========================================================================
// 4. LocalStorage Persistence
// ==========================================================================

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
  } catch (err) {
    console.error("Could not save cart to LocalStorage:", err);
  }
}

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      state.cart = JSON.parse(saved);
    }
  } catch (err) {
    console.error("Could not load cart from LocalStorage:", err);
    state.cart = [];
  }
}

// ==========================================================================
// 5. Event Listeners & Delegation
// ==========================================================================

function setupEventListeners() {
  // Live Search Input Event
  DOM.searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    if (state.search.length > 0) {
      DOM.clearSearchBtn.classList.remove("hidden");
    } else {
      DOM.clearSearchBtn.classList.add("hidden");
    }
    renderMenu();
  });

  // Clear Search Button Click
  DOM.clearSearchBtn.addEventListener("click", () => {
    state.search = "";
    DOM.searchInput.value = "";
    DOM.clearSearchBtn.classList.add("hidden");
    renderMenu();
  });

  // Category Filter Pill Click Delegation
  DOM.categoryPills.addEventListener("click", (e) => {
    const pill = e.target.closest(".category-pill");
    if (!pill) return;

    // Update active pill UI
    document.querySelectorAll(".category-pill").forEach(btn => btn.classList.remove("active"));
    pill.classList.add("active");

    // Update State & Re-render
    state.category = pill.dataset.category;
    renderMenu();
  });

  // Menu Grid Event Delegation (Add to Cart)
  DOM.menuGrid.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-to-cart-btn");
    if (addBtn) {
      const dishId = Number(addBtn.dataset.id);
      addToCart(dishId);
    }
  });

  // Cart Items List Event Delegation (Qty adjustments & delete)
  DOM.cartItems.addEventListener("click", (e) => {
    const incBtn = e.target.closest(".inc-qty-btn");
    const decBtn = e.target.closest(".dec-qty-btn");
    const removeBtn = e.target.closest(".remove-btn");

    if (incBtn) {
      updateQuantity(Number(incBtn.dataset.id), 1);
    } else if (decBtn) {
      updateQuantity(Number(decBtn.dataset.id), -1);
    } else if (removeBtn) {
      removeFromCart(Number(removeBtn.dataset.id));
    }
  });

  // Clear Entire Cart
  DOM.clearCartBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your order?")) {
      clearCart();
    }
  });

  // Mobile Cart Toggle Button - Scrolls down to cart section on mobile
  DOM.mobileCartBtn.addEventListener("click", () => {
    DOM.cartAside.scrollIntoView({ behavior: "smooth" });
  });

  // Checkout Modal Triggers
  DOM.checkoutBtn.addEventListener("click", openCheckoutModal);
  DOM.closeModalBtn.addEventListener("click", () => DOM.checkoutModal.close());
  DOM.cancelCheckoutBtn.addEventListener("click", () => DOM.checkoutModal.close());

  // Form Validation & TeleBirr Order Submission
  DOM.checkoutForm.addEventListener("submit", handleCheckoutSubmit);

  // Success Modal Close
  DOM.closeSuccessBtn.addEventListener("click", () => DOM.successModal.close());
}

// ==========================================================================
// 6. TeleBirr Checkout & Validation Logic
// ==========================================================================

function openCheckoutModal() {
  if (state.cart.length === 0) return;

  // Render Order Recap inside Modal
  const total = computeCartTotal();
  DOM.modalOrderSummary.innerHTML = `
    <h4>Order Summary (${state.cart.reduce((s, i) => s + i.qty, 0)} items)</h4>
    <ul style="list-style: none; padding: 0.5rem 0; font-size: 0.85rem;">
      ${state.cart.map(i => `<li>${i.name} × ${i.qty} — <strong>${i.price * i.qty} ETB</strong></li>`).join("")}
    </ul>
    <div style="text-align: right; border-top: 1px solid var(--border); padding-top: 0.4rem;">
      <strong>Total: ${total} ETB</strong>
    </div>
  `;

  DOM.checkoutModal.showModal();
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById("cust-name");
  const phoneInput = document.getElementById("cust-phone");
  const addressInput = document.getElementById("cust-address");

  let isValid = true;

  // Validate Name
  if (!nameInput.value.trim()) {
    nameInput.classList.add("invalid");
    isValid = false;
  } else {
    nameInput.classList.remove("invalid");
  }

  // Validate TeleBirr Phone Number (09... or 07... with 8 digits = 10 total digits)
  const phoneRegex = /^(09|07)\d{8}$/;
  if (!phoneRegex.test(phoneInput.value.trim())) {
    phoneInput.classList.add("invalid");
    isValid = false;
  } else {
    phoneInput.classList.remove("invalid");
  }

  // Validate Address
  if (!addressInput.value.trim()) {
    addressInput.classList.add("invalid");
    isValid = false;
  } else {
    addressInput.classList.remove("invalid");
  }

  if (!isValid) return;

  // Form valid! Process TeleBirr Order
  const orderRef = "TB-" + Math.floor(100000 + Math.random() * 900000);
  const totalAmount = computeCartTotal();

  // Populate Receipt
  DOM.receiptDetails.innerHTML = `
    <p><strong>Order Ref:</strong> ${orderRef}</p>
    <p><strong>Customer:</strong> ${nameInput.value.trim()}</p>
    <p><strong>TeleBirr Account:</strong> ${phoneInput.value.trim()}</p>
    <p><strong>Delivery Address:</strong> ${addressInput.value.trim()}</p>
    <p><strong>Amount Billed:</strong> <span style="color: var(--primary); font-weight:800;">${totalAmount} ETB</span></p>
    <p><small style="color: var(--accent); font-weight: 600;">✓ TeleBirr payment request dispatched to ${phoneInput.value.trim()}</small></p>
  `;

  // Close Checkout Modal & Open Success Modal
  DOM.checkoutModal.close();
  DOM.successModal.showModal();

  // Reset Cart State & Form
  clearCart();
  DOM.checkoutForm.reset();
}

// ==========================================================================
// 7. Application Entry Point
// ==========================================================================

function init() {
  loadCart();           // 1. Recover saved cart from LocalStorage
  setupEventListeners(); // 2. Attach all UI event handlers
  loadMenu();           // 3. Fetch menu JSON & render UI
}

// Boot application when DOM is ready
document.addEventListener("DOMContentLoaded", init);
