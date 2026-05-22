import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useRef, useState } from "react";
import ConfirmModal from "../ui/confirm-modal";
import SiteSignature from "../ui/site-signature";
import GameJournal from "../player/game-journal";
import { clearGameSnapshot } from "../../game/saveGame";

function getPlayerName(player) {
  return player?.name || player?.nom || player?.prenom || "non renseigne";
}

function TheEnd(props) {
  const save = props.save;
  const inventory = props.inventory || [];
  const rollHistory = props.rollHistory || [];
  const [isReloadConfirmOpen, setIsReloadConfirmOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const carouselRef = useRef(null);
  // Older code passed a ref-like save object; newer code passes the history
  // array directly. Supporting both avoids breaking saved paths during refactor.
  const storyHistory = useMemo(() => save.current || save || [], [save]);
  const player = storyHistory.find((step) => step[2])?.[2];
  const finalStep = storyHistory[storyHistory.length - 1]?.[0] || "";
  const story = storyHistory.map((step, key) => <div key={key}>{step[0]}</div>);
  // The final prompt is intentionally deterministic so the same run can be
  // copied again without changing the source context.
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

  function goToCarouselPage(pageIndex) {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    carousel.scrollTo({
      behavior: "smooth",
      left: pageIndex * carousel.clientWidth,
    });
    setActivePage(pageIndex);
  }

  function handleCarouselScroll() {
    const carousel = carouselRef.current;

    if (!carousel?.clientWidth) {
      return;
    }

    setActivePage(Math.round(carousel.scrollLeft / carousel.clientWidth));
  }

  return (
    <div className="app-shell house">
      <div className="main-content end-screen">
        <div className="end-title-row">
          <h1 className="text-center m-0 end-title">
            Merci d&apos;avoir jou&eacute; &agrave; la maison de l&apos;oubli
          </h1>
        </div>

        <div className="end-actions">
          <button
            onClick={handleReload}
            className="end-action-button end-action-button--primary"
            type="button"
          >
            Rejouer
          </button>
          <button
            onClick={() => setIsJournalOpen(true)}
            className="end-action-button end-action-button--secondary"
            type="button"
          >
            Journal
          </button>
        </div>

        <div className="end-component">
          <section
            className="end-carousel"
            ref={carouselRef}
            aria-label="Informations de fin de partie"
            onScroll={handleCarouselScroll}
          >
            <div className="end-carousel-page">
              <article className="description end-panel end-summary">
                <h2>R&eacute;capitulatif</h2>
                <p>Personnage : {getPlayerName(player)}</p>
                <p>
                  Objets conserv&eacute;s :{" "}
                  {inventory.length ? inventory.join(", ") : "aucun"}
                </p>
                <p>&Eacute;tapes enregistr&eacute;es : {storyHistory.length}</p>
                {finalStep ? <p>Derni&egrave;re situation : {finalStep}</p> : null}
              </article>
            </div>

            <div className="end-carousel-page">
              <article className="description end-panel end-info-panel">
                <p className="m-0">
                  Voici le prompt de narration construit &agrave; partir de ton
                  parcours. Tu peux le copier dans ton outil d&apos;&eacute;criture
                  pr&eacute;f&eacute;r&eacute; pour g&eacute;n&eacute;rer une version
                  romanc&eacute;e de l&apos;histoire.
                </p>
              </article>
            </div>

            <div className="end-carousel-page">
              <div className="prompt-panel end-prompt-panel">
                <button
                  className="end-copy-button"
                  onClick={copyPrompt}
                  type="button"
                  aria-label="Copier le prompt"
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
                {isCopied ? (
                  <div className="copy-feedback" role="status" aria-live="polite">
                    Texte copi&eacute;.
                  </div>
                ) : null}
                <article className="end-prompt-scroll">
                  <div className="end-prompt-content">
                    <p>
                      Role: You are an author of contemporary horror novels, writing
                      for an adult audience. Using the source context below, craft a
                      terrifying narrative prose segment in French. The tone must be
                      mature, psychological and rooted in the present day.
                    </p>
                    <p>Source Context:</p>
                    {story}
                    <p>Required Output Language: FRENCH</p>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>

        <div className="end-carousel-dots" aria-label="Pages du carrousel">
          {["Recapitulatif", "Explication", "Prompt"].map((label, index) => (
            <button
              aria-current={activePage === index ? "page" : undefined}
              aria-label={`Aller a la page ${index + 1} : ${label}`}
              className={`end-carousel-dot ${
                activePage === index ? "end-carousel-dot--active" : ""
              }`}
              key={label}
              onClick={() => goToCarouselPage(index)}
              type="button"
            />
          ))}
        </div>

        <SiteSignature />
      </div>

      <ConfirmModal
        isOpen={isReloadConfirmOpen}
        title="Rejouer"
        message="Recommencer depuis le d\u00e9but effacera la partie en cours."
        confirmLabel="Rejouer"
        cancelLabel="Annuler"
        onConfirm={() => {
          clearGameSnapshot();
          window.location.reload();
        }}
        onCancel={() => setIsReloadConfirmOpen(false)}
      />
      <ConfirmModal
        isOpen={isJournalOpen}
        title="Journal"
        confirmLabel="Fermer"
        onConfirm={() => setIsJournalOpen(false)}
        compact
      >
        <GameJournal
          perso={player}
          inventory={inventory}
          storyHistory={storyHistory}
          rollHistory={rollHistory}
        />
      </ConfirmModal>
    </div>
  );
}

export default TheEnd;
