import test from "node:test";
import assert from "node:assert/strict";
import { formatGameJournal, getJournalStats } from "./gameJournal.js";

test("getJournalStats counts story steps and rolls", () => {
  const stats = getJournalStats({
    storyHistory: [["Debut"], ["Suite"]],
    rollHistory: [{ success: true }, { success: false }, { success: true }],
  });

  assert.deepEqual(stats, {
    failureCount: 1,
    rollCount: 3,
    storyStepCount: 2,
    successCount: 2,
  });
});

test("formatGameJournal builds an exportable text", () => {
  const text = formatGameJournal({
    inventory: ["clef"],
    perso: { name: "Chris" },
    rollHistory: [
      {
        actionLabel: "Courir",
        roll: 42,
        stat: 75,
        success: true,
      },
    ],
    storyHistory: [["Tu te reveilles.", "0"]],
  });

  assert.equal(text.includes("Personnage : Chris"), true);
  assert.equal(text.includes("Objets : clef"), true);
  assert.equal(text.includes("1. Tu te reveilles."), true);
  assert.equal(text.includes("1. Courir : 42/75 - reussite"), true);
});

