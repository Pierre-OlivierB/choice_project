import "../../App.css";
import SketchIcon from "./SketchIcon";

// ChoiceCard is the shared interaction surface for chapters, actions, dice,
// character selection, and final continuations. Keeping click and keyboard
// activation here avoids accessibility drift between card types.
const ChoiceCard = ({
  content,
  onActivate,
  onSwipeRight,
  isDisabled,
  data,
  choiceCss,
  choiceType = "chapter",
  sketchType = choiceType,
  flavorText = "",
}) => {
  // onSwipeRight is kept as a compatibility alias from the first prototype,
  // while the current UI activates cards by click, tap, Enter, or Space.
  const activate = onActivate || onSwipeRight;

  function handleActivate() {
    if (isDisabled || !activate) {
      return;
    }

    activate();
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  }

  return (
    <div className="relative flex-shrink-0 min-width-350px d-flex justify-content-center">
      <button
        type="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        className={`cardChoice ${choiceCss} no-select cards-positions ${
          isDisabled ? "disabled" : ""
        } cardChoice--${choiceType}`}
      >
        <SketchIcon type={sketchType} className={`sketch-wrapper--${sketchType}`} />

        <div className="cardChoice-content choice-card-layer">
          <div className="choice-card-title">{content}</div>
        </div>

        {flavorText ? (
          <p className="choice-card-flavor choice-card-layer">{flavorText}</p>
        ) : null}

        {data ? <div className="card-img choice-card-layer">{data}</div> : null}
      </button>
    </div>
  );
};

export default ChoiceCard;
