import ChoiceCard from "../events/choicecard";
import GameShell from "../game/GameShell";
import CharacterIcon from "../player/character-icon";
import StatBars from "../player/stat-bars";
import Disclosure from "../ui/disclosure";
import characterData from "./data.json";

function Characters({ onSelect }) {
  return (
    <GameShell className="character-screen">
      <header className="character-header">
        <p className="eyebrow">Avant d'ouvrir les yeux</p>
        <h1 className="character-title">Choisis qui tu seras</h1>
        <p className="character-intro">
          Dans un RP, il te faut choisir un personnage qui va te représenter. Pour
          l'exemple, voici trois personnages préconstruits afin de te familiariser avec
          la construction d'un personnage.
        </p>
        <p className="character-intro">
          Chaque choix que tu feras sera irrémédiable. Un autre choix raconte une autre
          histoire. Tu n'as pas de limite de temps, alors choisis bien.
        </p>
      </header>

      <Disclosure title="Comment fonctionne un personnage ?">
        <p>
          Ici, je te propose une construction de personnage très simplifiée. Ton
          personnage a un nom, une fonction qui sert ici de représentation globale,
          ainsi que des caractéristiques. Ces dernières vont devenir le centre de tes
          préoccupations, puisqu'elles permettront ou non la réussite de tes actions.
        </p>
        <p>
          Ici, les caractéristiques vont de 1 à 100. Pour savoir si une action réussit,
          on jette un dé 100. Pour que l'action soit une réussite, il faut que le dé
          affiche un résultat égal ou inférieur à la caractéristique concernée. Plus la
          caractéristique liée à l'action est grande, plus la probabilité de réussite
          est grande.
        </p>
        <p>
          Prenons l'exemple de Chris, de fonction costaud, avec une constitution de 75.
          Pour se battre, Chris aurait 75 % de réussite. En revanche, pour réfléchir à
          une situation, Chris n'aurait que 25 % de réussite.
        </p>
        <p>
          L'échec comme la réussite peut parfois ne pas avoir de réelles conséquences
          sur le but de l'action (par exemple, chercher un objet et le trouver), mais
          plutôt sur le temps nécessaire pour la réaliser (immédiatement en cas de
          réussite, ou après plusieurs jours en cas d'échec).
        </p>
        <p>
          Dernière information importante : dans un vrai RP, le Maître du jeu peut sortir
          du script et ajouter du contenu ou du lore à ton histoire.
        </p>
        <p>Et maintenant, à toi de jouer.</p>
      </Disclosure>

      <p className="character-question">Quel est ton choix ?</p>

      <div className="card-row card-row--characters">
        {characterData.map((character) => (
          <ChoiceCard
            key={character.id}
            content={character.name}
            choiceType="character"
            typeLine={character.type}
            art={
              <span className="character-emblem">
                <CharacterIcon character={character} />
              </span>
            }
            onActivate={() => onSelect(character)}
          >
            <StatBars character={character} />
          </ChoiceCard>
        ))}
      </div>
    </GameShell>
  );
}

export default Characters;
