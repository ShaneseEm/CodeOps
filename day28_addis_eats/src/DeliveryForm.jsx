import { useState } from "react";

// TeleBirr: Ethiopian format 09XXXXXXXX — 10 digits starting with 09
const TELEBIRR_RE = /^09\d{8}$/;

// Ex 6 — controlled form, single state object, one change handler
// Ex 7 — TeleBirr validation, submit disabled until valid
function DeliveryForm() {
  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const phoneValid = TELEBIRR_RE.test(form.phone);
  const canSubmit  = form.name.trim() !== "" && phoneValid && form.area.trim() !== "";

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-card form-success">
        <p>✅ Order placed for <strong>{form.name}</strong>!</p>
        <p>We'll call <strong>{form.phone}</strong> when your delivery is near.</p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h2>Delivery Details</h2>

      <label className="form-label">
        Full Name
        <input
          className="form-input"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Almaz Tadesse"
        />
      </label>

      <label className="form-label">
        TeleBirr Number
        <input
          className={`form-input${form.phone && !phoneValid ? " input-error" : ""}`}
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="09XXXXXXXX"
          maxLength={10}
        />
        {form.phone && !phoneValid && (
          <span className="error-hint">Enter a valid TeleBirr number (09XXXXXXXX)</span>
        )}
      </label>

      <label className="form-label">
        Delivery Area
        <input
          className="form-input"
          type="text"
          name="area"
          value={form.area}
          onChange={handleChange}
          placeholder="e.g. Bole, Piassa, Kazanchis"
        />
      </label>

      <button className="btn-submit" type="submit" disabled={!canSubmit}>
        Place Order
      </button>
    </form>
  );
}

export default DeliveryForm;
