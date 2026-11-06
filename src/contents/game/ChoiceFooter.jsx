import ChoiceCard from "../events/choicecard";

// Choices are already normalized by storyNavigation; this only lays them out.
function ChoiceFooter({ choices, onActivateChoice }) {
  return (
    <div className="card-row" data-count={choices.length}>
      {choices.map((choice) => (
        <ChoiceCard
          key={choice.id}
          content={choice.label}
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
