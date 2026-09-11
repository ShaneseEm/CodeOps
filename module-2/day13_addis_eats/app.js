/**
 * Addis Eats — Single Page Application Core & Checkout Logic
 * Module 2 Capstone Project — Phase 2: Polish, Refactor & Debug
 * CodeOps · Full Stack Software Development
 */

// ── 1. NAMED CONSTANTS ──
const FREE_DELIVERY_OVER = 500; // ETB
const DELIVERY_FEE = 30;        // ETB
const STORAGE_KEY = "addiseats";
const PHONE_REGEX = /^(?:\+251|0)[79]\d{8}$/; // Accepts 09xxxxxxxx, 07xxxxxxxx, +2519xxxxxxxx

// ── 2. GLOBAL APPLICATION STATE ──
const state = {
  dishes: [],       // Raw menu data fetched from JSON
  cart: [],         // Active cart items: { id, name, price, qty, icon }
  search: "",       // Active search term
  category: "All",  // Active category filter
  isLoading: true,  // Data fetching status
  error: null       // Error message if fetch fails
};

// ── 3. DOM ELEMENTS CACHE ──
const DOM = {
  searchInput: document.getElementById("search"),
  clearSearchBtn: document.getElementById("clear-search"),
  categoryPills: document.getElementById("category-pills"),
  menuGrid: document.getElementById("menu"),
  resultsCount: document.getElementById("results-count"),
  cartItems: document.getElementById("cart-items"),
  cartSubtotal: document.getElementById("cart-subtotal"),
  cartDelivery: document.getElementById("cart-delivery"),
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
  formError: document.getElementById("form-error"),
  modalOrderSummary: document.getElementById("modal-order-summary"),
  modalTotalBtn: document.getElementById("modal-total-btn"),
  successModal: document.getElementById("success-modal"),
  closeSuccessBtn: document.getElementById("close-success-btn"),
  receiptDetails: document.getElementById("receipt-details")
};

// ── 4. DATA FETCHING PIPELINE ──

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

// ── 5. RENDERING PIPELINE (State -> DOM) ──

/**
 * Main render function — draws the entire UI based on current state
 */
function render() {
  renderMenu();
  renderCart();
}

/**
 * Filters dishes and renders menu cards into #menu container
 */
function renderMenu() {
  if (!DOM.menuGrid) return;

  // 1. Loading State Guard
  if (state.isLoading) {
    DOM.menuGrid.innerHTML = `
      <div class="loading-state">
        <div class="spinner" aria-hidden="true"></div>
        <p>Loading fresh Addis Eats menu...</p>
      </div>
    `;
    if (DOM.resultsCount) DOM.resultsCount.textContent = "Loading...";
    return;
  }

  // 2. Error State Guard
  if (state.error) {
    DOM.menuGrid.innerHTML = `
      <div class="error-state">
        <span class="error-icon">⚠️</span>
        <p>${state.error}</p>
        <button onclick="loadMenu()" class="btn primary-btn" style="margin-top: 1rem;">Retry Loading</button>
      </div>
    `;
    if (DOM.resultsCount) DOM.resultsCount.textContent = "Error loading data";
    return;
  }

  // 3. Filter Dishes based on search term & category
  const term = state.search.trim().toLowerCase();
  const filteredDishes = state.dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(term) || 
                          dish.description.toLowerCase().includes(term) ||
                          dish.category.toLowerCase().includes(term);
    const matchesCategory = state.category === "All" || dish.category === state.category;
    return matchesSearch && matchesCategory;
  });

  if (DOM.resultsCount) {
    DOM.resultsCount.textContent = `Showing ${filteredDishes.length} of ${state.dishes.length} items`;
  }

  // 4. Empty Search Result Guard
  if (filteredDishes.length === 0) {
    DOM.menuGrid.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🔍</span>
        <h3>No dishes found</h3>
        <p>We couldn't find any dishes matching "${state.search}". Try another term or category.</p>
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
  if (!DOM.cartItems) return;

  // Guard clause for empty cart
  if (state.cart.length === 0) {
    DOM.cartItems.innerHTML = `
      <div class="empty-cart-state">
        <span class="empty-icon" aria-hidden="true">🛒</span>
        <p>Your cart is empty</p>
        <small>Select dishes from the menu to build your order.</small>
      </div>
    `;
    if (DOM.clearCartBtn) DOM.clearCartBtn.classList.add("hidden");
    if (DOM.checkoutBtn) DOM.checkoutBtn.disabled = true;
    if (DOM.mobileCartCount) DOM.mobileCartCount.textContent = "0";
    if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = "0 ETB";
    if (DOM.cartTotal) DOM.cartTotal.textContent = "0 ETB";
    return;
  }

  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotalETB = computeCartTotal();
  const deliveryFee = subtotalETB >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const grandTotalETB = subtotalETB + deliveryFee;

  if (DOM.mobileCartCount) DOM.mobileCartCount.textContent = totalItems;
  if (DOM.clearCartBtn) DOM.clearCartBtn.classList.remove("hidden");
  if (DOM.checkoutBtn) DOM.checkoutBtn.disabled = false;

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

  if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = `${subtotalETB} ETB`;
  if (DOM.cartDelivery) {
    DOM.cartDelivery.textContent = deliveryFee === 0 ? "FREE" : `${deliveryFee} ETB`;
    DOM.cartDelivery.className = deliveryFee === 0 ? "free-delivery" : "";
  }
  if (DOM.cartTotal) DOM.cartTotal.textContent = `${grandTotalETB} ETB`;
  if (DOM.modalTotalBtn) DOM.modalTotalBtn.textContent = `${grandTotalETB} ETB`;
}

