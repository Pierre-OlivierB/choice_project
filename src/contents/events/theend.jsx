import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useState } from "react";
import { Toast } from "bootstrap";

function TheEnd(props) {
  const save = props.save;
  console.log("history in theend : " + save);
  let story = [];
  if (save.current) {
    const storyHistory = save.current || [];
    story = storyHistory.map((step, key) => <div key={key}>{step[0]}</div>);
  } else {
    story = save.map((step, key) => <div key={key}>{step[0]}</div>);
  }

  return (
    <div className="test">
      <div className="main-content container-fluid d-flex flex-column justify-content-evenly">
        <div className="row justify-content-md-center">
          <div className="col col-6">
            <h1 className="text-center">
              Merci d'avoir jouer à la maison de l'oubli
            </h1>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <article className="col col-10 justify-content-center description p-4">
            <p>
              Voici votre histoire mise en forme et prompt tuné afin d'avoir une
              histoire narré de la meilleure façon.
              <br />
              Prompt testé sur Le chat, Chat GPT.
            </p>
          </article>
        </div>
        <div className="row justify-content-md-center">
          <div className="col col-10 bg-white position-relative rounded">
            <FontAwesomeIcon
              className="position-absolute top-0 end-0 copy-texte"
              icon={faCopy}
              onClick={() => {
                var text = document.getElementById("story").innerHTML;
                navigator.clipboard.writeText(text);
                const toastLiveExample = document.getElementById("liveToast");
                const toastBootstrap =
                  Toast.getOrCreateInstance(toastLiveExample);
                toastBootstrap.show();
              }}
            />
            <div className="toast-container position-fixed top-0 end-0 p-3">
              <div
                id="liveToast"
                className="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="toast-body">Texte Copié.</div>
              </div>
            </div>
            <p className="p-5" id="story">
              Tu es un écrivain de livre d'horreur. Tu t'adresses à un publique
              adulte. Le contexte se déroule dans la période actuelle. A partir
              de l'histoire, écrit moi un texte qui met du lien à cette histoire
              et rends-la la plus épique possible. histoire || <br />
              {story} <br />
              ||
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheEnd;
