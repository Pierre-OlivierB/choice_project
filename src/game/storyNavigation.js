// Short line under each card, chosen with the drawing declared in the scenario.
const FLAVOR_TEXT_BY_SKETCH = {
  book: "Tourner la page.",
  cabinet: "Chaque porte peut mentir.",
  calm: "Désarmer sans frapper.",
  car: "L'asphalte attend.",
  crank: "Un mécanisme fatigué.",
  desk: "Le bois garde ses secrets.",
  dodge: "Passer sans toucher.",
  door: "Un seuil résiste.",
  "door-break": "La peur devient puissance.",
  "door-open": "Franchir le seuil.",
  "door-return": "Un retour pèse lourd.",
  drawer: "Les tiroirs gardent leurs secrets.",
  fist: "Plus d'autre issue.",
  footprints: "Un pas sans bruit.",
  "cabinet-careful": "Chaque feuille compte.",
  "cabinet-quick": "Tant pis pour le désordre.",
  "door-ajar": "Un filet de lumière.",
  "door-flung": "Advienne que pourra.",
  "drawer-careful": "Rien ne sera oublié.",
  "drawer-quick": "Tout sortir, et vite.",
  hand: "Avancer à l'aveugle.",
  "hand-careful": "Lire du bout des doigts.",
  "hand-quick": "Balayer l'obscurité.",
  "pocket-careful": "Poche après poche.",
  "pocket-quick": "Fouiller à la hâte.",
  "rise-fast": "Se dresser d'un bond.",
  "rise-slow": "Un appui, puis un autre.",
  horn: "Appeler dans le vide.",
  inspect: "Lire les détails.",
  key: "Un objet change tout.",
  mind: "La dernière page s'ouvre.",
  observe: "Chercher dans l'ombre.",
  pocket: "Les poches parlent parfois.",
  rise: "Quitter l'immobilité.",
  route: "Tracer sa ligne.",
  run: "Ne pas regarder en arrière.",
  shove: "Tout le poids en avant.",
  shutter: "Derrière le volet, une réponse.",
  stealth: "Devenir une ombre.",
  talk: "Les mots peuvent ouvrir une voie.",
  threat: "Hausser le ton.",
  tv: "La neige regarde aussi.",
};

export function getChoiceFlavorText(sketchType) {
  return FLAVOR_TEXT_BY_SKETCH[sketchType] || "";
}

export function createStoryIndex(stories) {
  return new Map(stories.map((story) => [String(story.id), story]));
}

export function getStoryById(storyIndex, chapterId) {
  return storyIndex.get(String(chapterId));
}

// A result is the outcome text of the roll, followed by what every outcome of
// the chapter has in common.
export function getResultText(story, resultKey) {
  return [story?.results?.[resultKey], story?.resultEnding]
    .filter(Boolean)
    .join("\n\n");
}

export function addChoiceToHistory(choiceAlreadyDone, chapterId, alsoVisits = []) {
  return [...choiceAlreadyDone, chapterId, ...alsoVisits];
}

// Every rule that hides a choice is declared on the choice itself in the
// scenario: see narrative_guide.md for the list of fields.
function isChoiceAvailable(choice, { win, action, choiceAlreadyDone, inventory }) {
  if (choice.on === "success" && !win) {
    return false;
  }

  if (choice.on === "failure" && win) {
    return false;
  }

  if (choice.onAction && choice.onAction !== action) {
    return false;
  }

  if (choice.requiresItem && !inventory.includes(choice.requiresItem)) {
    return false;
  }

  if (choice.requiresVisited && !choiceAlreadyDone.includes(choice.requiresVisited)) {
    return false;
  }

  return Boolean(choice.repeatable) || !choiceAlreadyDone.includes(choice.target);
}

export function getDisplayChoices({
  currentStory,
  win,
  action,
  choiceAlreadyDone,
  inventory = [],
}) {
  const context = { win, action, choiceAlreadyDone, inventory };

  return (currentStory?.choices || [])
    .filter((choice) => isChoiceAvailable(choice, context))
    .map((choice, index) => ({
        id: `choice-${choice.target}-${index}`,
        label: choice.label,
        targetChapter: choice.target,
        type: choice.type || "chapter",
        sketchType: choice.sketch,
        flavorText: getChoiceFlavorText(choice.sketch),
        requiresConfirmation: true,
        ...(choice.repeatable ? { skipHistory: true } : {}),
        ...(choice.alsoVisits ? { alsoVisits: choice.alsoVisits } : {}),
        ...(choice.consumesItem ? { consumesItem: choice.consumesItem } : {}),
    }));
}
