import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Exercise 7: Build a dish modal with createPortal,
 * closing on Escape and returning focus on exit.
 */
function Modal({ isOpen, onClose, dish, triggerRef }) {
  const closeButtonRef = useRef(null);
  const modalBoxRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Store last active trigger to return focus on unmount
    const previouslyFocused = triggerRef?.current || document.activeElement;

    // 2. Focus first focusable element inside modal
    closeButtonRef.current?.focus();

    // 3. Escape key listener & focus trapping
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap focus inside modal
      if (e.key === "Tab" && modalBoxRef.current) {
        const focusable = modalBoxRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Return focus to trigger button upon close
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen || !dish) return null;

  // Render to document.body via createPortal
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        ref={modalBoxRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "1.5rem",
          maxWidth: "420px",
          width: "90%",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 id="modal-title" style={{ margin: 0 }}>{dish.name}</h3>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close modal"
            style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        <p style={{ margin: "1rem 0", color: "#4b5563" }}>{dish.description}</p>
        <p style={{ fontWeight: 700, fontSize: "1.1rem", color: "#b84a2e" }}>Price: {dish.price} ETB</p>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{ padding: "0.5rem 1rem", background: "#e5e7eb", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Cancel (Esc)
          </button>
          <button
            onClick={() => {
              alert(`Added ${dish.name} to order!`);
              onClose();
            }}
            style={{ padding: "0.5rem 1rem", background: "#b84a2e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Exercise7_PortalDishModal() {
  const [selectedDish, setSelectedDish] = useState(null);
  const triggerButtonRefs = useRef({});

  const sampleDishes = [
    { id: 1, name: "Special Doro Wat", price: 380, description: "Slow-cooked organic chicken simmered in rich spicy berbere sauce with hard-boiled eggs." },
    { id: 2, name: "Gored Gored", price: 420, description: "Prime beef cubes warmed in spiced clarified butter (niter kibbeh) and mitmita." },
  ];

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 7: Dish Modal with createPortal</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Rendered into <code>document.body</code> via <code>createPortal</code>. Accessible via keyboard: traps focus, closes on <kbd>Esc</kbd>, and restores focus to the trigger button on close.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {sampleDishes.map((dish) => (
          <div key={dish.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
            <div>
              <strong>{dish.name}</strong> — {dish.price} ETB
            </div>
            <button
              ref={(el) => (triggerButtonRefs.current[dish.id] = el)}
              onClick={() => setSelectedDish(dish)}
              style={{ padding: "0.4rem 0.8rem", background: "#1f2937", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              View Modal
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={Boolean(selectedDish)}
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        triggerRef={{ current: selectedDish ? triggerButtonRefs.current[selectedDish.id] : null }}
      />
    </div>
  );
}
