import { getPlayerName } from "./character.js";

// Stats are computed from histories instead of stored separately so save files
// cannot drift from the displayed journal.
export function getJournalStats({ storyHistory = [], rollHistory = [] }) {
  const successCount = rollHistory.filter((roll) => roll.success).length;
  const failureCount = rollHistory.length - successCount;

  return {
    failureCount,
    rollCount: rollHistory.length,
    storyStepCount: storyHistory.length,
    successCount,
  };
}

// The export stays plain text on purpose: it is easy to copy, paste, and evolve
// before a stricter import format exists.
export function formatGameJournal({
  storyHistory = [],
  rollHistory = [],
  inventory = [],
  perso,
}) {
  const stats = getJournalStats({ storyHistory, rollHistory });
  const lines = [
    "La maison de l'oubli - Journal de partie",
    "",
    "Statistiques",
    `Personnage : ${getPlayerName(perso)}`,
    `Étapes narratives : ${stats.storyStepCount}`,
    `Jets de D100 : ${stats.rollCount}`,
    `Réussites : ${stats.successCount}`,
    `Échecs : ${stats.failureCount}`,
    `Objets : ${inventory.length ? inventory.join(", ") : "aucun"}`,
    "",
    "Journal",
  ];

  if (storyHistory.length) {
    storyHistory.forEach((step, index) => {
      lines.push(`${index + 1}. ${step[0]}`);
    });
  } else {
    lines.push("Aucune entrée.");
  }

  if (rollHistory.length) {
    lines.push("", "Jets");
    rollHistory.forEach((roll, index) => {
      lines.push(
        `${index + 1}. ${roll.actionLabel} : ${roll.roll}/${roll.stat} - ${
          roll.success ? "réussite" : "échec"
        }`
      );
    });
  }

  return lines.join("\n");
}
