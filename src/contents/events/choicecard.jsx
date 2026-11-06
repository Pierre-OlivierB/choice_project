import SketchIcon from "./SketchIcon";

// ChoiceCard is a trading card: an illustration window, a name plate, then a
// description box. A native button gives click, tap, and keyboard activation.
function ChoiceCard({
  content,
  onActivate,
  isDisabled = false,
  art,
  gem,
  typeLine,
  children,
  choiceType = "chapter",
  sketchType,
  flavorText = "",
}) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onActivate}
      className={`choice-card choice-card--${choiceType}`}
    >
      <span className="choice-card-art">
        {art || <SketchIcon type={sketchType} />}
        {gem ? <span className="choice-card-gem">{gem}</span> : null}
      </span>
      <span className="choice-card-title">{content}</span>
      {typeLine ? <span className="choice-card-type">{typeLine}</span> : null}
      {flavorText ? <span className="choice-card-flavor">{flavorText}</span> : null}
      {children ? <span className="choice-card-text">{children}</span> : null}
    </button>
  );
}

export default ChoiceCard;
