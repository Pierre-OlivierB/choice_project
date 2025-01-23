import React, { useRef } from "react";
import { useEffect } from "react";
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

  // save
  var save = useRef([]);
  // console.log(save);
  useEffect(() => {
    save.current.push([precendentAction, choice, perso]);
    console.log("histo : ", save.current);
  }, [precendentAction]);

  // set content show
  function handleClick(newChapter) {
    setChoice(newChapter);
    setFlag(!flag);
  }

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
  }

  // set all buttons from data
  const btnList = currentStories.btn_choix;

  const [btnChoiceContent, setBtnChoiceContent] = useState([]);
  // reload list of buttons when choices was done
  useEffect(() => {
    let listBtn = [];
    for (let i = 0; i < btnList.length; i++) {
      listBtn.push(
        <button
          key={i}
          className="btn btn-success"
          onClick={() => {
            const chc = currentStories.choix[i];
            handleClick(chc);
          }}
        >
          {currentStories.btn_choix[i]}
        </button>
      );
    }
    setBtnChoiceContent(listBtn);
  }, []);

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
          actions={currentStories.actions}
        />
      )}

      <div className="container-fluid position-absolute top-50 start-0 d-flex justify-content-evenly">
        {flag ? <>{btnChoiceContent}</> : <></>}
      </div>
    </div>
  );
}

export default Book;
