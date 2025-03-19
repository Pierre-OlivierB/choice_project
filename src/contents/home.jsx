import React from "react";
import { useState } from "react";
import Characters from "./characters/characters";
import ChoiceCard from "./events/choicecard";

function Home() {
  // show home page or other content
  const [page, setPage] = useState(true);
  // toggle for content
  function handleClick() {
    setPage(false);
  }
  const content = " Entrez dans l'aventure";
  return (
    <>
      {page ? (
        <div className="test">
          <div className="main-content container-fluid d-flex flex-column justify-content-evenly">
            <div className="row justify-content-md-center">
              <div className="col col-6">
                <h1 className="text-center">
                  Bienvenue dans la maison de l'oubli
                </h1>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col col-2 d-flex justify-content-center">
                <ChoiceCard
                  content={content}
                  onSwipeRight={() => handleClick()}
                />
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col col-10 description p-4">
                <p>
                  Je vous propose de vous plonger dans une expérience de jeu de
                  role ("Role Play", RP) afin de découvrir les intéractions que
                  vous pourriez avoir sur un monde imaginaire qui entoure votre
                  personnage. Le but de cette expérience est de vous donner un
                  apperçu automatisé et solitaire de ce que vous pourriez vivre
                  en tant que joueur/euse seul/e dans un évènement aléatoire
                  d'une histoire de RP. Les choix que vous allez faire auront un
                  impact sur le récit. Récit que vous retrouverez à la fin de
                  votre aventure. Je vous donnerai les outils dans le but de
                  partager cette aventure à votre LLM préféré pour qu'il puisse
                  narrer votre incroyable histoire. <br /> <br /> Et maintenant
                  à vous de jouer.
                  <br /> Bonne aventure.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Characters />
      )}
    </>
  );
}

export default Home;
