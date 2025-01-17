import React from "react";

function Chapter(props) {
  const where = props.where;
  const what = props.what;
  const chpt = props.chpt;
  const txt = props.txt;

  function handleClick() {
    console.log("render");
  }

  return (
    <div className="test">
      <div className="main-content container-fluid d-flex flex-column justify-content-evenly">
        <div className="row justify-content-md-center">
          <div className="col col-6">
            <h1>chapitre {chpt}</h1>
            <p>Where : {where}</p>
            <p>What : {what}</p>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col col-10">
            <p>{txt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chapter;
