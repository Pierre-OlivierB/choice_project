import { createContext, useContext } from "react";

// The running game is shared through context so screens and panels read what
// they need instead of receiving it through every level.
export const GameContext = createContext(null);

export function useGame() {
  return useContext(GameContext);
}
