# Mini-Project · The Addis Eats Checkout

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Day 8 Mini-Project*  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/day8/mini-project](https://github.com/ShaneseEm/CodeOps/tree/main/day8/mini-project)

---

## 🎯 Overview

A production-ready checkout form for **Addis Eats** that implements honest state management across all six UX states:
1. **Idle / Pristine**: Clean initial load; empty fields remain quiet without premature nagging.
2. **Editing / Touched**: Errors only appear after a user visits (blurs) a field, then update dynamically as the user types corrections.
3. **Validating / Invalid**: Pure `validate(form)` function re-evaluates synchronously on every render pass; invalid submissions are blocked and automatically focus the first invalid field.
4. **Submitting / In-Flight**: Prevents double orders by disabling the submit button and updating the button text with an animated spinner and the total ETB cost.
5. **Success / Order Placed**: Generates a confirmed order receipt, announces status to screen readers, and clears transient checkout state.
6. **Failure / Server Error**: Simulates network/gateway faults; retains 100% of the user's entered form values, displays an accessible error banner (`role="alert"`), and directs focus back to the offending input.

---

## 📋 Validation Rules & Rationale

| Field | Validation Rule | Why the Rule Exists |
|---|---|---|
| **`name`** (Customer Name) | **Required**, minimum 2 characters, Unicode letters/hyphens/spaces only. | The delivery courier and restaurant dispatch require a verifiable recipient name for order hand-off and phone verification. Empty, single-letter, or symbolic inputs cause lost deliveries. |
| **`phone`** (TeleBirr Mobile) | **Required**, must match Ethiopian telecommunications regex: `^(09\d{8}\|07\d{8}\|\+2519\d{8}\|\+2517\d{8})$`. | TeleBirr mobile money requests are sent directly as USSD push prompts or SMS OTPs to the customer's phone number. An incorrect prefix or digit count will cause the payment gateway to fail. |
| **`area`** (Delivery Area) | **Required**, must be one of the four active delivery zones: `"Bole"`, `"Kazanchis"`, `"Megenagna"`, or `"Piassa"`. | Addis Eats dispatch operations and motorbike delivery fleets are strictly constrained to these four operational hubs. Orders placed outside these zones cannot be fulfilled. |
| **`notes`** (Delivery Instructions) | **Optional**, maximum 200 characters. | Special instructions (gate codes, floor numbers, landmarks) must fit cleanly on standard thermal kitchen printers and mobile SMS dispatch messages without truncation. |

---

## ♿ Accessibility & ARIA Architecture

- **Real Labels**: Every interactive element is explicitly coupled with a `<label htmlFor="...">`.
- **`aria-invalid`**: Dynamically toggled to `"true"` only when a field has both been touched and contains a validation error.
- **`aria-describedby`**: Programmatically points to `${id}-error` when an error is visible, allowing screen readers to immediately announce the fix requirement upon focus.
- **`role="alert"` / `aria-live="polite"`**: Live error messages and submission banners announce status changes immediately without requiring manual page navigation.
- **Greyscale Non-Color Visual Affordances**: Uses high-contrast 2px solid borders, box-shadow rings, and visible warning icons (`⚠️`) so color-blind users and monochrome display users can identify errors effortlessly.

---

## ✅ "Check Yourself" Verification Answers

| Question | Status | Verification Details |
|---|:---:|---|
| **Does pressing Enter in a text field submit the form?** | ✅ | Yes. All inputs sit inside a standard `<form onSubmit={handleSubmit}>`, which native browsers automatically submit on Enter press. |
| **Can you complete the whole form using only the keyboard?** | ✅ | Yes. Full `Tab` navigation order is maintained between Name -> Phone -> Area dropdown -> Notes -> Submit button. |
| **Does an untouched empty field stay quiet until you leave it?** | ✅ | Yes. The `show(field)` helper relies on `touched[field] && errors[field]`. A pristine form shows zero error messages until an input loses focus (`onBlur`). |
| **Does a corrected field clear its message immediately?** | ✅ | Yes. Because `validate(form)` is a pure function executed during render, typing a valid value immediately clears `errors[field]`, instantly removing the error UI on the next keystroke. |
| **Does pressing Order twice quickly send only one order?** | ✅ | Yes. The `handleSubmit` function guards with `if (isSubmitting) return;` and immediately toggles `isSubmitting = true`, disabling the button and preventing double-clicks. |
| **After a simulated failure, is every value still in the form?** | ✅ | Yes. The failure handler catches the error, renders the server banner, and leaves `form` state untouched without resetting input fields. |
| **Turn the screen greyscale — can you still tell which field is wrong?** | ✅ | Yes! Built-in **"Audit Greyscale 👁️"** toggle demonstrates that the 2px thick border, outline ring, and prominent ⚠️ icon clearly signal errors even without color. |

---

## 📁 Files Included

- `Checkout.jsx`: Complete checkout component with honest six-state management.
- `validate.js`: Pure function containing all 4 validation rules and zone constraints.
- `Field.jsx`: Reusable WCAG AA accessible input component with ARIA bindings and error announcements.
- `README.md`: Architectural documentation and self-check audit answers.
