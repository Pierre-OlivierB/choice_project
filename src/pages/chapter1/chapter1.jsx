import React from "react";

function Chapter1(props) {
  const where = props.where;
  const what = props.what;

  console.log("render");

  return (
    <div className="container-fluid">
      <h1>chapitre 1</h1>
      <p>Where : {where}</p>
      <p>What : {what}</p>
    </div>
  );
}

export default Chapter1;
