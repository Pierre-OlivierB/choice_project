import { useEffect, useState } from "react";
import Characters from "./characters/characters";
import ChoiceCard from "./events/choicecard";
import SiteSignature from "./ui/site-signature";
import { readGameSnapshot } from "../game/saveGame";

const PROJECT_URL = "https://github.com/Pierre-OlivierB/choice_project";

function Home() {
  // Home has only two modes: landing screen or character/game flow.
  const [page, setPage] = useState(true);
  const [resumeSnapshot, setResumeSnapshot] = useState(null);
  const [savedSnapshot, setSavedSnapshot] = useState(null);

  function handleClick() {
    setResumeSnapshot(null);
    setPage(false);
  }

  function handleResume() {
    setResumeSnapshot(savedSnapshot);
    setPage(false);
  }

  useEffect(() => {
    // The resume action is visible only when the stored save matches the
    // current snapshot format.
    setSavedSnapshot(readGameSnapshot());

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [page]);

  const content = "Entrez dans l'aventure";

  return (
    <>
      {page ? (
        <div className="app-shell house">
          <div className="main-content home-screen">
            <header className="home-header">
              <p className="project-mark text-center m-0">La maison de l'oubli</p>
              <h1 className="text-center">
                Bienvenue dans la maison de l'oubli
              </h1>
            </header>

            <div className="home-choice-row">
              <ChoiceCard
                content={content}
                choiceCss={"cardChoiceSize"}
                choiceType="chapter"
                sketchType="open-door"
                flavorText="Franchir le seuil."
                onActivate={() => handleClick()}
              />
              {savedSnapshot ? (
                <ChoiceCard
                  content="Reprendre la partie"
                  choiceCss={"cardChoiceSize"}
                  choiceType="continue"
                  sketchType="book"
                  flavorText="Retrouver le fil."
                  onActivate={() => handleResume()}
                />
              ) : null}
            </div>

            <section className="description home-description p-4">
              <p>
                Bienvenue dans cette aventure de d&eacute;couverte. La sauvegarde
                est automatique et reste sur votre support d&apos;utilisation.
                Aucune donn&eacute;e n&apos;est gard&eacute;e.
              </p>
              <p>
                Je vous propose de vous plonger dans une exp&eacute;rience de jeu
                de r&ocirc;le ("Role Play", RP), afin de d&eacute;couvrir les
                interactions possibles avec le monde imaginaire qui entoure votre
                personnage. Le but de cette exp&eacute;rience est de vous donner un
                aper&ccedil;u automatis&eacute; et solitaire de ce que vous pourriez
                vivre en tant que joueur ou joueuse dans un &eacute;v&eacute;nement
                al&eacute;atoire d&apos;une histoire de RP. Les choix que vous allez
                faire auront un impact sur le r&eacute;cit, que vous retrouverez
                &agrave; la fin de votre aventure. Je vous donnerai les outils pour
                partager cette aventure avec votre LLM pr&eacute;f&eacute;r&eacute;,
                afin qu&apos;il puisse narrer votre incroyable histoire. <br /> <br />
                Et maintenant, &agrave; vous de jouer.
                <br /> Bonne aventure.
              </p>
            </section>

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
        <Characters initialGameSnapshot={resumeSnapshot} />
      )}
    </>
  );
}

export default Home;
