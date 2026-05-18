import { CHAPTER_IDS } from "./storyConstants.js";

function pushChoice(choices, choice) {
  if (choice.label && choice.targetChapter) {
    choices.push(choice);
  }
}

function normalizeLabel(label) {
  return String(label)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function getChoiceSketchType(label, type = "chapter") {
  if (type === "dice" || type === "item" || type === "ending") {
    return type;
  }

  const normalizedLabel = normalizeLabel(label);

  if (/autour|regarder|analyser|observer|scruter/.test(normalizedLabel)) {
    return "observe";
  }

  if (/entrer|entrez|rentrer/.test(normalizedLabel)) {
    return "open-door";
  }

  if (/tatonner|tatonnes|tatonne/.test(normalizedLabel)) {
    return "hand";
  }

  if (/bureau/.test(normalizedLabel)) {
    return "desk";
  }

  if (/meuble/.test(normalizedLabel)) {
    return "furniture";
  }

  if (/lever|leves|relever/.test(normalizedLabel)) {
    return "couch";
  }

  if (/courir|partir|eviter|contourner|eloigner|passer/.test(normalizedLabel)) {
    return "run";
  }

  if (/marcher/.test(normalizedLabel)) {
    return "walk";
  }

  if (/poche|fouiller|tiroir|chercher/.test(normalizedLabel)) {
    return "search";
  }

  if (/porte|clef|serrure/.test(normalizedLabel)) {
    return "door";
  }

  if (/tele|television/.test(normalizedLabel)) {
    return "tv";
  }

  if (/volet|fenetre|manivelle/.test(normalizedLabel)) {
    return "window";
  }

  if (/voiture|demarrer|klaxonner|klaxon/.test(normalizedLabel)) {
    return "car";
  }

  if (/parler|saluer|menacer|apaiser|negocier/.test(normalizedLabel)) {
    return "talk";
  }

  if (/forcer|foncer|affronter|battre|force/.test(normalizedLabel)) {
    return "force";
  }

  if (type === "continue") {
    return "book";
  }

  if (type === "special") {
    return "special";
  }

  return type;
}

const FLAVOR_TEXT_BY_SKETCH = {
  book: "Tourner la page.",
  car: "L'asphalte attend.",
  couch: "Quitter l'immobilite.",
  desk: "Les tiroirs gardent leurs secrets.",
  dice: "Le hasard tranche.",
  door: "Un seuil resiste.",
  ending: "La derniere page s'ouvre.",
  "open-door": "Franchir le seuil.",
  force: "La peur devient puissance.",
  furniture: "Chaque tiroir peut mentir.",
  hand: "Avancer a l'aveugle.",
  item: "Un objet change tout.",
  observe: "Chercher dans l'ombre.",
  run: "Ne pas regarder en arriere.",
  search: "Les poches parlent parfois.",
  special: "Un retour pese lourd.",
  talk: "Les mots peuvent ouvrir une voie.",
  tv: "La neige regarde aussi.",
  walk: "Un pas sans bruit.",
  window: "Derriere le volet, une reponse.",
};

export function getChoiceFlavorText(sketchType) {
  return FLAVOR_TEXT_BY_SKETCH[sketchType] || "";
}

export function getStoryById(stories, chapterId) {
  return stories.find((story) => story.numero_chapitre === String(chapterId));
}

function getResultChoices(currentStory, win, action) {
  if (currentStory.btn_choix) {
    return {
      labels: currentStory.btn_choix,
      targets: currentStory.choix,
    };
  }

  if (!win) {
    return {
      labels: currentStory.btn_choix_loose || [],
      targets: currentStory.choix_loose || [],
    };
  }

  if (Array.isArray(currentStory.choix_win)) {
    return {
      labels: currentStory.btn_choix_win || [],
      targets: currentStory.choix_win || [],
    };
  }

  if (!action || !currentStory.btn_choix_win || !currentStory.choix_win) {
    return { labels: [], targets: [] };
  }

  return {
    labels: [currentStory.btn_choix_win[action]],
    targets: [currentStory.choix_win[action]],
  };
}

export function addChoiceToHistory(choiceAlreadyDone, chapterId) {
  const nextChoices = [...choiceAlreadyDone, chapterId];

  if (chapterId === CHAPTER_IDS.POCKETS) {
    nextChoices.push("6");
  }

  return nextChoices;
}

export function getDisplayChoices({
  currentStory,
  win,
  action,
  choiceAlreadyDone,
}) {
  if (!currentStory) {
    return [];
  }

  const choices = [];
  const { labels, targets } = getResultChoices(currentStory, win, action);

  labels.forEach((label, index) => {
    const targetChapter = targets[index];
    const sketchType = getChoiceSketchType(label);

    if (currentStory.choix && choiceAlreadyDone.includes(targetChapter)) {
      return;
    }

    pushChoice(choices, {
      id: `choice-${targetChapter}-${index}`,
      label,
      targetChapter,
      type: "chapter",
      sketchType,
      flavorText: getChoiceFlavorText(sketchType),
      requiresConfirmation: true,
    });
  });

  if (
    currentStory.choix &&
    choiceAlreadyDone.includes(CHAPTER_IDS.DOOR) &&
    choiceAlreadyDone.length > 0 &&
    Number.parseInt(currentStory.numero_chapitre, 10) <
      Number.parseInt(CHAPTER_IDS.DOOR, 10)
  ) {
    const sketchType = getChoiceSketchType("Retourner a la porte", "special");

    pushChoice(choices, {
      id: "return-door",
      label: "Retourner à la porte",
      targetChapter: CHAPTER_IDS.DOOR,
      type: "special",
      sketchType,
      flavorText: getChoiceFlavorText(sketchType),
      requiresConfirmation: true,
      skipHistory: true,
    });
  }

  if (
    currentStory.choix &&
    choiceAlreadyDone.includes(CHAPTER_IDS.DESK_KEY_FOUND) &&
    (currentStory.numero_chapitre === CHAPTER_IDS.DOOR ||
      currentStory.numero_chapitre === CHAPTER_IDS.DOOR_AFTER_FAIL)
  ) {
    const sketchType = getChoiceSketchType(currentStory.btn_choix_sup?.[1], "item");

    pushChoice(choices, {
      id: "use-key",
      label: currentStory.btn_choix_sup?.[1],
      targetChapter: currentStory.btn_choix_sup?.[0],
      type: "item",
      sketchType,
      flavorText: getChoiceFlavorText(sketchType),
      requiresConfirmation: true,
    });
  }

  if (currentStory.numero_chapitre === CHAPTER_IDS.KEY_USED && win) {
    const sketchType = getChoiceSketchType(
      currentStory.btn_choix_sup?.[1],
      "ending"
    );

    pushChoice(choices, {
      id: "victory",
      label: currentStory.btn_choix_sup?.[1],
      targetChapter: currentStory.btn_choix_sup?.[0],
      type: "ending",
      sketchType,
      flavorText: getChoiceFlavorText(sketchType),
      requiresConfirmation: true,
    });
  }

  return choices;
}
