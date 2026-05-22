import { CHAPTER_IDS } from "./storyConstants.js";

export const KEY_ITEM = "clef";

export function addUniqueItem(inventory, item) {
  if (inventory.includes(item)) {
    return inventory;
  }

  return [...inventory, item];
}

export function removeItem(inventory, item) {
  return inventory.filter((currentItem) => currentItem !== item);
}

export function hasFoundKey(choiceAlreadyDone) {
  return choiceAlreadyDone.includes(CHAPTER_IDS.DESK_KEY_FOUND);
}

export function hasUsedKey(choiceAlreadyDone) {
  return choiceAlreadyDone.includes(CHAPTER_IDS.KEY_USED);
}

// Inventory is derived from visited chapters for now. This keeps saves small
// and avoids duplicating object rules in the UI layer.
export function updateInventoryFromChoices(inventory, choiceAlreadyDone) {
  let nextInventory = inventory;

  if (hasFoundKey(choiceAlreadyDone)) {
    nextInventory = addUniqueItem(nextInventory, KEY_ITEM);
  }

  if (hasUsedKey(choiceAlreadyDone)) {
    nextInventory = removeItem(nextInventory, KEY_ITEM);
  }

  return nextInventory;
}
