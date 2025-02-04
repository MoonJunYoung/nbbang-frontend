import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then((registration) => {
      console.log("✅ [Service Worker] 등록 성공:", registration);

      // 🔥 새로운 서비스 워커가 감지되면 강제 새로고침 실행
      registration.onupdatefound = () => {
          const newWorker = registration.installing;
          newWorker.onstatechange = () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  console.log("⚡ 새로운 서비스 워커가 설치됨. 페이지 강제 새로고침 실행!");
              }
          };
      };
  }).catch((error) => {
      console.error("❌ [Service Worker] 등록 실패:", error);
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
