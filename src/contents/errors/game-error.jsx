import GameShell from "../game/GameShell";

// GameError turns broken story data into a recoverable player-facing screen
// instead of letting React crash with a blank page.
function GameError({ title, message, detail, onRetry }) {
  return (
    <GameShell className="error-screen">
      <article className="panel game-error">
        <h1>{title || "Erreur de jeu"}</h1>
        <p>{message}</p>
        {detail ? <p className="game-error-detail">{detail}</p> : null}
        {onRetry ? (
          <button className="button button--gold" onClick={onRetry} type="button">
            Recharger
          </button>
        ) : null}
      </article>
    </GameShell>
  );
}

export default GameError;
