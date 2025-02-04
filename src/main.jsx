import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => {
        console.log('Self-destroy SW registered:', reg);
      })
      .catch((err) => {
        console.error('SW registration failed:', err);
      });
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
