# Prog M3-SQ10 S26 · Day 8: Exercises (The Addis Eats Checkout)

**IBT College Canada · CodeOps Full Stack Development**  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/day8/exercises](https://github.com/ShaneseEm/CodeOps/tree/main/day8/exercises)

---

## 📝 Moodle Submission Copy-Paste Text

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/day8/exercises

### Day 8 Exercises Solutions & Implementation:

1. Build checkout with name, TeleBirr phone, delivery area, and notes in one state object:
   - Initialized `const [form, setForm] = useState({ name: "", phone: "", area: "Bole", notes: "" })`.
   - Used a single generic `handleChange(e)` function utilizing computed property names `[e.target.name]: e.target.value`.

2. Add a select for area (Bole, Kazanchis, Megenagna, Piassa) and bind it correctly:
   - Created a controlled `<select name="area" value={form.area} onChange={handleChange}>` mapping over the four valid Addis Ababa zones.

3. Write validate(form) as a pure function and call it during render:
   - Implemented `export function validate(form)` with zero side effects.
   - Derived `const errors = validate(form)` directly inside the component body on each render pass, eliminating stale state and synchronization bugs.

4. Track touched fields on blur and show each error only after its field has been visited:
   - Added `const [touched, setTouched] = useState({})`.
   - Attached `onBlur={() => setTouched(t => ({ ...t, [field]: true }))}` to inputs.
   - Derived display visibility using `const show = (field) => touched[field] && errors[field]`.

5. Label every field and wire aria-invalid, aria-describedby and role="alert":
   - Explicit `<label htmlFor={id}>` for every input.
   - Wired `aria-invalid={!show(field)}` and `aria-describedby={show(field) ? `${id}-error` : undefined}`.
   - Error spans/paragraphs configured with `id={`${id}-error`}` and `role="alert"` for screen readers.

6. Submitting flag, disable button, and ETB total in label:
   - Introduced `const [isSubmitting, setIsSubmitting] = useState(false)`.
   - Disabled button when `isSubmitting` is true or when `hasErrors` is true.
   - Dynamic button text shows cart total: `${isSubmitting ? "Processing..." : `Pay & Place Order (${total} ETB)`}`.

7. Simulate a failed request: show reason, keep every value, focus first bad field:
   - Handled network/gateway simulation failure using `try/catch` and `setServerError(reason)`.
   - All input values in `form` are preserved without being cleared.
   - Focused the first invalid field using `useRef` (e.g. `phoneRef.current?.focus()`).
```

---

## 📂 File Index

- `Exercise1_SingleStateForm.jsx`: Controlled 4-field single state form.
- `Exercise2_AreaSelect.jsx`: Controlled select dropdown for Addis Ababa delivery zones.
- `Exercise3_PureValidate.jsx`: Pure validation logic derived on render.
- `Exercise4_TouchedOnBlur.jsx`: Visited field tracking via onBlur.
- `Exercise5_AccessibleAria.jsx`: Full WAI-ARIA compliance (labels, aria-invalid, aria-describedby, role="alert").
- `Exercise6_SubmittingState.jsx`: Submitting flag, button disable, and ETB total integration.
- `Exercise7_SimulatedFailure.jsx`: Failure simulation with preserved state and automatic focus targeting.
- `ExerciseRunner.jsx`: Interactive runner allowing live switching and testing of all 7 exercises.
