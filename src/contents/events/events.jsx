import { useMemo, useState } from "react";
import ChoiceCard from "./choicecard";
import DicePanel from "./DicePanel";
import GameLayout from "../game/GameLayout";
import GameError from "../errors/game-error";
import { STAT_LABELS } from "../../game/character";
import { RESOLUTION_PHASES, getResolutionPhase } from "../../game/gameState";
import { getCharacterStat } from "../../game/resolveAction";
import { END_ACTION_STAT } from "../../game/storyConstants";
import { getChoiceFlavorText } from "../../game/storyNavigation";
import { useGame } from "../../hooks/useGame";

function Events() {
  const game = useGame();
  const { currentStory: story, state } = game;
  const { perso } = state;
  const [gameError, setGameError] = useState(null);
  const phase = getResolutionPhase(state);

  // Action cards are derived from scenario data and decorated here for display.
  const actionChoices = useMemo(
    () =>
      (story.actions || []).map((action, index) => ({
        id: `${action.stat}-${index}`,
        label: action.label,
        characteristic: action.stat,
        sketchType: action.sketch,
        flavorText: getChoiceFlavorText(action.sketch),
      })),
    [story]
  );

  function handleSelectAction(actionChoice) {
    if (actionChoice.characteristic === END_ACTION_STAT) {
      game.finishGame();
      return;
    }

    const stat = getCharacterStat(perso, actionChoice.characteristic);

    if (!stat) {
      setGameError({
        message: "La caractéristique de cette action est inconnue.",
        detail: `Action : ${actionChoice.label} / Caractéristique : ${actionChoice.characteristic}`,
      });
      return;
    }

    game.selectAction({
      label: actionChoice.label,
      characteristic: actionChoice.characteristic,
      stat,
    });
  }

  if (!actionChoices.length || gameError) {
    return (
      <GameError
        title="Erreur d'action"
        message={gameError?.message || "Aucune action n'est disponible pour ce chapitre."}
        detail={gameError?.detail || `Chapitre : ${story.id}`}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const isChoosing = phase === RESOLUTION_PHASES.CHOOSING;

  return (
    <div className={`game-step game-step--${isChoosing ? "actions" : "dice"}`}>
      <GameLayout>
        <p className="story-text">{story.context}</p>
        <p className="story-question">{story.question}</p>
      </GameLayout>

      {isChoosing ? (
        <div className="card-row" data-count={actionChoices.length}>
          {actionChoices.map((actionChoice) => {
            return (
              <ChoiceCard
                key={actionChoice.id}
                onActivate={() => handleSelectAction(actionChoice)}
                content={actionChoice.label}
                choiceType="action"
                sketchType={actionChoice.sketchType}
                flavorText={actionChoice.flavorText}
                gem={perso[actionChoice.characteristic]}
                typeLine={STAT_LABELS[actionChoice.characteristic]}
              />
            );
          })}
        </div>
      ) : (
        <DicePanel
          key={state.selectedAction?.label}
          onContinue={game.continueAfterRoll}
          onRoll={game.rollDice}
          pendingRoll={state.pendingRoll}
          selectedAction={state.selectedAction}
        />
      )}
    </div>
  );
}

export default Events;
