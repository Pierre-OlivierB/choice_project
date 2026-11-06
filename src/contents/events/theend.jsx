import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../ui/confirm-modal";
import GameJournalModal from "../game/GameJournalModal";
import GameShell from "../game/GameShell";
import { getPlayerName } from "../../game/character";
import { getJournalStats } from "../../game/gameJournal";
import { clearGameSnapshot } from "../../game/saveGame";
import { useClipboard } from "../../hooks/useClipboard";
import { useGame } from "../../hooks/useGame";

const COPY_LABELS = {
  idle: "Copier mon histoire",
  copied: "Histoire copiée",
  failed: "Copie impossible",
};

function TheEnd() {
  const { openJournal, state } = useGame();
  const { inventory, perso, rollHistory, storyHistory } = state;
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const { copy, status } = useClipboard();
  const stats = getJournalStats({ storyHistory, rollHistory });
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

  return (
    <GameShell className="end-screen">
      <header className="end-header">
        <p className="eyebrow">Fin de la nuit</p>
        <h1 className="end-title">Merci d'avoir joué à La maison de l'oubli</h1>
      </header>

      <div className="end-layout">
        <article className="panel end-summary">
          <h2>Récapitulatif</h2>
          <dl className="end-stats">
            <div>
              <dt>Personnage</dt>
              <dd>{getPlayerName(perso, "Non renseigné")}</dd>
            </div>
            <div>
              <dt>Étapes</dt>
              <dd>{stats.storyStepCount}</dd>
            </div>
            <div>
              <dt>Jets réussis</dt>
              <dd>
                {stats.successCount} / {stats.rollCount}
              </dd>
            </div>
            <div>
              <dt>Objets conservés</dt>
              <dd>{inventory.length ? inventory.join(", ") : "Aucun"}</dd>
            </div>
          </dl>
          <p className="end-note">
            Ton parcours est devenu un prompt de narration. Copie-le dans ton LLM
            préféré pour qu'il en fasse le récit.
          </p>
          <div className="end-actions">
            <button
              className="button button--ghost"
              onClick={() => setIsReplayOpen(true)}
              type="button"
            >
              <FontAwesomeIcon icon={faRotateRight} />
              Rejouer
            </button>
            <button className="button button--ghost" onClick={openJournal} type="button">
              <FontAwesomeIcon icon={faBookOpen} />
              Journal
            </button>
          </div>
        </article>

        <article className="panel prompt-panel">
          <div className="prompt-scroll" tabIndex={0}>
            <p className="prompt-role">
              Role: You are an author of contemporary horror novels, writing for an
              adult audience. Using the source context below, craft a terrifying
              narrative prose segment in French. The tone must be mature,
              psychological and rooted in the present day.
            </p>
            <p className="prompt-role">Source Context:</p>
            {storyHistory.map((step, index) => (
              <p key={index}>{step[0]}</p>
            ))}
            <p className="prompt-role">Required Output Language: FRENCH</p>
          </div>
          <button
            className="button button--gold prompt-copy"
            onClick={() => copy(promptText)}
            type="button"
          >
            {COPY_LABELS[status]}
          </button>
          <span className="visually-hidden" role="status" aria-live="polite">
            {status === "idle" ? "" : COPY_LABELS[status]}
          </span>
        </article>
      </div>

      <ConfirmModal
        isOpen={isReplayOpen}
        title="Rejouer"
        message="Recommencer depuis le début effacera la partie en cours."
        confirmLabel="Rejouer"
        cancelLabel="Annuler"
        onConfirm={() => {
          clearGameSnapshot();
          window.location.reload();
        }}
        onCancel={() => setIsReplayOpen(false)}
      />
      <GameJournalModal />
    </GameShell>
  );
}

export default TheEnd;
