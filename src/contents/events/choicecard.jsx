import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../../App.css"; // Assurez-vous d'avoir un fichier CSS pour les styles

const ChoiceCard = ({ content, onSwipeRight, isDisabled }) => {
  const [swiped, setSwiped] = useState(false);

  console.log(isDisabled);
  const handlers = useSwipeable({
    onSwipedRight: () => {
      if (!isDisabled) {
        setSwiped(true);

        onSwipeRight();
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (isDisabled) {
      setSwiped(false);
    }
  }, [isDisabled]);

  return (
    <div className="relative">
      <div
        {...handlers}
        className={`cardChoice no-select cards-positions ${
          swiped ? "swiped" : ""
        } ${isDisabled ? "disabled" : ""}`}
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{content}</h5>
          </div>
        </div>
        {/* {swiped && (
        <>
          <div className="card-dis-choice">
            <button onClick={() => alert("Choix confirmé !")}>Annuler</button>
          </div>
          <div className="card-ok-choice">
            <button onClick={() => alert("Choix confirmé !")}>Confirmer</button>
          </div>
        </>
      )} */}
      </div>

      <div className="absolute btn-choice-positions">
        <button onClick={() => alert("Choix confirmé !")}>Annuler</button>

        <button onClick={() => alert("Choix confirmé !")}>Confirmer</button>
      </div>
    </div>
  );
};

// const App = () => {
//   const handleSwipeRight = () => {
//     console.log("Card swiped right!");
//   };

//   return (
//     <div className="app">
//       <Card content="Contenu de la carte" onSwipeRight={handleSwipeRight} />
//     </div>
//   );
// };

export default ChoiceCard;
