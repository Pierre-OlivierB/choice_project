const CHARACTERISTIC_RESULT_PREFIX = {
  constitution: "c",
  dexterite: "d",
  intelligence: "i",
};

export function rollD100() {
  return Math.floor(Math.random() * 100) + 1;
}

// The game uses a roll-under D100 rule: lower or equal to the character stat
// means success.
export function resolveRoll({ roll, stat }) {
  return Number(roll) <= Number(stat);
}

// Story result keys follow the compact pattern c_w, d_l, i_w, etc.
export function getResultKey({ characteristic, success }) {
  const prefix = CHARACTERISTIC_RESULT_PREFIX[characteristic];

  if (!prefix) {
    return "";
  }

  return `${prefix}_${success ? "w" : "l"}`;
}

// After a roll, this keeps the selected characteristic available for choices
// that depend on the last action.
export function getActionFromResultKey(resultKey) {
  return resultKey.match(/^([cdi])_[wl]$/)?.[1] ?? "";
}

export function getCharacterStat(character, characteristic) {
  return character?.[characteristic] ?? "";
}
