import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faUserNinja,
  faUserSecret,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

function Chapter(props) {
  const chpt = props.chpt;
  const txt = props.txt;
  const perso = props.perso;
  const mj = props.mj;
  const inventory = props.inventory;

  return (
    <div className="h-65 w-100">
      <div className="inside-content h-100">
        <div className="row g-0 align-items-center justify-content-center h-50 w-100">
          <div className="col col-12">
            <div className="row g-0">
              <div className="col col-7">
                <article className="p-2">
                  <h1>Rappel des règles</h1>
                  <section className="rules-color p-2 rounded overflow-x-auto max-h-160">
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
              <div className="col col-5 d-flex justify-content-center align-items-end p-2">
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

                      <section className="d-flex justify-content-center align-items-center w-50">
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
                    <p className="card-text p-2 fw-bold">
                      Inventaire : {inventory}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center h-50 w-100">
          <div className="col col-10 description p-4 max-h-160 overflow-x-auto">
            <p>{txt}</p>
            <p>{mj}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chapter;
