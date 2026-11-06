import fs from "node:fs";
import path from "node:path";

const storyPath = path.resolve("src/contents/chapter/stories.json");
const stories = JSON.parse(fs.readFileSync(storyPath, "utf8"));
const ids = new Set();
const errors = [];
const warnings = [];
const references = [];
const placeholderPatterns = [/blabla/i, /adipisicing/i, /Txt qu/i, /texte test/i];
const mojibakePattern = /Ãƒ|Ã‚|ï¿½/;
const resultPrefix = { constitution: "c", dexterite: "d", intelligence: "i" };
const END_ACTION_STAT = "fin";

function addWarning(category, message) {
  warnings.push({ category, message });
}

function warnEmptyText(story, field) {
  if (String(story[field] ?? "").trim() === "") {
    addWarning(
      story.status === "draft" ? "draft" : "blocking-soon",
      `Chapitre ${story.id}: champ ${field} vide.`
    );
  }
}

function warnNarrativeIssues(story) {
  const serializedStory = JSON.stringify(story);

  if (mojibakePattern.test(serializedStory)) {
    addWarning("encoding", `Chapitre ${story.id}: caracteres mal encodes detectes.`);
  }

  if (placeholderPatterns.some((pattern) => pattern.test(serializedStory))) {
    addWarning(
      story.status === "draft" ? "draft" : "blocking-soon",
      `Chapitre ${story.id}: placeholder ou texte de test detecte.`
    );
  }

  if (story.status === "draft") {
    addWarning("draft", `Chapitre ${story.id}: chapitre marque draft.`);
  }
}

// A playable action needs a text for both outcomes of the roll.
function checkActionResults(story) {
  if (story.status === "draft") {
    return;
  }

  for (const { label, stat } of story.actions || []) {
    if (stat === END_ACTION_STAT) {
      continue;
    }

    if (!resultPrefix[stat]) {
      errors.push(`Chapitre ${story.id}: caracteristique inconnue pour "${label}": ${stat}.`);
      continue;
    }

    for (const outcome of ["w", "l"]) {
      const key = `${resultPrefix[stat]}_${outcome}`;

      if (!story.results?.[key]) {
        errors.push(`Chapitre ${story.id}: texte de resultat manquant (${key}).`);
      }
    }
  }
}

for (const story of stories) {
  if (ids.has(story.id)) {
    errors.push(`Chapitre duplique: ${story.id}.`);
  }

  ids.add(story.id);
}

for (const story of stories) {
  for (const { label, target } of story.choices || []) {
    if (!label) {
      errors.push(`Chapitre ${story.id}: choix sans libelle vers ${target}.`);
    }

    references.push({ from: story.id, target });
  }

  checkActionResults(story);
  warnEmptyText(story, "context");
  warnEmptyText(story, "question");
  warnNarrativeIssues(story);
}

for (const { from, target } of references) {
  if (!ids.has(target)) {
    errors.push(`Chapitre ${from}: un choix pointe vers ${target}, qui n'existe pas.`);
  }
}

const referencedIds = new Set(references.map(({ target }) => target));
const unreferenced = [...ids].filter((id) => id !== "0" && !referencedIds.has(id));

if (unreferenced.length > 0) {
  addWarning("info", `Chapitres non references: ${unreferenced.join(", ")}.`);
}

console.log(`Scenario: ${stories.length} chapitres analyses.`);

const warningsByCategory = warnings.reduce((groups, warning) => {
  (groups[warning.category] ||= []).push(warning.message);
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
