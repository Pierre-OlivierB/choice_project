import GameLayout from "../game/GameLayout";
import { useGame } from "../../hooks/useGame";

// Chapter displays a narrative reading step: the last result and what follows.
function Chapter() {
  const { currentStory, state } = useGame();

  return (
    <GameLayout>
      <p className="story-text">{state.previousActionText}</p>
      <p className="story-question">{currentStory.question}</p>
    </GameLayout>
  );
}

export default Chapter;
