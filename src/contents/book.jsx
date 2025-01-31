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
  const [actionSup, setActionSup] = useState([]);

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
        setPrecendentAction(currentStories.c_w[0]);
        setActionSup(currentStories.c_w[1]);
        break;
      case "d_w":
        setPrecendentAction(currentStories.d_w[0]);
        setActionSup(currentStories.d_w[1]);
        break;
      case "i_w":
        setPrecendentAction(currentStories.i_w[0]);
        setActionSup(currentStories.i_w[1]);
        break;
      case "c_l":
        setPrecendentAction(currentStories.c_l[0]);
        setActionSup(currentStories.c_l[1]);
        break;
      case "d_l":
        setPrecendentAction(currentStories.d_l[0]);
        setActionSup(currentStories.d_l[1]);
        break;
      case "i_l":
        setPrecendentAction(currentStories.i_l[0]);
        setActionSup(currentStories.i_l[1]);
        break;

      default:
        break;
    }
  }
  // console.log("Add : ", actionSup);
  // set all buttons from data
  const btnList = currentStories.btn_choix;
  // console.log("btnlist = ", btnList);

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
    // if action to add from precedent action, add button
    if (actionSup.length != 0 && actionSup) {
      listBtn.push(
        <button
          key={5}
          className="btn btn-success"
          onClick={() => {
            const chc = actionSup[0];
            setChoice(chc);
          }}
        >
          {actionSup[1]}
        </button>
      );
      console.log("test actionsup", actionSup);
    }
    setBtnChoiceContent(listBtn);
  }, [currentStories, actionSup]);

  return (
    <div className="position-relative">
      {flag ? (
        <Chapter
          where={currentStories.card_context}
          what={currentStories.mj_question}
          chpt={currentStories.numero_chapitre}
          txt={precendentAction}
          mj={currentStories.mj_question}
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
