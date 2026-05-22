import { updateInventoryFromChoices } from "./inventory.js";
import {
  BACKGROUND_BY_CHAPTER_ID,
  BACKGROUNDS,
  CHAPTER_IDS,
} from "./storyConstants.js";
import { addChoiceToHistory, getStoryById } from "./storyNavigation.js";

export const GAME_ACTIONS = {
  CLOSE_CONFIRMATION: "close-confirmation",
  CLOSE_JOURNAL: "close-journal",
  CONFIRM_CHOICE: "confirm-choice",
  FINISH_GAME: "finish-game",
  GO_TO_CHAPTER: "go-to-chapter",
  OPEN_CONFIRMATION: "open-confirmation",
  OPEN_JOURNAL: "open-journal",
  RECORD_DICE_ROLL: "record-dice-roll",
  RECORD_STORY_STEP: "record-story-step",
  RESOLVE_ACTION_RESULT: "resolve-action-result",
  UPDATE_BACKGROUND: "update-background",
};

// Centralises the defaults used when a new game starts or a saved game is
// incomplete. Transient UI state is reset even when a playable save is restored.
export function createInitialGameState({ perso, initialGameState, storyIndex }) {
  const startStory = getStoryById(storyIndex, CHAPTER_IDS.START);

  return {
    action: initialGameState?.action || "",
    activeBackground: initialGameState?.activeBackground || BACKGROUNDS.HOUSE,
    choice: initialGameState?.choice || CHAPTER_IDS.START,
    choiceAfterDiceRoll: initialGameState?.choiceAfterDiceRoll || null,
    choiceAlreadyDone: initialGameState?.choiceAlreadyDone || [],
    inventory: initialGameState?.inventory || [],
    isReadingChapter: initialGameState?.isReadingChapter ?? true,
    pendingChoice: null,
    perso,
    previousActionText: initialGameState?.previousActionText || startStory.txt,
    rollHistory: initialGameState?.rollHistory || [],
    isJournalOpen: false,
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
    choiceAfterDiceRoll: state.choiceAfterDiceRoll,
    choiceAlreadyDone: state.choiceAlreadyDone,
    inventory: state.inventory,
    isReadingChapter: state.isReadingChapter,
    perso: state.perso,
    previousActionText: state.previousActionText,
    rollHistory: state.rollHistory,
    storyEnd: state.storyEnd,
    storyHistory: state.storyHistory,
    win: state.win,
  };
}

// Applying a choice is more than changing chapter: it also updates technical
// history and any inventory consequence tied to visited chapters.
function applyDisplayChoice(state, displayChoice) {
  if (!displayChoice?.targetChapter) {
    return state;
  }

  const choiceAlreadyDone = displayChoice.skipHistory
    ? state.choiceAlreadyDone
    : addChoiceToHistory(state.choiceAlreadyDone, displayChoice.targetChapter);

  return {
    ...state,
    choice: displayChoice.targetChapter,
    choiceAlreadyDone,
    inventory: updateInventoryFromChoices(state.inventory, choiceAlreadyDone),
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

    case GAME_ACTIONS.RECORD_DICE_ROLL:
      return {
        ...state,
        rollHistory: [...state.rollHistory, action.payload],
      };

    case GAME_ACTIONS.RESOLVE_ACTION_RESULT:
      return {
        ...state,
        action: action.payload.action,
        isReadingChapter: action.payload.isReadingChapter,
        previousActionText:
          action.payload.previousActionText || state.previousActionText,
        win: action.payload.win,
      };

    case GAME_ACTIONS.UPDATE_BACKGROUND: {
      const chapterId = action.payload?.chapterId;
      const nextBackground = BACKGROUND_BY_CHAPTER_ID[chapterId];

      // Backgrounds only change for a few narrative milestones. Unknown chapters
      // intentionally keep the current mood.
      return {
        ...state,
        activeBackground: nextBackground || state.activeBackground,
        choiceAfterDiceRoll: chapterId || state.choiceAfterDiceRoll,
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
