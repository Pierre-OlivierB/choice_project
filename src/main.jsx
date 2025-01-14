import { createRoot } from "react-dom/client";
import "./index.css";
// Import our custom CSS
import "./scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
