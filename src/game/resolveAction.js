const CHARACTERISTIC_RESULT_PREFIX = {
  constitution: "c",
  dexterite: "d",
  intelligence: "i",
};

const RESULT_ACTION_BY_KEY = {
  c_w: "c",
  c_l: "c",
  d_w: "d",
  d_l: "d",
  i_w: "i",
  i_l: "i",
};

export function rollD100() {
  return Math.floor(Math.random() * 100) + 1;
}

// The game uses a roll-under D100 rule: lower or equal to the character stat
// means success.
export function resolveRoll({ roll, stat }) {
  return Number(roll) <= Number(stat);
}

// Story result fields follow the compact pattern c_w, d_l, i_w, etc.
export function getResultKey({ characteristic, success }) {
  const prefix = CHARACTERISTIC_RESULT_PREFIX[characteristic];

  if (!prefix) {
    return "";
  }

  return `${prefix}_${success ? "w" : "l"}`;
}

// After a roll, this keeps the selected characteristic available for result
// choices that depend on the last action.
export function getActionFromResultKey(resultKey) {
  return RESULT_ACTION_BY_KEY[resultKey] || "";
}

// Character data uses French characteristic names; this adapter is the only
// place where action metadata is mapped to the character sheet.
export function getCharacterStat(character, characteristic) {
  switch (characteristic) {
    case "constitution":
      return character.constitution;
    case "dexterite":
      return character.dexterite;
    case "intelligence":
      return character.intelligence;
    default:
      return "";
  }
}
