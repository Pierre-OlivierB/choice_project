export const KEY_ITEM = "clef";

export function addUniqueItem(inventory, item) {
  if (!item || inventory.includes(item)) {
    return inventory;
  }

  return [...inventory, item];
}

export function removeItem(inventory, item) {
  return inventory.filter((currentItem) => currentItem !== item);
}
