import { useEffect, useState } from "react";
import Book from "../book";
import ChoiceCard from "../events/choicecard";
import charactereData from "./data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faUserNinja,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import SiteSignature from "../ui/site-signature";
import { clearGameSnapshot } from "../../game/saveGame";

// Character selection is also the boundary between a resumed save and a fresh
// run. When a save exists, the character is restored and this screen is skipped.
function Characters({ initialGameSnapshot = null }) {
  const data = charactereData;
  const [flag, setFlag] = useState(!initialGameSnapshot);
  const [perso, setPerso] = useState(initialGameSnapshot?.state.perso || []);

  function handleClick(id) {
    const charac = data[parseInt(id)];

    // Starting from a new character must clear any previous local save so the
    // old run cannot leak into the new one.
    clearGameSnapshot();
    setPerso(charac);
    setFlag(false);
  }

  // The icon represents the strongest characteristic of each prebuilt profile.
  function handleData(carac) {
    switch (carac) {
      case "25":
        return <FontAwesomeIcon className="w-50 h-50" icon={faUserSecret} />;
      case "50":
        return <FontAwesomeIcon className="w-50 h-50" icon={faUserNinja} />;
      case "75":
        return <FontAwesomeIcon className="w-50 h-50" icon={faUserGraduate} />;

      default:
        return null;
    }
  }

  useEffect(() => {
    // Moving between selection and game can otherwise preserve the previous
    // scroll position on small screens.
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [flag]);

  return (
    <>
      {flag ? (
        <div className="app-shell house">
          <div className="main-content character-screen">
            <article className="description character-description p-4">
              <p>
                Dans un RP, il te faut choisir un personnage qui va te
                representer. Pour l'exemple, voici 3 personnages pre-construit
                afin de te familiariser avec la construction d'un personnage.
              </p>
              <p>
                Chaque choix que tu feras, sera irremediable. Un autre choix
                est une autre histoire. Tu n'as pas de limite de temps, alors
                choisis bien.
              </p>
              <p>
                Ici je te propose une construction de personnage tres
                simplifiee. Ton personnage a un nom, une fonction qui est ici
                plus une representation global de ton personnage et des
                caracteristiques. Ces dernieres vont etre le centre de tes
                preoccupations etant donne qu'elles vont te permettre ou non de
                la reussite de ton action. Ici, les caracteristiques vont de 1
                a 100. Pour savoir si la personne a reussit une action on jette
                un de 100. Pour que l'action soit une reussite, il faut que le
                de affiche un resultat egale ou inferieur. Plus la
                caracteristique lie a l'action est grande, plus la probabilite
                de reussite est grande. Prenons exemple sur Chris. Il est costo,
                il a une constitution de 75. S'il avait a se battre, il aurait
                75% de reussite. D'un autre cote, s'il avait a reflechir a une
                situation, il n'aurait que 25% de reussite.
              </p>
              <p>
                L'echec comme la reussite peut parfois ne pas avoir de reel
                consequences sur le resultat du but de l'action (ex: chercher
                un objet et le trouver) mais sur le temps pris pour realiser
                l'action (ex: immediat si reussite ou plusieurs jours si
                echec). Derniere information importante, il faut garder en tete
                que dans un vrai RP, le Maitre du jeu peut sortir du script et
                ajouter du contenu ou du lore a votre histoire.
              </p>
              <p>Et maintenant a toi de jouer.</p>
              <p>Quel est ton choix ?</p>
            </article>

            <div className="character-choice-strip">
              {data.map((tmp) => (
                <div className="character-choice-item" key={tmp.choix}>
                  <div className="card card-charac charac-el border-0">
                    <div className="card-body">
                      <ChoiceCard
                        content={
                          <article className="d-flex justify-content-sm-evenly">
                            <section>
                              <h4 className="choice-character-title">
                                Nom : {tmp.name}
                              </h4>
                              <h5 className="choice-character-subtitle">
                                Fonction : {tmp.type}
                              </h5>
                              <p className="card-text">
                                Constitution (C) : {tmp.constitution}
                              </p>
                              <p className="card-text">
                                Dexterite (D) : {tmp.dexterite}
                              </p>
                              <p className="card-text">
                                Intelligence (I) : {tmp.intelligence}
                              </p>
                            </section>
                          </article>
                        }
                        onSwipeRight={() => handleClick(tmp.choix)}
                        data={handleData(tmp.intelligence)}
                        choiceCss={"cardChoiceSizeCarac"}
                        choiceType="character"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SiteSignature />
          </div>
        </div>
      ) : (
        <Book perso={perso} initialGameState={initialGameSnapshot?.state} />
      )}
    </>
  );
}

export default Characters;
