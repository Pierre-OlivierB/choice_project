import test from "node:test";
import assert from "node:assert/strict";
import {
  addChoiceToHistory,
  createStoryIndex,
  getChoiceFlavorText,
  getDisplayChoices,
  getResultText,
  getStoryById,
} from "./storyNavigation.js";

test("createStoryIndex prepares direct chapter lookup", () => {
  const storyIndex = createStoryIndex([{ id: "2" }, { id: "0" }]);

  assert.deepEqual(getStoryById(storyIndex, "2"), { id: "2" });
});

test("addChoiceToHistory also records the chapters a choice covers", () => {
  assert.deepEqual(addChoiceToHistory([], "2", ["6"]), ["2", "6"]);
});

test("getResultText adds what every outcome has in common", () => {
  const story = { results: { d_w: "Gagné." }, resultEnding: "La suite." };

  assert.equal(getResultText(story, "d_w"), "Gagné.\n\nLa suite.");
});

test("getDisplayChoices prepares normal choices", () => {
  const choices = getDisplayChoices({
    currentStory: {
      id: "0",
      choices: [{ label: "Regarder autour de toi", target: "1", sketch: "observe" }],
    },
    win: true,
    action: "",
    choiceAlreadyDone: [],
  });

  assert.deepEqual(choices[0], {
    id: "choice-1-0",
    label: "Regarder autour de toi",
    targetChapter: "1",
    type: "chapter",
    sketchType: "observe",
    flavorText: "Chercher dans l'ombre.",
    requiresConfirmation: true,
  });
});

test("getDisplayChoices hides visited chapters unless repeatable", () => {
  const currentStory = {
    choices: [
      { label: "Bureau", target: "9" },
      { label: "Porte", target: "15", repeatable: true },
    ],
  };
  const choices = getDisplayChoices({
    currentStory,
    win: true,
    choiceAlreadyDone: ["9", "15"],
  });

  assert.deepEqual(choices.map((choice) => choice.targetChapter), ["15"]);
  assert.equal(choices[0].skipHistory, true);
});

test("getDisplayChoices follows the outcome and action of the last roll", () => {
  const currentStory = {
    choices: [
      { label: "Courir", target: "26", on: "success", onAction: "c" },
      { label: "Rouler", target: "24", on: "success", onAction: "d" },
      { label: "Se battre", target: "27", on: "failure" },
    ],
  };
  const targets = (win, action) =>
    getDisplayChoices({ currentStory, win, action, choiceAlreadyDone: [] }).map(
      (choice) => choice.targetChapter
    );

  assert.deepEqual(targets(true, "d"), ["24"]);
  assert.deepEqual(targets(false, "d"), ["27"]);
});

test("getChoiceFlavorText returns short card flavor", () => {
  assert.equal(getChoiceFlavorText("door-open"), "Franchir le seuil.");
  assert.equal(getChoiceFlavorText("book"), "Tourner la page.");
});

test("getDisplayChoices offers the key only while the player holds it", () => {
  const currentStory = {
    choices: [
      { label: "Utiliser la clef", target: "19", type: "item", requiresItem: "clef" },
    ],
  };
  const choices = (inventory) =>
    getDisplayChoices({ currentStory, win: true, choiceAlreadyDone: [], inventory });

  assert.equal(choices([]).length, 0);
  assert.equal(choices(["clef"])[0].type, "item");
});
