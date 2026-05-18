function ConfirmModal({
  isOpen,
  title = "Confirmer",
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-modal-backdrop" role="presentation">
      <section
        aria-modal="true"
        className="confirm-modal description"
        role="dialog"
        aria-labelledby="confirm-modal-title"
      >
        <h2 id="confirm-modal-title">{title}</h2>
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <button className="confirm-modal-secondary" onClick={onCancel} type="button">
            {cancelLabel}
          </button>
          <button className="confirm-modal-primary" onClick={onConfirm} type="button">
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmModal;
