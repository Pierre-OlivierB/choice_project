import React from "react";
import { useState } from "react";

function Events(props) {
  const perso = props.perso;
  const story = props.choice;
  //   console.log(perso, story);

  const [dice, setDice] = useState("");
  const [flag, setFlag] = useState(true);

  function handleClick() {
    setDice(Math.floor(Math.random() * 100));
    setFlag(!flag);
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
        <div className="container-fluid">
          {flag ? (
            <button className="btn btn-danger" onClick={handleClick}>
              Dice
            </button>
          ) : (
            <p>{dice}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
