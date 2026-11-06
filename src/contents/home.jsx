import { useState } from "react";
import ChoiceCard from "./events/choicecard";
import GameShell from "./game/GameShell";
import Disclosure from "./ui/disclosure";
import { readGameSnapshot } from "../game/saveGame";

const PROJECT_URL = "https://github.com/Pierre-OlivierB/choice_project";

function Home({ onStart, onResume }) {
  // The resume card only exists when a save matches the current format.
  const [savedSnapshot] = useState(() => readGameSnapshot());

  return (
    <GameShell className="home-screen">
      <header className="home-header">
        <p className="eyebrow">Jeu de rôle solo</p>
        <h1 className="home-title">La maison de l'oubli</h1>
        <p className="home-tagline">Une nuit. Une pièce. Aucun souvenir.</p>
      </header>

      <div className="card-row" data-count={savedSnapshot ? 2 : 1}>
        <ChoiceCard
          content="Entrer dans l'aventure"
          sketchType="door-open"
          flavorText="Franchir le seuil."
          onActivate={onStart}
        />
        {savedSnapshot ? (
          <ChoiceCard
            content="Reprendre la partie"
            choiceType="continue"
            sketchType="book"
            flavorText="Retrouver le fil."
            onActivate={() => onResume(savedSnapshot)}
          />
        ) : null}
      </div>

      <p className="home-description">
        Bienvenue dans cette aventure de découverte. La sauvegarde est automatique et
        reste sur ton support d'utilisation. Aucune donnée n'est gardée.
      </p>

      <Disclosure title="Qu'est-ce qu'un jeu de rôle ?">
        <p>
          Je te propose de te plonger dans une expérience de jeu de rôle ("Role Play",
          RP), afin de découvrir les interactions possibles avec le monde imaginaire
          qui entoure ton personnage.
        </p>
        <p>
          Le but de cette expérience est de te donner un aperçu automatisé et
          solitaire de ce que tu pourrais vivre en tant que joueur ou joueuse dans un
          événement aléatoire d'une histoire de RP.
        </p>
        <p>
          Les choix que tu vas faire auront un impact sur le récit, que tu retrouveras
          à la fin de ton aventure. Je te donnerai les outils pour partager cette
          aventure avec ton LLM préféré, afin qu'il puisse narrer ton incroyable
          histoire.
        </p>
        <p>
          Et maintenant, à toi de jouer.
          <br />
          Bonne aventure.
        </p>
      </Disclosure>

      <footer className="home-footer">
        <a href={PROJECT_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <span>Prototype narratif interactif</span>
      </footer>
    </GameShell>
  );
}

export default Home;
