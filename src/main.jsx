import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js")
          .then((registration) => {
              console.log("✅ Service Worker 등록 성공:", registration);
          })
          .catch((error) => {
              console.error("❌ Service Worker 등록 실패:", error);
          });
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
