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

export function resolveRoll({ roll, stat }) {
  return Number(roll) <= Number(stat);
}

export function getResultKey({ characteristic, success }) {
  const prefix = CHARACTERISTIC_RESULT_PREFIX[characteristic];

  if (!prefix) {
    return "";
  }

  return `${prefix}_${success ? "w" : "l"}`;
}

export function getActionFromResultKey(resultKey) {
  return RESULT_ACTION_BY_KEY[resultKey] || "";
}

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
