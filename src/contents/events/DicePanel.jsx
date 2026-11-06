import { useEffect, useRef, useState } from "react";
import Die3D, { ROLL_DURATION_MS } from "./Die3D";
import { STAT_LABELS } from "../../game/character";

// Shows the odds as a track: the marker lands left of the threshold on a success.
function OddsTrack({ stat, roll, isRevealed, success }) {
  return (
    <div
      className={`odds-track ${
        isRevealed ? `odds-track--${success ? "success" : "failure"}` : ""
      }`}
    >
      <div className="odds-track-bar">
        <span className="odds-track-zone" style={{ width: `${stat}%` }} />
        <span className="odds-track-threshold" style={{ left: `${stat}%` }} />
        {isRevealed ? (
          <span className="odds-track-marker" style={{ left: `${roll}%` }} />
        ) : null}
      </div>
      <div className="odds-track-scale">
        <span>1</span>
        <span>100</span>
      </div>
    </div>
  );
}

// The roll is stored by the reducer before the animation starts, so reloading
// during the animation lands directly on the same result.
function DicePanel({ onContinue, onRoll, pendingRoll, selectedAction }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);
  const action = selectedAction;
  const stat = Number(action?.stat);
  const isRevealed = Boolean(pendingRoll) && !isAnimating;
  const success = pendingRoll?.success;

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  function handleRoll() {
    onRoll();
    setIsAnimating(true);
    timeoutRef.current = window.setTimeout(
      () => setIsAnimating(false),
      ROLL_DURATION_MS
    );
  }

  let dieState = "idle";

  if (isAnimating) {
    dieState = "rolling";
  } else if (pendingRoll) {
    dieState = success ? "success" : "failure";
  }

  return (
    <section className={`dice-panel dice-panel--${dieState}`} aria-label="Lancer de dé">
      <button
        aria-label="Lancer le dé"
        className="die-button"
        disabled={Boolean(pendingRoll)}
        onClick={handleRoll}
        type="button"
      >
        <span className="die-glow" aria-hidden="true" />
        <Die3D state={dieState} />
        {isRevealed ? (
          <span className="die-value">{pendingRoll.roll}</span>
        ) : (
          <span className="die-caption">{pendingRoll ? "" : "D100"}</span>
        )}
      </button>

      <div className="dice-details">
        <p className="dice-kicker">
          {STAT_LABELS[action?.characteristic]} {stat}
        </p>
        <h2 className="dice-action">{action?.label}</h2>
        <OddsTrack
          isRevealed={isRevealed}
          roll={pendingRoll?.roll}
          stat={stat}
          success={success}
        />
        <p className="dice-verdict" role="status">
          {isRevealed ? (success ? "Réussite" : "Échec") : ""}
          {!pendingRoll ? `Il te faut ${stat} ou moins.` : ""}
          {isAnimating ? "Le hasard tranche…" : ""}
        </p>
      </div>

      {pendingRoll ? (
        <button
          className="button button--gold dice-cta"
          disabled={isAnimating}
          onClick={onContinue}
          type="button"
        >
          Continuer
        </button>
      ) : (
        <button className="button button--gold dice-cta" onClick={handleRoll} type="button">
          Lancer le dé
        </button>
      )}
    </section>
  );
}

export default DicePanel;
