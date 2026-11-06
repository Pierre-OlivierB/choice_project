import { useState } from "react";
import Chapter from "../chapter/chapter";
import ChoiceFooter from "./ChoiceFooter";
import { useGame } from "../../hooks/useGame";

// On a phone, reading and choosing are two steps so the story and the cards each
// get the whole screen. On a computer they share one screen: game-step has no
// box there, and the step controls are hidden. See layout.css.
function ReadingStep() {
  const { activateChoice, currentStory, displayChoices } = useGame();
  const [isChoosing, setIsChoosing] = useState(false);

  return (
    <div className={`game-step game-step--${isChoosing ? "choosing" : "reading"}`}>
      <Chapter />
      <button
        className="button button--gold step-cta"
        onClick={() => setIsChoosing(true)}
        type="button"
      >
        Faire ton choix
      </button>
      <div className="step-head">
        <p className="story-question">{currentStory.question}</p>
        <button
          className="button button--ghost step-back"
          onClick={() => setIsChoosing(false)}
          type="button"
        >
          Relire
        </button>
      </div>
      <ChoiceFooter choices={displayChoices} onActivateChoice={activateChoice} />
    </div>
  );
}

export default ReadingStep;
