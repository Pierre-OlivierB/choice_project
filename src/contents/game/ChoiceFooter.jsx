import ChoiceCard from "../events/choicecard";

// Footer choices are already normalized by storyNavigation. This component only
// renders the horizontal, scrollable choice strip used during chapter reading.
function ChoiceFooter({ choices, onActivateChoice }) {
  return (
    <div className="game-choice-strip">
      {choices.map((choice) => (
        <ChoiceCard
          key={choice.id}
          content={choice.label}
          choiceCss="cardChoiceSize"
          choiceType={choice.type}
          sketchType={choice.sketchType}
          flavorText={choice.flavorText}
          onActivate={() => onActivateChoice(choice)}
        />
      ))}
    </div>
  );
}

export default ChoiceFooter;
