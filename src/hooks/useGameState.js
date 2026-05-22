import { useCallback, useEffect, useMemo, useReducer } from "react";
import { getActionFromResultKey } from "../game/resolveAction";
import { writeGameSnapshot } from "../game/saveGame";
import {
  GAME_ACTIONS,
  createInitialGameState,
  createSaveableGameState,
  gameReducer,
} from "../game/gameState";
import {
  createStoryIndex,
  getDisplayChoices,
  getStoryById,
} from "../game/storyNavigation";

export function useGameState({ perso, initialGameState, stories }) {
  // The hook is the React boundary around the pure game reducer: it prepares
  // derived data, side effects, and event handlers for the UI.
  const storyIndex = useMemo(() => createStoryIndex(stories), [stories]);
  const initialState = useMemo(
    () => createInitialGameState({ perso, initialGameState, storyIndex }),
    [initialGameState, perso, storyIndex]
  );
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const currentStory = getStoryById(storyIndex, state.choice);

  const handleDiceRollComplete = useCallback(() => {
    // The background changes after the dice resolution because the current
    // chapter then represents the new narrative situation.
    dispatch({
      type: GAME_ACTIONS.UPDATE_BACKGROUND,
      payload: { chapterId: state.choice },
    });
  }, [state.choice]);

  const finishGame = useCallback(() => {
    dispatch({ type: GAME_ACTIONS.FINISH_GAME });
  }, []);

  const recordStoryStep = useCallback((text, chapterId, player) => {
    dispatch({
      type: GAME_ACTIONS.RECORD_STORY_STEP,
      payload: { chapterId, player, text },
    });
  }, []);

  const recordDiceRoll = useCallback((roll) => {
    dispatch({
      type: GAME_ACTIONS.RECORD_DICE_ROLL,
      payload: roll,
    });
  }, []);

  function activateChoice(displayChoice) {
    if (displayChoice.requiresConfirmation) {
      dispatch({
        type: GAME_ACTIONS.OPEN_CONFIRMATION,
        payload: displayChoice,
      });
      return;
    }

    dispatch({
      type: GAME_ACTIONS.GO_TO_CHAPTER,
      payload: displayChoice,
    });
  }

  function confirmPendingChoice() {
    dispatch({ type: GAME_ACTIONS.CONFIRM_CHOICE });
  }

  function resolveActionResult(actionResolution) {
    const resultKey = actionResolution.resultKey;
    const resultText = currentStory?.[resultKey]?.[0];

    dispatch({
      type: GAME_ACTIONS.RESOLVE_ACTION_RESULT,
      payload: {
        action: getActionFromResultKey(resultKey),
        isReadingChapter: actionResolution.isReadingChapter,
        previousActionText: resultText,
        win: resultKey.endsWith("_w"),
      },
    });
  }

  const displayChoices = useMemo(
    () =>
      getDisplayChoices({
        currentStory,
        win: state.win,
        action: state.action,
        choiceAlreadyDone: state.choiceAlreadyDone,
      }),
    [currentStory, state.action, state.choiceAlreadyDone, state.win]
  );

  useEffect(() => {
    // The journal records visible narrative text, not every internal state
    // transition. The reducer filters duplicate text.
    recordStoryStep(state.previousActionText, state.choice, perso);
  }, [perso, recordStoryStep, state.choice, state.previousActionText]);

  useEffect(() => {
    // Autosave follows the reducer state so refresh/reprise restores the same
    // playable situation.
    writeGameSnapshot(createSaveableGameState(state));
  }, [state]);

  useEffect(() => {
    // Page changes can otherwise leave the player scrolled into the previous
    // chapter or footer on mobile.
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [state.choice, state.isReadingChapter, state.storyEnd]);

  return {
    activateChoice,
    closeConfirmation: () => dispatch({ type: GAME_ACTIONS.CLOSE_CONFIRMATION }),
    closeJournal: () => dispatch({ type: GAME_ACTIONS.CLOSE_JOURNAL }),
    confirmPendingChoice,
    currentStory,
    displayChoices,
    finishGame,
    handleDiceRollComplete,
    openJournal: () => dispatch({ type: GAME_ACTIONS.OPEN_JOURNAL }),
    recordDiceRoll,
    recordStoryStep,
    resolveActionResult,
    state,
  };
}
