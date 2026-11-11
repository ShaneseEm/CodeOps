# Prog M3-SQ10 S26 · Day 8: The Addis Eats Checkout

**IBT College Canada · CodeOps Full Stack Development**  
*Module 3: React Fundamentals & Form State Architecture*

---

## 📑 Direct Submission Links

1. **Day 8 Exercise Submission Link:**  
   👉 [https://github.com/ShaneseEm/CodeOps/tree/main/day8/exercises](https://github.com/ShaneseEm/CodeOps/tree/main/day8/exercises)

2. **Day 8 Mini-Project Submission Link:**  
   👉 [https://github.com/ShaneseEm/CodeOps/tree/main/day8/mini-project](https://github.com/ShaneseEm/CodeOps/tree/main/day8/mini-project)

---

## 📑 Contents

1. [Part 1: Exercises 1–7 (Moodle Submission Answers)](#part-1-exercises-17-moodle-submission-answers)
   - [Exercise 1: Single State Object Form](#exercise-1-single-state-object-form)
   - [Exercise 2: Controlled Area Select](#exercise-2-controlled-area-select)
   - [Exercise 3: Pure validate(form) Function](#exercise-3-pure-validateform-function)
   - [Exercise 4: Touched on Blur Error Display](#exercise-4-touched-on-blur-error-display)
   - [Exercise 5: Accessible ARIA Wiring](#exercise-5-accessible-aria-wiring)
   - [Exercise 6: Submitting Flag & ETB Total](#exercise-6-submitting-flag--etb-total)
   - [Exercise 7: Simulated Failure with Preserved State](#exercise-7-simulated-failure-with-preserved-state)
2. [Part 2: Mini-Project · The Addis Eats Checkout](#part-2-mini-project--the-addis-eats-checkout)
   - [Validation Rules & Why Each Rule Exists](#validation-rules--why-each-rule-exists)
   - [Self-Check Answers](#self-check-answers)
   - [Files Submitted](#files-submitted)

---

# Part 1: Exercises 1–7 (Moodle Submission Answers)

> **Copy & paste this section directly into your Moodle "Online text" submission box for Day 8 Exercise!**

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/day8/exercises

### Exercise Solutions & Explanations:

1. Build the checkout with name, TeleBirr phone, delivery area and optional notes in one state object:
   - Initialized a unified state object: `const [form, setForm] = useState({ name: "", phone: "", area: "Bole", notes: "" })`.
   - Wired a single dynamic change handler `handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))`.

2. Add a select for the area (Bole, Kazanchis, Megenagna, Piassa) and bind it correctly:
   - Created a controlled `<select name="area" value={form.area} onChange={handleChange}>` rendering options for Bole, Kazanchis, Megenagna, and Piassa.

3. Write validate(form) as a pure function and call it during render:
   - Implemented `export function validate(form)` which returns `{ [field]: error }` with zero side effects.
   - Derived `const errors = validate(form)` directly during render, preventing out-of-sync state and unnecessary useEffect re-renders.

4. Track touched fields on blur and show each error only after its field has been visited:
   - Initialized `const [touched, setTouched] = useState({})`.
   - Updated touched on blur: `onBlur={() => setTouched(t => ({ ...t, [field]: true }))}`.
   - Show logic: `const show = (field) => Boolean(touched[field] && errors[field])`.

5. Label every field and wire aria-invalid, aria-describedby and role="alert":
   - Explicit `<label htmlFor={id}>` for every field.
   - Wired `aria-invalid={show(field) ? "true" : "false"}`.
   - Set `aria-describedby={show(field) ? `${id}-error` : undefined}` pointing to an error banner with `role="alert"`.

6. Add a submitting flag, disable the button, and put the ETB total in its label:
   - Added `const [isSubmitting, setIsSubmitting] = useState(false)`.
   - Disabled button when `isSubmitting` is active to prevent double submissions.
   - Button text displays: `${isSubmitting ? "Processing..." : `Pay with TeleBirr & Place Order (${cartTotal} ETB)`}`.

7. Simulate a failed request: show the reason, keep every value, focus the first bad field:
   - Caught simulated server/network rejection in `handleSubmit`.
   - Rendered failure banner with `role="alert"` while leaving `form` state untouched.
   - Shifted focus programmatically using `fieldRefs.phone.current.focus()`.
```

---

# Part 2: Mini-Project · The Addis Eats Checkout

> **Copy & paste this section directly into your Moodle "Online text" submission box for Day 8 Mini-Project!**

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/day8/mini-project

Files Included:
- Checkout.jsx (Complete honest 6-state checkout form)
- validate.js (Pure validation function for form rules)
- Field.jsx (Accessible reusable input component with WAI-ARIA)
- README.md (Rule rationale & self-check verification)
```

### 📋 Validation Rules & Rationale

1. **`name` (Customer Name):**
   - *Rule:* Required, trimmed length >= 2 characters, Unicode letters/hyphens/spaces.
   - *Why it exists:* Delivery drivers and dispatch coordinators must verify the recipient's identity at drop-off. Empty or single-character names result in misplaced deliveries.

2. **`phone` (TeleBirr Mobile):**
   - *Rule:* Required, matching Ethiopian TeleBirr mobile pattern (`^(09\d{8}|07\d{8}|\+2519\d{8}|\+2517\d{8})$`).
   - *Why it exists:* TeleBirr transactions are triggered via automated USSD push prompts and SMS OTP verification. Invalid phone numbers cause instant gateway rejection.

3. **`area` (Delivery Area):**
   - *Rule:* Required, restricted strictly to `["Bole", "Kazanchis", "Megenagna", "Piassa"]`.
   - *Why it exists:* Addis Eats delivery dispatch operates within designated courier transit routes in Addis Ababa. Orders outside these zones cannot be fulfilled.

4. **`notes` (Special Instructions):**
   - *Rule:* Optional, capped at a maximum of 200 characters.
   - *Why it exists:* Prevents payload overflow and ensures courier instructions (e.g., gate codes, landmarks) fit cleanly on thermal receipts and driver mobile screens.

---

### ✅ Self-Check Answers

| Question | Status | Verification Details |
|---|:---:|---|
| **Does pressing Enter in a text field submit the form?** | ✅ | Yes! Wrapped in a standard `<form onSubmit={handleSubmit}>`, native Enter key submissions work seamlessly. |
| **Can you complete the whole form using only the keyboard?** | ✅ | Yes! Complete Tab index sequence: Name -> Phone -> Area -> Notes -> Submit button. |
| **Does an untouched empty field stay quiet until you leave it?** | ✅ | Yes! Conditioned on `touched[field] && errors[field]`; fresh fields remain quiet until `onBlur`. |
| **Does a corrected field clear its message immediately?** | ✅ | Yes! Derived pure `validate(form)` recomputes on every keystroke, immediately clearing errors. |
| **Does pressing Order twice quickly send only one order?** | ✅ | Yes! `handleSubmit` immediately locks `isSubmitting = true`, disabling button clicks. |
| **After a simulated failure, is every value still in the form?** | ✅ | Yes! All four field values remain in `form` state upon server rejection without data loss. |
| **Turn the screen greyscale — can you still tell which field is wrong?** | ✅ | Yes! Built-in "Audit Greyscale 👁️" toggle demonstrates that 2px thick borders, outline rings, and ⚠️ icons work independently of color. |
