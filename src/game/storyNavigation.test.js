import test from "node:test";
import assert from "node:assert/strict";
import {
  addChoiceToHistory,
  createStoryIndex,
  getChoiceFlavorText,
  getChoiceSketchType,
  getDisplayChoices,
  getStoryById,
} from "./storyNavigation.js";
import { CHAPTER_IDS } from "./storyConstants.js";

test("getStoryById finds a chapter by numero_chapitre", () => {
  const stories = [{ numero_chapitre: "2" }, { numero_chapitre: "0" }];

  assert.deepEqual(getStoryById(stories, "0"), { numero_chapitre: "0" });
});

test("createStoryIndex prepares direct chapter lookup", () => {
  const stories = [{ numero_chapitre: "2" }, { numero_chapitre: "0" }];
  const storyIndex = createStoryIndex(stories);

  assert.deepEqual(getStoryById(storyIndex, "2"), { numero_chapitre: "2" });
});

test("addChoiceToHistory keeps the existing pocket side effect", () => {
  assert.deepEqual(addChoiceToHistory([], CHAPTER_IDS.POCKETS), [
    CHAPTER_IDS.POCKETS,
    "6",
  ]);
});

test("getDisplayChoices prepares normal choices", () => {
  const choices = getDisplayChoices({
    currentStory: {
      numero_chapitre: "0",
      choix: ["1"],
      btn_choix: ["Regarder autour de toi"],
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

test("getChoiceSketchType maps labels to concrete sketches", () => {
  assert.equal(getChoiceSketchType("Autour de toi."), "observe");
  assert.equal(getChoiceSketchType("Tes poches."), "search");
  assert.equal(getChoiceSketchType("Tatonner rapidement"), "hand");
  assert.equal(getChoiceSketchType("Tu tatonnes"), "hand");
  assert.equal(getChoiceSketchType("Entrer dans la voiture"), "open-door");
  assert.equal(getChoiceSketchType("Entrez"), "open-door");
  assert.equal(getChoiceSketchType("Atteindre le bureau"), "desk");
  assert.equal(getChoiceSketchType("Tu te leves"), "couch");
  assert.equal(getChoiceSketchType("Courir au loin"), "run");
  assert.equal(getChoiceSketchType("Marcher sans bruit"), "walk");
  assert.equal(getChoiceSketchType("Fouiller le meuble"), "furniture");
  assert.equal(getChoiceSketchType("Atteindre la porte"), "door");
  assert.equal(getChoiceSketchType("Atteindre la tele"), "tv");
  assert.equal(getChoiceSketchType("Essayer d'ouvrir le volet"), "window");
  assert.equal(getChoiceSketchType("Essayer de lui parler"), "talk");
  assert.equal(getChoiceSketchType("Continuer", "continue"), "book");
});

test("getChoiceFlavorText returns short card flavor", () => {
  assert.equal(getChoiceFlavorText("open-door"), "Franchir le seuil.");
  assert.equal(getChoiceFlavorText("book"), "Tourner la page.");
});

test("getDisplayChoices adds key choice near the door", () => {
  const choices = getDisplayChoices({
    currentStory: {
      numero_chapitre: CHAPTER_IDS.DOOR,
      choix: ["1"],
      btn_choix: ["Repartir"],
      btn_choix_sup: [CHAPTER_IDS.KEY_USED, "Utiliser la clef"],
    },
    win: true,
    action: "",
    choiceAlreadyDone: [CHAPTER_IDS.DESK_KEY_FOUND],
  });

  assert.equal(choices.some((choice) => choice.id === "use-key"), true);
});
