import storiesData from "./chapter/stories.json";
import Events from "./events/events";
import TheEnd from "./events/theend";
import GameError from "./errors/game-error";
import ConfirmModal from "./ui/confirm-modal";
import GameJournalModal from "./game/GameJournalModal";
import GameShell from "./game/GameShell";
import ReadingStep from "./game/ReadingStep";
import { GameContext } from "../hooks/useGame";
import { useGameState } from "../hooks/useGameState";
import { useScrollToTop } from "../hooks/useScrollToTop";

function GameScreen({ game }) {
  const {
    activeBackground,
    choice,
    isReadingChapter,
    pendingChoice,
    previousActionText,
    storyEnd,
  } = game.state;

  useScrollToTop(choice, isReadingChapter, storyEnd);

  // A missing chapter is a content problem, not a runtime crash for the player.
  if (!game.currentStory) {
    return (
      <GameError
        title="Erreur de chapitre"
        message="Le chapitre demandé est introuvable."
        detail={`Chapitre : ${choice}`}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (storyEnd) {
    return <TheEnd />;
  }

  return (
    <GameShell activeBackground={activeBackground} className="game-screen">
      {isReadingChapter ? (
        <ReadingStep key={`${choice}-${previousActionText}`} />
      ) : (
        <Events />
      )}
      <ConfirmModal
        isOpen={Boolean(pendingChoice)}
        title="Confirmer ce choix"
        message={pendingChoice?.label}
        confirmLabel="Continuer"
        cancelLabel="Annuler"
        onConfirm={game.confirmPendingChoice}
        onCancel={game.closeConfirmation}
      />
      <GameJournalModal />
    </GameShell>
  );
}

function Book({ perso, initialGameState }) {
  // State transitions and side effects live in useGameState; Book only exposes
  // the running game to the screens below it.
  const game = useGameState({ initialGameState, perso, stories: storiesData });

  return (
    <GameContext.Provider value={game}>
      <GameScreen game={game} />
    </GameContext.Provider>
  );
}

export default Book;
