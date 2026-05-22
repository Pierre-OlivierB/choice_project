import test from "node:test";
import assert from "node:assert/strict";
import {
  GAME_ACTIONS,
  createInitialGameState,
  createSaveableGameState,
  gameReducer,
} from "./gameState.js";
import { BACKGROUNDS, CHAPTER_IDS } from "./storyConstants.js";
import { createStoryIndex } from "./storyNavigation.js";

const stories = createStoryIndex([
  {
    numero_chapitre: CHAPTER_IDS.START,
    txt: "Tu te reveilles.",
  },
]);

test("createInitialGameState creates defaults for a new game", () => {
  const perso = { name: "Chris" };
  const state = createInitialGameState({ perso, storyIndex: stories });

  assert.equal(state.choice, CHAPTER_IDS.START);
  assert.equal(state.isReadingChapter, true);
  assert.equal(state.activeBackground, BACKGROUNDS.HOUSE);
  assert.equal(state.previousActionText, "Tu te reveilles.");
  assert.equal(state.perso, perso);
  assert.deepEqual(state.storyHistory, []);
  assert.deepEqual(state.rollHistory, []);
});

test("createInitialGameState restores saved values", () => {
  const savedState = {
    action: "c",
    activeBackground: BACKGROUNDS.CAR,
    choice: "17",
    choiceAfterDiceRoll: "17",
    choiceAlreadyDone: ["1"],
    inventory: ["clef"],
    isReadingChapter: false,
    previousActionText: "Parking.",
    rollHistory: [{ roll: 42 }],
    storyEnd: true,
    storyHistory: [["Parking.", "17"]],
    win: false,
  };

  const state = createInitialGameState({
    perso: { name: "Chris" },
    initialGameState: savedState,
    storyIndex: stories,
  });

  assert.equal(state.choice, "17");
  assert.equal(state.isReadingChapter, false);
  assert.equal(state.previousActionText, "Parking.");
  assert.deepEqual(state.inventory, ["clef"]);
  assert.deepEqual(state.rollHistory, [{ roll: 42 }]);
});

test("createSaveableGameState excludes transient modal state", () => {
  const state = {
    action: "",
    activeBackground: BACKGROUNDS.HOUSE,
    choice: CHAPTER_IDS.START,
    choiceAfterDiceRoll: null,
    choiceAlreadyDone: [],
    inventory: [],
    isReadingChapter: true,
    pendingChoice: { label: "Autour de moi" },
    perso: { name: "Chris" },
    previousActionText: "Tu te reveilles.",
    rollHistory: [],
    storyEnd: false,
    storyHistory: [],
    win: true,
  };

  const snapshot = createSaveableGameState(state);

  assert.equal("pendingChoice" in snapshot, false);
  assert.equal(snapshot.choice, CHAPTER_IDS.START);
});

test("gameReducer opens and closes confirmation", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const pendingChoice = { label: "Autour de moi" };
  const openedState = gameReducer(state, {
    type: GAME_ACTIONS.OPEN_CONFIRMATION,
    payload: pendingChoice,
  });

  assert.equal(openedState.pendingChoice, pendingChoice);
  assert.equal(
    gameReducer(openedState, { type: GAME_ACTIONS.CLOSE_CONFIRMATION })
      .pendingChoice,
    null
  );
});

test("gameReducer goes to a chapter and records the choice", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const nextState = gameReducer(state, {
    type: GAME_ACTIONS.GO_TO_CHAPTER,
    payload: {
      targetChapter: "9",
    },
  });

  assert.equal(nextState.choice, "9");
  assert.equal(nextState.isReadingChapter, false);
  assert.deepEqual(nextState.choiceAlreadyDone, ["9"]);
});

test("gameReducer confirms a pending choice and closes confirmation", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const openedState = gameReducer(state, {
    type: GAME_ACTIONS.OPEN_CONFIRMATION,
    payload: {
      targetChapter: "3",
    },
  });
  const confirmedState = gameReducer(openedState, {
    type: GAME_ACTIONS.CONFIRM_CHOICE,
  });

  assert.equal(confirmedState.choice, "3");
  assert.equal(confirmedState.pendingChoice, null);
  assert.deepEqual(confirmedState.choiceAlreadyDone, ["3"]);
});

test("gameReducer keeps skip-history choices out of history", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const nextState = gameReducer(state, {
    type: GAME_ACTIONS.GO_TO_CHAPTER,
    payload: {
      skipHistory: true,
      targetChapter: "4",
    },
  });

  assert.equal(nextState.choice, "4");
  assert.deepEqual(nextState.choiceAlreadyDone, []);
});

test("gameReducer updates inventory when a choice changes item state", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const keyFoundState = gameReducer(state, {
    type: GAME_ACTIONS.GO_TO_CHAPTER,
    payload: {
      targetChapter: CHAPTER_IDS.DESK_KEY_FOUND,
    },
  });
  const keyUsedState = gameReducer(keyFoundState, {
    type: GAME_ACTIONS.GO_TO_CHAPTER,
    payload: {
      targetChapter: CHAPTER_IDS.KEY_USED,
    },
  });

  assert.deepEqual(keyFoundState.inventory, ["clef"]);
  assert.deepEqual(keyUsedState.inventory, []);
});

test("gameReducer records story steps without duplicate text", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const action = {
    type: GAME_ACTIONS.RECORD_STORY_STEP,
    payload: {
      chapterId: CHAPTER_IDS.START,
      player: { name: "Chris" },
      text: "Tu te reveilles.",
    },
  };
  const firstState = gameReducer(state, action);
  const secondState = gameReducer(firstState, action);

  assert.equal(firstState.storyHistory.length, 1);
  assert.equal(secondState.storyHistory.length, 1);
});

test("gameReducer records dice rolls", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const roll = { actionLabel: "Courir", roll: 42, stat: 75, success: true };
  const nextState = gameReducer(state, {
    type: GAME_ACTIONS.RECORD_DICE_ROLL,
    payload: roll,
  });

  assert.deepEqual(nextState.rollHistory, [roll]);
});

test("gameReducer resolves an action result", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const nextState = gameReducer(state, {
    type: GAME_ACTIONS.RESOLVE_ACTION_RESULT,
    payload: {
      action: "d",
      isReadingChapter: true,
      previousActionText: "Tu avances sans bruit.",
      win: false,
    },
  });

  assert.equal(nextState.action, "d");
  assert.equal(nextState.isReadingChapter, true);
  assert.equal(nextState.previousActionText, "Tu avances sans bruit.");
  assert.equal(nextState.win, false);
});

test("gameReducer updates the active background after a dice chapter", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const nextState = gameReducer(state, {
    type: GAME_ACTIONS.UPDATE_BACKGROUND,
    payload: {
      chapterId: CHAPTER_IDS.PARKING,
    },
  });

  assert.equal(nextState.choiceAfterDiceRoll, CHAPTER_IDS.PARKING);
  assert.equal(nextState.activeBackground, BACKGROUNDS.CAR);
});

test("gameReducer opens journal and finishes game", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const openedState = gameReducer(state, { type: GAME_ACTIONS.OPEN_JOURNAL });
  const closedState = gameReducer(openedState, { type: GAME_ACTIONS.CLOSE_JOURNAL });
  const finishedState = gameReducer(closedState, { type: GAME_ACTIONS.FINISH_GAME });

  assert.equal(openedState.isJournalOpen, true);
  assert.equal(closedState.isJournalOpen, false);
  assert.equal(finishedState.storyEnd, true);
});
