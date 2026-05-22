import { useState } from "react";
import RulesPanel from "./rules-panel";

// DesktopRulesDrawer replaces the permanent desktop rules block with an
// on-demand help panel. Mobile already uses MobileHud for the same need.
function RulesDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="desktop-rules-help">
      <button
        aria-expanded={isOpen}
        aria-label="Afficher les regles"
        className="desktop-rules-button"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        ?
      </button>

      {isOpen ? (
        <div className="rules-drawer-backdrop" onClick={() => setIsOpen(false)}>
          <aside
            aria-label="Rappel des regles"
            className="rules-drawer description"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>Rappel des r&egrave;gles</h2>
            <button
              aria-label="Fermer les regles"
              className="rules-drawer-close"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Fermer
            </button>
            <RulesPanel showTitle={false} />
          </aside>
        </div>
      ) : null}
    </div>
  );
}

export default RulesDrawer;
