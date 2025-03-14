import React from "react";

function Chapter(props) {
  const chpt = props.chpt;
  const txt = props.txt;
  const perso = props.perso;
  const mj = props.mj;
  const inventory = props.inventory;

  // console.log("chapter" + chpt);

  // if (chpt === "end") {
  //   console.log("this is the end");
  // }
  function handleClick() {
    console.log("render");
  }

  return (
    <div className="test">
      <div className="inside-content container-fluid d-flex flex-column justify-content-evenly">
        <div className="row justify-content-md-center">
          <div className="col col-6">
            <div className="row">
              <div className="col col-6">
                <h1>chapitre {chpt}</h1>
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
          <div className="col col-10">
            <p>{txt}</p>
            <p>{mj}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chapter;
