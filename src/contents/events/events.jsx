import React, { useEffect } from "react";
import { useState } from "react";
import ChoiceCard from "./choicecard";
import TheEnd from "./theend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faUserNinja,
  faUserSecret,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

function Events(props) {
  const perso = props.perso;
  const story = props.choice;
  const flag = props.flag;
  const actions = props.actions;
  const save = props.save;
  const inventory = props.inventory;
  //   console.log(perso, story);

  //   set result dice
  const [dice, setDice] = useState("");
  //   set event show
  const [flagevent, setFlagevent] = useState(true);
  const [hideDice, setHideDice] = useState(false);

  // set story end
  const [storyEnd, setStoryEnd] = useState(false);

  // result dice
  const [win, setWin] = useState(true);
  // action done
  const [currentAction, setCurrentAction] = useState("");

  // catch content button actyion choice
  const [contentBtnActionChoice, setContentBtnActionChoice] = useState("");

  //   event current choice
  const [caracChoice, setCaracChoice] = useState("");
  //   roll the dice
  function handleClickDice() {
    const result = Math.floor(Math.random() * 100);
    setDice(result);
    setFlagevent(!flagevent);
    const action = result / caracChoice;
    action > 1 ? setWin(false) : "";
  }
  // send result form child to parent
  function handleClickContinu() {
    let next = "";
    if (currentAction == "constitution" && win) {
      next = "c_w";
    } else if (currentAction == "constitution" && win == false) {
      next = "c_l";
    }
    if (currentAction == "dexterite" && win) {
      next = "d_w";
    } else if (currentAction == "dexterite" && win == false) {
      next = "d_l";
    }
    if (currentAction == "intelligence" && win) {
      next = "i_w";
    } else if (currentAction == "intelligence" && win == false) {
      next = "i_l";
    }
    props.onSendData([!flag, next]);
  }
  //  player choice the possibility to action
  function handleClickEvent(id) {
    setHideDice(true);
    setCurrentAction(id);
    switch (id) {
      case "constitution":
        setCaracChoice(perso.constitution);
        break;
      case "dexterite":
        setCaracChoice(perso.dexterite);
        break;
      case "intelligence":
        setCaracChoice(perso.intelligence);
        break;
      default:
        setStoryEnd(true);
        console.log("This is the end" + storyEnd);
        break;
    }
  }

  const [btnChoiceContent, setBtnChoiceContent] = useState([]);
  // reload list of buttons when choices was done
  useEffect(() => {
    let listBtn = [];
    for (let i = 0; i < actions.btn.length; i++) {
      listBtn.push(
        <ChoiceCard
          key={i}
          onSwipeRight={() => {
            console.log("TEST event" + actions.carac[i]);
            handleClickEvent(actions.carac[i]);
            setContentBtnActionChoice(actions.btn[i]);
          }}
          content={actions.btn[i]}
        />
      );
    }
    setBtnChoiceContent(listBtn);
  }, []);

  return (
    <div className="h-100">
      <div className="inside-content container-fluid d-flex flex-column justify-content-evenly h-100">
        <div className="row justify-content-md-center">
          <div className="col col-6">
            <div className="row">
              <div className="col col-6 me-5">
                <article className="p-2">
                  <h1>Rappel des règles</h1>
                  <section className="bg-light p-2 rounded">
                    <p>Les règles sont les suivantes :</p>
                    <div className="d-flex">
                      <FontAwesomeIcon className="me-1" icon={faExclamation} />
                      <p>
                        Chaque action disponible correspond à une
                        caractéristique.
                      </p>
                    </div>
                    <div className="d-flex">
                      <FontAwesomeIcon className="me-1" icon={faExclamation} />
                      <p>
                        L'issu du choix est lié à la probabilité de réussite
                        correspondant à cette caractéristique.
                      </p>
                    </div>
                    <div className="d-flex">
                      <FontAwesomeIcon className="me-1" icon={faExclamation} />
                      <p>
                        Plus la caractéristique est grande, plus la réussite est
                        probable.
                      </p>
                    </div>
                  </section>
                </article>
              </div>
              <div className="col col-5">
                <div className="card card-charac">
                  <div className="card-body">
                    <article className="d-flex justify-content-sm-evenly">
                      <section>
                        <h4 className="card-title">{perso.name}</h4>
                        <h5 className="card-title">{perso.type}</h5>
                        <p className="card-text">C : {perso.constitution}</p>
                        <p className="card-text">D : {perso.dexterite}</p>
                        <p className="card-text">I : {perso.intelligence}</p>
                      </section>

                      <section className="d-flex justify-content-md-center align-items-center w-50">
                        {perso.intelligence == "75" ? (
                          <FontAwesomeIcon
                            className="w-50 h-50"
                            icon={faUserGraduate}
                          />
                        ) : (
                          <></>
                        )}
                        {perso.dexterite == "75" ? (
                          <FontAwesomeIcon
                            className="w-50 h-50"
                            icon={faUserNinja}
                          />
                        ) : (
                          <></>
                        )}
                        {perso.constitution == "75" ? (
                          <FontAwesomeIcon
                            className="w-50 h-50"
                            icon={faUserSecret}
                          />
                        ) : (
                          <></>
                        )}
                      </section>
                    </article>
                  </div>
                  {inventory == "" ? (
                    <></>
                  ) : (
                    <p className="card-text"> Inventaire : {inventory} </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col col-10 description p-4">
            <p>{story.card_context}</p>
            <p>{story.mj_question}</p>
          </div>
        </div>

        {!storyEnd ? (
          <>
            {hideDice ? (
              <></>
            ) : (
              <div className="d-flex justify-content-evenly footer-content">
                {btnChoiceContent}
              </div>
            )}
            {hideDice ? (
              <div className="container-fluid d-flex justify-content-evenly">
                {flagevent && hideDice ? (
                  <>
                    <ChoiceCard
                      content={"Dice"}
                      onSwipeRight={() => handleClickDice()}
                    />
                    {console.log(contentBtnActionChoice)}
                    <article className="description p-4">
                      <p> Ton choix : {contentBtnActionChoice}</p>
                      <p>
                        Il faut faire moins ou égale à la caractéristique : /
                        {caracChoice}
                      </p>
                    </article>
                  </>
                ) : (
                  <>
                    <article className="description p-4">
                      <p>
                        Result : {dice} / {caracChoice}
                      </p>
                      {win ? (
                        <p>Tu as réussi ton action</p>
                      ) : (
                        <p>Tu as échoué dans ton action</p>
                      )}
                    </article>

                    <ChoiceCard
                      content={"Continue"}
                      onSwipeRight={() => handleClickContinu()}
                    />
                  </>
                )}
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <TheEnd save={save} />
        )}
      </div>
    </div>
  );
}

export default Events;
