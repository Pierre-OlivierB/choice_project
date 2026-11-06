import test from "node:test";
import assert from "node:assert/strict";
import {
  GAME_ACTIONS,
  RESOLUTION_PHASES,
  createInitialGameState,
  createSaveableGameState,
  gameReducer,
  getResolutionPhase,
} from "./gameState.js";
import { BACKGROUNDS, START_CHAPTER_ID } from "./storyConstants.js";
import { createStoryIndex } from "./storyNavigation.js";

const stories = createStoryIndex([
  {
    id: START_CHAPTER_ID,
    intro: "Tu te reveilles.",
  },
]);

test("createInitialGameState creates defaults for a new game", () => {
  const perso = { name: "Chris" };
  const state = createInitialGameState({ perso, storyIndex: stories });

  assert.equal(state.choice, START_CHAPTER_ID);
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
    choice: START_CHAPTER_ID,
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
  assert.equal(snapshot.choice, START_CHAPTER_ID);
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

test("gameReducer spends the item consumed by a choice", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    initialGameState: { inventory: ["clef"] },
    storyIndex: stories,
  });
  const nextState = gameReducer(state, {
    type: GAME_ACTIONS.GO_TO_CHAPTER,
    payload: { consumesItem: "clef", targetChapter: "19" },
  });

  assert.deepEqual(nextState.inventory, []);
});

test("gameReducer records story steps without duplicate text", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const action = {
    type: GAME_ACTIONS.RECORD_STORY_STEP,
    payload: {
      chapterId: START_CHAPTER_ID,
      player: { name: "Chris" },
      text: "Tu te reveilles.",
    },
  };
  const firstState = gameReducer(state, action);
  const secondState = gameReducer(firstState, action);

  assert.equal(firstState.storyHistory.length, 1);
  assert.equal(secondState.storyHistory.length, 1);
});

function rollWith(roll, stat = 50) {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const selectedState = gameReducer(state, {
    type: GAME_ACTIONS.SELECT_ACTION,
    payload: { label: "Courir", characteristic: "dexterite", stat },
  });

  return gameReducer(selectedState, {
    type: GAME_ACTIONS.ROLL_DICE,
    payload: { roll },
  });
}

test("the dice cycle goes through choosing, rolling and resolved", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const selectedState = gameReducer(state, {
    type: GAME_ACTIONS.SELECT_ACTION,
    payload: { label: "Courir", characteristic: "dexterite", stat: 50 },
  });

  assert.equal(getResolutionPhase(state), RESOLUTION_PHASES.CHOOSING);
  assert.equal(getResolutionPhase(selectedState), RESOLUTION_PHASES.ROLLING);
  assert.equal(getResolutionPhase(rollWith(42)), RESOLUTION_PHASES.RESOLVED);
});

test("gameReducer records the roll and resolves it against the stat", () => {
  const nextState = rollWith(42);

  assert.equal(nextState.pendingRoll.success, true);
  assert.equal(rollWith(51).pendingRoll.success, false);
  assert.deepEqual(nextState.rollHistory, [nextState.pendingRoll]);
});

test("gameReducer refuses a second throw for the same action", () => {
  const rolledState = rollWith(90);
  const nextState = gameReducer(rolledState, {
    type: GAME_ACTIONS.ROLL_DICE,
    payload: { roll: 1 },
  });

  assert.equal(nextState, rolledState);
});

test("a roll in progress survives a save and restore", () => {
  const rolledState = rollWith(90);
  const restoredState = createInitialGameState({
    perso: { name: "Chris" },
    initialGameState: createSaveableGameState(rolledState),
    storyIndex: stories,
  });

  assert.deepEqual(restoredState.pendingRoll, rolledState.pendingRoll);
  assert.equal(getResolutionPhase(restoredState), RESOLUTION_PHASES.RESOLVED);
});

test("createInitialGameState accepts saves without a dice cycle", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    initialGameState: { choice: "17", isReadingChapter: false },
    storyIndex: stories,
  });

  assert.equal(getResolutionPhase(state), RESOLUTION_PHASES.CHOOSING);
});

test("gameReducer resolves an action result and grants its item", () => {
  const nextState = gameReducer(rollWith(90), {
    type: GAME_ACTIONS.RESOLVE_ACTION_RESULT,
    payload: { grantsItem: "clef", previousActionText: "Tu avances sans bruit." },
  });

  assert.equal(nextState.action, "d");
  assert.equal(nextState.isReadingChapter, true);
  assert.equal(nextState.previousActionText, "Tu avances sans bruit.");
  assert.equal(nextState.win, false);
  assert.equal(nextState.pendingRoll, null);
  assert.equal(nextState.selectedAction, null);
  assert.equal(nextState.rollHistory.length, 1);
  assert.deepEqual(nextState.inventory, ["clef"]);
});

test("gameReducer changes the background on a chapter that declares one", () => {
  const state = createInitialGameState({
    perso: { name: "Chris" },
    storyIndex: stories,
  });
  const selectedState = gameReducer(state, {
    type: GAME_ACTIONS.SELECT_ACTION,
    payload: { label: "Forcer", characteristic: "constitution", stat: 50 },
  });
  const nextState = gameReducer(selectedState, {
    type: GAME_ACTIONS.ROLL_DICE,
    payload: { background: BACKGROUNDS.CAR, roll: 10 },
  });

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
