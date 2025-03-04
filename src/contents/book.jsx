import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Chapter from "./chapter/chapter";
import storiesData from "./chapter/stories.json";
import ChoiceCard from "./events/choicecard";
import Events from "./events/events";
import TheEnd from "./events/theend";

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
  const [actionActive, setActionActive] = useState(false);

  // save
  var save = useRef([]);

  useEffect(() => {
    save.current.push([precendentAction, choice, perso]);
    console.log("histo : ", save.current);
  }, [precendentAction]);

  // set story end
  const [storyEnd, setStoryEnd] = useState(false);

  // set content show
  function handleClick(newChapter) {
    setChoice(newChapter);
    setFlag(!flag);

    if (newChapter == 24) {
      setStoryEnd(true);
    }
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

  // set all buttons from data
  const btnList = currentStories.btn_choix;

  const [btnChoiceContent, setBtnChoiceContent] = useState([]);
  // reload list of buttons when choices was done

  // choose card with swipe
  const [swipedCardIndex, setSwipedCardIndex] = useState(null);
  const handleSwipeRight = (index) => {
    setSwipedCardIndex(index);
  };

  useEffect(() => {
    let listBtn = [];
    for (let i = 0; i < btnList.length; i++) {
      listBtn.push(
        <ChoiceCard
          key={i}
          content={currentStories.btn_choix[i]}
          onSwipeRight={() => {
            handleSwipeRight(i);
            const chc = currentStories.choix[i];
            handleClick(chc);
            setActionActive(false);
            console.log("TEST book" + currentStories.choix[i]);
          }}
        />
      );
    }

    console.log("render 1", actionActive, actionSup);
    actionActive ? setPrecendentAction(currentStories.card_context) : null;

    // if action to add from precedent action, add button

    if (actionSup && actionSup.length != 0) {
      listBtn.push(
        <ChoiceCard
          key={5}
          content={actionSup[1]}
          onSwipeRight={() => {
            const chc = actionSup[0];
            setChoice(chc);
            setActionSup([]);
            setActionActive(true);
          }}
        />
      );
      console.log("test actionsup", actionSup);
    }
    setBtnChoiceContent(listBtn);
  }, [currentStories, actionSup, swipedCardIndex]);

  return !storyEnd ? (
    <div className="d-flex flex-column main-content">
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
          save={save.current}
        />
      )}

      <div className="d-flex justify-content-evenly footer-content test">
        {flag ? <>{btnChoiceContent}</> : <></>}
      </div>
    </div>
  ) : (
    <TheEnd save={save} />
  );
}

export default Book;
