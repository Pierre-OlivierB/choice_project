import React from "react";
import { useState } from "react";
import Chapter from "./chapter/chapter";
import storiesData from "./chapter/stories.json";
import Events from "./events/events";

function Book(props) {
  //get player choice
  const perso = props.perso;
  // set button player choice
  const [choice, setChoice] = useState(0);
  // set content show
  const [flag, setFlag] = useState(true);
  // get all stories from json
  const stories = storiesData;
  // set actual storie
  const currentStories = stories[choice];

  // set precedent action
  const [precendentAction, setPrecendentAction] = useState(currentStories.txt);

  // set content show
  function handleClick(newChapter) {
    setChoice(newChapter);
    setFlag(!flag);
  }

  //! get dice ? have to del
  // const [dice, setDice] = useState("");

  // get data from child event
  function handleDiceFromEvent(child_choice) {
    // setDice(child_dice[0]);
    setFlag(child_choice[0]);
    // event by the action win or not
    switch (child_choice[1]) {
      case "c_w":
        setPrecendentAction(currentStories.c_w);
        break;
      case "d_w":
        setPrecendentAction(currentStories.d_w);
        break;
      case "i_w":
        setPrecendentAction(currentStories.i_w);
        break;
      case "c_l":
        setPrecendentAction(currentStories.c_l);
        break;
      case "d_l":
        setPrecendentAction(currentStories.d_l);
        break;
      case "i_l":
        setPrecendentAction(currentStories.i_l);
        break;

      default:
        break;
    }
    // console.log(child_dice);
  }

  return (
    <div className="position-relative">
      {flag ? (
        <Chapter
          where={currentStories.salle_de_bain}
          what={currentStories.cuisine}
          chpt={currentStories.numero_chapitre}
          txt={precendentAction}
          perso={perso}
        />
      ) : (
        <Events
          perso={perso}
          choice={currentStories}
          onSendData={handleDiceFromEvent}
          flag={flag}
        />
      )}

      <div className="container-fluid position-absolute top-50 start-0 d-flex justify-content-evenly">
        {flag ? (
          <>
            <button
              className="btn btn-warning"
              onClick={() => {
                const chc = currentStories.choix1;
                handleClick(chc);
              }}
            >
              choix 1
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                const chc = currentStories.choix2;
                handleClick(chc);
              }}
            >
              choix 2
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Book;
