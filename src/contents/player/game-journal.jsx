import { useMemo } from "react";
import { formatGameJournal, getJournalStats } from "../../game/gameJournal";
import { getPlayerName } from "../../game/character";
import { useClipboard } from "../../hooks/useClipboard";

const COPY_FEEDBACK = {
  copied: "Journal copié.",
  failed: "Copie impossible.",
};

// GameJournal is both a readable recap and the source for copy/export. It does
// not own game rules; it formats histories already produced by the reducer.
function GameJournal({ storyHistory = [], rollHistory = [], inventory = [], perso }) {
  const { copy, status } = useClipboard();
  const stats = getJournalStats({ storyHistory, rollHistory });
  const exportText = useMemo(
    () => formatGameJournal({ storyHistory, rollHistory, inventory, perso }),
    [inventory, perso, rollHistory, storyHistory]
  );

  return (
    <article className="game-journal">
      <div className="game-journal-actions">
        <button className="button button--ghost" onClick={() => copy(exportText)} type="button">
          Copier le journal
        </button>
        <span className="game-journal-feedback" role="status" aria-live="polite">
          {COPY_FEEDBACK[status] || ""}
        </span>
      </div>

      <section>
        <h3>Statistiques</h3>
        <p>Personnage : {getPlayerName(perso)}</p>
        <p>Étapes narratives : {stats.storyStepCount}</p>
        <p>Jets de D100 : {stats.rollCount}</p>
        <p>Réussites : {stats.successCount}</p>
        <p>Échecs : {stats.failureCount}</p>
        <p>Objets : {inventory.length ? inventory.join(", ") : "aucun"}</p>
      </section>

      <section>
        <h3>Journal</h3>
        {storyHistory.length ? (
          <ol className="game-journal-list">
            {storyHistory.map((step, index) => (
              <li key={`${step[1]}-${index}`}>{step[0]}</li>
            ))}
          </ol>
        ) : (
          <p>Aucune entrée pour le moment.</p>
        )}
      </section>

      <section>
        <h3>Jets</h3>
        {rollHistory.length ? (
          <ol className="game-journal-list">
            {rollHistory.map((roll, index) => (
              <li key={`${roll.actionLabel}-${index}`}>
                {roll.actionLabel} : {roll.roll}/{roll.stat} -{" "}
                {roll.success ? "réussite" : "échec"}
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
