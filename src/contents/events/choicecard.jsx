import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../../App.css"; // Assurez-vous d'avoir un fichier CSS pour les styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";

const ChoiceCard = ({ content, onSwipeRight, isDisabled, data }) => {
  const [swiped, setSwiped] = useState(false);

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
    <div className="relative flex-shrink-0 min-width-350px d-flex justify-content-center">
      <div
        {...handlers}
        className={`cardChoice no-select cards-positions ${
          swiped ? "swiped" : ""
        }`}
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{content}</h5>
          </div>
        </div>
        <div className="test">{data}</div>
        <p></p>
        <FontAwesomeIcon className="mouse-move-right" icon={faHandPointer} />
      </div>
    </div>
  );
};

export default ChoiceCard;
