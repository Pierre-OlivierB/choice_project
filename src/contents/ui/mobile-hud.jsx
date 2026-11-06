import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faKey } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "./confirm-modal";
import CharacterIcon from "../player/character-icon";
import PlayerPanel from "../player/player-panel";
import RulesButton from "../rules/rules-button";
import { useGame } from "../../hooks/useGame";

// Mobile uses compact icon buttons instead of the desktop side column.
function MobileHud() {
  const { openJournal, state } = useGame();
  const { inventory, perso } = state;
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  return (
    <div className="mobile-hud" aria-label="Informations de partie">
      <RulesButton />
      <button
        aria-label="Afficher le journal"
        className="icon-button"
        onClick={openJournal}
        type="button"
      >
        <FontAwesomeIcon icon={faBookOpen} />
      </button>

      {inventory.map((item) => (
        <span aria-label={item} className="mobile-item" key={item} role="img">
          <FontAwesomeIcon icon={faKey} />
        </span>
      ))}

      <button
        aria-label="Afficher le personnage"
        className="mobile-player-button"
        onClick={() => setIsPlayerOpen(true)}
        type="button"
      >
        <CharacterIcon character={perso} />
        <span>{perso.name}</span>
      </button>

      <ConfirmModal
        isOpen={isPlayerOpen}
        title="Personnage"
        confirmLabel="Fermer"
        onConfirm={() => setIsPlayerOpen(false)}
        compact
      >
        <PlayerPanel perso={perso} inventory={inventory} />
      </ConfirmModal>
    </div>
  );
}

export default MobileHud;
