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

  // add inventory to caracter
  const [inventory, setInventory] = useState([]);

  // !--------------------------------------
  const [win, setWin] = useState(true);
  const [action, setAction] = useState("");
  // !--------------------------------------

  // keep in mind what choice has been made
  const [choiceAlreadyDone, setChoiceAlreadyDone] = useState("");

  // set actual storie
  const currentStories = stories[choice];

  // set precedent action
  const [precendentAction, setPrecendentAction] = useState(currentStories.txt);
  // const [actionSup, setActionSup] = useState([]);
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

    if (newChapter == 24 || newChapter == 26 || newChapter == 28) {
      setStoryEnd(true);
    }
  }

  // get data from child event
  function handleDiceFromEvent(child_choice) {
    // setDice(child_dice[0]);
    console.log("TEST setflag " + child_choice[0]);
    setFlag(child_choice[0]);

    // event by the action win or not
    switch (child_choice[1]) {
      case "c_w":
        setPrecendentAction(currentStories.c_w[0]);
        setWin(true);
        setAction("c");
        // setActionSup(currentStories.c_w[1]);
        break;
      case "d_w":
        setPrecendentAction(currentStories.d_w[0]);
        setWin(true);
        setAction("d");
        // setActionSup(currentStories.d_w[1]);
        break;
      case "i_w":
        setPrecendentAction(currentStories.i_w[0]);
        setWin(true);
        setAction("i");
        // setActionSup(currentStories.i_w[1]);
        break;
      case "c_l":
        setPrecendentAction(currentStories.c_l[0]);
        setWin(false);
        // setActionSup(currentStories.c_l[1]);
        break;
      case "d_l":
        setPrecendentAction(currentStories.d_l[0]);
        setWin(false);
        // setActionSup(currentStories.d_l[1]);
        break;
      case "i_l":
        setPrecendentAction(currentStories.i_l[0]);
        setWin(false);
        // setActionSup(currentStories.i_l[1]);
        break;

      default:
        break;
    }
  }
  if (currentStories.btn_choix) {
    // set all buttons from data
    var btnList = currentStories.btn_choix;
  } else if (win) {
    // verification if win and if array or object)
    if (Array.isArray(currentStories.choix_win)) {
      var btnList = currentStories.btn_choix_win;
      var choix = currentStories.choix_win;
    } else {
      switch (action) {
        case "c":
          var btnList = [currentStories.btn_choix_win.c];
          var choix = [currentStories.choix_win.c];
          break;
        case "d":
          var btnList = [currentStories.btn_choix_win.d];
          var choix = [currentStories.choix_win.d];
          break;
        case "i":
          var btnList = [currentStories.btn_choix_win.i];
          var choix = [currentStories.choix_win.i];
          break;
        default:
          break;
      }
    }
  } else {
    var btnList = currentStories.btn_choix_loose;
    var choix = currentStories.choix_loose;
  }

  const [btnChoiceContent, setBtnChoiceContent] = useState([]);
  // reload list of buttons when choices was done

  // choose card with swipe
  const [swipedCardIndex, setSwipedCardIndex] = useState(null);
  const handleSwipeRight = (index) => {
    setSwipedCardIndex(index);
    console.log("swipe setflag " + flag);
  };

  useEffect(() => {
    let listBtn = [];

    for (let i = 0; i < btnList.length; i++) {
      // console.log(JSON.stringify(currentStories));
      console.log("what is in alreadydone ? " + choiceAlreadyDone);
      if (currentStories.choix) {
        if (!choiceAlreadyDone.includes(currentStories.choix[i])) {
          // console.log("test num chap alreadydone" + currentStories.choix[i]);

          listBtn.push(
            <ChoiceCard
              key={i}
              content={currentStories.btn_choix[i]}
              onSwipeRight={() => {
                handleSwipeRight(i);
                const chc = currentStories.choix[i];
                handleClick(chc);
                setActionActive(false);
                setChoiceAlreadyDone([...choiceAlreadyDone, choice]);
                if (choice == 2) {
                  setChoiceAlreadyDone([choiceAlreadyDone, "6"]);
                }
                // console.log(
                //   "TEST book" + JSON.stringify(currentStories.choix[i])
                // );
              }}
            />
          );
          // console.log("list btn TEST : " + currentStories.choix[i]);
        }
      } else {
        // console.log("win ? " + win + " " + currentStories.choix_win[i]);
        listBtn.push(
          <ChoiceCard
            key={i}
            content={btnList[i]}
            onSwipeRight={() => {
              handleSwipeRight(i);
              // !-------------------------
              const chc = choix[i];
              handleClick(chc);
              setActionActive(false);
              setChoiceAlreadyDone([...choiceAlreadyDone, choice]);
              if (choice == 2) {
                setChoiceAlreadyDone([choiceAlreadyDone, "6"]);
              }
              // console.log(
              //   "TEST book" + JSON.stringify(currentStories.choix[i])
              // );
            }}
          />
        );
      }
    }
    if (currentStories.choix) {
      if (choiceAlreadyDone.includes("15")) {
        if (
          choiceAlreadyDone != "" &&
          parseInt(currentStories.numero_chapitre) < 15
        ) {
          listBtn.push(
            <ChoiceCard
              key={15}
              content={"retourner à la porte"}
              onSwipeRight={() => {
                handleSwipeRight(15);
                const chc = "15";
                handleClick(chc);
                setActionActive(false);
                console.log("TEST book" + "15");
              }}
            />
          );
        }
      }

      if (choiceAlreadyDone.includes("10")) {
        setInventory("clef");
        if (currentStories.numero_chapitre == "15") {
          listBtn.push(
            <ChoiceCard
              key={19}
              content={currentStories.btn_choix_sup[1]}
              onSwipeRight={() => {
                handleSwipeRight(19);
                const chc = currentStories.btn_choix_sup[0];
                handleClick(chc);
                setActionActive(false);
                setChoiceAlreadyDone([choiceAlreadyDone, choice]);
                console.log("TEST book" + currentStories.btn_choix_sup[0]);
              }}
            />
          );
        }
      }
    }
    if (currentStories.numero_chapitre == "19" && win) {
      listBtn.push(
        <ChoiceCard
          key={23}
          content={currentStories.btn_choix_sup[1]}
          onSwipeRight={() => {
            handleSwipeRight(23);
            const chc = currentStories.btn_choix_sup[0];
            handleClick(chc);
            setActionActive(false);
            setChoiceAlreadyDone([choiceAlreadyDone, choice]);
            console.log("TEST book" + currentStories.btn_choix_sup[0]);
          }}
        />
      );
    }
    console.log(
      "tentative sneaky n°" + currentStories.numero_chapitre + " win ? " + win
    );

    // console.log("render 1", actionActive);
    actionActive ? setPrecendentAction(currentStories.card_context) : null;

    // if action to add from precedent action, add button

    // if (actionSup && actionSup.length != 0) {
    //   listBtn.push(
    //     <ChoiceCard
    //       key={5}
    //       content={actionSup[1]}
    //       onSwipeRight={() => {
    //         const chc = actionSup[0];
    //         setChoice(chc);
    //         setActionSup([]);
    //         setActionActive(true);
    //       }}
    //     />
    //   );
    //   console.log("test actionsup", actionSup);
    // }
    setBtnChoiceContent(listBtn);
  }, [currentStories, swipedCardIndex, flag]);

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
          inventory={inventory}
        />
      ) : (
        <Events
          perso={perso}
          choice={currentStories}
          onSendData={handleDiceFromEvent}
          flag={flag}
          actions={currentStories.actions}
          save={save.current}
          inventory={inventory}
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
