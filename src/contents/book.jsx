import Chapter from "./chapter/chapter";
import storiesData from "./chapter/stories.json";
import Events from "./events/events";
import TheEnd from "./events/theend";
import GameError from "./errors/game-error";
import ConfirmModal from "./ui/confirm-modal";
import SiteSignature from "./ui/site-signature";
import ChoiceFooter from "./game/ChoiceFooter";
import GameJournalModal from "./game/GameJournalModal";
import GameShell from "./game/GameShell";
import { useGameState } from "../hooks/useGameState";

function Book(props) {
  const perso = props.perso;
  // Book now composes the game screen; state transitions and side effects live
  // in useGameState so this component stays easy to scan.
  const game = useGameState({
    initialGameState: props.initialGameState,
    perso,
    stories: storiesData,
  });
  const {
    activeBackground,
    choice,
    inventory,
    isReadingChapter,
    isJournalOpen,
    pendingChoice,
    previousActionText,
    rollHistory,
    storyEnd,
    storyHistory,
  } = game.state;
  const currentStories = game.currentStory;

  // A missing chapter is a content problem, not a runtime crash for the player.
  if (!currentStories) {
    return (
      <GameError
        title="Erreur de chapitre"
        message="Le chapitre demande est introuvable."
        detail={`Chapitre: ${choice}`}
        onRetry={() => window.location.reload()}
      />
    );
  }


  return !storyEnd ? (
    <GameShell activeBackground={activeBackground}>
      {isReadingChapter ? (
        <Chapter
          where={currentStories.card_context}
          what={currentStories.mj_question}
          chpt={currentStories.numero_chapitre}
          txt={previousActionText}
          mj={currentStories.mj_question}
          perso={perso}
          inventory={inventory}
          storyHistory={storyHistory}
          rollHistory={rollHistory}
          onOpenJournal={game.openJournal}
        />
      ) : (
        <Events
          perso={perso}
          choice={currentStories}
          onSendData={game.resolveActionResult}
          actions={currentStories.actions}
          inventory={inventory}
          where={currentStories.card_context}
          onDiceRollComplete={game.handleDiceRollComplete}
          onDiceRolled={game.recordDiceRoll}
          onRecordStory={game.recordStoryStep}
          onStoryEnd={game.finishGame}
          storyHistory={storyHistory}
          rollHistory={rollHistory}
          onOpenJournal={game.openJournal}
        />
      )}
      {isReadingChapter ? (
        <ChoiceFooter
          choices={game.displayChoices}
          onActivateChoice={game.activateChoice}
        />
      ) : null}
      <ConfirmModal
        isOpen={Boolean(pendingChoice)}
        title="Confirmer ce choix"
        message={pendingChoice ? `Tu vas choisir : ${pendingChoice.label}` : ""}
        confirmLabel="Continuer"
        cancelLabel="Annuler"
        onConfirm={game.confirmPendingChoice}
        onCancel={game.closeConfirmation}
      />
      <SiteSignature />
      <GameJournalModal
        isOpen={isJournalOpen}
        onClose={game.closeJournal}
        perso={perso}
        inventory={inventory}
        storyHistory={storyHistory}
        rollHistory={rollHistory}
      />
    </GameShell>
  ) : (
    <TheEnd save={storyHistory} inventory={inventory} rollHistory={rollHistory} />
  );
}

export default Book;
