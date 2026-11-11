import { forwardRef } from "react";

/**
 * Field.jsx
 *
 * Accessible, reusable form field component adhering to WCAG 2.1 AA standards:
 * - Real <label htmlFor={id}> with visible required asterisk
 * - Input with aria-invalid and aria-describedby pointing to error element
 * - Error message container with role="alert"
 * - Multi-cue visual indication (2px solid red border + alert icon + bold text)
 *   ensuring high usability even on greyscale displays without color.
 */
const Field = forwardRef(function Field(
  {
    id,
    name,
    label,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
    touched,
    required = false,
    placeholder = "",
    as = "input",
    children,
    helpText,
    rows = 3,
  },
  ref
) {
  const isInvalid = Boolean(touched && error);
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  const ariaDescribedBy = [
    isInvalid ? errorId : null,
    helpText ? helpId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const baseInputStyles = {
    width: "100%",
    padding: "0.65rem 0.8rem",
    fontSize: "0.95rem",
    borderRadius: "6px",
    border: isInvalid ? "2px solid #b91c1c" : "1px solid #d1d5db",
    backgroundColor: isInvalid ? "#fff5f5" : "#ffffff",
    color: "#1f2937",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    boxShadow: isInvalid ? "0 0 0 3px rgba(220, 38, 38, 0.2)" : "none",
  };

  return (
    <div style={{ marginBottom: "1.2rem", textAlign: "left" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          marginBottom: "0.35rem",
          fontWeight: 600,
          fontSize: "0.92rem",
          color: "#374151",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#dc2626", marginLeft: "0.25rem" }} aria-hidden="true">
            *
          </span>
        )}
      </label>

      {as === "select" ? (
        <select
          ref={ref}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={isInvalid ? "true" : "false"}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          style={{ ...baseInputStyles, cursor: "pointer" }}
        >
          {children}
        </select>
      ) : as === "textarea" ? (
        <textarea
          ref={ref}
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={isInvalid ? "true" : "false"}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          style={{ ...baseInputStyles, resize: "vertical" }}
        />
      ) : (
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={isInvalid ? "true" : "false"}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          style={baseInputStyles}
        />
      )}

      {helpText && !isInvalid && (
        <p
          id={helpId}
          style={{
            margin: "0.3rem 0 0 0",
            fontSize: "0.8rem",
            color: "#6b7280",
          }}
        >
          {helpText}
        </p>
      )}

      {isInvalid && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            marginTop: "0.35rem",
            color: "#991b1b",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          <span aria-hidden="true" style={{ fontSize: "1rem" }}>⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

export default Field;
