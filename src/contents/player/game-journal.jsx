import { useMemo, useState } from "react";
import { formatGameJournal, getJournalStats } from "../../game/gameJournal";

// GameJournal is both a readable recap and the source for copy/export. It does
// not own game rules; it formats histories already produced by the reducer.
function GameJournal({ storyHistory = [], rollHistory = [], inventory = [], perso }) {
  const [isCopied, setIsCopied] = useState(false);
  const stats = getJournalStats({ storyHistory, rollHistory });
  const exportText = useMemo(
    () => formatGameJournal({ storyHistory, rollHistory, inventory, perso }),
    [inventory, perso, rollHistory, storyHistory]
  );

  async function copyJournal() {
    await navigator.clipboard.writeText(exportText);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 2200);
  }

  return (
    <article className="game-journal">
      <div className="game-journal-actions">
        <button className="confirm-modal-secondary" onClick={copyJournal} type="button">
          Copier le journal
        </button>
        {isCopied ? (
          <span className="copy-feedback-inline" role="status" aria-live="polite">
            Journal copie.
          </span>
        ) : null}
      </div>

      <section className="game-journal-section">
        <h3>Statistiques</h3>
        <p>Personnage : {perso?.name || "Inconnu"}</p>
        <p>Etapes narratives : {stats.storyStepCount}</p>
        <p>Jets de D100 : {stats.rollCount}</p>
        <p>Reussites : {stats.successCount}</p>
        <p>Echecs : {stats.failureCount}</p>
        <p>Objets : {inventory.length ? inventory.join(", ") : "aucun"}</p>
      </section>

      <section className="game-journal-section">
        <h3>Journal</h3>
        {storyHistory.length ? (
          <ol className="game-journal-list">
            {storyHistory.map((step, index) => (
              <li key={`${step[1]}-${index}`}>{step[0]}</li>
            ))}
          </ol>
        ) : (
          <p>Aucune entree pour le moment.</p>
        )}
      </section>

      <section className="game-journal-section">
        <h3>Jets</h3>
        {rollHistory.length ? (
          <ol className="game-journal-list">
            {rollHistory.map((roll, index) => (
              <li key={`${roll.actionLabel}-${index}`}>
                {roll.actionLabel} : {roll.roll}/{roll.stat} -{" "}
                {roll.success ? "reussite" : "echec"}
              </li>
            ))}
          </ol>
        ) : (
          <p>Aucun jet pour le moment.</p>
        )}
      </section>
    </article>
  );
}

export default GameJournal;
