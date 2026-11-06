import { CHARACTER_STATS, STAT_LABELS, getDominantStat } from "../../game/character";

function StatBars({ character }) {
  const dominantStat = getDominantStat(character);

  return (
    <span className="stat-bars">
      {CHARACTER_STATS.map((stat) => (
        <span
          className={`stat-bar ${stat === dominantStat ? "stat-bar--dominant" : ""}`}
          key={stat}
        >
          <span className="stat-bar-label">{STAT_LABELS[stat]}</span>
          <span className="stat-bar-value">{character[stat]}</span>
          <span className="stat-bar-track" aria-hidden="true">
            <span className="stat-bar-fill" style={{ width: `${character[stat]}%` }} />
          </span>
        </span>
      ))}
    </span>
  );
}

export default StatBars;
