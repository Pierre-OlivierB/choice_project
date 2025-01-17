import React from "react";

function Chapter(props) {
  const where = props.where;
  const what = props.what;
  const chpt = props.chpt;

  // console.log("render");

  return (
    <div className="container-fluid">
      <h1>chapitre {chpt}</h1>
      <p>Where : {where}</p>
      <p>What : {what}</p>
    </div>
  );
}

export default Chapter;
