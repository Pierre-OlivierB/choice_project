import ConfirmModal from "../ui/confirm-modal";
import GameJournal from "../player/game-journal";
import { useGame } from "../../hooks/useGame";

// The journal is opened from several screens; its state lives with the game.
function GameJournalModal() {
  const { closeJournal, state } = useGame();

  return (
    <ConfirmModal
      isOpen={state.isJournalOpen}
      title="Journal"
      confirmLabel="Fermer"
      onConfirm={closeJournal}
      compact
    >
      <GameJournal
        perso={state.perso}
        inventory={state.inventory}
        storyHistory={state.storyHistory}
        rollHistory={state.rollHistory}
      />
    </ConfirmModal>
  );
}

export default GameJournalModal;
