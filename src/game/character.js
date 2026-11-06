export const CHARACTER_STATS = ["constitution", "dexterite", "intelligence"];

export const STAT_LABELS = {
  constitution: "Constitution",
  dexterite: "Dextérité",
  intelligence: "Intelligence",
};

// Older saves stored stats as strings, hence the Number conversion.
export function getDominantStat(character) {
  return CHARACTER_STATS.reduce((best, stat) =>
    Number(character?.[stat]) > Number(character?.[best]) ? stat : best
  );
}

export function getPlayerName(player, fallback = "Inconnu") {
  return player?.name || fallback;
}
