import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faUserNinja,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import InventoryList from "./inventory-list";

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
  return null;
}

function PlayerPanel({ perso, inventory }) {
  const icon = getCharacterIcon(perso);

  return (
    <div className="card card-charac player-panel">
      <div className="card-body">
        <article className="d-flex justify-content-sm-evenly player-panel-content">
          <section className="player-panel-stats">
            <h4 className="player-panel-title">{perso.name}</h4>
            <h5 className="player-panel-subtitle">{perso.type}</h5>
            <p className="card-text">C : {perso.constitution}</p>
            <p className="card-text">D : {perso.dexterite}</p>
            <p className="card-text">I : {perso.intelligence}</p>
          </section>

          {icon ? (
            <section className="d-flex justify-content-center align-items-center w-50">
              <FontAwesomeIcon className="w-50 h-50" icon={icon} />
            </section>
          ) : null}
        </article>
      </div>
      <InventoryList inventory={inventory} />
    </div>
  );
}

export default PlayerPanel;
