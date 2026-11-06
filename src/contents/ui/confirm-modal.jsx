import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Shared modal used for confirmations and compact information panels. It keeps
// one accessible dialog structure for choices, journal, rules, and player stats.
// The portal keeps it above the tilted, composited cards and panels.
function ConfirmModal({
  isOpen,
  title = "Confirmer",
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
  children,
  compact = false,
}) {
  const confirmRef = useRef(null);
  const close = onCancel || onConfirm;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    confirmRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        close();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close, isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="modal-backdrop" onClick={close} role="presentation">
      <section
        aria-labelledby="modal-title"
        aria-modal="true"
        className={`panel modal ${compact ? "modal--compact" : ""}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <h2 className="modal-title" id="modal-title">
          {title}
        </h2>
        <div className="modal-body">{children || <p>{message}</p>}</div>
        <div className="modal-actions">
          {onCancel ? (
            <button className="button button--ghost" onClick={onCancel} type="button">
              {cancelLabel}
            </button>
          ) : null}
          <button
            className="button button--gold"
            onClick={onConfirm}
            ref={confirmRef}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>,
    document.body
  );
}

export default ConfirmModal;
