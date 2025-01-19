import React from "react";
import { useState } from "react";
import Book from "../book";
import charactereData from "./data.json";

function Characters() {
  const data = charactereData;
  //   console.log(data);
  const [flag, setFlag] = useState(true);
  const [perso, setPerso] = useState([]);

  function handleClick(e) {
    const persoId = e.target.childNodes[1].data;
    const charac = data[parseInt(persoId) - 1];
    setPerso(charac);
    setFlag(false);
  }

  return (
    <>
      {flag ? (
        <div className="test">
          <div className="main-content container-fluid d-flex justify-content-center">
            <div className="main-content row d-flex justify-content-evenly">
              {data.map((tmp, key) => {
                return (
                  <div
                    className="col col-4 d-flex justify-content-md-center align-items-center"
                    key={key}
                  >
                    <div className="card card-charac ">
                      <div className="card-body">
                        <h4 className="card-title">Nom : {tmp.name}</h4>
                        <h5 className="card-title">Fonction : {tmp.type}</h5>
                        <p className="card-text">
                          Constitution (C) : {tmp.constitution}
                        </p>
                        <p className="card-text">
                          Dextérité (D) : {tmp.dexterite}
                        </p>
                        <p className="card-text">
                          Intelligence (I) : {tmp.intelligence}
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => handleClick(e)}
                        >
                          choix : {parseInt(tmp.choix) + 1}
                        </button>
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
