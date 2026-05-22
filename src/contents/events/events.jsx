import { useMemo, useState } from "react";
import ChoiceCard from "./choicecard";
import PlayerPanel from "../player/player-panel";
import RulesDrawer from "../rules/rules-drawer";
import GameError from "../errors/game-error";
import MobileHud from "../ui/mobile-hud";
import {
  getCharacterStat,
  getResultKey,
  resolveRoll,
  rollD100,
} from "../../game/resolveAction";
import {
  getChoiceFlavorText,
  getChoiceSketchType,
} from "../../game/storyNavigation";

const RESOLUTION_PHASES = {
  CHOOSING: "choosing",
  ROLLING: "rolling",
  RESOLVED: "resolved",
};

function Events(props) {
  const perso = props.perso;
  const story = props.choice;
  const actions = props.actions;
  const inventory = props.inventory;
  const event = props.where;
  const onOpenJournal = props.onOpenJournal;

  const [gameError, setGameError] = useState(null);
  const [dice, setDice] = useState("");
  const [resolutionPhase, setResolutionPhase] = useState(
    RESOLUTION_PHASES.CHOOSING
  );
  const [success, setSuccess] = useState(true);
  const [selectedAction, setSelectedAction] = useState(null);

  // Action cards are derived from scenario data and decorated here for display.
  // The story file stays responsible for labels and characteristics only.
  const actionChoices = useMemo(() => {
    if (!actions?.btn || !actions?.carac) {
      return [];
    }

    return actions.btn.map((label, index) => {
      const sketchType = getChoiceSketchType(label, "action");

      return {
        id: `${actions.carac[index]}-${index}`,
        label,
        characteristic: actions.carac[index],
        sketchType,
        flavorText: getChoiceFlavorText(sketchType),
      };
    });
  }, [actions]);

  function handleClickDice() {
    const result = rollD100();
    const rollSuccess = resolveRoll({ roll: result, stat: selectedAction.stat });

    setDice(result);
    setResolutionPhase(RESOLUTION_PHASES.RESOLVED);
    setSuccess(rollSuccess);
    // The parent stores the roll for the journal and final statistics.
    props.onDiceRolled?.({
      actionLabel: selectedAction.label,
      characteristic: selectedAction.characteristic,
      roll: result,
      stat: selectedAction.stat,
      success: rollSuccess,
    });
    props.onDiceRollComplete();
  }

  function finishGame() {
    // End actions bypass dice resolution and record the final context directly.
    props.onRecordStory?.(event, "fin", perso);

    if (props.onStoryEnd) {
      props.onStoryEnd(true);
    }
  }

  function handleClickContinu() {
    // The compact result key selects the matching narrative field on the
    // current chapter, for example d_w or i_l.
    const next = getResultKey({
      characteristic: selectedAction.characteristic,
      success,
    });

    props.onSendData({
      isReadingChapter: true,
      resultKey: next,
    });
  }

  function handleClickEvent(actionChoice) {
    if (actionChoice.characteristic === "fin") {
      finishGame();
      return;
    }

    const stat = getCharacterStat(perso, actionChoice.characteristic);

    if (!stat) {
      setGameError({
        message: "La caract\u00e9ristique de cette action est inconnue.",
        detail: `Action: ${actionChoice.label} / Caract\u00e9ristique: ${actionChoice.characteristic}`,
      });
      return;
    }

    setResolutionPhase(RESOLUTION_PHASES.ROLLING);
    setSelectedAction({
      ...actionChoice,
      stat,
    });
  }

  if (!actions) {
    return (
      <GameError
        title="Erreur d'action"
        message="Aucune action n'est disponible pour ce chapitre."
        detail={`Chapitre: ${story?.numero_chapitre || "inconnu"}`}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (gameError) {
    return (
      <GameError
        title="Erreur d'action"
        message={gameError.message}
        detail={gameError.detail}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      <section className="game-stage">
        <div className="game-stage-content">
          <MobileHud
            perso={perso}
            inventory={inventory}
            storyHistory={props.storyHistory}
            rollHistory={props.rollHistory}
          />
          <div className="layout-pc-parent game-reading-layout">
            <div className="layout-story-zone">
              <div className="description p-4 max-h-160 overflow-x-auto">
                <p>{story.card_context}</p>
                <p>{story.mj_question}</p>
              </div>
            </div>
            <aside className="layout-side-zone desktop-info-row">
              <PlayerPanel perso={perso} inventory={inventory} />
              <div className="desktop-side-actions">
                <RulesDrawer />
                <button
                  className="desktop-journal-button"
                  onClick={onOpenJournal}
                  type="button"
                >
                  Journal
                </button>
              </div>
              <p className="desktop-journal-count">
                {props.storyHistory.length} entr&eacute;e(s)
              </p>
            </aside>
          </div>
        </div>
      </section>

      {resolutionPhase === RESOLUTION_PHASES.CHOOSING ? (
        <div className="game-choice-strip game-choice-strip--actions">
          {actionChoices.map((actionChoice) => (
            <ChoiceCard
              key={actionChoice.id}
              onActivate={() => handleClickEvent(actionChoice)}
              content={actionChoice.label}
              choiceCss="cardChoiceSizeEvent"
              choiceType="action"
              sketchType={actionChoice.sketchType}
              flavorText={actionChoice.flavorText}
            />
          ))}
        </div>
      ) : (
        <div
          className={`game-choice-strip ${
            resolutionPhase === RESOLUTION_PHASES.RESOLVED
              ? "game-choice-strip--result"
              : ""
          }`}
        >
          {resolutionPhase === RESOLUTION_PHASES.ROLLING ? (
            <>
              <ChoiceCard
                content="D100"
                onActivate={handleClickDice}
                choiceCss="cardChoiceSizeDice"
                choiceType="dice"
                sketchType="dice"
                flavorText={getChoiceFlavorText("dice")}
              />
              <article className="description p-3 dice-explanation">
                <p className="dice-preview">D100</p>
                <p className="dice-explanation-full">Ton choix : {selectedAction.label}</p>
                <p className="dice-explanation-full">
                  Il faut faire moins ou &eacute;gal &agrave; la caract&eacute;ristique : /
                  {selectedAction.stat}
                </p>
                <p className="dice-explanation-compact">Choix : {selectedAction.label}</p>
                <p className="dice-explanation-compact">
                  Objectif : D100 &le; {selectedAction.stat}
                </p>
              </article>
            </>
          ) : (
            <>
              <article
                className={`description result-panel p-4 ${
                  success ? "result-panel--success" : "result-panel--failure"
                }`}
              >
                <div className="d-flex">
                  <p>R&eacute;sultat : </p>
                  <p className="dice-result">{dice}</p>
                  <p>/ {selectedAction.stat}</p>
                </div>
                {success ? (
                  <p>Tu as r&eacute;ussi ton action.</p>
                ) : (
                  <p>Tu as &eacute;chou&eacute; dans ton action.</p>
                )}
              </article>

              <ChoiceCard
                content="Continuer"
                onActivate={handleClickContinu}
                choiceCss="cardChoiceSizeContinu"
                choiceType="continue"
                sketchType="book"
                flavorText={getChoiceFlavorText("book")}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Events;
