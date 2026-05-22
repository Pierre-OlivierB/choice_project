import PlayerPanel from "../player/player-panel";
import RulesDrawer from "../rules/rules-drawer";
import MobileHud from "../ui/mobile-hud";

// Chapter displays a narrative reading step. It deliberately receives already
// prepared text and histories so it stays a presentation component.
function Chapter(props) {
  const txt = props.txt;
  const perso = props.perso;
  const mj = props.mj;
  const inventory = props.inventory;
  const storyHistory = props.storyHistory;
  const rollHistory = props.rollHistory;
  const onOpenJournal = props.onOpenJournal;

  return (
    <section className="game-stage">
      <div className="game-stage-content">
        <MobileHud
          perso={perso}
          inventory={inventory}
          storyHistory={storyHistory}
          rollHistory={rollHistory}
        />
        <div className="layout-pc-parent game-reading-layout">
          <div className="layout-story-zone">
            <div className="description p-4 max-h-160 overflow-x-auto">
              <p>{txt}</p>
              <p>{mj}</p>
            </div>
          </div>
          <aside className="layout-side-zone desktop-info-row">
            <PlayerPanel perso={perso} inventory={inventory} />
            <div className="desktop-side-actions">
              <RulesDrawer />
              <button
                className="desktop-journal-button"
                onClick={onOpenJournal}
                type="button"
              >
                Journal
              </button>
            </div>
            <p className="desktop-journal-count">
              {storyHistory.length} entr&eacute;e(s)
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Chapter;
