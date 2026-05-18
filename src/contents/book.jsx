import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import Chapter from "./chapter/chapter";
import storiesData from "./chapter/stories.json";
import ChoiceCard from "./events/choicecard";
import Events from "./events/events";
import TheEnd from "./events/theend";
import GameError from "./errors/game-error";
import ConfirmModal from "./ui/confirm-modal";
import SiteSignature from "./ui/site-signature";
import { updateInventoryFromChoices } from "../game/inventory";
import {
  addChoiceToHistory,
  getDisplayChoices,
  getStoryById,
} from "../game/storyNavigation";
import {
  BACKGROUND_BY_CHAPTER_ID,
  BACKGROUNDS,
  CHAPTER_IDS,
} from "../game/storyConstants";
import { getActionFromResultKey } from "../game/resolveAction";

function Book(props) {
  const perso = props.perso;
  const stories = storiesData;

  const [choice, setChoice] = useState(CHAPTER_IDS.START);
  const [isReadingChapter, setIsReadingChapter] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [win, setWin] = useState(true);
  const [action, setAction] = useState("");
  const [choiceAlreadyDone, setChoiceAlreadyDone] = useState([]);
  const [previousActionText, setPreviousActionText] = useState(
    getStoryById(stories, CHAPTER_IDS.START).txt
  );
  const [storyEnd, setStoryEnd] = useState(false);
  const [activeBackground, setActiveBackground] = useState(BACKGROUNDS.HOUSE);
  const [choiceAfterDiceRoll, setChoiceAfterDiceRoll] = useState(null);
  const [pendingChoice, setPendingChoice] = useState(null);
  const save = useRef([]);

  const currentStories = getStoryById(stories, choice);

  const handleDiceRollComplete = useCallback(() => {
    setChoiceAfterDiceRoll(choice);
  }, [choice]);

  useEffect(() => {
    const nextBackground = BACKGROUND_BY_CHAPTER_ID[choiceAfterDiceRoll];

    if (nextBackground) {
      setActiveBackground(nextBackground);
    }
  }, [choiceAfterDiceRoll]);

  useEffect(() => {
    setInventory((currentInventory) =>
      updateInventoryFromChoices(currentInventory, choiceAlreadyDone)
    );
  }, [choiceAlreadyDone]);

  function goToChapter(newChapter) {
    setChoice(newChapter);
    setIsReadingChapter((wasReadingChapter) => !wasReadingChapter);
  }

  const handleStoryEnd = useCallback((isEnd) => {
    setStoryEnd(isEnd);
  }, []);

  function recordChoice(chapterId) {
    setChoiceAlreadyDone((prevChoices) =>
      addChoiceToHistory(prevChoices, chapterId)
    );
  }

  function applyChoice(displayChoice) {
    goToChapter(displayChoice.targetChapter);

    if (!displayChoice.skipHistory) {
      recordChoice(displayChoice.targetChapter);
    }
  }

  function activateChoice(displayChoice) {
    if (displayChoice.requiresConfirmation) {
      setPendingChoice(displayChoice);
      return;
    }

    applyChoice(displayChoice);
  }

  function confirmPendingChoice() {
    if (pendingChoice) {
      applyChoice(pendingChoice);
      setPendingChoice(null);
    }
  }

  function handleDiceFromEvent(actionResolution) {
    const resultKey = actionResolution.resultKey;
    const resultText = currentStories[resultKey]?.[0];

    setIsReadingChapter(actionResolution.isReadingChapter);
    setAction(getActionFromResultKey(resultKey));
    setWin(resultKey.endsWith("_w"));

    if (resultText) {
      setPreviousActionText(resultText);
    }
  }

  const displayChoices = useMemo(
    () =>
      getDisplayChoices({
        currentStory: currentStories,
        win,
        action,
        choiceAlreadyDone,
      }),
    [currentStories, win, action, choiceAlreadyDone]
  );

  useEffect(() => {
    const lastSavedStep = save.current[save.current.length - 1];

    if (lastSavedStep?.[0] !== previousActionText) {
      save.current.push([previousActionText, choice, perso]);
    }
  }, [choice, perso, previousActionText]);

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
    <div className={`d-flex flex-column main-content ${activeBackground}`}>
      {isReadingChapter ? (
        <Chapter
          where={currentStories.card_context}
          what={currentStories.mj_question}
          chpt={currentStories.numero_chapitre}
          txt={previousActionText}
          mj={currentStories.mj_question}
          perso={perso}
          inventory={inventory}
        />
      ) : (
        <Events
          perso={perso}
          choice={currentStories}
          onSendData={handleDiceFromEvent}
          actions={currentStories.actions}
          save={save.current}
          inventory={inventory}
          where={currentStories.card_context}
          onDiceRollComplete={handleDiceRollComplete}
          onStoryEnd={handleStoryEnd}
        />
      )}
      {isReadingChapter && (
        <div className="d-flex flex-row overflow-x-auto overflow-y-hidden align-items-center justify-content-evenly footer-content h-35 w-100">
          {displayChoices.map((displayChoice) => (
            <ChoiceCard
              key={displayChoice.id}
              content={displayChoice.label}
              choiceCss="cardChoiceSize"
              choiceType={displayChoice.type}
              sketchType={displayChoice.sketchType}
              flavorText={displayChoice.flavorText}
              onActivate={() => activateChoice(displayChoice)}
            />
          ))}
        </div>
      )}
      <ConfirmModal
        isOpen={Boolean(pendingChoice)}
        title="Confirmer ce choix"
        message={
          pendingChoice
            ? `Tu vas choisir : ${pendingChoice.label}`
            : ""
        }
        confirmLabel="Continuer"
        cancelLabel="Annuler"
        onConfirm={confirmPendingChoice}
        onCancel={() => setPendingChoice(null)}
      />
      <SiteSignature />
    </div>
  ) : (
    <TheEnd save={save} inventory={inventory} />
  );
}

export default Book;
