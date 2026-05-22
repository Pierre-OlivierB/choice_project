// GameShell owns the global background layer. Keeping this wrapper centralised
// prevents footer or modal backgrounds from creating visual breaks.
function GameShell({ activeBackground, children }) {
  return (
    <div className={`app-shell ${activeBackground}`}>
      <div className="main-content game-main">{children}</div>
    </div>
  );
}

export default GameShell;
