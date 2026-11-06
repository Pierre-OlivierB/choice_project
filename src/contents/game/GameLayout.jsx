import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import MobileHud from "../ui/mobile-hud";
import PlayerPanel from "../player/player-panel";
import RulesButton from "../rules/rules-button";
import { useGame } from "../../hooks/useGame";

// Shared by reading and action steps: the story on one side, the character and
// the game tools on the other. Mobile swaps the side panel for MobileHud.
function GameLayout({ children }) {
  const { openJournal, state } = useGame();
  const { inventory, perso, storyHistory } = state;

  return (
    <section className="game-stage">
      <MobileHud />
      <div className="game-reading">
        <article className="panel story-panel" tabIndex={0}>
          {children}
        </article>
        <aside className="game-side">
          <PlayerPanel perso={perso} inventory={inventory} />
          <div className="game-side-actions">
            <RulesButton />
            <button className="button button--ghost" onClick={openJournal} type="button">
              <FontAwesomeIcon icon={faBookOpen} />
              Journal
              <span className="button-count">{storyHistory.length}</span>
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default GameLayout;
