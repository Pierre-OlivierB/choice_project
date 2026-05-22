export const SAVE_GAME_STORAGE_KEY = "choice_project_save_v1";
export const SAVE_GAME_VERSION = 1;

// The storage helper keeps the game safe in tests, SSR-like contexts, or browsers
// where localStorage is blocked.
function getStorage() {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  return window.localStorage;
}

// A snapshot is accepted only if it matches the current save format. Missing
// optional fields are tolerated so older saves can still be ignored gracefully.
export function isValidGameSnapshot(snapshot) {
  return Boolean(
    snapshot &&
      snapshot.version === SAVE_GAME_VERSION &&
      snapshot.state &&
      typeof snapshot.state.choice === "string" &&
      typeof snapshot.state.isReadingChapter === "boolean" &&
      Array.isArray(snapshot.state.inventory) &&
      Array.isArray(snapshot.state.choiceAlreadyDone) &&
      Array.isArray(snapshot.state.storyHistory) &&
      (!snapshot.state.rollHistory || Array.isArray(snapshot.state.rollHistory)) &&
      snapshot.state.perso
  );
}

// Metadata is kept outside the playable state so future migrations can inspect
// the save before restoring it.
export function createGameSnapshot(state) {
  return {
    version: SAVE_GAME_VERSION,
    savedAt: new Date().toISOString(),
    state,
  };
}

export function readGameSnapshot(storage = getStorage()) {
  if (!storage) {
    return null;
  }

  try {
    const rawSnapshot = storage.getItem(SAVE_GAME_STORAGE_KEY);

    if (!rawSnapshot) {
      return null;
    }

    const snapshot = JSON.parse(rawSnapshot);

    return isValidGameSnapshot(snapshot) ? snapshot : null;
  } catch {
    // Corrupted JSON or unavailable storage should never prevent a new game.
    return null;
  }
}

export function writeGameSnapshot(state, storage = getStorage()) {
  if (!storage) {
    return null;
  }

  try {
    const snapshot = createGameSnapshot(state);
    storage.setItem(SAVE_GAME_STORAGE_KEY, JSON.stringify(snapshot));
    return snapshot;
  } catch {
    // Private browsing and quota errors are treated as "no save available".
    return null;
  }
}

export function clearGameSnapshot(storage = getStorage()) {
  if (!storage) {
    return;
  }

  try {
    storage.removeItem(SAVE_GAME_STORAGE_KEY);
  } catch {
    // A failed cleanup should never block the player.
  }
}
