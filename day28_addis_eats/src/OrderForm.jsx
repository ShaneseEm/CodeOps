import { useState } from "react";

// TeleBirr numbers: accept 09XXXXXXXX (10 digits) or +2519XXXXXXXX (13 chars)
const TELEBIRR_RE = /^(09\d{8}|\+2519\d{8})$/;

export default function OrderForm() {
  // Controlled form with name, phone and area in ONE state object
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Copy form object with spread operator: { ...prev, [name]: value }
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Live validation of TeleBirr number
  const phoneValid = TELEBIRR_RE.test(form.phone.trim());
  const canSubmit  = form.name.trim() !== "" && phoneValid && form.area.trim() !== "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-card form-success">
        <p>✅ Order placed for <strong>{form.name}</strong>!</p>
        <p>Delivery Area: <strong>{form.area}</strong></p>
        <p>We will call <strong>{form.phone}</strong> when your order is on its way.</p>
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
          placeholder="09XXXXXXXX or +2519XXXXXXXX"
          maxLength={13}
        />
        {form.phone && !phoneValid && (
          <span className="error-hint">
            Must be 09XXXXXXXX (10 digits) or +2519XXXXXXXX (e.g. 0911223344 or +251911223344)
          </span>
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
