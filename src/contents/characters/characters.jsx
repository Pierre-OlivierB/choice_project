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
        <div className="house">
          <div className="main-content container-fluid d-flex justify-content-center">
            <div className="main-content row d-flex justify-content-evenly">
              <div className="row justify-content-md-center mt-4">
                <article className="col col-10 description p-4">
                  <p>
                    Dans un RP, il te faut choisir un personnage qui va te
                    représenter. Pour l'exemple, voici 3 personnages
                    pré-construit afin de te familiariser avec la construction
                    d'un personnage.
                  </p>
                  <p>
                    Chaque choix que tu feras, sera irrémédiable. Un autre choix
                    est une autre histoire. Tu n'as pas de limite de temps,
                    alors choisis bien.
                  </p>
                  <p>
                    Ici je te propose une construction de personnage très
                    simplifiée. Ton personnage a un nom, une fonction qui est
                    ici plus une représentation global de ton personnage et des
                    caractéristiques. Ces dernières vont être le centre de tes
                    préoccupations étant donné qu'elles vont te permettre ou non
                    de la réussite de ton action. Ici, les caractéristiques vont
                    de 1 à 100. Pour savoir si la personne à réussit une action
                    on jette un dé 100. Pour que l'action soit une réussite, il
                    faut que le dé affiche un résultat égale ou inférieur. Plus
                    la caractéristique lié à l'action est grande, plus la
                    probabilité de réussite est grande. Prenons exemple sur
                    Chris. Il est costo, il a une constitution de 75. S'il avait
                    à se battre, il aurait 75% de réussite. D'un autre côté,
                    s'il avait à réfléchir à une situation, il n'aurait que 25%
                    de réussite.
                  </p>
                  <p>
                    L'échec comme la réussite peut parfois ne pas avoir de réel
                    conséquences sur le résultat du but de l'action (ex:
                    chercher un objet et le trouver) mais sur le temps pris pour
                    réaliser l'action (ex: immédiat si réussite ou plusieurs
                    jours si échec). Dernière information importante, il faut
                    garder en tête que dans un vrai RP, le Maître du jeu peut
                    sortir du script et ajouter du contenu ou du lore à votre
                    histoire.
                  </p>
                  <p>Et maintenant à toi de jouer.</p>
                  <p> Quel est ton choix ?</p>
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
