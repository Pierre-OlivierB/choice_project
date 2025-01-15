import React from "react";
import { useState } from "react";
import Chapter1 from "./chapter1/chapter1";

function Book() {
  const [stories, setStories] = useState({
    salle_de_bain: "beignoire",
    cuisine: "couteau",
  });

  function handleClick() {
    console.log("voici mon choix");

    console.log(stories);

    handleChange({ salle_de_bain: "cuisine", cuisine: "pierre" });
  }

  function handleChange(newInfos) {
    console.log("change");
    setStories(newInfos);
    console.log(stories);
  }

  let arr = [];
  // var stories = { salle_de_bain: "beignoire", cuisine: "couteau" };

  return (
    <>
      <Chapter1
        where={stories.salle_de_bain}
        what={stories.cuisine}
        onChange={handleChange}
      />
      <div className="container-fluid">
        <button className="btn btn-primary" onClick={handleClick}>
          choix
        </button>
      </div>
    </>
  );
}

export default Book;