/**
 * Computes the subtotal ETB sum using Array.prototype.reduce
 */
function computeCartTotal() {
  return state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

// ── 6. CART STATE MODIFICATIONS ──

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

function updateQuantity(dishId, delta) {
  const line = state.cart.find(item => item.id === dishId);
  if (!line) return;

  line.qty += delta;
  if (line.qty <= 0) {
    removeFromCart(dishId);
    return;
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

// ── 7. PERSISTENCE (localStorage) ──

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
  } catch (err) {
    console.error("Failed to save cart to localStorage:", err);
  }
}

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        state.cart = parsed;
      }
    }
  } catch (err) {
    console.error("Corrupted cart data encountered; resetting.", err);
    state.cart = [];
  }
}

// ── 8. FORM VALIDATION & CHECKOUT PROCESS ──

/**
 * Validates checkout form data with regex and business rules
 * Requirement: Returns empty string if valid, or clear error message string if invalid
 */
function validateCheckout({ name, phone, area, address }) {
  if (state.cart.length === 0) {
    return "Your cart is empty. Please add dishes before placing an order.";
  }
  if (!name || !name.trim()) {
    return "Please enter your full name.";
  }
  if (!phone || !PHONE_REGEX.test(phone.trim())) {
    return "Enter a valid Ethiopian phone number starting with 09 or 07 (e.g. 0911223344).";
  }
  if (!address || !address.trim()) {
    return "Please specify your delivery address or building name.";
  }
  return ""; // All valid
}

function openCheckoutModal() {
  if (state.cart.length === 0) return;

  // Render modal order summary
  const subtotal = computeCartTotal();
  const delivery = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal + delivery;

  DOM.modalOrderSummary.innerHTML = `
    <div class="summary-box">
      <h4>Order Recap (${state.cart.reduce((s, i) => s + i.qty, 0)} items)</h4>
      <ul>
        ${state.cart.map(i => `<li>${i.icon || "🍲"} ${i.name} × ${i.qty} — <strong>${i.price * i.qty} ETB</strong></li>`).join("")}
      </ul>
      <div class="summary-line"><span>Subtotal:</span> <span>${subtotal} ETB</span></div>
      <div class="summary-line"><span>Delivery:</span> <span>${delivery === 0 ? "FREE" : delivery + " ETB"}</span></div>
      <div class="summary-line grand"><span>Total Payable:</span> <span>${grandTotal} ETB</span></div>
    </div>
  `;

  if (DOM.formError) {
    DOM.formError.textContent = "";
    DOM.formError.classList.add("hidden");
  }

  DOM.checkoutModal.showModal();
}

function closeCheckoutModal() {
  DOM.checkoutModal.close();
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById("cust-name");
  const phoneInput = document.getElementById("cust-phone");
  const areaSelect = document.getElementById("cust-area");
  const addressInput = document.getElementById("cust-address");
  const notesInput = document.getElementById("cust-notes");

  const formData = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    area: areaSelect.value,
    address: addressInput.value.trim(),
    notes: notesInput.value.trim()
  };

  const errorMsg = validateCheckout(formData);

  if (errorMsg) {
    if (DOM.formError) {
      DOM.formError.textContent = errorMsg;
      DOM.formError.classList.remove("hidden");
    }
    return;
  }

  // Clear error
  if (DOM.formError) {
    DOM.formError.textContent = "";
    DOM.formError.classList.add("hidden");
  }

  // Place Order
  placeOrder(formData);
}

