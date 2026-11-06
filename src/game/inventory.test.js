import test from "node:test";
import assert from "node:assert/strict";
import { KEY_ITEM, addUniqueItem, removeItem } from "./inventory.js";

test("addUniqueItem does not duplicate an item", () => {
  assert.deepEqual(addUniqueItem([KEY_ITEM], KEY_ITEM), [KEY_ITEM]);
});

test("removeItem removes an item from inventory", () => {
  assert.deepEqual(removeItem([KEY_ITEM, "note"], KEY_ITEM), ["note"]);
});

test("addUniqueItem ignores a missing item", () => {
  assert.deepEqual(addUniqueItem([KEY_ITEM], undefined), [KEY_ITEM]);
});
