import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import ConfirmModal from "../ui/confirm-modal";
import SiteSignature from "../ui/site-signature";

function getPlayerName(player) {
  return player?.name || player?.nom || player?.prenom || "non renseigne";
}

function TheEnd(props) {
  const save = props.save;
  const inventory = props.inventory || [];
  const [isReloadConfirmOpen, setIsReloadConfirmOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const storyHistory = useMemo(() => save.current || save || [], [save]);
  const player = storyHistory.find((step) => step[2])?.[2];
  const finalStep = storyHistory[storyHistory.length - 1]?.[0] || "";
  const story = storyHistory.map((step, key) => <div key={key}>{step[0]}</div>);
  const promptText = useMemo(
    () =>
      [
        "Role: You are an author of contemporary horror novels, writing for an adult audience. Using the source context below, craft a terrifying narrative prose segment in French. The tone must be mature, psychological and rooted in the present day.",
        "",
        "Source Context:",
        ...storyHistory.map((step) => step[0]),
        "",
        "Required Output Language: FRENCH",
      ].join("\n"),
    [storyHistory]
  );

  function handleReload() {
    setIsReloadConfirmOpen(true);
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(promptText);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 2200);
  }

  return (
    <div className="house position-relative">
      <div className="position-absolute top-0 end-0">
        <button onClick={handleReload} className="rounded btn-retry" type="button">
          Rejouer
        </button>
      </div>
      <div className="main-content container-fluid d-flex flex-column justify-content-evenly">
        <div className="row g-0 justify-content-center tenvh">
          <div className="col col-10 p-0 m-0">
            <h1 className="text-center m-0">
              Merci d'avoir joue a la maison de l'oubli
            </h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <article className="col col-10 description end-summary p-3">
            <h2>Recapitulatif</h2>
            <p>Personnage : {getPlayerName(player)}</p>
            <p>Objets conserves : {inventory.length ? inventory.join(", ") : "aucun"}</p>
            <p>Etapes enregistrees : {storyHistory.length}</p>
            {finalStep ? <p>Derniere situation : {finalStep}</p> : null}
          </article>
        </div>
        <div className="row justify-content-center tenvh">
          <article className="col col-10 justify-content-center description padding-prompt overflow-y-auto max-height-96">
            <p className="m-0">
              Voici le prompt de narration construit a partir de ton parcours.
              Tu peux le copier dans ton outil d'ecriture prefere pour generer
              une version romancee de l'histoire.
            </p>
          </article>
        </div>
        <div className="row justify-content-center end-component">
          <div className="col col-10 position-relative rounded prompt-panel">
            <button
              className="position-absolute top-0 copy-texte z-1 copy-button"
              onClick={copyPrompt}
              type="button"
              aria-label="Copier le prompt"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
            {isCopied ? (
              <div className="copy-feedback" role="status" aria-live="polite">
                Texte copie.
              </div>
            ) : null}
            <article className="position-relative overflow-y-auto overflow-x-hidden enter-end-component">
              <div className="p-5" id="story">
                <p>
                  Role: You are an author of contemporary horror novels,
                  writing for an adult audience. Using the source context below,
                  craft a terrifying narrative prose segment in French. The tone
                  must be mature, psychological and rooted in the present day.
                </p>
                <p>Source Context:</p>
                {story}
                <p>Required Output Language: FRENCH</p>
              </div>
            </article>
          </div>
        </div>
        <SiteSignature />
      </div>
      <ConfirmModal
        isOpen={isReloadConfirmOpen}
        title="Rejouer"
        message="Recommencer depuis le debut effacera la partie en cours."
        confirmLabel="Rejouer"
        cancelLabel="Annuler"
        onConfirm={() => window.location.reload()}
        onCancel={() => setIsReloadConfirmOpen(false)}
      />
    </div>
  );
}

export default TheEnd;
