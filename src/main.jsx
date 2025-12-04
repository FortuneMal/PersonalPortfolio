import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const container = document.getElementById("root");

// Recommended JavaScript check to ensure the DOM element exists
if (container) {
  createRoot(container).render(<App />);
} else {
  // Optional: Add an error message if the root element is missing
  console.error("Root element with ID 'root' not found in the document.");
}