function placeOrder(customerData) {
  const subtotal = computeCartTotal();
  const deliveryFee = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  const order = {
    orderId: "AE-" + Math.floor(100000 + Math.random() * 900000),
    placedAt: new Date().toISOString(),
    customer: customerData,
    items: [...state.cart],
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    total: grandTotal,
    paymentMethod: "TeleBirr Instant Payment"
  };

  console.log("Order placed successfully:", order);

  // Close form modal
  closeCheckoutModal();

  // Clear cart and state
  clearCart();

  // Show confirmation modal
  showOrderConfirmation(order);
}

function showOrderConfirmation(order) {
  if (!DOM.receiptDetails) return;

  DOM.receiptDetails.innerHTML = `
    <div class="receipt-header">
      <span class="receipt-id">Order ID: <strong>${order.orderId}</strong></span>
      <span class="receipt-time">${new Date(order.placedAt).toLocaleTimeString()}</span>
    </div>
    <div class="receipt-body">
      <p><strong>Customer:</strong> ${order.customer.name} (${order.customer.phone})</p>
      <p><strong>Delivery Location:</strong> ${order.customer.area}, ${order.customer.address}</p>
      <p><strong>Payment Status:</strong> TeleBirr Prompt Sent 📱</p>
      <hr style="margin: 0.75rem 0; border: none; border-top: 1px dashed var(--border-color);" />
      <div class="receipt-items">
        ${order.items.map(item => `<div>${item.name} × ${item.qty} — ${item.price * item.qty} ETB</div>`).join("")}
      </div>
      <hr style="margin: 0.75rem 0; border: none; border-top: 1px dashed var(--border-color);" />
      <div class="receipt-total">
        <span>Grand Total Paid:</span>
        <strong style="color: var(--accent-green); font-size: 1.1rem;">${order.total} ETB</strong>
      </div>
    </div>
  `;

  DOM.successModal.showModal();
}

// ── 9. EVENT LISTENERS SETUP ──

function setupEventListeners() {
  // Live Search Input
  DOM.searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    DOM.clearSearchBtn.classList.toggle("hidden", state.search === "");
    renderMenu();
  });

  // Clear Search Button
  DOM.clearSearchBtn.addEventListener("click", () => {
    state.search = "";
    DOM.searchInput.value = "";
    DOM.clearSearchBtn.classList.add("hidden");
    renderMenu();
  });

  // Category Filter Pills Delegation
  DOM.categoryPills.addEventListener("click", (e) => {
    const pill = e.target.closest(".category-pill");
    if (!pill) return;

    document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");

    state.category = pill.dataset.category || "All";
    renderMenu();
  });

  // Menu Grid Event Delegation (Add to cart)
  DOM.menuGrid.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-to-cart-btn");
    if (!addBtn) return;
    const dishId = Number(addBtn.dataset.id);
    addToCart(dishId);
  });

  // Cart Panel Delegation (Qty increase, decrease, remove)
  DOM.cartItems.addEventListener("click", (e) => {
    const incBtn = e.target.closest(".inc-qty-btn");
    if (incBtn) {
      updateQuantity(Number(incBtn.dataset.id), 1);
      return;
    }

    const decBtn = e.target.closest(".dec-qty-btn");
    if (decBtn) {
      updateQuantity(Number(decBtn.dataset.id), -1);
      return;
    }

    const rmBtn = e.target.closest(".remove-btn");
    if (rmBtn) {
      removeFromCart(Number(rmBtn.dataset.id));
      return;
    }
  });

  // Clear Cart Button
  if (DOM.clearCartBtn) {
    DOM.clearCartBtn.addEventListener("click", clearCart);
  }

  // Checkout Buttons & Modal Triggers
  if (DOM.checkoutBtn) {
    DOM.checkoutBtn.addEventListener("click", openCheckoutModal);
  }

  if (DOM.closeModalBtn) {
    DOM.closeModalBtn.addEventListener("click", closeCheckoutModal);
  }

  if (DOM.cancelCheckoutBtn) {
    DOM.cancelCheckoutBtn.addEventListener("click", closeCheckoutModal);
  }

  if (DOM.checkoutForm) {
    DOM.checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  }

  if (DOM.closeSuccessBtn) {
    DOM.closeSuccessBtn.addEventListener("click", () => DOM.successModal.close());
  }
}

// ── 10. INITIALIZATION ──

async function init() {
  loadCart();             // 1. Restore saved cart from localStorage
  setupEventListeners();  // 2. Attach DOM event listeners
  await loadMenu();       // 3. Fetch menu JSON data and render UI
}

document.addEventListener("DOMContentLoaded", init);
