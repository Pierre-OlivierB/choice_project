import fs from "node:fs";
import path from "node:path";

const storyPath = path.resolve("src/contents/chapter/stories.json");
const stories = JSON.parse(fs.readFileSync(storyPath, "utf8"));
const ids = new Set();
const errors = [];
const warnings = [];
const references = [];
const placeholderPatterns = [
  /blabla/i,
  /adipisicing/i,
  /Txt qu/i,
  /texte test/i,
];
const mojibakePattern = /Ãƒ|Ã‚|ï¿½/;

function addWarning(category, message) {
  warnings.push({ category, message });
}

function addReference(from, field, value) {
  if (Array.isArray(value)) {
    value.forEach((target) =>
      references.push({ from, field, target: String(target) })
    );
    return;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((target) =>
      references.push({ from, field, target: String(target) })
    );
    return;
  }

  if (value !== undefined && value !== null) {
    references.push({ from, field, target: String(value) });
  }
}

function assertSameLength(story, fieldA, fieldB, chapterId = story.numero_chapitre) {
  const valueA = story[fieldA];
  const valueB = story[fieldB];

  if (!Array.isArray(valueA) || !Array.isArray(valueB)) {
    return;
  }

  if (valueA.length !== valueB.length) {
    errors.push(
      `Chapitre ${chapterId}: ${fieldA} et ${fieldB} n'ont pas la meme longueur.`
    );
  }
}

function warnEmptyText(story, field) {
  if (story[field] !== undefined && String(story[field]).trim() === "") {
    addWarning(
      story.status === "draft" ? "draft" : "blocking-soon",
      `Chapitre ${story.numero_chapitre}: champ ${field} vide.`
    );
  }
}

function warnNarrativeIssues(story) {
  const serializedStory = JSON.stringify(story);

  if (mojibakePattern.test(serializedStory)) {
    addWarning(
      "encoding",
      `Chapitre ${story.numero_chapitre}: caracteres mal encodes detectes.`
    );
  }

  if (placeholderPatterns.some((pattern) => pattern.test(serializedStory))) {
    addWarning(
      story.status === "draft" ? "draft" : "blocking-soon",
      `Chapitre ${story.numero_chapitre}: placeholder ou texte de test detecte.`
    );
  }

  if (story.status === "draft") {
    addWarning("draft", `Chapitre ${story.numero_chapitre}: chapitre marque draft.`);
  }
}

for (const story of stories) {
  const id = String(story.numero_chapitre);

  if (ids.has(id)) {
    errors.push(`Chapitre duplique: ${id}.`);
  }

  ids.add(id);
}

for (const story of stories) {
  addReference(story.numero_chapitre, "choix", story.choix);
  addReference(story.numero_chapitre, "choix_win", story.choix_win);
  addReference(story.numero_chapitre, "choix_loose", story.choix_loose);

  if (story.btn_choix_sup) {
    addReference(
      story.numero_chapitre,
      "btn_choix_sup[0]",
      story.btn_choix_sup[0]
    );
  }

  assertSameLength(story, "choix", "btn_choix");
  assertSameLength(story, "choix_win", "btn_choix_win");
  assertSameLength(story, "choix_loose", "btn_choix_loose");

  if (story.actions) {
    assertSameLength(story.actions, "btn", "carac", story.numero_chapitre);
  }

  warnEmptyText(story, "card_context");
  warnEmptyText(story, "mj_question");
  warnEmptyText(story, "txt");
  warnNarrativeIssues(story);
}

for (const reference of references) {
  if (!ids.has(reference.target)) {
    errors.push(
      `Chapitre ${reference.from}: ${reference.field} pointe vers ${reference.target}, qui n'existe pas.`
    );
  }
}

const referencedIds = new Set(references.map((reference) => reference.target));
const unreferenced = [...ids].filter(
  (id) => id !== "0" && !referencedIds.has(id)
);

if (unreferenced.length > 0) {
  addWarning("info", `Chapitres non references: ${unreferenced.join(", ")}.`);
}

console.log(`Scenario: ${stories.length} chapitres analyses.`);

const warningsByCategory = warnings.reduce((groups, warning) => {
  if (!groups[warning.category]) {
    groups[warning.category] = [];
  }

  groups[warning.category].push(warning.message);
  return groups;
}, {});

const warningLabels = {
  "blocking-soon": "A corriger en priorite",
  draft: "Chapitres draft",
  encoding: "Encodage",
  info: "Information",
};

for (const [category, messages] of Object.entries(warningsByCategory)) {
  console.warn(`Warning ${warningLabels[category] || category}: ${messages.length}`);

  for (const message of messages) {
    console.warn(`- ${message}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`Error: ${error}`);
  }
  process.exit(1);
}

console.log("Scenario valide.");
