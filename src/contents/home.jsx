import { useState } from "react";
import Characters from "./characters/characters";
import ChoiceCard from "./events/choicecard";
import SiteSignature from "./ui/site-signature";

const PROJECT_URL = "https://github.com/Pierre-OlivierB/choice_project";

function Home() {
  // show home page or other content
  const [page, setPage] = useState(true);
  // toggle for content
  function handleClick() {
    setPage(false);
  }
  const content = "Entrez dans l'aventure";
  return (
    <>
      {page ? (
        <div className="house">
          <div className="main-content container-fluid d-flex flex-column justify-content-evenly">
            <div className="row justify-content-center">
              <div className="col col-8">
                <p className="project-mark text-center m-0">La maison de l'oubli</p>
                <h1 className="text-center">
                  Bienvenue dans la maison de l'oubli
                </h1>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col col-8 d-flex justify-content-center">
                <ChoiceCard
                  content={content}
                  choiceCss={"cardChoiceSize"}
                  choiceType="chapter"
                  sketchType="open-door"
                  flavorText="Franchir le seuil."
                  onActivate={() => handleClick()}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col col-10 description p-4 mh-35 overflow-auto">
                <p>Attention ce site optimisé sur pc pour le moment. Merci.</p>
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
            <footer className="home-footer text-center">
              <a href={PROJECT_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <span>Prototype narratif interactif</span>
            </footer>
            <SiteSignature />
          </div>
        </div>
      ) : (
        <Characters />
      )}
    </>
  );
}

export default Home;
