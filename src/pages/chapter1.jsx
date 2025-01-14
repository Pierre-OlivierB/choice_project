import React from "react";

function Chapter1(props) {
  let arr = [];
  let stories = { salle_de_bain: "beignoire", cuisine: "couteau" };
  return (
    <div className="container-fluid">
      <h1>chapitre 1</h1>
      <p>{stories.React}</p>
      <p>{stories.cuisine}</p>
      <button className="btn btn-primary">choix</button>
    </div>
  );
}

export default Chapter1;
