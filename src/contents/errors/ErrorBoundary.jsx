import { Component } from "react";
import GameError from "./game-error";

// Last line of defence: an unexpected render error shows a readable screen, and
// the save stays available from the home page after the reload.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <GameError
          message="Une erreur inattendue a interrompu la partie."
          onRetry={() => window.location.reload()}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
