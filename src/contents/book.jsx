import React from "react";
import { useState } from "react";
import Chapter from "./chapter/chapter";
import storiesData from "./chapter/stories.json";
import Events from "./events/events";

function Book(props) {
  const perso = props.perso;
  // console.log(perso);

  const [choice, setChoice] = useState(0);

  const [flag, setFlag] = useState(true);

  const stories = storiesData;

  const currentStories = stories[choice];

  function handleClick(newChapter) {
    setChoice(newChapter);
    setFlag(!flag);
  }
  function handleFlag() {
    setFlag(!flag);
  }

  return (
    <div className="position-relative">
      {flag ? (
        <Chapter
          where={currentStories.salle_de_bain}
          what={currentStories.cuisine}
          chpt={currentStories.numero_chapitre}
          txt={currentStories.txt}
          perso={perso}
        />
      ) : (
        <Events perso={perso} choice={currentStories} />
      )}

      <div className="container-fluid position-absolute top-50 start-0 d-flex justify-content-evenly">
        {flag ? (
          <>
            <button
              className="btn btn-warning"
              onClick={() => {
                const chc = currentStories.choix1;
                handleClick(chc);
              }}
            >
              choix 1
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                const chc = currentStories.choix2;
                handleClick(chc);
              }}
            >
              choix 2
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-success" onClick={handleFlag}>
              event 1
            </button>
            <button className="btn btn-warning" onClick={handleFlag}>
              event 2
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Book;
