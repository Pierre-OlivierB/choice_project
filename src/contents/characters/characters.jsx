import React from "react";
import { useState } from "react";
import Book from "../book";
import ChoiceCard from "../events/choicecard";
import charactereData from "./data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faUserNinja,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";

function Characters() {
  // get data from json of all characteres
  const data = charactereData;
  // set flag to hide charactere choice
  const [flag, setFlag] = useState(true);
  // set var to save player charac choice
  const [perso, setPerso] = useState([]);
  // get choice at player click and change page content
  function handleClick(id) {
    const charac = data[parseInt(id)];
    setPerso(charac);
    setFlag(false);
  }

  return (
    <>
      {flag ? (
        <div className="test">
          <div className="main-content container-fluid d-flex justify-content-center">
            <div className="main-content row d-flex justify-content-evenly">
              <div className="row justify-content-md-center mt-4">
                <article className="col col-10 description p-4">
                  <p>
                    Dans un RP, il nous faut choisir un personnage qui va nou
                    représenté. Pour l'exemple, voici 3 personnages
                    pré-construit afin de vous familiariser avec la construction
                    d'un personnage.
                  </p>
                  <p>Et maintenant à vous de jouer.</p>
                  <p> Quel est votre choix ?</p>
                </article>
              </div>
              {data.map((tmp, key) => {
                return (
                  <div
                    className="col col-4 d-flex justify-content-md-center align-items-center"
                    key={key}
                  >
                    <div className="card card-charac ">
                      <div className="card-body">
                        <article className="d-flex justify-content-sm-evenly">
                          <section>
                            <h4 className="card-title">Nom : {tmp.name}</h4>
                            <h5 className="card-title">
                              Fonction : {tmp.type}
                            </h5>
                            <p className="card-text">
                              Constitution (C) : {tmp.constitution}
                            </p>
                            <p className="card-text">
                              Dextérité (D) : {tmp.dexterite}
                            </p>
                            <p className="card-text mb-5">
                              Intelligence (I) : {tmp.intelligence}
                            </p>
                          </section>
                          <section className="d-flex justify-content-md-center align-items-center w-50">
                            {tmp.intelligence == "75" ? (
                              <FontAwesomeIcon
                                className="w-50 h-50"
                                icon={faUserGraduate}
                              />
                            ) : (
                              <></>
                            )}
                            {tmp.dexterite == "75" ? (
                              <FontAwesomeIcon
                                className="w-50 h-50"
                                icon={faUserNinja}
                              />
                            ) : (
                              <></>
                            )}
                            {tmp.constitution == "75" ? (
                              <FontAwesomeIcon
                                className="w-50 h-50"
                                icon={faUserSecret}
                              />
                            ) : (
                              <></>
                            )}
                          </section>
                        </article>

                        <ChoiceCard
                          content={"choix : " + (parseInt(tmp.choix) + 1)}
                          onSwipeRight={() => handleClick(tmp.choix)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Book perso={perso} />
      )}
    </>
  );
}

export default Characters;
