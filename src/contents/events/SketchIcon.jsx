import "../../App.css";

const SketchIcon = ({ type, className = "" }) => {
  const renderSVGContent = () => {
    switch (type) {
      case "item":
        return (
          <>
            <circle cx="30" cy="50" r="15" className="sketch-path" />
            <circle cx="30" cy="50" r="5" className="sketch-path" />
            <line x1="45" y1="50" x2="90" y2="50" className="sketch-path" />
            <line x1="70" y1="50" x2="70" y2="65" className="sketch-path" />
            <line x1="85" y1="50" x2="85" y2="65" className="sketch-path" />
          </>
        );
      case "dice":
        return (
          <>
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" className="sketch-path" />
            <line x1="50" y1="10" x2="50" y2="50" className="sketch-path" />
            <line x1="10" y1="30" x2="50" y2="50" className="sketch-path" />
            <line x1="90" y1="30" x2="50" y2="50" className="sketch-path" />
            <line x1="50" y1="50" x2="50" y2="90" className="sketch-path" />
            <line x1="10" y1="70" x2="50" y2="50" className="sketch-path" />
            <line x1="90" y1="70" x2="50" y2="50" className="sketch-path" />
          </>
        );
      case "action":
      case "observe":
        return (
          <>
            <path d="M 10 50 Q 50 10 90 50 Q 50 90 10 50" className="sketch-path" />
            <circle cx="50" cy="50" r="15" className="sketch-path" />
            <line x1="50" y1="20" x2="50" y2="30" className="sketch-path" />
            <line x1="50" y1="80" x2="50" y2="70" className="sketch-path" />
          </>
        );
      case "search":
        return (
          <>
            <path d="M 22 30 Q 38 18 54 30 L 76 50 Q 84 58 76 66 Q 68 74 60 66 L 42 48" className="sketch-path" />
            <path d="M 20 76 Q 38 62 58 76" className="sketch-path" />
            <circle cx="35" cy="38" r="10" className="sketch-path" />
          </>
        );
      case "desk":
        return (
          <>
            <rect x="18" y="38" width="64" height="18" className="sketch-path" />
            <line x1="26" y1="56" x2="26" y2="86" className="sketch-path" />
            <line x1="74" y1="56" x2="74" y2="86" className="sketch-path" />
            <rect x="42" y="42" width="16" height="8" className="sketch-path" />
            <path d="M 62 28 Q 70 22 76 28" className="sketch-path" />
          </>
        );
      case "furniture":
        return (
          <>
            <rect x="24" y="24" width="52" height="60" rx="3" className="sketch-path" />
            <line x1="24" y1="44" x2="76" y2="44" className="sketch-path" />
            <line x1="24" y1="64" x2="76" y2="64" className="sketch-path" />
            <circle cx="50" cy="34" r="2" className="sketch-path" />
            <circle cx="50" cy="54" r="2" className="sketch-path" />
            <circle cx="50" cy="74" r="2" className="sketch-path" />
          </>
        );
      case "couch":
        return (
          <>
            <path d="M 22 52 Q 22 38 34 38 L 66 38 Q 78 38 78 52" className="sketch-path" />
            <rect x="18" y="52" width="64" height="24" rx="6" className="sketch-path" />
            <line x1="32" y1="76" x2="28" y2="88" className="sketch-path" />
            <line x1="68" y1="76" x2="72" y2="88" className="sketch-path" />
          </>
        );
      case "door":
        return (
          <>
            <path d="M 28 90 L 28 18 L 72 28 L 72 90" className="sketch-path" />
            <line x1="20" y1="90" x2="82" y2="90" className="sketch-path" />
            <circle cx="62" cy="58" r="3" className="sketch-path" />
          </>
        );
      case "open-door":
        return (
          <>
            <path d="M 24 90 L 24 18 L 76 18 L 76 90" className="sketch-path" />
            <path d="M 76 18 L 52 30 L 52 82 L 76 90" className="sketch-path" />
            <line x1="18" y1="90" x2="84" y2="90" className="sketch-path" />
            <circle cx="60" cy="56" r="3" className="sketch-path" />
          </>
        );
      case "hand":
        return (
          <>
            <path d="M 30 62 L 30 34 Q 30 26 38 26 Q 44 26 44 34 L 44 52" className="sketch-path" />
            <path d="M 44 34 Q 44 24 52 24 Q 60 24 60 34 L 60 52" className="sketch-path" />
            <path d="M 60 38 Q 60 30 68 30 Q 76 30 76 40 L 76 60 Q 76 84 54 84 L 46 84 Q 34 84 28 72 L 20 56 Q 18 50 24 48 Q 30 46 34 54 L 38 60" className="sketch-path" />
          </>
        );
      case "tv":
        return (
          <>
            <rect x="18" y="26" width="64" height="44" rx="4" className="sketch-path" />
            <path d="M 30 38 L 42 56 L 54 38 L 70 58" className="sketch-path" />
            <line x1="40" y1="80" x2="60" y2="80" className="sketch-path" />
            <line x1="50" y1="70" x2="50" y2="80" className="sketch-path" />
          </>
        );
      case "window":
        return (
          <>
            <rect x="22" y="18" width="56" height="64" className="sketch-path" />
            <line x1="50" y1="18" x2="50" y2="82" className="sketch-path" />
            <line x1="22" y1="50" x2="78" y2="50" className="sketch-path" />
            <path d="M 14 88 L 86 88" className="sketch-path" />
          </>
        );
      case "car":
        return (
          <>
            <path d="M 18 62 L 28 40 L 70 40 L 84 62 Z" className="sketch-path" />
            <circle cx="34" cy="68" r="8" className="sketch-path" />
            <circle cx="70" cy="68" r="8" className="sketch-path" />
            <line x1="38" y1="40" x2="46" y2="62" className="sketch-path" />
            <line x1="60" y1="40" x2="54" y2="62" className="sketch-path" />
          </>
        );
      case "run":
        return (
          <>
            <path d="M 68 84 L 68 22 L 90 28 L 90 84" className="sketch-path" />
            <circle cx="84" cy="56" r="2" className="sketch-path" />
            <path d="M 14 66 C 28 52 44 52 56 64" className="sketch-path" />
            <path d="M 56 64 C 48 72 36 78 22 82" className="sketch-path" />
            <path d="M 38 52 C 48 42 58 34 70 30" className="sketch-path" />
            <path d="M 12 42 L 34 42" className="sketch-path" />
            <path d="M 8 54 L 28 54" className="sketch-path" />
            <path d="M 10 78 L 22 78" className="sketch-path" />
          </>
        );
      case "walk":
        return (
          <>
            <path d="M 30 76 C 18 70 18 54 30 46 C 42 38 54 44 56 56 C 58 70 44 82 30 76 Z" className="sketch-path" />
            <circle cx="22" cy="38" r="4" className="sketch-path" />
            <circle cx="30" cy="30" r="4" className="sketch-path" />
            <circle cx="40" cy="28" r="4" className="sketch-path" />
            <circle cx="50" cy="34" r="4" className="sketch-path" />
            <path d="M 66 24 C 84 36 86 58 66 82 C 56 58 56 38 66 24 Z" className="sketch-path" />
            <path d="M 66 24 C 70 46 70 64 66 82" className="sketch-path" />
            <path d="M 66 46 L 78 38" className="sketch-path" />
            <path d="M 67 58 L 80 52" className="sketch-path" />
            <path d="M 66 70 L 76 66" className="sketch-path" />
          </>
        );
      case "talk":
        return (
          <>
            <path d="M 18 30 Q 18 18 34 18 L 58 18 Q 74 18 74 34 L 74 46 Q 74 62 58 62 L 42 62 L 26 78 L 30 62 Q 18 60 18 46 Z" className="sketch-path" />
            <line x1="32" y1="34" x2="60" y2="34" className="sketch-path" />
            <line x1="32" y1="46" x2="52" y2="46" className="sketch-path" />
          </>
        );
      case "force":
        return (
          <>
            <path d="M 28 62 L 28 42 Q 28 32 38 32 Q 44 32 44 40 L 44 26 Q 44 18 52 18 Q 60 18 60 26 L 60 42 Q 60 34 68 34 Q 76 34 76 44 L 76 62 Q 76 82 52 82 Q 28 82 28 62 Z" className="sketch-path" />
            <line x1="44" y1="42" x2="44" y2="58" className="sketch-path" />
            <line x1="60" y1="42" x2="60" y2="58" className="sketch-path" />
          </>
        );
      case "stand":
        return (
          <>
            <circle cx="50" cy="22" r="10" className="sketch-path" />
            <path d="M 50 34 L 50 62" className="sketch-path" />
            <path d="M 34 48 L 50 38 L 66 48" className="sketch-path" />
            <path d="M 50 62 L 36 86" className="sketch-path" />
            <path d="M 50 62 L 66 86" className="sketch-path" />
          </>
        );
      case "continue":
      case "book":
        return (
          <>
            <path d="M 18 28 Q 34 20 50 30 Q 66 20 82 28 L 82 78 Q 66 70 50 80 Q 34 70 18 78 Z" className="sketch-path" />
            <line x1="50" y1="30" x2="50" y2="80" className="sketch-path" />
            <path d="M 28 42 Q 38 38 46 44" className="sketch-path" />
            <path d="M 54 44 Q 64 38 74 42" className="sketch-path" />
          </>
        );
      case "chapter":
        return (
          <>
            <polyline points="20,80 40,80 40,60 60,60 60,40 80,40 80,20" className="sketch-path" />
            <line x1="15" y1="90" x2="85" y2="90" className="sketch-path" />
            <line x1="85" y1="90" x2="90" y2="85" className="sketch-path" />
          </>
        );
      case "ending":
        return (
          <>
            <path d="M 20 90 L 20 40 A 30 30 0 0 1 80 40 L 80 90" className="sketch-path" />
            <line x1="10" y1="90" x2="90" y2="90" className="sketch-path" />
            <line x1="50" y1="40" x2="50" y2="90" className="sketch-path" />
            <circle cx="42" cy="65" r="2" className="sketch-path" />
            <circle cx="58" cy="65" r="2" className="sketch-path" />
          </>
        );
      case "character":
        return (
          <>
            <circle cx="50" cy="34" r="16" className="sketch-path" />
            <path d="M 22 90 Q 50 58 78 90" className="sketch-path" />
            <path d="M 34 34 Q 50 18 66 34" className="sketch-path" />
          </>
        );
      case "special":
        return (
          <>
            <path d="M 50 12 L 58 40 L 88 40 L 63 56 L 72 86 L 50 68 L 28 86 L 37 56 L 12 40 L 42 40 Z" className="sketch-path" />
            <circle cx="50" cy="50" r="8" className="sketch-path" />
          </>
        );
      default:
        return (
          <>
            <circle cx="50" cy="50" r="30" className="sketch-path" />
            <polygon points="50,20 75,70 25,70" className="sketch-path" />
          </>
        );
    }
  };

  return (
    <div className={`sketch-wrapper ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="sketch-svg">
        {renderSVGContent()}
      </svg>
    </div>
  );
};

export default SketchIcon;
