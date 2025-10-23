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
    <div className="house">
      <div className="main-content container-fluid d-flex flex-column justify-content-evenly">
        <div className="row justify-content-md-center tenvh">
          <div className="col col-6">
            <h1 className="text-center">
              Merci d'avoir jouer à la maison de l'oubli
            </h1>
          </div>
        </div>
        <div className="row justify-content-md-center tenvh">
          <article className="col col-10 justify-content-center description p-4">
            <p>
              Voici votre histoire mise en forme et prompt tuné afin d'avoir une
              histoire narré de la meilleure façon.
              <br />
              Prompt testé sur Le chat, Chat GPT.
            </p>
          </article>
        </div>
        <div className="row justify-content-md-center end-component">
          <div className="col col-10 bg-white position-relative rounded">
            <FontAwesomeIcon
              className="position-absolute top-0 end-5 copy-texte z-1"
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
            <div className="toast-container position-fixed top-0 end-5 p-3">
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
            <article className="position-relative overflow-y-auto overflow-x-hidden end-component">
              <p className="p-5" id="story">
                "Role: You are an author of contemporary horror novels, writing
                exclusively for an adult audience.Context & Setting: The
                narrative must be firmly rooted in the present day, leveraging
                modern anxieties, technology, and socio-economic dread to
                establish the atmosphere.Task: Using the provided instructions
                as your sole source of inspiration, craft a terrifying and
                expansive piece of narrative prose. Your writing must establish
                a profound, chilling link between the horror theme and the
                current setting, escalating the entire situation to an 'epic'
                scale—a confrontation or revelation of immense, terrifying
                consequence.Crucial Instruction: The final generated text (the
                story segment) MUST be written entirely in FRENCH (Français).
                The tone must be mature, relentless, and deeply
                psychological.Source Context to be Transformed: $$
                <br />
                {story} <br />
                $$"Required Output Language: FRENCH
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheEnd;
