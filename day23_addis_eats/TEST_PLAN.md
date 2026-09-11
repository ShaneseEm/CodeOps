# 📋 Addis Eats — Manual Test Plan & QA Verification

**Module 2 · Day 24 (Project Phase 2 / Milestone 2)**  
*CodeOps · Full Stack Software Development*

---

## 🛠 Test Execution Matrix

| Test ID | Feature Area | Step / User Action | Expected Behavior | Pass/Fail |
| :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Cart Operations | Click `+ Add` on a dish card | Dish added to cart, quantity = 1, live total updates in ETB | ✅ PASS |
| **TC-02** | Quantity Controls | Click `+` or `-` in cart line item | Quantity increments/decrements; line item total & grand total recalculates | ✅ PASS |
| **TC-03** | Item Removal | Click `✕` remove button on cart item | Item removed from cart; total updates; empty cart message shown if last item | ✅ PASS |
| **TC-04** | Cart Persistence | Add dishes to cart and reload browser page | Cart contents, item quantities, and total restored from `localStorage` (`addiseats`) | ✅ PASS |
| **TC-05** | Search Filter | Type `"Kitfo"` or `"Shiro"` into search bar | Menu grid filters live to matching dishes; count badge updates | ✅ PASS |
| **TC-06** | Search Empty State | Search for non-existent term (e.g. `"Pizza"`) | Display friendly empty state ("No dishes found matching search term") | ✅ PASS |
| **TC-07** | Category Filter | Click `"Vegetarian"` category pill | Menu filters to show only vegetarian dishes | ✅ PASS |
| **TC-08** | Checkout Validation (Empty Cart) | Attempt to open or submit checkout with empty cart | Checkout button disabled; attempt blocked with alert/guard clause | ✅ PASS |
| **TC-09** | Checkout Validation (Invalid Phone) | Enter name `"Abebe"` and invalid phone `"12345"` | Validation stops submit; error message displayed in `#form-error` ("Enter a valid Ethiopian phone") | ✅ PASS |
| **TC-10** | Checkout Success Flow | Enter valid name and Ethiopian phone (`0911223344`) | Order placed; order object logged; confirmation dialog shown; cart cleared | ✅ PASS |
| **TC-11** | Error Handling (API Down) | Simulate network failure / broken URL in `loadMenu()` | Loading spinner replaced with calm error state & "Retry Loading" button | ✅ PASS |
| **TC-12** | Responsive Layout | Resize viewport from desktop to mobile (375px) | Layout switches to single column; mobile cart toggle badge functions | ✅ PASS |

---

## 📌 Checklist Summary
- [x] Runs with no console errors.
- [x] All 12 test cases executed and passed cleanly.
- [x] Code refactored with guard clauses and named constants (`FREE_DELIVERY_OVER`, `DELIVERY_FEE`, `PHONE_REGEX`, `STORAGE_KEY`).
- [x] Verified on desktop and mobile viewports.
