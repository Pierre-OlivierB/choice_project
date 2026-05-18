import test from "node:test";
import assert from "node:assert/strict";
import {
  KEY_ITEM,
  addUniqueItem,
  removeItem,
  updateInventoryFromChoices,
} from "./inventory.js";
import { CHAPTER_IDS } from "./storyConstants.js";

test("addUniqueItem does not duplicate an item", () => {
  assert.deepEqual(addUniqueItem([KEY_ITEM], KEY_ITEM), [KEY_ITEM]);
});

test("removeItem removes an item from inventory", () => {
  assert.deepEqual(removeItem([KEY_ITEM, "note"], KEY_ITEM), ["note"]);
});

test("updateInventoryFromChoices adds key after desk chapter", () => {
  assert.deepEqual(updateInventoryFromChoices([], [CHAPTER_IDS.DESK_KEY_FOUND]), [
    KEY_ITEM,
  ]);
});

test("updateInventoryFromChoices removes key after use", () => {
  assert.deepEqual(
    updateInventoryFromChoices([KEY_ITEM], [
      CHAPTER_IDS.DESK_KEY_FOUND,
      CHAPTER_IDS.KEY_USED,
    ]),
    []
  );
});
