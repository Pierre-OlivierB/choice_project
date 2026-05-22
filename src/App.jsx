import "./App.css";
import Home from "./contents/home";

// Root component kept deliberately thin: navigation is handled inside the game
// flow because this prototype has a single playable experience.
function App() {
  return <Home />;
}

export default App;
