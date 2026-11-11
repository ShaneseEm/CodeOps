export default function Receipt({ cartTotal, onHome }) {
  const orderId = `AE-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div
      role="status"
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        padding: "2rem",
        borderRadius: "12px",
        border: "2px solid #059669",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎉</div>
      <h2 style={{ margin: "0 0 0.5rem 0", color: "#065f46" }}>Order Confirmed!</h2>
      <p style={{ margin: "0 0 1rem 0", color: "#047857", fontWeight: 600 }}>
        Order ID: {orderId}
      </p>
      <p style={{ margin: "0 0 1.5rem 0", color: "#4b5563", fontSize: "0.95rem" }}>
        Total Paid: <strong>{cartTotal} ETB</strong> via TeleBirr. Driver dispatched!
      </p>

      <button
        type="button"
        onClick={onHome}
        style={{
          padding: "0.65rem 1.5rem",
          backgroundColor: "#059669",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Back to Menu
      </button>
    </div>
  );
}
