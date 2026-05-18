import test from "node:test";
import assert from "node:assert/strict";
import {
  getActionFromResultKey,
  getCharacterStat,
  getResultKey,
  resolveRoll,
} from "./resolveAction.js";

test("resolveRoll succeeds when roll is lower than stat", () => {
  assert.equal(resolveRoll({ roll: 42, stat: 50 }), true);
});

test("resolveRoll succeeds when roll equals stat", () => {
  assert.equal(resolveRoll({ roll: 50, stat: 50 }), true);
});

test("resolveRoll fails when roll is greater than stat", () => {
  assert.equal(resolveRoll({ roll: 51, stat: 50 }), false);
});

test("getResultKey maps characteristics to story result keys", () => {
  assert.equal(
    getResultKey({ characteristic: "constitution", success: true }),
    "c_w"
  );
  assert.equal(
    getResultKey({ characteristic: "dexterite", success: false }),
    "d_l"
  );
  assert.equal(
    getResultKey({ characteristic: "intelligence", success: true }),
    "i_w"
  );
});

test("getActionFromResultKey maps story result keys to action codes", () => {
  assert.equal(getActionFromResultKey("c_w"), "c");
  assert.equal(getActionFromResultKey("d_l"), "d");
  assert.equal(getActionFromResultKey("i_w"), "i");
  assert.equal(getActionFromResultKey("unknown"), "");
});

test("getCharacterStat returns the matching character stat", () => {
  const character = {
    constitution: 45,
    dexterite: 60,
    intelligence: 70,
  };

  assert.equal(getCharacterStat(character, "constitution"), 45);
  assert.equal(getCharacterStat(character, "dexterite"), 60);
  assert.equal(getCharacterStat(character, "intelligence"), 70);
  assert.equal(getCharacterStat(character, "chance"), "");
});
