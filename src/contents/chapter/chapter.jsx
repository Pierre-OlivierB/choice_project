import PlayerPanel from "../player/player-panel";
import RulesPanel from "../rules/rules-panel";

function Chapter(props) {
  const txt = props.txt;
  const perso = props.perso;
  const mj = props.mj;
  const inventory = props.inventory;

  return (
    <div className="h-65 w-100">
      <div className="inside-content h-100">
        <div className="row g-0 align-items-center justify-content-center h-50 w-100">
          <div className="col col-12">
            <div className="row g-0">
              <div className="col col-7">
                <RulesPanel />
              </div>
              <div className="col col-5 d-flex justify-content-center align-items-end p-2">
                <PlayerPanel perso={perso} inventory={inventory} />
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center h-50 w-100">
          <div className="col col-10 description p-4 max-h-160 overflow-x-auto">
            <p>{txt}</p>
            <p>{mj}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chapter;
