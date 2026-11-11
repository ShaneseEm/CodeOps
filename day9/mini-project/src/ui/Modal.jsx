import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * ui/Modal.jsx
 *
 * Accessible Modal dialog rendered via createPortal into document.body.
 *
 * Key Capabilities:
 * - createPortal: Escapes parent stacking context, cards, and overflow:hidden clipping.
 * - Escape key dismiss: Listens to keydown and executes onClose() on 'Escape'.
 * - Focus Trapping: Loops focus between first and last tabbable elements within the modal.
 * - Focus Return: Automatically returns browser focus to the element that triggered
 *   the modal upon exit, guaranteeing 100% keyboard navigation without touching a mouse.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  triggerRef,
  ariaLabel,
}) {
  const modalBoxRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Capture previously focused element to restore focus on exit
    previouslyFocusedRef.current = triggerRef?.current || document.activeElement;

    // 2. Prevent body scroll while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 3. Focus first focusable element inside modal
    const focusTimer = setTimeout(() => {
      if (modalBoxRef.current) {
        const focusable = modalBoxRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          modalBoxRef.current.focus();
        }
      }
    }, 20);

    // 4. Keyboard Listener: Escape key + Focus Trapping
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && modalBoxRef.current) {
        const focusable = Array.from(
          modalBoxRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          // Shift + Tab: backwards
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: forwards
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      // Restore focus to trigger element
      if (previouslyFocusedRef.current && typeof previouslyFocusedRef.current.focus === "function") {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="presentation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(17, 24, 39, 0.75)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        ref={modalBoxRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "460px",
          padding: "1.75rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          outline: "none",
          position: "relative",
          animation: "modalFadeIn 0.2s ease-out",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f3f4f6",
            paddingBottom: "0.85rem",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#111827", fontWeight: 700 }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal dialog"
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.25rem",
              color: "#6b7280",
              cursor: "pointer",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
            }}
          >
            ✕
          </button>
        </div>

        <div>{children}</div>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
}
