import React from "react";
import { useState } from "react";
import Chapter from "./chapter/chapter";

function Book() {
  const [stories, setStories] = useState({
    salle_de_bain: "beignoire",
    cuisine: "couteau",
    numero_chapitre: "0",
  });

  function handleClick() {
    console.log("voici mon choix");

    console.log(stories);

    handleChange({
      numero_chapitre: "1",
      salle_de_bain: "cuisine",
      cuisine: "pierre",
    });
  }

  function handleChange(newInfos) {
    console.log("change");
    setStories(newInfos);
    console.log(stories);
  }

  let arr = [];

  return (
    <>
      <Chapter
        where={stories.salle_de_bain}
        what={stories.cuisine}
        chpt={stories.numero_chapitre}
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
