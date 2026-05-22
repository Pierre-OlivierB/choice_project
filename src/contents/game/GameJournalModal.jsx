import ConfirmModal from "../ui/confirm-modal";
import GameJournal from "../player/game-journal";

// The journal is opened from several screens. This wrapper keeps the modal
// contract and journal props identical everywhere.
function GameJournalModal({
  isOpen,
  onClose,
  perso,
  inventory,
  storyHistory,
  rollHistory,
}) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Journal"
      confirmLabel="Fermer"
      onConfirm={onClose}
      compact
    >
      <GameJournal
        perso={perso}
        inventory={inventory}
        storyHistory={storyHistory}
        rollHistory={rollHistory}
      />
    </ConfirmModal>
  );
}

export default GameJournalModal;
