function GameError({ title, message, detail, onRetry }) {
  return (
    <div className="main-content house d-flex align-items-center justify-content-center">
      <article className="description game-error p-4">
        <h1>{title || "Erreur de jeu"}</h1>
        <p>{message}</p>
        {detail ? <p className="game-error-detail">{detail}</p> : null}
        {onRetry ? (
          <button className="btn-retry rounded" onClick={onRetry} type="button">
            Rejouer
          </button>
        ) : null}
      </article>
    </div>
  );
}

export default GameError;
