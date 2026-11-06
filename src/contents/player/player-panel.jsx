import CharacterIcon from "./character-icon";
import InventoryList from "./inventory-list";
import StatBars from "./stat-bars";

// PlayerPanel appears in the desktop side column and inside a mobile modal.
function PlayerPanel({ perso, inventory }) {
  return (
    <div className="panel player-panel">
      <header className="player-panel-header">
        <span className="player-panel-emblem">
          <CharacterIcon character={perso} />
        </span>
        <div>
          <h2 className="player-panel-name">{perso.name}</h2>
          <p className="player-panel-role">{perso.type}</p>
        </div>
      </header>
      <StatBars character={perso} />
      <InventoryList inventory={inventory} />
    </div>
  );
}

export default PlayerPanel;
