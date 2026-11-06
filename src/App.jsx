import { useState } from "react";
import Book from "./contents/book";
import Characters from "./contents/characters/characters";
import Home from "./contents/home";
import { clearGameSnapshot } from "./game/saveGame";
import { useScrollToTop } from "./hooks/useScrollToTop";

const SCREENS = {
  HOME: "home",
  CHARACTERS: "characters",
  GAME: "game",
};

// App owns the screen flow; each screen only reports what the player decided.
function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [game, setGame] = useState(null);

  useScrollToTop(screen);

  function resumeGame(snapshot) {
    setGame({ perso: snapshot.state.perso, initialGameState: snapshot.state });
    setScreen(SCREENS.GAME);
  }

  function startGame(perso) {
    // A new character must not inherit anything from a previous run.
    clearGameSnapshot();
    setGame({ perso, initialGameState: null });
    setScreen(SCREENS.GAME);
  }

  if (screen === SCREENS.GAME) {
    return <Book {...game} />;
  }

  if (screen === SCREENS.CHARACTERS) {
    return <Characters onSelect={startGame} />;
  }

  return (
    <Home
      onStart={() => setScreen(SCREENS.CHARACTERS)}
      onResume={resumeGame}
    />
  );
}

export default App;
