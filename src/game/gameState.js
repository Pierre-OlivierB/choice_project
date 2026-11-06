import { addUniqueItem, removeItem } from "./inventory.js";
import { getActionFromResultKey, getResultKey, resolveRoll } from "./resolveAction.js";
import { BACKGROUNDS, START_CHAPTER_ID } from "./storyConstants.js";
import { addChoiceToHistory, getStoryById } from "./storyNavigation.js";

export const GAME_ACTIONS = {
  CLOSE_CONFIRMATION: "close-confirmation",
  CLOSE_JOURNAL: "close-journal",
  CONFIRM_CHOICE: "confirm-choice",
  FINISH_GAME: "finish-game",
  GO_TO_CHAPTER: "go-to-chapter",
  OPEN_CONFIRMATION: "open-confirmation",
  OPEN_JOURNAL: "open-journal",
  RECORD_STORY_STEP: "record-story-step",
  RESOLVE_ACTION_RESULT: "resolve-action-result",
  ROLL_DICE: "roll-dice",
  SELECT_ACTION: "select-action",
};

export const RESOLUTION_PHASES = {
  CHOOSING: "choosing",
  ROLLING: "rolling",
  RESOLVED: "resolved",
};

// The dice cycle lives in the saved state, so a reload resumes on the same step
// and can never offer a second throw.
export function getResolutionPhase(state) {
  if (state.pendingRoll) {
    return RESOLUTION_PHASES.RESOLVED;
  }

  return state.selectedAction
    ? RESOLUTION_PHASES.ROLLING
    : RESOLUTION_PHASES.CHOOSING;
}

// Centralises the defaults used when a new game starts or a saved game is
// incomplete. Transient UI state is reset even when a playable save is restored.
export function createInitialGameState({ perso, initialGameState, storyIndex }) {
  const startStory = getStoryById(storyIndex, START_CHAPTER_ID);

  return {
    action: initialGameState?.action || "",
    activeBackground: initialGameState?.activeBackground || BACKGROUNDS.HOUSE,
    choice: initialGameState?.choice || START_CHAPTER_ID,
    choiceAlreadyDone: initialGameState?.choiceAlreadyDone || [],
    inventory: initialGameState?.inventory || [],
    isJournalOpen: false,
    isReadingChapter: initialGameState?.isReadingChapter ?? true,
    pendingChoice: null,
    pendingRoll: initialGameState?.pendingRoll || null,
    perso,
    previousActionText: initialGameState?.previousActionText || startStory.intro,
    rollHistory: initialGameState?.rollHistory || [],
    selectedAction: initialGameState?.selectedAction || null,
    storyEnd: initialGameState?.storyEnd || false,
    storyHistory: initialGameState?.storyHistory || [],
    win: initialGameState?.win ?? true,
  };
}

// Keeps transient UI state out of localStorage while preserving the playable
// state needed to resume the story.
export function createSaveableGameState(state) {
  return {
    action: state.action,
    activeBackground: state.activeBackground,
    choice: state.choice,
    choiceAlreadyDone: state.choiceAlreadyDone,
    inventory: state.inventory,
    isReadingChapter: state.isReadingChapter,
    pendingRoll: state.pendingRoll,
    perso: state.perso,
    previousActionText: state.previousActionText,
    rollHistory: state.rollHistory,
    selectedAction: state.selectedAction,
    storyEnd: state.storyEnd,
    storyHistory: state.storyHistory,
    win: state.win,
  };
}

// Applying a choice is more than changing chapter: it also updates the visited
// chapters and spends the item the choice consumes.
function applyDisplayChoice(state, displayChoice) {
  if (!displayChoice?.targetChapter) {
    return state;
  }

  return {
    ...state,
    choice: displayChoice.targetChapter,
    choiceAlreadyDone: displayChoice.skipHistory
      ? state.choiceAlreadyDone
      : addChoiceToHistory(
          state.choiceAlreadyDone,
          displayChoice.targetChapter,
          displayChoice.alsoVisits
        ),
    inventory: removeItem(state.inventory, displayChoice.consumesItem),
    isReadingChapter: !state.isReadingChapter,
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTIONS.OPEN_CONFIRMATION:
      return {
        ...state,
        pendingChoice: action.payload,
      };

    case GAME_ACTIONS.CLOSE_CONFIRMATION:
      return {
        ...state,
        pendingChoice: null,
      };

    case GAME_ACTIONS.GO_TO_CHAPTER:
      return applyDisplayChoice(state, action.payload);

    case GAME_ACTIONS.CONFIRM_CHOICE:
      return {
        ...applyDisplayChoice(state, state.pendingChoice),
        pendingChoice: null,
      };

    case GAME_ACTIONS.OPEN_JOURNAL:
      return {
        ...state,
        isJournalOpen: true,
      };

    case GAME_ACTIONS.CLOSE_JOURNAL:
      return {
        ...state,
        isJournalOpen: false,
      };

    case GAME_ACTIONS.RECORD_STORY_STEP: {
      const { text, chapterId, player } = action.payload;
      const lastSavedStep = state.storyHistory[state.storyHistory.length - 1];

      // A chapter can re-render after state changes; duplicate narrative text
      // must not pollute the final prompt or the journal.
      if (lastSavedStep?.[0] === text) {
        return state;
      }

      return {
        ...state,
        storyHistory: [...state.storyHistory, [text, chapterId, player]],
      };
    }

    case GAME_ACTIONS.SELECT_ACTION:
      return {
        ...state,
        selectedAction: action.payload,
      };

    case GAME_ACTIONS.ROLL_DICE: {
      const { selectedAction, pendingRoll } = state;

      // Only one throw per action, whatever the UI sends.
      if (!selectedAction || pendingRoll) {
        return state;
      }

      const { background, roll } = action.payload;
      const rollResult = {
        actionLabel: selectedAction.label,
        characteristic: selectedAction.characteristic,
        roll,
        stat: selectedAction.stat,
        success: resolveRoll({ roll, stat: selectedAction.stat }),
      };

      return {
        ...state,
        // Backgrounds only change on a few chapters; others keep the mood.
        activeBackground: background || state.activeBackground,
        pendingRoll: rollResult,
        rollHistory: [...state.rollHistory, rollResult],
      };
    }

    case GAME_ACTIONS.RESOLVE_ACTION_RESULT: {
      const { pendingRoll } = state;

      if (!pendingRoll) {
        return state;
      }

      const { grantsItem, previousActionText } = action.payload;
      const resultKey = getResultKey({
        characteristic: pendingRoll.characteristic,
        success: pendingRoll.success,
      });

      return {
        ...state,
        action: getActionFromResultKey(resultKey),
        // An item is earned once the player has read how it was found.
        inventory: addUniqueItem(state.inventory, grantsItem),
        isReadingChapter: true,
        pendingRoll: null,
        previousActionText: previousActionText || state.previousActionText,
        selectedAction: null,
        win: pendingRoll.success,
      };
    }

    case GAME_ACTIONS.FINISH_GAME:
      return {
        ...state,
        storyEnd: true,
      };

    default:
      return state;
  }
}
