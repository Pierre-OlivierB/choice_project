import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faBookOpen,
  faUserGraduate,
  faUserNinja,
  faUserSecret,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "./confirm-modal";
import PlayerPanel from "../player/player-panel";
import RulesPanel from "../rules/rules-panel";
import GameJournal from "../player/game-journal";

// Mobile uses compact icon buttons instead of the full desktop panels. Each
// button opens a modal so the game can still fit on one small screen.
function getCharacterIcon(perso) {
  if (perso.intelligence === "75") {
    return faUserGraduate;
  }
  if (perso.dexterite === "75") {
    return faUserNinja;
  }
  if (perso.constitution === "75") {
    return faUserSecret;
  }
  return faUserSecret;
}

function MobileHud({ perso, inventory, storyHistory, rollHistory }) {
  const [openModal, setOpenModal] = useState(null);

  return (
    <div className="mobile-hud-container">
      <div className="mobile-hud" aria-label="Informations de partie">
      <button
        className="mobile-hud-button"
        onClick={() => setOpenModal("rules")}
        type="button"
        aria-label="Afficher les regles"
      >
        <FontAwesomeIcon icon={faCircleQuestion} />
        <span className="mobile-hud-fallback">?</span>
      </button>

      <button
        className="mobile-hud-button"
        onClick={() => setOpenModal("journal")}
        type="button"
        aria-label="Afficher le journal"
      >
        <FontAwesomeIcon icon={faBookOpen} />
      </button>

      <button
        className="mobile-player-button"
        onClick={() => setOpenModal("player")}
        type="button"
        aria-label="Afficher le personnage"
      >
        <FontAwesomeIcon icon={getCharacterIcon(perso)} />
        <span>{perso.name}</span>
      </button>
      </div>

      {inventory && inventory.length > 0 ? (
        <div className="mobile-inventory-bar">
          {inventory.map((item) => (
            <div key={item} className="mobile-inventory-item" title={item}>
              <FontAwesomeIcon icon={faKey} />
            </div>
          ))}
        </div>
      ) : null}

      <ConfirmModal
        isOpen={openModal === "rules"}
        title="Rappel des regles"
        confirmLabel="Fermer"
        onConfirm={() => setOpenModal(null)}
        compact
      >
        <RulesPanel showTitle={false} />
      </ConfirmModal>

      <ConfirmModal
        isOpen={openModal === "player"}
        title="Personnage"
        confirmLabel="Fermer"
        onConfirm={() => setOpenModal(null)}
        compact
      >
        <PlayerPanel perso={perso} inventory={inventory} />
      </ConfirmModal>

      <ConfirmModal
        isOpen={openModal === "journal"}
        title="Journal"
        confirmLabel="Fermer"
        onConfirm={() => setOpenModal(null)}
        compact
      >
        <GameJournal
          perso={perso}
          inventory={inventory}
          storyHistory={storyHistory}
          rollHistory={rollHistory}
        />
      </ConfirmModal>
    </div>
  );
}

export default MobileHud;
