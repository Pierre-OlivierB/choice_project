import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../../App.css"; // Assurez-vous d'avoir un fichier CSS pour les styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";

const ChoiceCard = ({ content, onSwipeRight, isDisabled, data, choiceCss }) => {
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
        className={`cardChoice ${choiceCss} no-select cards-positions ${
          swiped ? "swiped" : ""
        }`}
      >
        <div className="card">
          <div className="card-body">
            <div className="card-title">{content}</div>
          </div>
        </div>
        {data ? <div className="card-img">{data}</div> : <></>}
        <FontAwesomeIcon className="mouse-move-right" icon={faHandPointer} />
      </div>
    </div>
  );
};

export default ChoiceCard;
