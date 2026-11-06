import { useCallback, useEffect, useMemo, useReducer } from "react";
import { getResultKey, rollD100 } from "../game/resolveAction";
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
  getResultText,
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

  const recordStoryStep = useCallback((text, chapterId, player) => {
    dispatch({
      type: GAME_ACTIONS.RECORD_STORY_STEP,
      payload: { chapterId, player, text },
    });
  }, []);

  function activateChoice(displayChoice) {
    dispatch({
      type: displayChoice.requiresConfirmation
        ? GAME_ACTIONS.OPEN_CONFIRMATION
        : GAME_ACTIONS.GO_TO_CHAPTER,
      payload: displayChoice,
    });
  }

  function selectAction(selectedAction) {
    dispatch({ type: GAME_ACTIONS.SELECT_ACTION, payload: selectedAction });
  }

  function rollDice() {
    dispatch({
      type: GAME_ACTIONS.ROLL_DICE,
      payload: { background: currentStory?.background, roll: rollD100() },
    });
  }

  function continueAfterRoll() {
    const { pendingRoll } = state;
    const resultKey = getResultKey({
      characteristic: pendingRoll?.characteristic,
      success: pendingRoll?.success,
    });

    dispatch({
      type: GAME_ACTIONS.RESOLVE_ACTION_RESULT,
      payload: {
        grantsItem: currentStory?.grantsItem,
        previousActionText: getResultText(currentStory, resultKey),
      },
    });
  }

  function finishGame() {
    // End actions bypass the dice and record the final context directly.
    recordStoryStep(currentStory?.context, "fin", perso);
    dispatch({ type: GAME_ACTIONS.FINISH_GAME });
  }

  const displayChoices = useMemo(
    () =>
      getDisplayChoices({
        currentStory,
        win: state.win,
        action: state.action,
        choiceAlreadyDone: state.choiceAlreadyDone,
        inventory: state.inventory,
      }),
    [currentStory, state.action, state.choiceAlreadyDone, state.inventory, state.win]
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

  return {
    activateChoice,
    closeConfirmation: () => dispatch({ type: GAME_ACTIONS.CLOSE_CONFIRMATION }),
    closeJournal: () => dispatch({ type: GAME_ACTIONS.CLOSE_JOURNAL }),
    confirmPendingChoice: () => dispatch({ type: GAME_ACTIONS.CONFIRM_CHOICE }),
    continueAfterRoll,
    currentStory,
    displayChoices,
    finishGame,
    openJournal: () => dispatch({ type: GAME_ACTIONS.OPEN_JOURNAL }),
    rollDice,
    selectAction,
    state,
  };
}
