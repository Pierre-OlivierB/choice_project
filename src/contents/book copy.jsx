import React from "react";
import { useState } from "react";
import Chapter from "./chapter/chapter";
import storiesData from "./chapter/stories.json";

function Book() {
  // console.log(storiesData);
  const [stories, setStories] = useState(storiesData);
  const [choice, setChoice] = useState(0);

  function handleClick(tmp) {
    console.log("TMP " + tmp);
    return handleChange(stories[tmp]);
  }

  function handleChange(newInfos) {
    console.log("change");
    setStories(newInfos);
    console.log(newInfos);
  }

  let arr = [];

  return (
    <div className="position-relative">
      <Chapter
        where={stories[0].salle_de_bain}
        what={stories[0].cuisine}
        chpt={stories[0].numero_chapitre}
        txt={stories[0].txt}
        onChange={handleChange}
      />
      <div className="container-fluid position-absolute top-50 start-0 d-flex justify-content-evenly">
        <button
          className="btn btn-warning"
          onClick={() => {
            const chc = stories[choice].choix1;
            setChoice(stories[choice].choix1);
            handleClick(chc);
          }}
        >
          choix 1
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            const chc = stories[choice].choix2;
            setChoice(stories[choice].choix2);
            handleClick(chc);
          }}
        >
          choix 2
        </button>
      </div>
    </div>
  );
}

export default Book;
