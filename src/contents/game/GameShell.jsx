import { BACKGROUNDS } from "../../game/storyConstants";
import SiteSignature from "../ui/site-signature";

const SCENES = Object.values(BACKGROUNDS);

// GameShell owns the scene behind every screen. All scenes stay mounted so the
// change of location is a slow crossfade instead of a cut.
function GameShell({ activeBackground = BACKGROUNDS.HOUSE, children, className = "" }) {
  return (
    <div className="app-shell">
      {SCENES.map((scene) => (
        <div
          aria-hidden="true"
          className={`scene scene--${scene} ${
            scene === activeBackground ? "scene--active" : ""
          }`}
          key={scene}
        />
      ))}
      <div className="scene-vignette" aria-hidden="true" />
      <main className={`app-main ${className}`}>
        {children}
        <SiteSignature />
      </main>
    </div>
  );
}

export default GameShell;
