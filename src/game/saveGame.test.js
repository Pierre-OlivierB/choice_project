import test from "node:test";
import assert from "node:assert/strict";
import {
  SAVE_GAME_STORAGE_KEY,
  SAVE_GAME_VERSION,
  clearGameSnapshot,
  createGameSnapshot,
  isValidGameSnapshot,
  readGameSnapshot,
  writeGameSnapshot,
} from "./saveGame.js";

function createMemoryStorage() {
  const store = new Map();

  return {
    getItem(key) {
      return store.get(key) || null;
    },
    removeItem(key) {
      store.delete(key);
    },
    setItem(key, value) {
      store.set(key, value);
    },
  };
}

const validState = {
  action: "",
  activeBackground: "house",
  choice: "0",
  choiceAfterDiceRoll: null,
  choiceAlreadyDone: [],
  inventory: [],
  isReadingChapter: true,
  perso: { name: "Chris" },
  previousActionText: "Debut",
  rollHistory: [],
  storyEnd: false,
  storyHistory: [],
  win: true,
};

test("createGameSnapshot adds version and savedAt metadata", () => {
  const snapshot = createGameSnapshot(validState);

  assert.equal(snapshot.version, SAVE_GAME_VERSION);
  assert.equal(snapshot.state, validState);
  assert.equal(typeof snapshot.savedAt, "string");
});

test("writeGameSnapshot and readGameSnapshot roundtrip valid state", () => {
  const storage = createMemoryStorage();

  writeGameSnapshot(validState, storage);

  assert.deepEqual(readGameSnapshot(storage).state, validState);
});

test("readGameSnapshot ignores invalid JSON", () => {
  const storage = createMemoryStorage();
  storage.setItem(SAVE_GAME_STORAGE_KEY, "{bad json");

  assert.equal(readGameSnapshot(storage), null);
});

test("isValidGameSnapshot rejects incompatible snapshots", () => {
  assert.equal(isValidGameSnapshot({ version: 999, state: validState }), false);
  assert.equal(isValidGameSnapshot({ version: SAVE_GAME_VERSION }), false);
});

test("clearGameSnapshot removes the stored game", () => {
  const storage = createMemoryStorage();
  writeGameSnapshot(validState, storage);

  clearGameSnapshot(storage);

  assert.equal(readGameSnapshot(storage), null);
});
