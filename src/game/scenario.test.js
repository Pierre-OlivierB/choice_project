import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  GAME_ACTIONS,
  createInitialGameState,
  gameReducer,
} from "./gameState.js";
import { SKETCHES } from "../contents/events/sketches.js";
import { getResultKey } from "./resolveAction.js";
import { END_ACTION_STAT } from "./storyConstants.js";
import {
  createStoryIndex,
  getChoiceFlavorText,
  getDisplayChoices,
  getResultText,
  getStoryById,
} from "./storyNavigation.js";

const stories = JSON.parse(
  fs.readFileSync(new URL("../contents/chapter/stories.json", import.meta.url))
);
const storyIndex = createStoryIndex(stories);
const playable = stories.filter((story) => story.status !== "draft");
const perso = { name: "Test", constitution: 50, dexterite: 50, intelligence: 50 };

function stateKey(state) {
  return [
    state.choice,
    state.isReadingChapter,
    state.win,
    state.action,
    [...new Set(state.choiceAlreadyDone)].sort().join(","),
    state.inventory.join(","),
  ].join("|");
}

function rollOutcomes(state, story, characteristic) {
  return [true, false].map((success) => {
    const selected = gameReducer(state, {
      type: GAME_ACTIONS.SELECT_ACTION,
      payload: { label: "x", characteristic, stat: 50 },
    });
    const rolled = gameReducer(selected, {
      type: GAME_ACTIONS.ROLL_DICE,
      payload: { roll: success ? 1 : 100 },
    });

    return gameReducer(rolled, {
      type: GAME_ACTIONS.RESOLVE_ACTION_RESULT,
      payload: {
        grantsItem: story.grantsItem,
        previousActionText: getResultText(
          story,
          getResultKey({ characteristic, success })
        ),
      },
    });
  });
}

// Walks every reachable state of the real reducer, both dice outcomes included.
function exploreScenario() {
  const seen = new Set();
  const reached = new Set();
  const endings = new Set();
  const deadEnds = [];
  const stack = [createInitialGameState({ perso, storyIndex })];

  while (stack.length) {
    const state = stack.pop();
    const key = stateKey(state);

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    reached.add(state.choice);
    const story = getStoryById(storyIndex, state.choice);

    if (state.isReadingChapter) {
      const choices = getDisplayChoices({
        currentStory: story,
        win: state.win,
        action: state.action,
        choiceAlreadyDone: state.choiceAlreadyDone,
        inventory: state.inventory,
      });

      if (!choices.length) {
        deadEnds.push(key);
      }

      choices.forEach((payload) =>
        stack.push(gameReducer(state, { type: GAME_ACTIONS.GO_TO_CHAPTER, payload }))
      );
      continue;
    }

    (story.actions || []).forEach(({ stat }) => {
      if (stat === END_ACTION_STAT) {
        endings.add(story.id);
        return;
      }

      stack.push(...rollOutcomes(state, story, stat));
    });
  }

  return { deadEnds, endings, reached };
}

test("every playable state offers a way forward", () => {
  assert.deepEqual(exploreScenario().deadEnds, []);
});

test("every playable chapter can be reached and the three endings exist", () => {
  const { endings, reached } = exploreScenario();

  assert.deepEqual(
    playable.map((story) => story.id).filter((id) => !reached.has(id)),
    []
  );
  assert.deepEqual([...endings].sort(), ["24", "26", "28"]);
});

test("every action has a text for both dice outcomes", () => {
  const missing = playable.flatMap((story) =>
    (story.actions || [])
      .filter(({ stat }) => stat !== END_ACTION_STAT)
      .flatMap(({ stat }) =>
        [true, false]
          .map((success) => getResultKey({ characteristic: stat, success }))
          .filter((key) => !story.results?.[key])
          .map((key) => `${story.id}:${key}`)
      )
  );

  assert.deepEqual(missing, []);
});

test("every card has a drawing and a flavor line", () => {
  const missing = playable
    .flatMap((story) => [...(story.actions || []), ...(story.choices || [])])
    .filter(({ sketch }) => !SKETCHES[sketch] || !getChoiceFlavorText(sketch))
    .map(({ label }) => label);

  assert.deepEqual(missing, []);
});

test("two actions of a chapter never share a drawing", () => {
  const repeated = playable
    .filter((story) => {
      const sketches = (story.actions || []).map(({ sketch }) => sketch);

      return new Set(sketches).size < sketches.length;
    })
    .map((story) => story.id);

  assert.deepEqual(repeated, []);
});

test("every card name fits its name plate", () => {
  const tooLong = playable
    .flatMap((story) => [...(story.actions || []), ...(story.choices || [])])
    .map(({ label }) => label)
    .filter((label) => label.length > 24);

  assert.deepEqual(tooLong, []);
});

test("the key reaches the inventory only after the desk roll", () => {
  const story = getStoryById(storyIndex, "10");
  const state = createInitialGameState({
    perso,
    storyIndex,
    initialGameState: { choice: "10", isReadingChapter: false },
  });
  const [afterRoll] = rollOutcomes(state, story, "dexterite");

  assert.deepEqual(state.inventory, []);
  assert.deepEqual(afterRoll.inventory, ["clef"]);
});
