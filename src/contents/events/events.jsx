import { useMemo, useState } from "react";
import ChoiceCard from "./choicecard";
import PlayerPanel from "../player/player-panel";
import RulesPanel from "../rules/rules-panel";
import GameError from "../errors/game-error";
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
  const save = props.save;
  const inventory = props.inventory;
  const event = props.where;

  const [gameError, setGameError] = useState(null);
  const [dice, setDice] = useState("");
  const [resolutionPhase, setResolutionPhase] = useState(
    RESOLUTION_PHASES.CHOOSING
  );
  const [success, setSuccess] = useState(true);
  const [selectedAction, setSelectedAction] = useState(null);

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
    props.onDiceRollComplete();
  }

  function finishGame() {
    if (save) {
      save.push([event, "fin", perso]);
    }

    if (props.onStoryEnd) {
      props.onStoryEnd(true);
    }
  }

  function handleClickContinu() {
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
        message: "La caracteristique de cette action est inconnue.",
        detail: `Action: ${actionChoice.label} / Caracteristique: ${actionChoice.characteristic}`,
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
      <div className="h-65 w-100">
        <div className="inside-content h-100">
          <div className="row g-0 align-items-center justify-content-center h-50 w-100">
            <div className="col col-12">
              <div className="row g-0">
                <div className="col col-7">
                  <RulesPanel />
                </div>
                <div className="col col-5 d-flex justify-content-center align-items-end p-2">
                  <PlayerPanel perso={perso} inventory={inventory} />
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center h-50 w-100">
            <div className="col col-10 description p-4 max-h-160 overflow-x-auto">
              <p>{story.card_context}</p>
              <p>{story.mj_question}</p>
            </div>
          </div>
        </div>
      </div>

      {resolutionPhase === RESOLUTION_PHASES.CHOOSING ? (
        <div className="d-flex flex-row p-1 overflow-x-auto overflow-y-hidden align-items-center justify-content-evenly footer-content h-35">
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
        <div className="d-flex flex-row p-1 overflow-x-auto overflow-y-hidden align-items-center justify-content-evenly footer-content h-35">
          {resolutionPhase === RESOLUTION_PHASES.ROLLING ? (
            <>
              <ChoiceCard
                content="Lancer le De"
                onActivate={handleClickDice}
                choiceCss="cardChoiceSizeDice"
                choiceType="dice"
                sketchType="dice"
                flavorText={getChoiceFlavorText("dice")}
              />
              <article className="description p-4 max-h-160 overflow-y-auto event-description">
                <p className="dice-preview">D100</p>
                <p>Ton choix : {selectedAction.label}</p>
                <p>
                  Il faut faire moins ou egal a la caracteristique : /
                  {selectedAction.stat}
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
                  <p>Resultat : </p>
                  <p className="dice-result">{dice}</p>
                  <p>/ {selectedAction.stat}</p>
                </div>
                {success ? (
                  <p>Tu as reussi ton action.</p>
                ) : (
                  <p>Tu as echoue dans ton action.</p>
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
