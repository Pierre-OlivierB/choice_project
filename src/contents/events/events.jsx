import React from "react";
import { useState } from "react";

function Events(props) {
  const perso = props.perso;
  const story = props.choice;
  const flag = props.flag;
  //   console.log(perso, story);

  //   set result dice
  const [dice, setDice] = useState("");
  //   set event show
  const [flagevent, setFlagevent] = useState(true);
  const [hideDice, setHideDice] = useState(false);

  // result dice
  const [win, setWin] = useState(true);
  // action done
  const [currentAction, setCurrentAction] = useState("");

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
        break;
    }
  }

  return (
    <div className="test">
      <div className="main-content container-fluid d-flex flex-column justify-content-evenly">
        <div className="row justify-content-md-center">
          <div className="col col-6">
            <div className="row">
              <div className="col col-6">
                <h1>Event</h1>
                <h2>chapitre {story.numero_chapitre}</h2>
              </div>
              <div className="col col-6">
                <div className="card card-charac">
                  <div className="card-body">
                    <h4 className="card-title">{perso.name}</h4>
                    <h5 className="card-title">{perso.type}</h5>
                    <p className="card-text">C : {perso.constitution}</p>
                    <p className="card-text">D : {perso.dexterite}</p>
                    <p className="card-text">I : {perso.intelligence}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col col-10">
            <p>Where : {story.salle_de_bain}</p>
            <p>What : {story.cuisine}</p>
          </div>
        </div>
        <div className="container-fluid position-absolute top-50 start-0 d-flex justify-content-evenly">
          <button
            className="btn btn-success"
            id="intelligence"
            onClick={(e) => {
              const id = e.target.id;
              handleClickEvent(id);
            }}
          >
            Raisonner
          </button>
          <button
            className="btn btn-warning"
            id="dexterite"
            onClick={(e) => {
              const id = e.target.id;
              handleClickEvent(id);
            }}
          >
            Eviter
          </button>
          <button
            className="btn btn-danger"
            id="constitution"
            onClick={(e) => {
              const id = e.target.id;
              handleClickEvent(id);
            }}
          >
            Combattre
          </button>
        </div>
        {hideDice ? (
          <div className="container-fluid">
            {flagevent && hideDice ? (
              <>
                <button className="btn btn-danger" onClick={handleClickDice}>
                  Dice
                </button>
                <p>
                  Il faut faire moins ou égale à la caractéristique : /
                  {caracChoice}
                </p>
              </>
            ) : (
              <>
                <p>
                  Result : {dice} / {caracChoice}
                </p>
                {win ? (
                  <p>Tu as réussi ton action</p>
                ) : (
                  <p>Tu as échoué dans ton action</p>
                )}

                <button
                  className="btn btn-success"
                  onClick={handleClickContinu}
                >
                  Continue
                </button>
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Events;
