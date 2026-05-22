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
                repr&eacute;senter. Pour l&apos;exemple, voici trois personnages
                pr&eacute;construits afin de te familiariser avec la construction
                d&apos;un personnage.
              </p>
              <p>
                Chaque choix que tu feras sera irr&eacute;m&eacute;diable. Un autre
                choix raconte une autre histoire. Tu n&apos;as pas de limite de
                temps, alors choisis bien.
              </p>
              <p>
                Ici, je te propose une construction de personnage tr&egrave;s
                simplifi&eacute;e. Ton personnage a un nom, une fonction qui sert
                ici de repr&eacute;sentation globale, ainsi que des
                caract&eacute;ristiques. Ces derni&egrave;res vont devenir le centre
                de tes pr&eacute;occupations, puisqu&apos;elles permettront ou non la
                r&eacute;ussite de tes actions. Ici, les caract&eacute;ristiques vont
                de 1 &agrave; 100. Pour savoir si une action r&eacute;ussit, on jette
                un d&eacute; 100. Pour que l&apos;action soit une r&eacute;ussite, il
                faut que le d&eacute; affiche un r&eacute;sultat &eacute;gal ou
                inf&eacute;rieur &agrave; la caract&eacute;ristique concern&eacute;e.
                Plus la caract&eacute;ristique li&eacute;e &agrave; l&apos;action est
                grande, plus la probabilit&eacute; de r&eacute;ussite est grande.
                Prenons l&apos;exemple de Chris. Il est costaud et poss&egrave;de une
                constitution de 75. S&apos;il devait se battre, il aurait 75% de
                r&eacute;ussite. En revanche, s&apos;il devait r&eacute;fl&eacute;chir
                &agrave; une situation, il n&apos;aurait que 25% de r&eacute;ussite.
              </p>
              <p>
                L&apos;&eacute;chec comme la r&eacute;ussite peut parfois ne pas avoir de
                r&eacute;elles cons&eacute;quences sur le but de l&apos;action (par
                exemple, chercher un objet et le trouver), mais plut&ocirc;t sur le
                temps n&eacute;cessaire pour la r&eacute;aliser (imm&eacute;diatement
                en cas de r&eacute;ussite, ou apr&egrave;s plusieurs jours en cas
                d&apos;&eacute;chec). Derni&egrave;re information importante : dans
                un vrai RP, le Ma&icirc;tre du jeu peut sortir du script et ajouter
                du contenu ou du lore &agrave; votre histoire.
              </p>
              <p>Et maintenant, &agrave; toi de jouer.</p>
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
                                Dext&eacute;rit&eacute; (D) : {tmp.dexterite}
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
