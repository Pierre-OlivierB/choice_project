// Shared modal used for confirmations and compact information panels. It keeps
// one accessible dialog structure for choices, journal, rules, and player stats.
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
  if (!isOpen) {
    return null;
  }

  const closeFromBackdrop = onCancel || onConfirm;

  return (
    <div
      className="confirm-modal-backdrop"
      onClick={closeFromBackdrop}
      role="presentation"
    >
      <section
        aria-modal="true"
        className={`confirm-modal description ${compact ? "confirm-modal--compact" : ""}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-labelledby="confirm-modal-title"
      >
        <h2 id="confirm-modal-title">{title}</h2>
        {children || <p>{message}</p>}
        <div className="confirm-modal-actions">
          {onCancel ? (
            <button className="confirm-modal-secondary" onClick={onCancel} type="button">
              {cancelLabel}
            </button>
          ) : null}
          <button className="confirm-modal-primary" onClick={onConfirm} type="button">
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmModal;
