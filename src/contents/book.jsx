import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import Chapter from "./chapter/chapter";
import storiesData from "./chapter/stories.json";
import ChoiceCard from "./events/choicecard";
import Events from "./events/events";
import TheEnd from "./events/theend";

function Book(props) {
  //get player choice
  const perso = props.perso;
  // get all stories from json
  const stories = storiesData;

  // set button player choice
  const [choice, setChoice] = useState(0);
  // set content show
  const [flag, setFlag] = useState(true);
  // add inventory to caracter
  const [inventory, setInventory] = useState([]);
  // victory / loose statut
  const [win, setWin] = useState(true);
  // Action link with (c, d, i)
  const [action, setAction] = useState("");

  // keep in mind what choice has been made
  const [choiceAlreadyDone, setChoiceAlreadyDone] = useState([]);

  // set actual storie
  const currentStories = stories[choice];

  // set precedent action
  const [precendentAction, setPrecendentAction] = useState(currentStories.txt);
  // actions has been before ?
  const [actionActive, setActionActive] = useState(false);
  // save
  const save = useRef([]);
  // set story end
  const [storyEnd, setStoryEnd] = useState(false);
  //set background
  const [activeBackground, setActiveBackground] = useState("house");
  // Dice throw
  const [choiceAfterDiceRoll, setChoiceAfterDiceRoll] = useState(null);

  // call after dice
  const handleDiceRollComplete = useCallback(() => {
    setChoiceAfterDiceRoll(choice);
  }, [choice]);

  // 2. afterdice
  useEffect(() => {
    if (choiceAfterDiceRoll === "17" || choiceAfterDiceRoll === "19") {
      setActiveBackground("car");
    } else if (choiceAfterDiceRoll === "1") {
      setActiveBackground("tv");
    }
    // add or del key if needed ou used
    if (choiceAlreadyDone.includes("10")) {
      if (!inventory.includes("clef")) {
        setInventory((prev) => [...prev, "clef"]);
      }
      if (choiceAlreadyDone.includes("19")) {
        setInventory((prev) => prev.filter((item) => item !== "clef"));
      }
    }
  }, [choiceAfterDiceRoll]);
  // !----------------------------------------------------
  // Card swipe
  const [swipedCardIndex, setSwipedCardIndex] = useState(null);
  // !---------------------------

  // set content show
  function handleClick(newChapter) {
    // newChapter with his index
    setChoice(newChapter);
    setFlag((prevFlag) => !prevFlag);
  }
  // story end
  const handleStoryEnd = useCallback((isEnd) => {
    setStoryEnd(isEnd);
  }, []);

  // !---------------------------
  // Swipe Card
  const handleSwipeRight = (index) => {
    setSwipedCardIndex(index);
  };
  // !---------------------------

  // get data from child event
  function handleDiceFromEvent(child_choice) {
    setFlag(child_choice[0]);
    // event by the action win or not

    switch (child_choice[1]) {
      case "c_w":
        setPrecendentAction(currentStories.c_w[0]);
        setWin(true);
        setAction("c");
        break;
      case "d_w":
        setPrecendentAction(currentStories.d_w[0]);
        setWin(true);
        setAction("d");
        break;
      case "i_w":
        setPrecendentAction(currentStories.i_w[0]);
        setWin(true);
        setAction("i");
        break;
      case "c_l":
        setPrecendentAction(currentStories.c_l[0]);
        setWin(false);
        break;
      case "d_l":
        setPrecendentAction(currentStories.d_l[0]);
        setWin(false);
        break;
      case "i_l":
        setPrecendentAction(currentStories.i_l[0]);
        setWin(false);
        break;
      default:
        break;
    }
  }
  // --- LOGIC BTNS (Render) ---

  // Definition btnList and choix with win/loose
  const { btnList, choix } = useMemo(() => {
    let list = [];
    let choiceValues = [];

    if (currentStories.btn_choix) {
      list = currentStories.btn_choix;
      choiceValues = currentStories.choix;
    } else if (win) {
      if (Array.isArray(currentStories.choix_win)) {
        list = currentStories.btn_choix_win;
        choiceValues = currentStories.choix_win;
      } else {
        // Logique win/loose action (c, d, i)
        switch (action) {
          case "c":
            list = [currentStories.btn_choix_win.c];
            choiceValues = [currentStories.choix_win.c];
            break;
          case "d":
            list = [currentStories.btn_choix_win.d];
            choiceValues = [currentStories.choix_win.d];
            break;
          case "i":
            list = [currentStories.btn_choix_win.i];
            choiceValues = [currentStories.choix_win.i];
            break;
          default:
            list = [];
            choiceValues = [];
            break;
        }
      }
    } else {
      // Loose logic
      list = currentStories.btn_choix_loose || [];
      choiceValues = currentStories.choix_loose || [];
    }

    return { btnList: list, choix: choiceValues };
  }, [currentStories, win, action]);

  // --- CONSTRUCTION LOGIC (useMemo) ---
  // list btn to display
  const listBtnJSX = useMemo(() => {
    const generatedList = [];

    // Choices Btns
    for (let i = 0; i < btnList.length; i++) {
      const choiceValue = choix[i];
      const buttonContent = btnList[i];

      // IF currentStories.choix not null and choice not already done
      if (currentStories.choix) {
        if (!choiceAlreadyDone.includes(currentStories.choix[i])) {
          generatedList.push(
            <ChoiceCard
              key={`choice-${i}`}
              content={currentStories.btn_choix[i]}
              onSwipeRight={() => {
                handleSwipeRight(i);
                const chc = currentStories.choix[i];

                handleClick(chc);
                setActionActive(false);

                setChoiceAlreadyDone((prevChoices) => {
                  let newChoices = [...prevChoices, chc];

                  if (chc == "2") {
                    newChoices = [...newChoices, "6"];
                  }
                  return newChoices;
                });
              }}
            />
          );
        }

        // IF currentStories.choix doesn't exist
      } else {
        generatedList.push(
          <ChoiceCard
            key={`choice-alt-${i}`}
            content={buttonContent}
            onSwipeRight={() => {
              handleSwipeRight(i);
              const chc = choiceValue;

              handleClick(chc);
              setActionActive(false);

              setChoiceAlreadyDone((prevChoices) => {
                let newChoices = [...prevChoices, chc];

                if (chc == "2") {
                  newChoices = [...newChoices, "6"];
                }
                return newChoices;
              });
            }}
          />
        );
      }
    } // END FOR

    // --- BTN Logic PLUS ---
    // renturn door
    if (
      currentStories.choix &&
      choiceAlreadyDone.includes("15") &&
      choiceAlreadyDone.length > 0 &&
      parseInt(currentStories.numero_chapitre) < 15
    ) {
      generatedList.push(
        <ChoiceCard
          key={15}
          content={"Retourner à la porte"}
          onSwipeRight={() => {
            handleSwipeRight(15);
            handleClick("15");
            setActionActive(false);
          }}
        />
      );
    }
    // Key or items
    if (
      currentStories.choix &&
      choiceAlreadyDone.includes("10") &&
      (currentStories.numero_chapitre == "15" ||
        currentStories.numero_chapitre == "16")
    ) {
      generatedList.push(
        <ChoiceCard
          key={19}
          content={currentStories.btn_choix_sup[1]}
          onSwipeRight={() => {
            handleSwipeRight(19);
            const chc = currentStories.btn_choix_sup[0];
            handleClick(chc);
            setActionActive(false);

            setChoiceAlreadyDone((prevChoices) => [...prevChoices, chc]);
          }}
        />
      );
    }

    // Victory
    if (currentStories.numero_chapitre == "19" && win) {
      generatedList.push(
        <ChoiceCard
          key={23}
          content={currentStories.btn_choix_sup[1]}
          onSwipeRight={() => {
            handleSwipeRight(23);
            const chc = currentStories.btn_choix_sup[0];
            handleClick(chc);
            setActionActive(false);

            setChoiceAlreadyDone((prevChoices) => [...prevChoices, chc]);
          }}
        />
      );
    }

    return generatedList;
  }, [
    btnList,
    choix,
    choiceAlreadyDone,
    currentStories,
    handleSwipeRight,
    handleClick,
    setActionActive,
    setChoiceAlreadyDone,
    win,
  ]);

  // --- useEffects Logic ---

  // History
  useEffect(() => {
    save.current.push([precendentAction, choice, perso]);
  }, [precendentAction]);

  //setPrecendentAction
  useEffect(() => {
    if (actionActive) {
      setPrecendentAction(currentStories.card_context);
    }
  }, [
    currentStories,
    listBtnJSX,
    actionActive,
    win,
    choiceAlreadyDone,
    setInventory,
    setPrecendentAction,
  ]);

  // --- RENDER ---
  return !storyEnd ? (
    <div className={`d-flex flex-column main-content ${activeBackground}`}>
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
          where={currentStories.card_context}
          onDiceRollComplete={handleDiceRollComplete}
          onStoryEnd={handleStoryEnd}
        />
      )}
      {flag && (
        <div className="d-flex flex-row p-1 gx-4 overflow-x-auto overflow-y-hidden align-items-center justify-content-evenly footer-content">
          {listBtnJSX}
        </div>
      )}
    </div>
  ) : (
    <TheEnd save={save} />
  );
}

export default Book;
